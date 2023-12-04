import { useState, useEffect } from 'react';
import {ImSortNumbericDesc} from 'react-icons/im';

import { useDispatch } from 'react-redux'
import { setQuantity } from '../../Store/slices/quantitySlice';

const Quantity = () => {

    const dispatch = useDispatch();

    const [inpVal, setInpVal] = useState(1);
    
    useEffect(() => {
      dispatch(setQuantity(inpVal))
    }, [inpVal]);
    

  return (
        <>
        <div className="mt-2 d-flex flex-column">
            <div className=" d-flex justify-content-around align-items-center py-3 px-1 text-white fw-bold rounded-top-2" style={{ background: '#15807a' }}>
                <span><ImSortNumbericDesc /></span>
                <span>Select Quantity</span>
            </div>
            <div className="d-flex justify-content-around align-content-center flex-column gap-2 p-2 bg-white">
                <label htmlFor="quantity" className=" fs-6">Enter box quantity</label>
                <input type="number" step='500' placeholder="Enter quantity here..." id='quantity' className=" p-1 fs-6 fw-semibold" onChange={(e) =>setInpVal(e.target.value) } />
            </div>
        </div>
        </>
  )
}

export default Quantity