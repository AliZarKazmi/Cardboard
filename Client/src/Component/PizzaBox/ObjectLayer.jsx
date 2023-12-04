// ObjectLayer.js
import React, { Fragment, useEffect, useRef } from "react";
import { Image, Rect, Text, Transformer } from "react-konva";

// ... (previous imports)

const ObjectLayer = ({ objProps, isSelected, onSelect, onChange }) => {
  const objRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([objRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const objectsRenderer = () => {
    if (objProps.type === "image") {
      return (
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
          onTransformEnd={(e) => {
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
      )
    }
    else if (objProps.type === "text") {
      return (
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
          onTransformEnd={(e) => {
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
      )
    } else {
      return (
        <Rect
          fill={objProps.color}
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
          onTransformEnd={(e) => {
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
      )
    }
  }

  return (
    <Fragment>
      {
        objectsRenderer()
      }

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

export default ObjectLayer;
