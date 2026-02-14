import { useRef, useState } from "react";
import * as tmImage from "@teachablemachine/image";

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/7LDV3jsIT/";

export default function SignDetector({ onDetect }) {

  const webcamRef = useRef(null);
  const [label, setLabel] = useState("Waiting...");
  let model, webcam;

  async function init() {

    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);

    webcam = new tmImage.Webcam(400, 400, true);
    await webcam.setup();
    await webcam.play();

    webcamRef.current.appendChild(webcam.canvas);

    window.requestAnimationFrame(loop);
  }

  async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    const predictions = await model.predict(webcam.canvas);

    let highest = predictions[0];

    for (let p of predictions) {
      if (p.probability > highest.probability) {
        highest = p;
      }
    }

    if (highest.probability > 0.9) {

      const labelClean = highest.className
        .toLowerCase()
        .replace(/\s+/g, "_");

      setLabel(labelClean);
      onDetect(labelClean);
    }
  }

  return (
    <div>
      <button
        onClick={init}
        className="bg-black text-white px-4 py-2 mb-4"
      >
        Start Camera
      </button>

      <div ref={webcamRef}></div>

      <div className="mt-4 text-xl">
        Detected: {label}
      </div>
    </div>
  );
}
