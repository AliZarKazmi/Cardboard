import { Link } from "react-router-dom";

function RollCard({ card ,to}) {
  return (
    <>
      <div className="col-lg-3 col-container">
        <div className="card">
          <span className="bage">
            {card.Quantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
          <div className="card-body">
            <img
              className="img-fluid"
              src="/img/roll_product_1.png"
              alt="roll picture"
            />
          </div>
          <div className="hover-contant">
            <p>
              {card.description.length < 500
                ? card.description
                : card.description.slice(0, 450) + "..."}
            </p>
            <Link to={to}>
              <button className="btn-brnad w-100 py-3">VIEW PRODUCT</button>
            </Link>
          </div>
        </div>
        <h5>{card.Type}</h5>
      </div>
    </>
  );
}
export default RollCard;
