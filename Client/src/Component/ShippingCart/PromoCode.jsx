import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartPrice,
} from "../../Pages/ShoppingCart/CartSlice";

const PromoCode = () => {
  const totalPrice = useSelector(selectCartPrice);
  const Cart = useSelector(selectCartItems);
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="flex-info">
            <h6>Subtotal</h6>
            <h5>RS {totalPrice}</h5>
          </div>
          <div className="text-center">
            <Link to="/Checkout">
              <button
                className="btn-brnad mt-4 w-100 py-3"
                disabled={Cart.length > 0 ? true : false}
              >
                PROCEED TO CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoCode;
