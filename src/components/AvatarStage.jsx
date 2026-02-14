import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import IdleAvatar from "./IdleAvatar";
import HelloAnimation from "./HelloAnimation";

export default function AvatarStage({ text }) {

  const showHello = text.trim().toLowerCase() === "hello";

  return (
    <div style={{ height: "520px", width: "100%" }}>

      <Canvas camera={{ position: [0, 1.6, 5], fov: 45 }}>

        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 3]} />

        {showHello
          ? <HelloAnimation key={text} />
          : <IdleAvatar />
        }

        <OrbitControls
          target={[0, 1, 0]}
          enableZoom={false}
        />

      </Canvas>

    </div>
  );
}
