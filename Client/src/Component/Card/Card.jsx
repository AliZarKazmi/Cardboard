import { Link } from "react-router-dom";

function Card({ card }) {
  return (
    <>
      <div className="col-lg-3 col-container">
        <div className="card">
          <span className="bage">
            {card.quantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
          <div className="card-body">
            <img className="img-fluid" src={card.img} />
          </div>
          <div className="hover-contant">
            <p>
              {card.description.length < 500
                ? card.description
                : card.description.slice(0, 450) + "..."}
            </p>
            <Link to={`/ProductDisplay/${card._id}`}>
              <button className="btn-brnad w-100 py-3">VIEW PRODUCT</button>
            </Link>
          </div>
        </div>
        <h5>{card.cardboardname}</h5>
        <p>Min. {card.minOrder} pieces</p>
      </div>
    </>
  );
}
export default Card;
