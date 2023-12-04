import { Fragment, useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Transformer, Text } from "react-konva";
import Konva from "konva";

import { useDispatch, useSelector } from 'react-redux';
import { setSelectText } from "../../Store/slices/selectText"; 
import { setCanvasImage } from "../../Store/slices/canvasImage";
import { setDeletCanvasObj } from "../../Store/slices/deleteCanvasObj";
import { setApplyDesign } from "../../Store/slices/applyDesign";
import { setImageState } from "../../Store/slices/imageState";
import { selectDesign } from "../../Store/slices/designSelection";
import { setSelectedObjType } from "../../Store/slices/objectType";



const ObjectLayer = ({ objProps, isSelected, onSelect, onChange }) => {
  const objRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([objRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    onChange({ ...objProps, text: newText });
  };

  return (
    <Fragment>
      {objProps.type === "image" ? (
        <Image
          image={objProps.image}
          onClick={onSelect}
          onTap={onSelect}
          ref={objRef}
          {...objProps}
          draggable
          onDragEnd={(e) => {
            onChange({
              ...objProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={() => {
            const node = objRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...objProps,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }}
        />
      ) : (
        <Text
          text={objProps.text}
          onClick={onSelect}
          onTap={onSelect}
          ref={objRef}
          {...objProps}
          draggable
          onDragEnd={(e) => {
            onChange({
              ...objProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={() => {
            const node = objRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...objProps,
              x: node.x(),
              y: node.y(),
              fontSize: Math.max(5, node.fontSize() * scaleX),
            });
          }}
          onDblClick={(e) => {
            // Enable text editing when double-clicked
            const textNode = e.target;
            textNode.hide();
            trRef.current.nodes([]);
            trRef.current.getLayer().batchDraw();
            const stage = textNode.getStage();
            const textPosition = textNode.getAbsolutePosition();
            const areaPosition = {
              x: textPosition.x - textNode.width() / 2,
              y: textPosition.y - textNode.height() / 2,
            };
            const textarea = document.createElement("textarea");
            textarea.value = textNode.text();
            textarea.style.position = "absolute";
            textarea.style.top = areaPosition.y + "px";
            textarea.style.left = areaPosition.x + "px";
            textarea.style.width = textNode.width() + "px";
            textarea.style.height = textNode.height() + "px";
            textarea.style.fontSize = textNode.fontSize() + "px";
            textarea.style.border = "none";
            textarea.style.padding = "0px";
            textarea.style.margin = "0px";
            textarea.style.overflow = "hidden";
            textarea.style.background = "none";
            textarea.style.outline = "none";
            textarea.style.resize = "none";
            textarea.style.lineHeight = textNode.lineHeight();
            textarea.style.fontFamily = textNode.fontFamily();
            textarea.style.transformOrigin = "left top";
            textarea.style.textAlign = textNode.align();
            textarea.style.color = textNode.fill();
            stage.container().appendChild(textarea);
            textarea.focus();

            const handleBlur = () => {
              textarea.remove();
              textNode.show();
              onChange({
                ...objProps,
                text: textarea.value,
              });
              stage.draw();
            };

            textarea.addEventListener("blur", handleBlur);

            const handleEnterKey = (e) => {
              if (e.key === "Enter") {
                textarea.blur();
              }
            };

            textarea.addEventListener("keydown", handleEnterKey);
          }}
        />
      )}
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (objProps.type === "image") {
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
            } else {
              if (newBox.width < 5) {
                return oldBox;
              }
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
};

const DesignCanvas = () => {
  const divRef = useRef(null);
  const stageRef = useRef(null);

  const dispatch = useDispatch();

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [exportStageVisible, setExportStageVisible] = useState(false);

  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, [divRef]);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectObject(null);
    }
  };

  const [selectedId, selectObject] = useState(null);
  const [objects, setObjects] = useState([]);

  const selectedText = useSelector((state) => {
    return state.selectedText
  });

  const type = useSelector((state) => {
    return state.selectedObjType
  });

  const selectedImage = useSelector((state) => {
    return state.selectedCanvasImage
});

  const addObject = (type) => {
    if (type === "image" && selectedImage) {
      const newObject = {
        type: "image",
        image: new window.Image(),
        imgHref: selectedImage,
        x: 10,
        y: 10,
        width: 100,
        height: 100,
      };
      newObject.image.src = selectedImage;
      newObject.image.onload = () => {
        setObjects((prevObjects) => [...prevObjects, newObject]);
        dispatch(setCanvasImage(null));
        dispatch(setSelectedObjType(""));
      };
    } else if (type === "text" && selectedText) {
      const newObject = {
        type: "text",
        text: selectedText,
        x: 10,
        y: 10,
        fontSize: 20,
        fontFamily: "Arial",
        fill: "black",
      };
      setObjects((prevObjects) => [...prevObjects, newObject]);
      dispatch(setSelectText(""));
      dispatch(setSelectedObjType(""));
    }
  };

  useEffect(()=>{
    addObject(type);
  },[type])

  function rgbaToHex(rgbaColor) {
    // Parse the RGBA color string
    const rgbaValues = rgbaColor.match(/[\d.]+/g);
    if (!rgbaValues || rgbaValues.length !== 4) {
      return ''; // Invalid input
    }
  
    // Extract RGBA values
    const [r, g, b, a] = rgbaValues.map(parseFloat);
  
    // Convert RGBA to HEX
    const rHex = Math.round(r).toString(16).padStart(2, '0');
    const gHex = Math.round(g).toString(16).padStart(2, '0');
    const bHex = Math.round(b).toString(16).padStart(2, '0');
  
    // Combine into a HEX color code (ignore alpha for now)
    const hexColor = `#${rHex}${gHex}${bHex}`;
  
    return hexColor;
  }
  
 
  const applyDesign = useSelector((state) => {
    return state.appliedDesign
  })

  const handleExportCanvas = () => {
    if (stageRef.current) {
      const stage = stageRef.current;
  
      // Create a new HTML container element for the export stage
      const exportContainer = document.createElement("div");
      document.body.appendChild(exportContainer);
  
      const exportStage = new Konva.Stage({
        container: exportContainer, // Use the exportContainer as the container for the export stage
        width: stage.width(),
        height: stage.height(),
      });
  
      const exportLayer = new Konva.Layer();
  
      // Create a background rectangle with the desired background color
      const backgroundColor = selectedColor; // Use the selected canvas color
      const backgroundRect = new Konva.Rect({
        width: stage.width(),
        height: stage.height(),
        fill: backgroundColor,
      });
  
      exportLayer.add(backgroundRect);
  
      // Load images and add them to the export layer
      const loadImagePromises = objects.map((obj) => {
        if (obj.type === "image") {
          return new Promise((resolve) => {
            const imageObj = new window.Image();
            imageObj.src = obj.imgHref;
            imageObj.onload = () => {
              const clone = new Konva.Image({
                image: imageObj,
                x: obj.x,
                y: obj.y,
                width: obj.width,
                height: obj.height,
              });
              exportLayer.add(clone);
              resolve();
            };
          });
        } else if (obj.type === "text") {
          // Handle text objects
          const textObj = new Konva.Text({
            text: obj.text,
            x: obj.x,
            y: obj.y,
            fontSize: obj.fontSize,
            fontFamily: obj.fontFamily,
            fill: obj.fill,
          });
          exportLayer.add(textObj);
        }
        return Promise.resolve(); // For non-image objects
      });
  
      Promise.all(loadImagePromises)
        .then(() => {
          exportStage.add(exportLayer);

          exportStage.toDataURL({
            mimeType: "image/png",
            callback: (dataURL) => {
              document.body.removeChild(exportContainer);
              // Convert dataURL to a Blob object
              const byteString = atob(dataURL.split(",")[1]);
              const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
              const arrayBuffer = new ArrayBuffer(byteString.length);
              const uint8Array = new Uint8Array(arrayBuffer);
  
              for (let i = 0; i < byteString.length; i++) {
                uint8Array[i] = byteString.charCodeAt(i);
              }
  
              const blob = new Blob([arrayBuffer], { type: mimeString });
              // Create an object with the data to send to the server
              const dataToSend = new FormData();
              dataToSend.append("imageData", blob, "image.png"); 
  
              // Make a POST request to your server
              fetch("http://127.0.0.1:3001/upload", {
                method: "POST",
                body: dataToSend,
              })
                .then(async (res) => { 
                  const response = await res.json();
                  // Handle the response from the server
                  dispatch(setImageState(response));
                  dispatch(setApplyDesign(false));
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            },
          });
        })
        .catch((error) => {
          console.error("Error loading images:", error);
        });
    } else {
      console.error("Stage is not defined!");
    }
  };
  
  
  useEffect(()=>{
    if (applyDesign === true) {
      handleExportCanvas(); 
    }
  },[applyDesign])

  // delete objects functionalities

  const deleteCanvasObj = useSelector((state) => {
    return state.deletedCanvasObj
  });

  const handleDeleteObject = () => {
    if (selectedId !== null) {
      const updatedObjects = objects.filter((obj, index) => index !== selectedId);
      setObjects(updatedObjects);
      selectObject(null); // Deselect the item after deletion
    }
  };

  useEffect(()=>{
    handleDeleteObject();
    dispatch(setDeletCanvasObj(false));
  },[deleteCanvasObj])

  // delete object functionalities ends here  ////

  const selectedColor = useSelector((state)=>{
    return state.sideColorChanged
  });

  useEffect(()=>{
    dispatch(selectDesign(true));
  },[])

  return (
    <>
      <div id="main-container" ref={divRef} style={{ width: "100%", height: "60%" }}>
        {/* Use the selected canvas color */}
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          ref={stageRef}
          style={{ background: selectedColor }}
        >
        <Layer>
            {objects.map((obj, index) => {
            return (
                <ObjectLayer
                key={index}
                objProps={obj}
                isSelected={index === selectedId}
                onSelect={() => {
                    selectObject(index);
                }}
                onChange={(newAttrs) => {
                  // Create a new array with the modified object
                  const newObjects = [...objects];
                  newObjects[index] = newAttrs;
                  // Update the objects state
                  setObjects(newObjects);
                }}

                />
            );
            })}
        </Layer>
        </Stage>
      </div>
      
    </>
  );
};

export default DesignCanvas;
