import StandardSize from "./StandardSize";
import CustomeSize from "./CustomSize";
import {
  resetConfig,
  selectConfig,
  setMaterial,
  setPrice,
  setPrintedSides,
  setProduct,
  setQuantity,
  setThickness,
} from "../../Pages/CardBoardPage/CardBoardSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setTotalPrice } from "../../Pages/ShoppingCart/CartSlice";

const ConfigurePrice = ({ products, materials }) => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);
  const [customSize, setCustomSize] = useState(false);
  const handleClick = () => {
    if (config.totalPrice) {
      const item = {
        id: config.item._id,
        ThreeD: false,
        name: config.item.cardboardname,
        img: config.item.img,
        quantity: config.quantity,
        pricePerPiece: config.pricePerPiece,
        price: config.totalPrice,
        dimension: config.dimension,
        printedSides: config.printedSides,
        material: config.material.materailName,
        thickness: config.thickness,
      };
      dispatch(addToCart(item));
      dispatch(setTotalPrice());
      dispatch(resetConfig());
    } else {
      alert("Please Select All Required Fields");
    }
  };

  useEffect(() => {
    if (config.dimension.length && config.dimension.width && config.quantity) {
      const pricePerSheet =
        (((config.dimension.length * config.dimension.width * 210) / 15500) *
          config.material.paperRate) /
        100;
      const pricePerRoll =
        (config.dimension.width * config.material.rollRate) /
        (2400 / config.dimension.length);
      const pricePerPiece = Number.parseFloat(
        (pricePerSheet + pricePerRoll + 14 + 5 + 2).toFixed(0)
      );
      const price = pricePerPiece * config.quantity;
      dispatch(setPrice({ pricePerPiece, price }));
    }
    if (config.quantity == 0) {
      dispatch(setPrice({ pricePerPiece: 0, price: 0 }));
    }
  }, [config]);

  return (
    <>
        <div className="configure-price-card">
          <div className="card">
            <div className="card-header">
              <h5>Configure & Price</h5>
              <a href="#">
                <img src="/img/sahre.svg" /> Share
              </a>
            </div>

            <div className="card-body">
              <div className="row align-items-center">
                {products ? (
                  <>
                    <div className="col-lg-4">
                      <h6>Product</h6>
                    </div>
                    <div className="col-lg-8">
                      <div className="form-group">
                        <select
                          className="form-select"
                          value={
                            config.item
                              ? config.item.cardboardname
                              : config.item
                          }
                          onChange={({ target }) =>
                            dispatch(
                              setProduct(
                                products.find(
                                  (p) => p.cardboardname === target.value
                                )
                              )
                            )
                          }
                        >
                          <option value="" hidden>
                            Select A Option
                          </option>
                          {products?.map((product, index) => {
                            return (
                              <option key={index} value={product.cardboardname}>
                                {product.cardboardname}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="col-lg-4">
                  <h6>Material</h6>
                </div>

                <div className="col-lg-8">
                  <div className="form-group">
                    <select
                      className="form-select"
                      value={
                        config.material
                          ? config.material.materailName
                          : config.material
                      }
                      onChange={({ target }) =>
                        dispatch(
                          setMaterial(
                            materials.find(
                              (p) => p.materailName === target.value
                            )
                          )
                        )
                      }
                    >
                      <option value="" hidden>
                        Select A Option
                      </option>
                      {materials?.map((material, index) => {
                        return (
                          <option key={index} value={material.materailName}>
                            {material.materailName}
                          </option>
                        );
                      })}
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
                      <option value="" hidden>
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

              {customSize ? (
                <CustomeSize />
              ) : (
                <StandardSize item={config.item} />
              )}
              <div className="row">
                <div className="col-lg-4">
                  <h6>Printed Sides:</h6>
                </div>
                <div className="col-lg-8">
                  <div className="form-group">
                    <select
                      className="form-select"
                      onChange={(e) =>
                        dispatch(setPrintedSides(e.target.value))
                      }
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
                    <input
                      list="quantity"
                      name="quantity"
                      className="form-control"
                      placeholder="Enter Quantity"
                      onChange={(e) => dispatch(setQuantity(e.target.value))}
                      value={config.quantity}
                    />

                    <datalist id="quantity">
                      <option value="500"></option>
                      <option value="1000"></option>
                      <option value="1500"></option>
                      <option value="2000"></option>
                    </datalist>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4"></div>

                <div className="col-12 col-lg-8">
                  <div className=" final-price">
                    <h5>
                      Rs {config.pricePerPiece} each{" "}
                      <span>Subtotal: Rs {config.totalPrice}</span>
                    </h5>
                  </div>
                </div>

                <div className="row design-option">
                  <div className="col-lg-6">
                    <h6>
                      Already using our{" "}
                      <Link to="/CardboardManipulation">designing tool?</Link>
                    </h6>
                    {products ? (
                      <button
                        className="btn-brnad w-100"
                        onClick={handleClick}
                        style={{ translate: "50%" }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <>
                        <button className="btn-brnad w-100">
                          <Link to="/Cardboards" className="link">
                            PRODUCT PAGE
                          </Link>
                        </button>
                      </>
                    )}
                  </div>
                  <div className="col-lg-6">
                    <h6>Ready to design your box online?</h6>
                    {products ? (
                      ""
                    ) : (
                      <>
                        <button
                          className="btn-brnad w-100"
                          onClick={handleClick}
                        >
                          Add to Cart
                        </button>
                      </>
                    )}
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
