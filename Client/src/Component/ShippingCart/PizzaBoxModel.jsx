import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'

export function PizzaBoxModel({ props, data }) {
  const group = useRef()

  const boxDetails = data;

  const dimenstionsValue = boxDetails.dimension;

  const boxDimensionMaker = () => {

    let len = parseFloat(dimenstionsValue.length);
    let wid = parseFloat(dimenstionsValue.width);
    let dep = parseFloat(dimenstionsValue.depth);

    return parseFloat(Math.max(len,wid,dep) / 10)

  }

  const canvasExported = boxDetails.sides_design;

  const material = boxDetails.material;

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
