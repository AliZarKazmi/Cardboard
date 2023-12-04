
import { HiOutlineColorSwatch } from 'react-icons/hi'
import { BiImageAdd, BiText } from 'react-icons/bi'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { imagesCollector } from '../../Store/slices/imagesContainerSlice';
import { setSideColor } from '../../Store/slices/sideColor';
import { setSelectText } from '../../Store/slices/selectText';

import DesignCanvas from '../2DCanvas/DesignCanvas';
import { setSelectedObjType } from '../../Store/slices/objectType';
import { setCanvasImage } from '../../Store/slices/canvasImage';
import { setDeletCanvasObj } from '../../Store/slices/deleteCanvasObj';
import { setApplyDesign } from '../../Store/slices/applyDesign';
import { setAlertData } from '../../Store/slices/alertSlice';



const Design = () => {

    const dispatch = useDispatch();

    const [selImage, setSelImage] = useState({
        front: '',
        left: '',
        right: '',
        back: '',
        bottom: ''
    });

    const selectedSide = useSelector((state) => {
        return state.sideChanged
    });

    const imageState = useSelector((state) => {
        return state.imageStated
    });

    const [color, setColor] = useState('#ffffff');

    const [imageCheck, setCheckImage] = useState(false);

    const imageSetter = (image) => {

        if (selectedSide === 'front') {
            setSelImage({ ...selImage, front: image });
            setCheckImage(true);
        }

        if (selectedSide === 'left') {
            setSelImage({ ...selImage, left: image });
            setCheckImage(true);
        }

        if (selectedSide === 'right') {
            setSelImage({ ...selImage, right: image });
            setCheckImage(true);
        }

        if (selectedSide === 'back') {
            setSelImage({ ...selImage, back: image });
            setCheckImage(true);
        }

        if (selectedSide === 'bottom') {
            setSelImage({ ...selImage, bottom: image });
            setCheckImage(true);
        }
    }

    useEffect(() => {
        imageSetter(imageState)
    }, [imageState])

    useEffect(() => {
        dispatch(imagesCollector(selImage));
    }, [selImage]);

    useEffect(() => {
        dispatch(setSideColor(color));
    }, [color]);

    const [options, setOptions] = useState('color');

    const selectedText = useSelector((state) => {
        return state.selectedText
    });

    const handleImg = () => {
        dispatch(setSelectedObjType('image'))
    }

    const handleText = () => {
        dispatch(setSelectedObjType('text'))
    }

    const handleDelete = () => {
        dispatch(setDeletCanvasObj('true'));
    }

    const handleApply = () => {
        selectedSide !== 'false' ? dispatch(setApplyDesign(true)) : dispatch(setAlertData({
            state: true,
            heading: 'Select Side',
            content: 'Please select a side from select side dropdown menu.'
        }));
    }

    // loadImage function to load image in state
    const loadImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                dispatch(setCanvasImage(event.target.result));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className=' mt-2 d-flex justify-content-center flex-column'>
                <ul className=' d-flex justify-content-around align-items-center gap-2 text-white fs-6 fw-bold py-3 px-0 mb-0 rounded-top' style={{ background: '#15807a' }}>
                    <li className=' d-flex justify-content-between align-items-baseline gap-1' role='button' onClick={() => setOptions('color')}>
                        <span className=' fs-5'><HiOutlineColorSwatch /></span>
                        <span>Side Color</span>
                    </li>
                    <li className=' d-flex justify-content-between align-items-baseline gap-1' role='button' onClick={() => setOptions('image')}>
                        <span className=' fs-5'><BiImageAdd /></span>
                        <span>Add Images</span>
                    </li>
                    <li className=' d-flex justify-content-between align-items-baseline gap-1' role='button' onClick={() => setOptions('text')}>
                        <span className=' fs-5'><BiText /></span>
                        <span>Add Text</span>
                    </li>
                </ul>

                {options === 'color' && <div className=' addImage d-flex justify-content-between align-items-center px-4 py-2 bg-white '>
                    <span className=' fs-6 fw-bold text-secondary'>Choose Color</span>
                    <span>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </span>
                </div>}
                {options === 'image' && <div className=' colorDiv d-flex justify-content-between flex-column px-4 py-2 gap-3 bg-white'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span className=' fs-6 fw-bold text-secondary'>Choose Image</span>
                        <span className=' w-75'>
                            <input
                                className="form-control"
                                type="file"
                                onChange={(e) => loadImage(e)}
                            /></span>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-secondary fw-bold"
                        id='imgBtn'
                        onClick={handleImg}
                    >Add to Canvas</button>
                </div>}
                {options === 'text' && <div className=' colorDiv d-flex justify-content-between flex-column px-4 py-2 gap-3 bg-white'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span className=' fs-6 fw-bold text-secondary'>Add Text</span>
                        <span className=' w-75'>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => dispatch(setSelectText(e.target.value))}
                            />
                        </span>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-secondary fw-bold"
                        value={selectedText}
                        id='txtBtn'
                        onClick={handleText}
                    >
                        Add to Canvas
                    </button>
                </div>}
            </div>
            <div className=' d-flex justify-content-end align-items-center flex-row gap-2 p-2 border-white border-3 border-start border-end border-bottom'>

                <button
                    type="button"
                    className="btn btn-outline-success fw-bold"
                    value={selectedText}
                    id='delBtn'
                    onClick={handleApply}
                >
                    Apply
                </button>

                <button
                    type="button"
                    className="btn btn-outline-danger fw-bold"
                    value={selectedText}
                    id='delBtn'
                    onClick={handleDelete}
                >
                    Delete
                </button>

            </div>

            <DesignCanvas />

        </>
    )
}

export default Design