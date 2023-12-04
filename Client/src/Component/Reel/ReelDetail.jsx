import { useEffect } from "react";
import ItemImageSlider from "../Product/ItemImageSlider";
import { useDispatch } from "react-redux";
import { setReel } from "../../Pages/ReelsPage/ReelsSlice";
import ConfigureReel from "../ReelConfig/ConfigureReel";

const ReelDetail = ({ Product }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setReel(Product));
  }, [Product]);
  return (
    <>
      <section className="products-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product-slider">
                <ItemImageSlider img="/img/reels_product_1.png" />
                <p className="mt-4 description">{Product?.description}</p>
              </div>
            </div>

            <div className="col-lg-6">
              <h1 className="heading ">{Product?.type}</h1>
              <div className="inner-banner">
                <ConfigureReel products={null} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ReelDetail;
