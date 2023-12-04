import { useEffect } from "react";
import ItemImageSlider from "../Product/ItemImageSlider";
import { setRoll } from "../../Pages/RollsPage/RollsSlice";
import ConfigureRoll from "../RollConfig/ConfigureRoll";
import { useDispatch } from "react-redux";

const RollDetail = ({ Product }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoll(Product));
  }, [Product]);
  return (
    <>
      <section className="products-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product-slider">
                <ItemImageSlider img="/img/roll_product_1.png" />
                <p className="mt-4 description">{Product?.description}</p>
              </div>
            </div>

            <div className="col-lg-6">
              <h1 className="heading ">{Product?.type}</h1>
              <div className="inner-banner">
                <ConfigureRoll products={null} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default RollDetail;
