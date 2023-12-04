import { useDispatch, useSelector } from "react-redux";
import BoxInspirations from "../../Component/BoxInspirations/BoxInspirations";
import Card from "../../Component/Card/RollCard";
import { useEffect } from "react";
import { getReels, selectReels } from "./ReelsSlice";
import Banner from "../../Component/ReelConfig/Banner";
const images = [
  { src: "img/reels_usage_small_1.png" },
  { src: "img/reels_usage_small_2.png" },
  { src: "img/reels_usage_big_1.png" },
  { src: "img/reels_usage_big_2.png" },
  { src: "img/reels_usage_small_3.png" },
  { src: "img/reels_usage_small_4.png" },
];

function ReelsPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectReels);
  useEffect(() => {
    dispatch(getReels());
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Banner products={products} />
      <section className="products-type">
        <div className="container">
          <h1 className="heading">Types of Reels</h1>
          <div className="row">
            {products.map((card, index) => (
              <Card card={card} key={index} to={`/ReelDisplay/${card._id}`} />
            ))}
          </div>
        </div>
      </section>
      <BoxInspirations
        title="Reels Usage"
        disc="At the heart of our packaging solutions lies the versatile and
                dynamic roll. Our expertise in roll-based packaging allows us to
                provide practical solutions for all kinds of businesses. Whether
                you're looking to elevate your brand with custom retail
                packaging on rolls that showcase your logo, or need corrugated
                cardboard mailers on rolls to streamline your e-commerce
                operations, we're here to ignite your imagination and inspire
                your product."
        images={images}
      />
    </>
  );
}
export default ReelsPage;
