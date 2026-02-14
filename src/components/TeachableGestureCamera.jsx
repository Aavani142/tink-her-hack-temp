import { useRef, useState } from "react";
import * as tmImage from "@teachablemachine/image";

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/7LDV3jsIT/";

export default function TeachableGestureCamera() {

  const webcamContainerRef = useRef(null);
  const modelRef = useRef(null);
  const webcamRef = useRef(null);
  const runningRef = useRef(false);

  const lastLabelRef = useRef("");
  const stableFramesRef = useRef(0);

  const [detectedLabel, setDetectedLabel] = useState("Waiting...");
  const [probabilities, setProbabilities] = useState([]);

  async function start() {

    if (runningRef.current) return;

    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    modelRef.current = await tmImage.load(modelURL, metadataURL);

    webcamRef.current = new tmImage.Webcam(500, 500, true);
    await webcamRef.current.setup();
    await webcamRef.current.play();

    webcamContainerRef.current.innerHTML = "";
    webcamContainerRef.current.appendChild(webcamRef.current.canvas);

    runningRef.current = true;

    window.requestAnimationFrame(loop);
  }

  async function loop() {
    if (!runningRef.current) return;

    webcamRef.current.update();
    await predict();

    window.requestAnimationFrame(loop);
  }

  async function predict() {

    const preds = await modelRef.current.predict(webcamRef.current.canvas);

    // sort highest first
    preds.sort((a, b) => b.probability - a.probability);

    // update probability list UI
    setProbabilities(preds);

    const top = preds[0];

    // ignore weak predictions
    if (top.probability < 0.85) return;

    // smoothing (avoid flicker)
    if (top.className === lastLabelRef.current) {
      stableFramesRef.current++;
    } else {
      stableFramesRef.current = 0;
    }

    lastLabelRef.current = top.className;

    if (stableFramesRef.current >= 1) {
      setDetectedLabel(top.className);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">

      <button
        onClick={start}
        className="bg-black text-white px-6 py-2"
      >
        Start Camera
      </button>

      <div
        ref={webcamContainerRef}
        className="border w-[500px] h-[500px]"
      />

      <div className="text-3xl font-bold text-green-600">
        {detectedLabel}
      </div>

      <div className="w-full max-w-md text-left">
        <h3 className="font-semibold mb-2">All Predictions</h3>

        {probabilities.map(p => (
          <div key={p.className}>
            {p.className} — {(p.probability * 100).toFixed(1)}%
          </div>
        ))}
      </div>

    </div>
  );
}
