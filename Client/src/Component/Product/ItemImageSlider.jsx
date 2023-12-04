import "./App.css";
import { useState, useRef } from "react";
import ReactImageMagnify from "@ditus/react-image-magnify";

const ItemImageSlider = (Props) => {
  const images = [
    "/img/cardboard_product_1.png",
    "/img/cardboard_product_2.png",
    "/img/cardboard_product_3.png",
    "/img/cardboard_product_4.png",
    "/img/cardboard_product_5.png",
  ];
  const [img, setImg] = useState(images[0]);
  const hoverHandler = (image, i) => {
    setImg(image);
    refs.current[i].classList.add("active");
    for (var j = 0; j < images.length; j++) {
      if (i !== j) {
        refs.current[j].classList.remove("active");
      }
    }
  };
  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return (
    <>
      <div className="container">
        <div className="left">
          <div className="left_1">
            {images.map((image, i) => (
              <div
                className={i == 0 ? "img_wrap active" : "img_wrap"}
                key={i}
                onMouseOver={() => hoverHandler(image, i)}
                ref={addRefs}
              >
                <img src={image} alt="" />
              </div>
            ))}
          </div>
          <div className="left_2">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: img,
                },
                largeImage: {
                  src: img,
                  width: 1200,
                  height: 1800,
                },
                enlargedImageContainerDimensions: {
                  width: "150%",
                  height: "150%",
                },
              }}
            />
          </div>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
};
export default ItemImageSlider;
