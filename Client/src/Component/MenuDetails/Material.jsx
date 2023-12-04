import React from "react"
import { useDispatch } from 'react-redux'
import { changeMaterial } from "../../Store/slices/materialSlice"


const Material = () => {
    
    const dispatch = useDispatch();

    const matChanger = (material) =>{
        dispatch(changeMaterial(material));
    }

  return (
    <>
        <div className="d-flex">
            <div className="card mt-2" style={{width: '32rem'}}>
                <div className="card-header d-flex flex-row justify-content-between align-items-center" style={{ background: '#15807a' }}>
                    <h6 className=" fw-semibold text-white">Select your material</h6>
                </div>
                <ul className="materialList p-0"> 
                    <li key={1} className=" ps-3 pt-2  border-bottom" onClick={()=>matChanger('White')}>
                        <div className=" d-flex justify-content-start align-items-center gap-3">
                            <img src="./Dreamcoat.jpg" alt="kraftImg" className=" w-25" />
                            <h4 className=" fs-5 fw-bold text-secondary ">White</h4>
                        </div>
                        <p className=" lh-sm mt-2 text-secondary">Classic white cardboard with a refined matte finish</p>
                    </li>
                    <li key={2} className=" ps-3 pt-2  border-bottom" onClick={()=>matChanger('Dreamcoat')}>
                        <div className=" d-flex justify-content-start align-items-center gap-3">
                            <img src="./Dreamcoat.jpg" alt="kraftImg" className=" w-25" />
                            <h4 className=" fs-5 fw-bold text-secondary ">Dreamcoat</h4>
                        </div>
                        <p className=" lh-sm mt-2 text-secondary">Classic dreamcoat cardboard with a refined matte finish</p>
                    </li>
                    <li key={3} className=" ps-3 pt-2  border-bottom" onClick={()=>matChanger('Kraft')}>
                        <div className=" d-flex justify-content-start align-items-center gap-3">
                            <img src="./Kraft.jpg" alt="kraftImg" className=" w-25" />
                            <h4 className=" fs-5 fw-bold text-secondary ">Kraft</h4>
                        </div>
                        <p className=" lh-sm mt-2 text-secondary">Classic kraft cardboard with a refined matte finish</p>
                    </li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Material