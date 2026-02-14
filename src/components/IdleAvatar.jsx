import { useFBX } from "@react-three/drei";
import FitModel from "./FitModel";

export default function IdleAvatar() {
  const avatar = useFBX("/avatar.fbx");
  return <FitModel object={avatar} />;
}
