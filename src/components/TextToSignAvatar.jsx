import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX, useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";
import FitModel from "./FitModel";


/* ---------- IDLE AVATAR ---------- */

function IdleAvatar() {
  const avatar = useFBX("/avatar.fbx");
  return <FitModel object={avatar} />;
}


/* ---------- HELLO ANIMATION ---------- */

function HelloAnimation() {

  const group = useRef();

  const { scene, animations } = useGLTF("/animations/hello.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions) return;
    const names = Object.keys(actions);
    if (names.length > 0) {
      actions[names[0]].reset().fadeIn(0.3).play();
    }
  }, [actions]);

  return (
    <group ref={group}>
      <FitModel object={scene} />
    </group>
  );
}


/* ---------- MAIN VIEWER ---------- */

export default function TextToSignAvatar({ text }) {

  const showHello = text.trim().toLowerCase() === "hello";

  return (
    <div style={{ height: "600px", width: "100%" }}>

      <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>

        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 3]} />

        {showHello ? <HelloAnimation /> : <IdleAvatar />}

        <OrbitControls
          target={[0, 1, 0]}
          enableZoom={false}
        />

      </Canvas>

    </div>
  );
}
