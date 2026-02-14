import { useEffect } from "react";
import * as THREE from "three";

export default function FitModel({ object }) {

  useEffect(() => {

    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

   
    object.position.sub(center);

    
    const targetHeight = 3.2;

    const scale = targetHeight / size.y;
    object.scale.setScalar(scale);

  }, [object]);

  return <primitive object={object} />;
}
