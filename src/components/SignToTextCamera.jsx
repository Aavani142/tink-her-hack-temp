import { useRef, useState } from "react";
import * as tmImage from "@teachablemachine/image";

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/7LDV3jsIT/";

export default function SignToTextCamera({ onDetect }) {

  const webcamContainerRef = useRef(null);
  const modelRef = useRef(null);
  const webcamRef = useRef(null);
  const isRunningRef = useRef(false);

  // fast smoothing (2 frames)
  const lastLabelRef = useRef("");
  const stableCountRef = useRef(0);

  const [isStarted, setIsStarted] = useState(false);

  async function startCamera() {

    if (isRunningRef.current) return;

    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    modelRef.current = await tmImage.load(modelURL, metadataURL);

    webcamRef.current = new tmImage.Webcam(500, 500, true);
    await webcamRef.current.setup();
    await webcamRef.current.play();

    webcamContainerRef.current.innerHTML = "";
    webcamContainerRef.current.appendChild(webcamRef.current.canvas);

    isRunningRef.current = true;
    setIsStarted(true);

    window.requestAnimationFrame(loop);
  }

  async function loop() {
    if (!isRunningRef.current) return;

    webcamRef.current.update();
    await predict();

    window.requestAnimationFrame(loop);
  }

  async function predict() {

    const predictions = await modelRef.current.predict(
      webcamRef.current.canvas
    );

    let highest = predictions[0];

    for (let p of predictions) {
      if (p.probability > highest.probability) {
        highest = p;
      }
    }

    // fast threshold
    if (highest.probability < 0.80) return;

    // smooth detection (avoid flicker)
    if (highest.className === lastLabelRef.current) {
      stableCountRef.current++;
    } else {
      stableCountRef.current = 0;
    }

    lastLabelRef.current = highest.className;

    if (stableCountRef.current >= 1) {
      onDetect(highest.className);
    }
  }

  return (
    <div className="flex flex-col items-center">

      <button
        onClick={startCamera}
        className="bg-black text-white px-6 py-2 mb-4"
      >
        {isStarted ? "Running..." : "Start Sign Detection"}
      </button>

      <div
        ref={webcamContainerRef}
        className="border w-[500px] h-[500px]"
      />

    </div>
  );
}
