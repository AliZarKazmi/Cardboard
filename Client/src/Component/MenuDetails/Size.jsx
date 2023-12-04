import { useEffect, useState } from 'react';
import { BiSolidHelpCircle } from 'react-icons/bi';
import { useDispatch } from 'react-redux'
import { setSize } from '../../Store/slices/sizeSlice';


const Size = ({ products, boxType }) => {

    const dispatch = useDispatch();

    const dimensionsBoiler = {
        length: 0,
        width: 0,
        depth: 0,
    }

    const [customLength, setCustomLength] = useState(0);
    const [customWidth, setCustomWidth] = useState(0);
    const [customDepth, setCustomDepth] = useState(0);


    const [dimensions, setDimensions] = useState({});

    function dimensionsSetter(l, w, d) {
        dimensions.length = l;
        dimensions.width = w;
        dimensions.depth = d;

        setDimensions(dimensionsBoiler);
        dispatch(setSize(dimensions));
    }

    function customSizeSetter() {
        dimensionsSetter(customLength, customWidth, customDepth);
        setCustomLength(0)
        setCustomWidth(0)
        setCustomDepth(0)
    }




    return (
        <>
            <div className="d-flex">
                <div className="card mt-2" style={{ 'width': '18rem' }}>
                    <div className="card-header d-flex flex-row justify-content-between align-items-center" style={{ background: '#15807a' }}>
                        <h6 className=' fw-semibold text-white'>Select stock size</h6>
                        <BiSolidHelpCircle className=' fs-5 text-white' />
                    </div>
                    <ul className="sizeCardList list-group list-group-flush overflow-auto">
                        {products.map((p,index) => {
                            if (p.cardboardname === boxType) {
                                return (
                                    <li key={index} className="list-group-item" onClick={() => dimensionsSetter(p.length, p.width, p.depth)}>
                                        {`${p.length}" x ${p.width}" x ${p.depth}"`}
                                    </li>
                                )
                            }
                            return null; // Return null for non-matching items to avoid rendering them
                        })}
                    </ul>

                </div>
            </div>

            <div className="d-flex">
                <div className="card mt-2" style={{ 'width': '18rem' }}>
                    <div className="card-header d-flex flex-row justify-content-between align-items-center" style={{ background: '#15807a' }}>
                        <h6 className=' fw-semibold text-white'>Create custom size</h6>
                    </div>

                    <div className="d-flex align-items-center flex-column pt-3 ">

                        <div className=' d-flex justify-content-around align-items-center flex-row gap-4 pb-2'>
                            <div className=' pt-2 w-50 ps-2'>
                                <label htmlFor="width" className=' fs-6 fw-semibold text-secondary'>Length</label>
                            </div>
                            <div className=' pt-2 w-50 pe-2'>
                                <input type="number" name="width" id="width" className=' w-100 fs-6 fw-semibold p-1 rounded' value={customLength} onChange={(e) => setCustomLength(e.target.value)} />
                            </div>
                        </div>

                        <div className=' d-flex justify-content-around align-items-center flex-row gap-4 pb-2'>
                            <div className=' pt-2 w-50 ps-2'>
                                <label htmlFor="length" className=' fs-6 fw-semibold text-secondary'>Width</label>
                            </div>
                            <div className=' pt-2 w-50 pe-2'>
                                <input type="number" name="length" id="length" className=' w-100 fs-6 fw-semibold p-1 rounded' value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} />
                            </div>
                        </div>

                        <div className=' d-flex justify-content-around align-items-center flex-row gap-4 pb-2'>
                            <div className=' pt-2 w-50 ps-2'>
                                <label htmlFor="depth" className=' fs-6 fw-semibold text-secondary'>Depth</label>
                            </div>
                            <div className=' pt-2 w-50 pe-2'>
                                <input type="number" name="depth" id="depth" className=' w-100 fs-6 fw-semibold p-1 rounded' value={customDepth} onChange={(e) => setCustomDepth(e.target.value)} />
                            </div>
                        </div>

                        <div className=' w-100 d-flex justify-content-center align-items-center mt-2 mb-2'>
                            <button type="button" className="btn btn-outline-secondary w-75 fw-semibold rounded " onClick={() => customSizeSetter()}>Update size</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className=' notePara'>
                <p className=' text-secondary'>All sizes are listed as interior dimensions in inches.</p>
            </div>


        </>
    )
}

export default Size