import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { selectLogin, setLogin } from "./LoginSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState({});
  const navigate = useNavigate();
  const login = useSelector(selectLogin);

  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    }).then(async (res) => {
      if (res.ok) {
        dispatch(setLogin(await res.json()));
        navigate("/");
      } else {
        res.json().then((res) => setErr(res));
      }
    });
  };
  useEffect(() => {
    if (login) {
      navigate(-1);
    }
  }, [login]);
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    <MDBContainer className="p-4 overflow-hidden">
      <MDBRow center>
        <MDBCol md="6" className="position-relative">
          <MDBCard className="my-5 bg-glass">
            <MDBCardBody className="p-5">
              <h4
                className="text-center display-3 fw-bold ls-tight "
                style={{ color: "#f7744f" }}
              >
                Login <br />
              </h4>
              <form onSubmit={handleClick}>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  value={formValue.email}
                  className="form-control"
                  id="email"
                  type="email"
                  name="email"
                  onChange={onChange}
                  required
                />
                {err.email ? (
                  <div className="invalid-feedback d-block">
                    {err.email.msg}
                  </div>
                ) : (
                  ""
                )}
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  value={formValue.password}
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  onChange={onChange}
                  required
                />
                {err.password ? (
                  <div className="invalid-feedback d-block">
                    {err.password.msg}
                  </div>
                ) : (
                  ""
                )}
                <input
                  type="submit"
                  className="btn btn-primary w-100 mt-4"
                  value="Login"
                  style={{ backgroundColor: "#f7744f" }}
                />
              </form>
              <Link
                to="/SignIn"
                className="text-center d-block text-decoration-none "
              >
                Don't Have A Account
              </Link>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginPage;
