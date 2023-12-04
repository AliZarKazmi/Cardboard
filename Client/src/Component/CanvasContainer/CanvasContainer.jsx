import React, { useEffect } from "react"
import { useDispatch } from 'react-redux'

import { changeState } from "../../Store/slices/boxStateSlice"
import { changeSide } from "../../Store/slices/sideSelectorSlice"
import CameraAdjustment from "./CameraAdjustment"


const CanvasContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        document.querySelector('#flexSwitchCheckDefault').click();
    }, [])
    

  return ( 
    <>
        <div className=" d-flex justify-content-center align-items-center flex-column ">

            <div className=" mt-2">
                <ul className=" d-flex justify-content-center align-items-center flex-row gap-2">
                    <li className=" fs-6 fw-semibold text-secondary p-2 bg-white rounded">Select side:</li>

                    <select className="sideSelection form-select fw-semibold p-2"
                        aria-label="Default select example"
                        style={{width: 6+"rem" }}
                        onChange={(e)=>dispatch(changeSide(e.target.value))}
                    >
                        <option value={false}>Select</option>
                        <option value="front">Front</option>
                        <option value="left">Left</option>
                        <option value="back">Back</option>
                        <option value="right">Right</option>
                        <option value="bottom">Bottom</option>
                    </select>
                    
                </ul>
            </div>

            <div className=" w-100 mt-2" style={{height: 80+'vh'}}>
                <CameraAdjustment />
            </div>

            <div className=" d-flex justify-content-center align-items-center flex-row gap-4">
                <p className=" fs-6 fw-semibold mt-3 text-secondary">Closed</p>
                <div className="form-check form-switch">
                    <input className="form-check-input custom pt-3 pb-3 ps-5 pe-5 " type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={(e)=>dispatch(changeState(e.target.checked))} />
                </div>
                <p className=" fs-6 fw-semibold mt-3 text-secondary">Open</p>
            </div>

        </div>
    </>
  )
}

export default CanvasContainer