import { FiX } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  incrementItemQuantity,
  decrementItemQuantity,
  removeItem,
  setTotalPrice,
} from "../../Pages/ShoppingCart/CartSlice";
import BoxThreeD from "./BoxThreeD";
import New3DSpace from "./New3DSpace";

const DetailTable = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <>
      <tr >
        <td>
          <a
            onClick={() => {
              dispatch(removeItem(data.id));
              dispatch(setTotalPrice());
            }}
          >
            <FiX />
          </a>
          <a className="like">
            <AiFillHeart />
          </a>
        </td>
        <td>
          <div className="img-wraper">
            {
              data?.ThreeD ? 
                (<New3DSpace data={data} />) :
                (<img className="img-fluid" src={data?.img} />)
            }
          </div>
        </td>
        <td>
          <h6>{data?.name}</h6>
          <p>{data?.color}</p>
        </td>
        <td>
          <div className="quantity">
            <button
              style={{
                border: "none",
                background: "#f7744f",
                borderRadius: 10,
                color: "#fff",
              }}
              className="quantity__minus"
              onClick={() => {
                dispatch(decrementItemQuantity(data?.id));
                dispatch(setTotalPrice());
              }}
            >
              <span>-</span>
            </button>

            <div className="quantity__input">{data?.quantity}</div>

            <button
              style={{
                border: "none",
                background: "#f7744f",
                borderRadius: 10,
                color: "#fff",
              }}
              className="quantity__plus"
              onClick={() => {
                dispatch(incrementItemQuantity(data.id));
                dispatch(setTotalPrice());
              }}
            >
              <span>+</span>
            </button>
          </div>
        </td>
        <td>Rs {data?.price}</td>
      </tr>
    </>
  );
};
export default DetailTable;
