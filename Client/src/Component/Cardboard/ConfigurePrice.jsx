import StandardSize from "./StandardSize";
import CustomeSize from "./CustomSize";
import {
  selectConfig,
  setMaterial,
  setPrintedSides,
  setProduct,
  setQuantity,
  setThickness,
} from "../../Pages/CardBoardPage/CardBoardSlice";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Pages/ShoppingCart/CartSlice";
const ConfigurePrice = ({ products }) => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);
  const [customSize, setCustomSize] = useState(false);
  const handleClick = () => {
    const pricePerSheet =
      (((config.dimension.length * config.dimension.width * 210) / 15500) *
        config.item.rate) /
      100;

    console.log(pricePerSheet);
    const price = (pricePerSheet * config.quantity * 1.05).toFixed(2);
    const item = {
      id: config.item._id,
      img: config.item.img,
      quantity: config.quantity,
      price,
      dimension: config.dimension,
      printedSides: config.printedSides,
      material: config.material,
      thickness: config.thickness,
    };
    dispatch(addToCart(item));
  };
  return (
    <>
      <div className="configure-price-card">
        <div className="card">
          <div className="card-header">
            <h5>Configure & Price</h5>
            <a href="#">
              <img src="img/sahre.svg" /> Share
            </a>
          </div>

          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-lg-4">
                <h6>Product</h6>
              </div>

              <div className="col-lg-8">
                <div className="form-group">
                  <select
                    className="form-select"
                    onChange={({ target }) =>
                      dispatch(
                        setProduct(products.find((p) => p._id === target.value))
                      )
                    }
                  >
                    <option value=" " hidden>
                      Select A Option
                    </option>
                    {products?.map((product, index) => {
                      return (
                        <option key={index} value={product._id}>
                          {product.cardboardname}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-lg-4">
                <h6>Material</h6>
              </div>

              <div className="col-lg-8">
                <div className="form-group">
                  <select
                    className="form-select"
                    onChange={(e) => dispatch(setMaterial(e.target.value))}
                    value={config.material}
                  >
                    <option value=" " hidden>
                      Select A Option
                    </option>

                    <option value="Dream Coat">Dream Coat</option>
                    <option value="White Coat">White Coat</option>
                    <option value="Kraft Coat">Kraft Coat</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-4">
                <h6>Thickness:</h6>
              </div>
              <div className="col-lg-8">
                <div className="form-group">
                  <select
                    className="form-select"
                    onChange={(e) => dispatch(setThickness(e.target.value))}
                    value={config.thickness}
                  >
                    <option value=" " hidden>
                      Select A Option
                    </option>

                    <option value="3">3 ply</option>
                    <option value="5">5 ply</option>
                    <option value="7">7 ply</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-4">
                <h6></h6>
              </div>

              <div className="col-lg-8">
                <ul className="nav nav-pills mb-3">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${customSize ? "" : "active"}`}
                      aria-selected={customSize ? "false" : "true"}
                      onClick={() => {
                        setCustomSize(false);
                      }}
                    >
                      STANDARD SIZES
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${customSize ? "active" : ""}`}
                      aria-selected={customSize ? "true" : "false"}
                      onClick={() => setCustomSize(true)}
                    >
                      CUSTOM SIZES
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {customSize ? <CustomeSize /> : <StandardSize item={config.item} />}
            <div className="row">
              <div className="col-lg-4">
                <h6>Printed Sides:</h6>
              </div>
              <div className="col-lg-8">
                <div className="form-group">
                  <select
                    className="form-select"
                    onChange={(e) => dispatch(setPrintedSides(e.target.value))}
                    value={config.printedSides}
                  >
                    <option value=" " hidden>
                      Select A Option
                    </option>

                    <option value="4">Outside (4 Sides)</option>
                    <option value="4">Inside (4 Sides)</option>
                    <option value="8">Outside/Inside Both (8 Sides)</option>
                    <option value="1">Top(1 Sides)</option>
                    <option value="1">Bottom (1 Sides)</option>
                    <option value="2">Top/Bottom Both (2 Sides)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <h6>Quantity:</h6>
              </div>
              <div className="col-lg-8">
                <div className="form-group">
                  <select
                    className="form-select"
                    onChange={(e) => dispatch(setQuantity(e.target.value))}
                    value={config.quantity}
                  >
                    <option value=" " hidden>
                      Select A Option
                    </option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="1500">1500</option>
                    <option value="2000">2000</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4"></div>

              <div className="col-12 col-lg-8">
                <div className=" final-price">
                  <h5>
                    $2.5 each <span>Subtotal: $610.40</span>
                  </h5>
                </div>
              </div>

              <div className="row design-option">
                <div className="col-lg-6">
                  <h6>
                    Already using our <a href="#">designing tool?</a>
                  </h6>
                  <button
                    className="btn-brnad w-100"
                    onClick={handleClick}
                    style={{ translate: "50%" }}
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="col-lg-6">
                  <h6>Ready to design your box online?</h6>
                </div>
              </div>
              <div className="form-footer">
                <p>
                  Can’t find what you’re looking for?{" "}
                  <a href="#">Get a Custom Quote</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ConfigurePrice;