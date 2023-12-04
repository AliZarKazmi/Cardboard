import Card from "../../Component/Card/RollCard";
import BoxInspirations from "../../Component/BoxInspirations/BoxInspirations";
import { useDispatch, useSelector } from "react-redux";
import { getRolls, selectRolls } from "./RollsSlice";
import { useEffect } from "react";
import Banner from "../../Component/RollConfig/Banner";
const images = [
  { src: "/img/roll-inspiration_small_1 (1).png" },
  { src: "/img/roll-inspiration_small_1 (2).png" },
  { src: "/img/roll-inspiration_big_1 (1).png" },
  { src: "/img/roll-inspiration_big_1 (2).png" },
  { src: "/img/roll-inspiration_small_1 (3).png" },
  { src: "/img/roll-inspiration_small_1 (4).png" },
];

function RollsPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectRolls);
  useEffect(() => {
    dispatch(getRolls());
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Banner products={products} />
      <section className="products-type">
        <div className="container">
          <h1 className="heading">Types of Rolls</h1>
          <div className="row">
            {products?.map((card, index) => (
              <Card card={card} key={index} to={`/RollDisplay/${card._id}`} />
            ))}
          </div>
        </div>
      </section>
      <BoxInspirations
        title="Roll Inspirations"
        disc="At the heart of our packaging solutions lies the versatile and dynamic roll. Our expertise in roll-based packaging allows us to provide practical solutions for all kinds of businesses. Whether you're looking to elevate your brand with custom retail packaging on rolls that showcase your logo, or need corrugated cardboard mailers on rolls to streamline your 
						e-commerce operations, we're here to ignite your imagination and inspire your product."
        images={images}
      />
    </>
  );
}
export default RollsPage;
