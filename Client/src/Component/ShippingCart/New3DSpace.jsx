import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, CameraControls } from '@react-three/drei'
import { Suspense } from 'react'
import { a } from '@react-spring/three';
import { PizzaBoxModel } from './PizzaBoxModel'

const New3DSpace = ({data}) => {
    return (
        <>
            <div className=" w-100 mt-2">
                <Canvas eventPrefix="client" camera={{ position: [0, -3, 10], fov: 75 }}>
                    <Suspense>
                        <CameraControls />
                        <ambientLight intensity={0.7} />
                        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 150, -15]} castShadow />
                        <Environment preset="city" blur={1} />
                        <ContactShadows resolution={512} position={[0, -1.8, 0]} opacity={1} scale={10} blur={2} far={0.8} />
                        <a.group>
                            <PizzaBoxModel data={data} />
                        </a.group>
                        <OrbitControls />
                    </Suspense>
                </Canvas>
            </div>

        </>
    );
};

export default New3DSpace;