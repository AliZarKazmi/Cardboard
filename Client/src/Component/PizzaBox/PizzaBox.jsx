import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { useSelector } from 'react-redux'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';

export function PizzaBox({ props }) {
  const group = useRef()

  const dimenstionsValue = useSelector((state) => {
    return state.sizeChanged
  });
  const boxDimensionMaker = () => {

    let len = parseFloat(dimenstionsValue.length);
    let wid = parseFloat(dimenstionsValue.width);
    let dep = parseFloat(dimenstionsValue.depth);

    return parseFloat(Math.max(len,wid,dep) / 10)

  }

  const canvasExported = useSelector((state) => { 
    return state.canvasAsImg;
  })

  const animate = useSelector((state) => {
    return state.animate;
  })

  const material = useSelector((state) => {
    return state.selectedMaterial;
  })

  const [matObject, setMatObject] = useState({
    map: '/pizzaIntTexKraft.png'
  })

  useEffect(() => {
    if (material === 'White') {
      setMatObject({
        map: '/pizzaIntTexWhite.png'
      })
    } else if (material === 'Dreamcoat') {
      setMatObject({
        map: '/pizzaIntTexDreamcoat.png'
      })
    } else if (material === 'Kraft') {
      setMatObject({
        map: '/pizzaIntTexKraft.png'
      })
    } else {
      setMatObject({
        map: '/pizzaIntTexKraft.png'
      })
    }
  }, [material])

  const intTex = useTexture(matObject)

  const extTex = useTexture({
    map: canvasExported ? `/uploads/${canvasExported}` : '/pizzaBoxExtTex-kraft.png'
  })

  const { nodes, materials, animations } = useGLTF('/AnimatedPizzaBox.glb')
  const { actions, names } = useAnimations(animations, group)



  useFrame(() => {
    if (animate) {
      actions.Open.fadeOut(0.5);
      actions.Close.setLoop(THREE.LoopOnce);
      actions.Close.reset().fadeIn(0.5).play();
      actions.Close.clampWhenFinished = true;
    } else {
      actions.Close.fadeOut(0.5);
      actions.Open.setLoop(THREE.LoopOnce);
      actions.Open.reset().fadeIn(0.5).play();
      actions.Open.clampWhenFinished = true;
    }
  });

  return (
    <group ref={group} {...props} dispose={null} position={[0, -3, 0]} scale={boxDimensionMaker()} >
      <group name="Scene" >
        <group name="Armature">
          <primitive object={nodes.Base} />
          <group name="Box_12in">
            <skinnedMesh name="Plane002" geometry={nodes.Plane002.geometry} skeleton={nodes.Plane002.skeleton}>
              <meshStandardMaterial {...intTex} map-flipY={false} />
            </skinnedMesh>
            <skinnedMesh name="Plane002_1" geometry={nodes.Plane002_1.geometry} skeleton={nodes.Plane002_1.skeleton}>
              <meshStandardMaterial {...extTex} map-flipY={false} />
            </skinnedMesh>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/AnimatedPizzaBox.glb')
