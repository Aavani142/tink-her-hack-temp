import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import FitModel from "./FitModel";

export default function HelloAnimation() {

  const group = useRef();
  const { scene, animations } = useGLTF("/animations/hello.glb");

  useEffect(() => {

    if (!animations || animations.length === 0) {
      console.log("❌ No animation clips found in GLB");
      return;
    }

    console.log("✅ Animation clips:", animations);

    const mixer = new THREE.AnimationMixer(scene);

    animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.reset();
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.play();
    });

    // render loop for animation
    let frame;
    const clock = new THREE.Clock();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      mixer.update(clock.getDelta());
    };

    animate();

    return () => cancelAnimationFrame(frame);

  }, [scene, animations]);

  return (
    <group ref={group}>
      <FitModel object={scene} />
    </group>
  );
}
