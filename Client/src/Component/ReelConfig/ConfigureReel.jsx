import { useDispatch, useSelector } from "react-redux";
import {
  getReelWeights,
  selectReelConfig,
  setReel,
  setReelPrice,
  setReelSize,
  setWeight,
  setReelQuantity,
  resetReelConfig,
} from "../../Pages/ReelsPage/ReelsSlice";
import { useEffect } from "react";
import {
  addReelToCart,
  setTotalPrice,
} from "../../Pages/ShoppingCart/CartSlice";

const ConfigureReel = ({ products }) => {
  const dispatch = useDispatch();
  const config = useSelector(selectReelConfig);
  const handleClick = () => {
    if (config.totalPrice) {
      const item = {
        id: config.item._id,
        name: config.item.Type,
        img: "/img/reels_product_1.png",
        size: config.size,
        weight: config.selectedWeight,
        quantity: config.quantity,
        pricePerPiece: config.pricePerPiece,
        price: config.totalPrice,
      };
      dispatch(addReelToCart(item));
      dispatch(resetReelConfig());
      dispatch(setTotalPrice());
    } else {
      alert("Please select all the Required field.");
    }
  };
  useEffect(() => {
    if (config.item.Type && config.size) {
      dispatch(getReelWeights({ type: config.item.Type, size: config.size }));
    }
    
  }, [config.item, config.size]);
  useEffect(() => {
    if (config.selectedWeight.weight_type && config.quantity) {
      const pricePerPiece =
        config.selectedWeight.weight_type * config.selectedWeight.Rate;
      const price = config.quantity * pricePerPiece;
      
      dispatch(setReelPrice({ pricePerPiece, price }));
    }
    if (config.quantity == 0) {
      dispatch(setReelPrice({ pricePerPiece: 0, price: 0 }));
    }
  }, [config.selectedWeight,config.quantity ]);

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
                    <h6>Type</h6>
                  </div>
                  <div className="col-lg-8">
                    <div className="form-group">
                      <select
                        className="form-select"
                        value={config.item ? config.item.Type : config.item}
                        onChange={({ target }) =>
                          dispatch(
                            setReel(
                              products.find((p) => p.Type === target.value)
                            )
                          )
                        }
                      >
                        <option value="" hidden>
                          Select A Option
                        </option>
                        {products.map((product, index) => {
                          return (
                            <option key={index} value={product.Type}>
                              {product.Type}
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
                <h6>Size:</h6>
              </div>
              <div className="col-lg-8">
                <div className="form-group">
                  <select
                    className="form-select"
                    value={config.size}
                    onChange={({ target }) => {
                      dispatch(setReelSize(target.value));
                    }}
                  >
                    <option value="" hidden>
                      Select A Option
                    </option>
                    {config.item?.Sizes?.map((item) => {
                      return (
                        <>
                          <option key={item.size} value={item.Size}>
                            {item.Size}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-lg-4">
                <h6>Weight:</h6>
              </div>
              <div className="col-lg-8">
                <div className="form-group">
                  <select
                    className="form-select"
                    value={
                      config.selectedWeight
                        ? config.selectedWeight._id
                        : config.selectedWeight
                    }
                    onChange={({ target }) =>
                      dispatch(
                        setWeight(
                          config.weights.find((p) => p._id === target.value)
                        )
                      )
                    }
                  >
                    <option value="" hidden>
                      Select A Option
                    </option>
                    {config.weights?.map((weight) => {
                      return (
                        <>
                          <option key={weight._id} value={weight._id}>
                            {weight.weight_type}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-lg-4">
                <h6>Quantity:</h6>
              </div>
              <div className="col-lg-8">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    value={config.quantity}
                    onChange={({ target }) => {
                      dispatch(setReelQuantity(target.value));
                    }}
                  />
                </div>
              </div>

              <div className="col-4"></div>
              <div className="col-12 col-lg-8">
                <div className=" final-price">
                  <h5>
                    Rs {config.pricePerPiece} each
                    <span>Subtotal: Rs {config.totalPrice}</span>
                  </h5>
                </div>
              </div>
            </div>
            <div className="row justify-content-center design-option">
              <button className="btn-brnad w-50" onClick={handleClick}>
                Add to Cart
              </button>
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
    </>
  );
};
export default ConfigureReel;
