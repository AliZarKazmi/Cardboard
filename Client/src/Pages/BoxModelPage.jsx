import Container3DBox from "../Component/Container3DBox";
import { useDispatch, useSelector } from "react-redux";
import {
  getMaterials,
  getProducts,
  selectMaterials,
  selectProducts,
} from "./CardBoardPage/CardBoardSlice";
import { useEffect, useRef } from "react";
import Errorbox from "../Component/ErrorBox/Errorbox";
import DangerAlert from "../Component/DangerAlert/DangerAlert";

const BoxModel = () => {
  const divRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    divRef.current?.scrollIntoView({behavior: 'smooth'});
    dispatch(getProducts());
    dispatch(getMaterials());
  }, []);

  const products = useSelector(selectProducts);
  const materials = useSelector(selectMaterials);

  return (
    <>
      <div className=" w-100 d-flex justify-content-center align-items-center position-relative">
        <DangerAlert />
      </div>
      <div ref={divRef} className=" py-1 d-flex flex-column container3dbox">
        <Container3DBox products={products} materials={materials} />
        <Errorbox />
      </div>
    </>
  );
};

export default BoxModel;
