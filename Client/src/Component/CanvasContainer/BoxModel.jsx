import { useAnimations, useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {React, useEffect, useRef, useState } from 'react'
import {setBoxScaleValue} from '../../Store/slices/boxScaleValue';
import { useDispatch, useSelector } from 'react-redux';

import * as THREE from 'three';
    
function BoxModel(props) {

    const group = useRef();

    const materialName = useSelector((state)=>{
        return state.materialChanged
    });

    const sideImages = useSelector((state)=>{
      return state.imagesConainer
    });


    /// material selection here
    function materialPicker(){
        if (materialName === 'White') {
            return {map: '/whiteCoatTexture.jpg'}
        }else if(materialName === 'Dreamcoat') {
            return {map: '/dreamCoatTexture.jpg'}
        } else{
            return {map: '/kraftTexture.jpg'}
        }
      }
    
    const boxMaterial = useTexture(materialPicker());
    
    ////// end /////

    /// box dimensions (size ) setting here
    const dimenstionsValue = useSelector((state)=>{
        return state.sizeChanged
    });


    const boxDimensionMaker = () =>{

        let len = parseFloat(dimenstionsValue.length);
        let wid = parseFloat(dimenstionsValue.width);
        let dep = parseFloat(dimenstionsValue.depth);
        
        return len || wid || dep ?  [len/10, dep/10, wid/10] :  [1.0, 1.0, 1.0]

    }

    /// end ////

    /// box animation (Open Closed state) here

    const boxStateValue = useSelector((state)=>{
        return state.stateChanged
    });

    useFrame(() => {
      if(boxStateValue){
        actions[names[1]].fadeOut(0.5);
        actions[names[0]].setLoop(THREE.LoopOnce);
        actions[names[0]].reset().fadeIn(0.5).play();
        actions[names[0]].clampWhenFinished = true;
      } else{
        actions[names[1]].setLoop(THREE.LoopOnce);
        actions[names[1]].reset().fadeIn(0.5).play();
        actions[names[1]].clampWhenFinished = true;
      }
    });

    //// end ////

    // side images setting here
    const [frontSideTextureState, setFrontSideTextureState] = useState({
      map : '/kraftTexture.jpg'
    })
    const frontSideTexture = useTexture(frontSideTextureState);

    const [leftSideTextureState, setLeftSideTextureState] = useState({
      map : '/kraftTexture.jpg'
    })
    const leftSideTexture = useTexture(leftSideTextureState);

    const [rightSideTextureState, setRightSideTextureState] = useState({
      map : '/kraftTexture.jpg'
    })
    const rightSideTexture = useTexture(rightSideTextureState);

    const [backSideTextureState, setBackSideTextureState] = useState({
      map : '/kraftTexture.jpg'
    })
    const backSideTexture = useTexture(backSideTextureState);

    const [bottomSideTextureState, setBottomSideTextureState] = useState({
      map : '/kraftTexture.jpg'
    })
    const bottomSideTexture = useTexture(bottomSideTextureState);

    useEffect(()=>{
      if(sideImages.front){
        setFrontSideTextureState({map: `/uploads/${sideImages.front}`});
      }else{
        setFrontSideTextureState(materialPicker())
      }

      if(sideImages.left){
        setLeftSideTextureState({map: `/uploads/${sideImages.left}`});
      }else{
        setLeftSideTextureState(materialPicker())
      }

      if(sideImages.right){
        setRightSideTextureState({map: `/uploads/${sideImages.right}`});
      }else{
        setRightSideTextureState(materialPicker())
      }

      if(sideImages.back){
        setBackSideTextureState({map: `/uploads/${sideImages.back}`});
      }else{
        setBackSideTextureState(materialPicker())
      }

      if(sideImages.bottom){
        setBottomSideTextureState({map: `/uploads/${sideImages.bottom}`});
      }else{
        setBottomSideTextureState(materialPicker())
      }

    },[sideImages, materialName])

    const boxRef = useRef();
    const dispatch = useDispatch()

    useEffect(() => {
      const vec = boxRef.current.scale;
      dispatch(setBoxScaleValue([vec.x, vec.y, vec.z]))
    }, [dimenstionsValue])
    

    /////// end ///////

      const { nodes, materials, animations } = useGLTF('/ShippingBoxStated.glb')
      const { actions, names } = useAnimations(animations, group)

      useEffect(() => {
        const calculateBoundingBoxCenter = () => {
          const boundingBox = new THREE.Box3();
          group.current.traverse((obj) => {
            if (obj.geometry) {
              obj.geometry.computeBoundingBox();
              boundingBox.expandByObject(obj);
            }
          });
    
          const boundingBoxCenter = new THREE.Vector3();
          boundingBox.getCenter(boundingBoxCenter);
    
          document.dispatchEvent(new CustomEvent('boundingBoxCenter', { detail: boundingBoxCenter }));
        };
    
        calculateBoundingBoxCenter();
      }, []);

      return (
        <group ref={group} {...props} dispose={null} >
          <group name="Scene">
            <group name="Armature" ref={boxRef} position={[-0.011, -1, -0.02]} scale={boxDimensionMaker()}>

              <primitive object={nodes.Body} />

                <skinnedMesh name="backSide" geometry={nodes.backSide.geometry} skeleton={nodes.backSide.skeleton}>
                        <meshStandardMaterial {...materials.Material} {...boxMaterial}  />
                        <skinnedMesh name="backSideCover" geometry={nodes.backSideCover.geometry} skeleton={nodes.backSideCover.skeleton} >
                            <meshStandardMaterial {...backSideTexture} map-flipY={false} />
                        </skinnedMesh>
                </skinnedMesh>

                <skinnedMesh name="bottomSide" geometry={nodes.bottomSide.geometry} skeleton={nodes.bottomSide.skeleton}>
                        <meshStandardMaterial {...materials.Material} {...boxMaterial}  />
                        <skinnedMesh name="bottomSideCover" geometry={nodes.bottomSideCover.geometry}  skeleton={nodes.bottomSideCover.skeleton} >
                            <meshStandardMaterial {...bottomSideTexture} map-flipY={false} />
                        </skinnedMesh>
                </skinnedMesh>
                    
              <skinnedMesh name="Flapes" geometry={nodes.Flapes.geometry} skeleton={nodes.Flapes.skeleton} >
                    <meshStandardMaterial {...materials.Material} {...boxMaterial}  />
              </skinnedMesh>
              
              <skinnedMesh name="frontFace" geometry={nodes.frontFace.geometry} skeleton={nodes.frontFace.skeleton}>
                    <meshStandardMaterial {...materials.Material} {...boxMaterial}  />
                    <skinnedMesh name="frontCover" geometry={nodes.frontCover.geometry} skeleton={nodes.frontCover.skeleton}  >
                        <meshStandardMaterial {...frontSideTexture}  map-flipY={false} />
                    </skinnedMesh>
              </skinnedMesh>

              <skinnedMesh name="frontFlap" geometry={nodes.frontFlap.geometry} skeleton={nodes.frontFlap.skeleton}>
                    <meshStandardMaterial {...materials.Material} {...boxMaterial}  />
              </skinnedMesh>

              <skinnedMesh name="leftSide" geometry={nodes.leftSide.geometry} skeleton={nodes.leftSide.skeleton}>
                    <meshStandardMaterial {...materials.Material} {...boxMaterial}  />
                    <skinnedMesh name="leftSideCover" geometry={nodes.leftSideCover.geometry} skeleton={nodes.leftSideCover.skeleton} >
                      <meshStandardMaterial {...leftSideTexture}  map-flipY={false} />
                    </skinnedMesh>
              </skinnedMesh>

              <skinnedMesh name="rightSide" geometry={nodes.rightSide.geometry} skeleton={nodes.rightSide.skeleton}>
                    <meshStandardMaterial {...materials.Material} {...boxMaterial}  />
                    <skinnedMesh name="rightSideCover" geometry={nodes.rightSideCover.geometry} skeleton={nodes.rightSideCover.skeleton} >
                      <meshStandardMaterial {...rightSideTexture}  map-flipY={false} />
                    </skinnedMesh>
              </skinnedMesh>

            </group>
          </group>
        </group>
      )
    }

export default BoxModel
