import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX } from "@react-three/drei";

function AvatarModel() {

  const avatar = useFBX("/avatar.fbx");

  return (
    <primitive
      object={avatar}
      scale={0.015}          
      position={[0, -1.5, 0]}  
    />
  );
}

export default function AvatarViewer() {
  return (
    <div style={{ height: "650px", width: "100%" }}>

      <Canvas camera={{ position: [0, 1.5, 5], fov: 50 }}>

        {/* lighting */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 5, 2]} intensity={2} />

        {/* avatar */}
        <AvatarModel />

        {/* camera control */}
        <OrbitControls
          target={[0, 1, 0]}   
          enableZoom={false}
        />

      </Canvas>

    </div>
  );
}
