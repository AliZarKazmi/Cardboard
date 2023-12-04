import { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLogin } from "./LogInPage/LoginSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const login = useSelector(selectLogin);

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState({});

  const handleClick = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    }).then(async (res) => {
      if (res.ok) {
        alert("Account Created SuccessFully.");
        navigate("/Login");
      } else {
        res.json().then((res) => setErr(res));
      }
    });
  };

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (login) {
      navigate(-1);
    }
  }, []);
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
                Sign Up <br />
              </h4>
              <form onSubmit={handleClick}>
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  value={formValue.name}
                  className="form-control"
                  id="name"
                  type="name"
                  name="name"
                  onChange={onChange}
                  required
                />
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

                <div className={`invalid-feedback ${err.msg ? "d-block" : ""}`}>
                  Email Already Exists.Use Different Email
                </div>

                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  value={formValue.password}
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  minLength="8"
                  onChange={onChange}
                  required
                />
                <input
                  type="submit"
                  className="btn btn-primary w-100 mt-4"
                  value="Sign Up"
                  style={{ backgroundColor: "#f7744f" }}
                />
              </form>
              <Link
                to="/Login"
                className="text-center d-block text-decoration-none "
              >
                Already Registered?
              </Link>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignIn;
