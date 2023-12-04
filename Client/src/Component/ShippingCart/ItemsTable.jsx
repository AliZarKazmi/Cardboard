import DetailTable from "./DetailTable";
import { selectCartItems } from "../../Pages/ShoppingCart/CartSlice";
import { useSelector } from "react-redux";

const ItemsTable = () => {
  const Cart = useSelector(selectCartItems); 
  return (
    <>
      <h5>Items in Cart</h5>
      <p>
        All your items are viewable in the list. You can remove them or
        duplicate them
      </p>

      <div className="table-responsive" style={{ borderRadius: 10 }}>
        <table className="table">
          <tbody>
            {Cart.map((data, index) => (
              <DetailTable data={data} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsTable;
