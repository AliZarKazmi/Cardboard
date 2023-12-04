import headerImg from "/img/header_image.png";
import brands from "/img/trusted_by 1.svg";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="home-banner">
      <div className="outer-wraper">
        <div className="inner-wraper">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1>Rolls, reels and custom packaging & boxes</h1>
                <p>
                  Businesses can create a distinctive brand experience by using
                  rolls, reels, boxes and custom packaging that offer full
                  personalization, rapid quoting, and quick turnarounds.
                </p>
                <Link to="/CardboardManipulation">
                  <Button
                    variant="dark"
                    style={{
                      backgroundColor: " #F7744F",
                      borderRadius: "30px",
                      color: "white",
                      borderColor: "orange",
                    }}
                  >
                    CUSTOMIZE NOW
                  </Button>
                </Link>
                <Link to="/RequestQute">
                  <Button
                    variant="light"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "30px",
                      color: " #F7744F",
                      borderColor: " #F7744F",
                      marginLeft: "10px",
                    }}
                  >
                    GET A QUOTE
                  </Button>
                </Link>
                <div className="row">
                  <div className="col-lg-4 mt-4">
                    <h6>
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ color: " #F7744F" }}
                      />{" "}
                      <span>FSC</span> Certified
                    </h6>
                  </div>
                  <div className="col-lg-4 mt-4">
                    <h6>
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ color: " #F7744F" }}
                      />{" "}
                      <span>Verified</span> Suppliers
                    </h6>
                  </div>
                  <div className="col-lg-4 mt-4">
                    <h6>
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ color: " #F7744F" }}
                      />{" "}
                      Delivered in <span>4 Days</span>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <img className="img-fluid" src={headerImg} alt="Header Image" />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="trusted-brand">
            <img className="img-fluid" src={brands} alt="Trusted Brand" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
