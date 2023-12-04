import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, CameraControls, useProgress, Html } from '@react-three/drei'
import { PizzaBox } from './PizzaBox'
import { useDispatch, useSelector } from 'react-redux'
import { Suspense, useEffect, useRef } from 'react'
import { setBoxState } from '../../Store/slices/boxState'
import { useSpring, a } from '@react-spring/three';

const Scene = () => {
    const cameraControlRef = useRef();
    const dispatch = useDispatch();
    const selectedSide = useSelector((state) => state.selectedSide);

    const [spring, setSpring] = useSpring(() => ({ rotation: [0, 0, 0] }));

    function Loader() {
        const { progress } = useProgress()
        return (
            <Html center>
                <h6 style={{ color: '#15807a' }}>{progress.toFixed(0)} % loaded</h6>
                <div className="progress" style={{ width: '10rem' }}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow={progress.toFixed(0)}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${progress.toFixed(0)}%`, background: '#15807a' }}
                    ></div>
                </div>
            </Html>

        )
    }

    useEffect(() => {
        const cameraControls = cameraControlRef.current;

        if (!cameraControls) return;

        if (selectedSide === 'front') {
            cameraControls.rotateTo(Math.PI * 2, Math.PI / 2);
            dispatch(setBoxState(true));
            setSpring({ rotation: [0, Math.PI, 0] });
        } else if (selectedSide === 'frontTop') {
            cameraControls.rotateTo(Math.PI * 2, Math.PI / 2);
            dispatch(setBoxState(false));
            setSpring({ rotation: [0, Math.PI * 2, 0] });
        } else if (selectedSide === 'frontLeft') {
            cameraControls.rotateTo(Math.PI * 2, Math.PI / 2);
            dispatch(setBoxState(false));
            setSpring({ rotation: [0, -Math.PI / 2, 0] });
        } else if (selectedSide === 'frontRight') {
            cameraControls.rotateTo(Math.PI * 2, Math.PI / 2);
            dispatch(setBoxState(false));
            setSpring({ rotation: [0, Math.PI / 2, 0] });
        } else if (selectedSide === 'frontBottom') {
            cameraControls.rotateTo(Math.PI * 2, Math.PI / 2);
            dispatch(setBoxState(false));
            setSpring({ rotation: [0, Math.PI, 0] });
        } else if (selectedSide === 'bottom') {
            cameraControls.rotateTo(Math.PI * 2, Math.PI / 2);
            dispatch(setBoxState(false));
            setSpring({ rotation: [-Math.PI / 2, 0, 0] });
        } else if (selectedSide === 'bottomLeft') {
            cameraControls.rotateTo(Math.PI * 2, Math.PI / 2);
            dispatch(setBoxState(true));
            setSpring({ rotation: [0, -Math.PI / 2, 0] });
        } else if (selectedSide === 'bottomRight') {
            cameraControls.rotateTo(Math.PI * 2, Math.PI / 2);
            dispatch(setBoxState(true));
            setSpring({ rotation: [0, Math.PI / 2, 0] });
        } else if (selectedSide === 'bottomFront') {
            cameraControls.rotateTo(Math.PI * 2, Math.PI / 2);
            dispatch(setBoxState(true));
            setSpring({ rotation: [0, Math.PI * 2, 0] });
        }

    }, [selectedSide, dispatch, setSpring]);

    const changeState = (event) => {
        dispatch(setBoxState(event));
    }

    useEffect(() => {
        document.querySelector('#flexSwitchCheckDefault').click();
    }, [])

    return (
        <>
            <div className=" w-100 mt-2" style={{height: 80+'vh'}}>
                <Canvas eventPrefix="client" camera={{ position: [0, -3, 10], fov: 75 }}>
                    <Suspense fallback={<Loader />}>
                        <CameraControls ref={cameraControlRef} />
                        <ambientLight intensity={0.7} />
                        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 150, -15]} castShadow />
                        <Environment preset="city" blur={1} />
                        <ContactShadows resolution={512} position={[0, -1.8, 0]} opacity={1} scale={10} blur={2} far={0.8} />
                        <a.group rotation={spring.rotation}>
                            <PizzaBox />
                        </a.group>
                        <OrbitControls />
                    </Suspense>
                </Canvas>
            </div>
            <div className=" d-flex justify-content-center align-items-center flex-row gap-4">
                <p className=" fs-6 fw-semibold mt-3 text-secondary">Closed</p>
                <div className="form-check form-switch">
                    <input className="form-check-input custom pt-3 pb-3 ps-5 pe-5 " type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={(e) => changeState(e.target.checked)} />
                </div>
                <p className=" fs-6 fw-semibold mt-3 text-secondary">Open</p>
            </div>

        </>
    );
};

export default Scene;