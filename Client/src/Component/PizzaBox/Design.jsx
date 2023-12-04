import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import pizzaBoxKraftImage from '/pizzaBoxExtTex-kraft.png';
import pizzaBoxDreamcoatImage from '/pizzaBoxExtTex-dreamcoat.png';
import pizzaBoxWhiteImage from '/pizzaBoxExtTex-white.png';
import ObjectLayer from "./ObjectLayer";  // Import the ObjectLayer component

import { useDispatch, useSelector } from "react-redux";
import { changeCanvasImg } from "../../Store/slices/KonvaCanvasSlice";
import { setSelectedSide } from "../../Store/slices/SelectedSide";
import { setSelectedMaterial } from "../../Store/slices/selectedMaterial";
import { changeMaterial } from "../../Store/slices/materialSlice"

import { HiOutlineColorSwatch } from 'react-icons/hi'
import { BiImageAdd, BiText } from 'react-icons/bi'
import { MdOutlineStyle } from 'react-icons/md';


const Design = () => {
    const divRef = useRef(null);
    const stageRef = useRef(null);
    const layerRef = useRef(null);
    const imgInp = useRef(null);
    const [selectedId, selectObject] = useState(null);

    const dispatch = useDispatch();
    const [deleteCanvasObj, setDeleteCanvasObj] = useState(false);

    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });

    const [selectedSection, setSelectedSection] = useState(null);
    const [objects, setObjects] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedText, setSelectedText] = useState("");
    const [options, setOptions] = useState('material');
    const [color, setColor] = useState('#ffffff');

    useEffect(() => {
        if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
            setDimensions({
                width: divRef.current.offsetWidth,
                height: divRef.current.offsetHeight,
            });
        }
    }, [divRef]);

    const sidesName = ['frontTop', 'front', 'frontRight', 'frontLeft', 'frontBottom', 'bottom', 'bottomFront', 'bottomLeft', 'bottomRight'];

    const handleSectionClick = (sectionIndex) => {
        if (sectionIndex <= sectionDimensions.length) {
            dispatch(setSelectedSide(sidesName[sectionIndex]))
            setSelectedSection(sectionIndex);
        } else {
            setSelectedSection(null);
        }
    };

    const loadImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const addObjectToSection = (newType) => {
        // Check if a section is selected
        if (selectedSection !== null) {
            // Use the selected section to determine position and size
            const section = sectionDimensions[selectedSection];

            // Calculate random initial position within the section
            const x = section.startX;
            const y = section.startY;
            const width = section.endX - section.startX;
            const height = section.endY - section.startY;

            // Create a new object with section-specific properties
            const newObject = {
                type: newType,
                x,
                y,
                width,
                height,
                section: selectedSection,
            };

            if (newType === "image") {
                newObject.image = new window.Image();
                newObject.image.src = selectedImage;
                newObject.image.onload = () => {
                    setObjects((prevObjects) => [...prevObjects, newObject]);
                    setSelectedImage(null);
                    imgInp.current.value = '';
                };
            } else if (newType === "text") {
                newObject.text = selectedText;
                setObjects((prevObjects) => [...prevObjects, newObject]);
                setSelectedText("");
            } else if (newType === "rectangle") {
                newObject.color = color; // Use the color selected by the user
                setObjects((prevObjects) => [...prevObjects, newObject]);
            }
        }
    };




    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage() || e.target === stageRef.current;
        if (clickedOnEmpty) {
            selectObject(null);
        }
    };

    const checkDeselectLayer = () => {
        selectObject(null);
    };

    const [boxImage, setBoxImage] = useState(null);
    const material = useSelector((state) => {
        return state.selectedMaterial;
    });

    const loadMaterial = (src, setImage) => {
        const image = new window.Image();
        image.src = src;
        image.onload = () => {
            setImage(image);
        }
    };

    const materialSelector = () => {
        if (material === 'White') {
            loadMaterial(pizzaBoxWhiteImage, setBoxImage);
            setTimeout(() => {
                handleExportClick();
            }, 500);
        } else if (material === 'Dreamcoat') {
            loadMaterial(pizzaBoxDreamcoatImage, setBoxImage);
            setTimeout(() => {
                handleExportClick();
            }, 500);
        } else if (material === 'Kraft') {
            loadMaterial(pizzaBoxKraftImage, setBoxImage);
            setTimeout(() => {
                handleExportClick();
            }, 500);
        } else {
            loadMaterial(pizzaBoxKraftImage, setBoxImage);
            setTimeout(() => {
                handleExportClick();
            }, 500);
        }
    }

    useEffect(() => {
        materialSelector();
    }, [material]);

    const sectionDimensions = [
        //1
        { startX: 0, startY: 0, endX: dimensions.width, endY: dimensions.height / 14 },
        //2
        { startX: dimensions.width / 10, startY: dimensions.height / 14, endX: (dimensions.width) - (dimensions.width / 9), endY: (dimensions.height / 2) - (dimensions.height / 26) },
        //3
        { startX: (dimensions.width) - (dimensions.width / 9), startY: dimensions.height / 14, endX: dimensions.width, endY: (dimensions.height / 2) - (dimensions.height / 26) },
        //4
        { startX: 0, startY: dimensions.height / 14, endX: dimensions.width / 10, endY: ((dimensions.height) / 2) - ((dimensions.height) / 26) },
        //5
        { startX: dimensions.width / 10, startY: (dimensions.height / 2) - (dimensions.height / 30), endX: (dimensions.width) - (dimensions.width / 9), endY: (((dimensions.height)) - (6 + (dimensions.height) / 2) / 1.1) },
        //6
        { startX: dimensions.width / 10, startY: (((dimensions.height)) - (6 + (dimensions.height) / 2) / 1.1), endX: (dimensions.width) - (dimensions.width / 9), endY: (dimensions.height) - (dimensions.height) / 14 },
        //7
        { startX: dimensions.width / 10, startY: (dimensions.height) - (dimensions.height) / 15, endX: (dimensions.width) - (dimensions.width / 9), endY: (dimensions.height) },
        //8
        { startX: 0, startY: (((dimensions.height)) - (6 + (dimensions.height) / 2) / 1.1), endX: dimensions.width / 10, endY: (dimensions.height) - (dimensions.height) / 14 },
        //9
        { startX: (dimensions.width) - (dimensions.width / 9), startY: (((dimensions.height)) - (6 + (dimensions.height) / 2) / 1.1), endX: (dimensions.width), endY: (dimensions.height) - (dimensions.height) / 14 },
    ];

    const handleExportClick = () => {
        selectObject(null);
        handleSectionClick(sectionDimensions.length + 2);
        setTimeout(() => {
            const dataURL = stageRef.current.toDataURL();
            const imgName = `image-${Date.now()}.png`;

            fetch('http://localhost:3001/save-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dataURL, imgName }),
            })
                .then((response) => response.json())
                .then((data) => {
                    dispatch(changeCanvasImg(imgName));
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }, 300);
    };

    const handleDelete = () => {
        setDeleteCanvasObj(true);
    };

    const handleDeleteObject = () => {
        if (selectedId !== null) {
            const updatedObjects = objects.filter((obj, index) => index !== selectedId);
            setObjects(updatedObjects);
            selectObject(null);
        }
    };

    useEffect(() => {
        if (deleteCanvasObj) {
            handleDeleteObject();
            setDeleteCanvasObj(false);
        }
    }, [deleteCanvasObj]);

    const matChanger = (val) =>{
        dispatch(setSelectedMaterial(val));
        dispatch(changeMaterial(val));
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div style={{ width: "100%", height: "30vh", background: '#fff' }}>
                <div className=' mt-1 d-flex justify-content-center flex-column'>
                    <ul className=' d-flex justify-content-around align-items-center gap-1 text-white fw-semibold py-3 px-0 mb-0 rounded-top' style={{ background: '#15807a' }}>
                        <li
                            className=' d-flex justify-content-between align-items-baseline'
                            role='button'
                            style={{
                                textDecorationLine: options === 'material' ? 'underline' : 'none',
                                textDecorationThickness: '2px',
                                textUnderlineOffset: '2px'
                            }}
                            onClick={() => setOptions('material')}
                        >
                            <span className=' fs-5'><MdOutlineStyle /></span>
                            <span>Material</span>
                        </li>
                        <li
                            className=' d-flex justify-content-between align-items-baseline'
                            role='button'
                            style={{
                                textDecorationLine: options === 'color' ? 'underline' : 'none',
                                textDecorationThickness: '2px',
                                textUnderlineOffset: '2px'
                            }}
                            onClick={() => setOptions('color')}
                        >
                            <span className=' fs-5'><HiOutlineColorSwatch /></span>
                            <span>Side Color</span>
                        </li>
                        <li
                            className=' d-flex justify-content-between align-items-baseline'
                            role='button'
                            style={{
                                textDecorationLine: options === 'image' ? 'underline' : 'none',
                                textDecorationThickness: '2px',
                                textUnderlineOffset: '2px'
                            }}
                            onClick={() => setOptions('image')}
                        >
                            <span className=' fs-5'><BiImageAdd /></span>
                            <span>Add Images</span>
                        </li>
                        <li
                            className=' d-flex justify-content-between align-items-baseline'
                            role='button'
                            style={{
                                textDecorationLine: options === 'text' ? 'underline' : 'none',
                                textDecorationThickness: '2px',
                                textUnderlineOffset: '2px'
                            }}
                            onClick={() => setOptions('text')}>
                            <span className=' fs-5'><BiText /></span>
                            <span>Add Text</span>
                        </li>
                    </ul>

                    {options === 'material' && <div className=' addImage d-flex justify-content-between align-items-center px-4 py-1 bg-white '>
                        <span className=' fs-6 fw-bold text-secondary'>Choose Material</span>
                        <div className=" mt-2">
                            <select className="sideSelection form-select fw-semibold p-2"
                                aria-label="Default select example"
                                style={{ width: 8 + "rem" }}
                                onChange={(e) => matChanger(e.target.value)}
                            >
                                <option value=''>Select</option>
                                <option value="White">White</option>
                                <option value="Dreamcoat">Dreamcoat</option>
                                <option value="Kraft">Kraft</option>
                            </select>
                        </div>
                    </div>}
                    {options === 'color' && <div className=' addImage d-flex justify-content-between align-items-center px-4 py-1 bg-white '>
                        <span className=' fs-6 fw-bold text-secondary'>Choose Color</span>
                        <span className=" d-flex justify-content-between  align-items-center gap-3 ">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary fw-bold"
                                id='colorBtn'
                                onClick={() => addObjectToSection("rectangle")}
                            >Add</button>
                        </span>
                    </div>}
                    {options === 'image' && <div className=' colorDiv d-flex justify-content-between flex-column px-4 py-1 gap-1 bg-white'>
                        <div className='d-flex justify-content-between align-items-center'>
                            {/*<span className=' fs-6 fw-bold text-secondary'>Add Image</span>*/}
                            <span>
                                <input
                                    ref={imgInp}
                                    className="form-control"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => loadImage(e)}
                                /></span>
                            <span>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary fw-bold"
                                    id='imgBtn'
                                    onClick={() => addObjectToSection("image")}
                                >Add</button>
                            </span>
                        </div>
                    </div>}
                    {options === 'text' && <div className=' colorDiv d-flex justify-content-between flex-column px-4 py-1 gap-1 bg-white'>
                        <div className='d-flex justify-content-between align-items-center'>
                            {/* <span className=' fs-6 fw-bold text-secondary'>Add Text</span> */}
                            <span style={{ width: 80 + '%' }}>
                                <input
                                    type="text"
                                    className="form-control w-100 "
                                    value={selectedText}
                                    placeholder="Type here"
                                    onChange={(e) => setSelectedText(e.target.value)}
                                />
                            </span>
                            <span>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary fw-bold"
                                    value={selectedText}
                                    id='txtBtn'
                                    onClick={() => addObjectToSection("text")}
                                >
                                    Add
                                </button>
                            </span>
                        </div>
                    </div>}
                </div>
                {options === 'image' || options === 'text' || options === 'color' ? <div className=' d-flex justify-content-end align-items-center flex-row gap-2 border-white border-3 border-start border-end border-bottom'>
                    <button
                        type="button"
                        className="btn btn-outline-success fw-bold"
                        value={selectedText}
                        id='delBtn'
                        onClick={handleExportClick}
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
                </div> : <></>}
            </div>

            <div id="main-container" ref={divRef} style={{ width: "100%", height: "65vh" }}>
                <Stage
                    width={dimensions.width}
                    height={dimensions.height}
                    ref={stageRef}
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}
                >
                    <Layer ref={layerRef}>
                        <KonvaImage
                            onMouseDown={checkDeselectLayer}
                            onTouchStart={checkDeselectLayer}
                            image={boxImage}
                            width={stageRef.current ? stageRef.current.width() : 0}
                            height={stageRef.current ? stageRef.current.height() : 0}
                        />
                    </Layer>
                    <Layer ref={layerRef}>
                        {/* Render a background for each section */}
                        {sectionDimensions.map((section, index) => (
                            <KonvaImage
                                key={index}
                                x={section.startX}
                                y={section.startY}
                                width={section.endX - section.startX}
                                height={section.endY - section.startY}
                                stroke={selectedSection === index ? "1px solid #000" : null}
                                onClick={() => handleSectionClick(index)}
                                onMouseDown={checkDeselectLayer}
                                onTouchStart={checkDeselectLayer}
                            />
                        ))}
                    </Layer>
                    <Layer>
                        {/* Render objects */}
                        {objects.map((obj, index) => (
                            <ObjectLayer
                                key={index}
                                objProps={obj}
                                isSelected={index === selectedId}
                                onSelect={() => {
                                    selectObject(index);
                                }}
                                onChange={(newAttrs) => {
                                    const newObjects = [...objects];
                                    newObjects[index] = newAttrs;
                                    setObjects(newObjects);
                                }}
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

export default Design;