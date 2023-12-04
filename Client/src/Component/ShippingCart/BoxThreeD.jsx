import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, ContactShadows, Environment, Html, OrbitControls, useProgress } from '@react-three/drei';
import Box3DModel from './Box3DModel';

const BoxThreeD = ({data}) => {

  function Loader() {
    const { progress } = useProgress()
    return (
      <Html center>
        <h6 className=' text-primary'>{progress.toFixed(0)} % loaded</h6>
        <div className="progress">
          <div 
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={progress.toFixed(0)}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{width: `${progress.toFixed(0)}%`}}
            ></div>
        </div>
      </Html>

    )
  }


  return (
    <>
      <Canvas shadows camera={{ fov: 90 }}>
        <Suspense fallback={<Loader />}>
          <CameraControls />
          <ambientLight intensity={0.7} />
          <spotLight intensity={0.4} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
            <Box3DModel data={data} />
          <Environment preset="city" />
          <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default BoxThreeD;
