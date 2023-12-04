import { useEffect } from "react";
import RollDetail from "../Component/Roll/RollDetail";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getRollById, selectRollById } from "./RollsPage/RollsSlice";

const RollDisplay = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const product = useSelector(selectRollById);

  useEffect(() => {
    dispatch(getRollById(id));
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <RollDetail Product={product} />
    </>
  );
};
export default RollDisplay;
