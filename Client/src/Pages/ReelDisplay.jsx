import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ReelDetail from "../Component/Reel/ReelDetail";
import { getReelById, selectReelById } from "./ReelsPage/ReelsSlice";

const ReelDisplay = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const product = useSelector(selectReelById);
  console.log(product)
  useEffect(() => {
    dispatch(getReelById(id));
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <ReelDetail Product={product} />
    </>
  );
};
export default ReelDisplay;
