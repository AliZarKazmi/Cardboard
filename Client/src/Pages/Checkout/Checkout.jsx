import { useEffect } from "react";
import Checkout from "../../Component/Checkout/Checkout";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectLogin } from "../LogInPage/LoginSlice";
function CheckoutPage() {
  const navigate = useNavigate();
  const login = useSelector(selectLogin);
  useEffect(() => {
    if (!login) {
      navigate("/Login");
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Checkout />
    </>
  );
}
export default CheckoutPage;
