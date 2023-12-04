import List from "./Dropdown";
import { Link } from "react-router-dom";
import { selectCartItems } from "../../Pages/ShoppingCart/CartSlice";
import { useDispatch, useSelector } from "react-redux";

import { selectLogin } from "../../Pages/LogInPage/LoginSlice";
import { setLogin } from "../../Pages/LogInPage/LoginSlice";
function Nav() {
  const login = useSelector(selectLogin);
  const cart = useSelector(selectCartItems);
  const dispatch = useDispatch();
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/img/logo.svg" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <List
                    header="Products"
                    items={[
                      { url: "/Cardboards", title: "CardBoard" },
                      { url: "/Reels", title: "Reels" },
                      { url: "/Rolls", title: "Rolls" },
                      { url: "/RequestQute", title: "Request-Qute" },
                    ]}
                  />
                </li>

                <li className="nav-item">
                  <a className="nav-link">Resources</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Quote
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <List
                    header="Company"
                    items={[
                      { url: "", title: "CardBoard" },
                      { url: "", title: "CardBoard" },
                    ]}
                  />
                </li>
              </ul>
              <div className="user-area">
                <div className="cart-btn">
                  <Link to="/ShippingCart">
                    <img src="/img/cart.svg" />
                    <span>{cart.length}</span>
                  </Link>
                </div>
                <div className="sign-in">
                  {login ? (
                    <List
                      header="Profile"
                      items={[{ url: "/Profile", title: "Profile" }]}
                    >
                      <a className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(setLogin(false));
                        }}
                      >
                        Logout
                      </a>
                    </List>
                  ) : (
                    <Link to="/SignIn">Sign In</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Nav;
