import { useDispatch, useSelector } from "react-redux";
import {
  resetRollConfig,
  selectRollConfig,
  setRoll,
  setRollPrice,
  setRollQuantity,
  setSize,
  setType,
} from "../../Pages/RollsPage/RollsSlice";
import { useEffect } from "react";
import {
  addRollToCart,
  setTotalPrice,
} from "../../Pages/ShoppingCart/CartSlice";

const ConfigureRoll = ({ products }) => {
  const dispatch = useDispatch();
  const config = useSelector(selectRollConfig);
  const handleClick = () => {
    if (config.totalPrice) {
      const item = {
        id: config.item._id,
        name: config.item.Type,
        img: "/img/roll_product_1.png",
        size: config.size,
        type: config.type,
        quantity: config.quantity,
        pricePerPiece: config.pricePerPiece,
        price: config.totalPrice,
      };
      dispatch(addRollToCart(item));
      dispatch(resetRollConfig());
      dispatch(setTotalPrice());
    } else {
      alert("Please select all the Required field.");
    }
  };
  useEffect(() => {
    if (config.quantity && config.size) {
      const pricePerPiece = config.size * config.item.Rate;
      const price = config.quantity * pricePerPiece;
      dispatch(setRollPrice({ pricePerPiece, price }));
    }
    if (config.quantity == 0) {
      dispatch(setRollPrice({ pricePerPiece: 0, price: 0 }));
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
                    <h6>Product:</h6>
                  </div>
                  <div className="col-lg-8">
                    <div className="form-group">
                      <select
                        className="form-select"
                        value={config.item ? config.item.Type : config.item}
                        onChange={({ target }) =>
                          dispatch(
                            setRoll(
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
                <h6>Type:</h6>
              </div>
              <div className="col-lg-8">
                <div className="form-group">
                  <div
                    className="form-check form-check-inline"
                    style={{ margin: "0 .5rem" }}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Type"
                      id="inlineRadio2"
                      onChange={() => dispatch(setType("Thin"))}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Thin
                    </label>
                    <div
                      className="form-check form-check-inline"
                      style={{ margin: "0 .5rem" }}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="Type"
                        id="inlineRadio1"
                        onChange={() => dispatch(setType("Thick"))}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        Thick
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <h6>Size:</h6>
              </div>
              <div className="col-lg-8">
                <div className="form-group">
                  <select
                    className="form-select"
                    value={config.size}
                    onChange={({ target }) => {
                      dispatch(setSize(target.value));
                    }}
                  >
                    <option value="" hidden>
                      Select A Option
                    </option>
                    {config.type === "Thick" ? (
                      <>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>
                        <option value="47">47</option>
                        <option value="48">48</option>
                        <option value="49">49</option>
                        <option value="50">50</option>
                        <option value="51">51</option>
                        <option value="52">52</option>
                      </>
                    ) : config.type === "Thin" ? (
                      <>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                      </>
                    ) : (
                      ""
                    )}
                  </select>
                </div>
              </div>
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
                    onChange={(e) => dispatch(setRollQuantity(e.target.value))}
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
                Can’t find what you’re looking htmlFor?{" "}
                <a href="#">Get a Custom Quote</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ConfigureRoll;
