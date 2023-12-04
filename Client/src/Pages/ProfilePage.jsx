import { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectLogin, setEmail } from "./LogInPage/LoginSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const login = useSelector(selectLogin);
  const email = useSelector(selectEmail);
  const [formValue, setFormValue] = useState({
    newEmail: email,
  });
  const dispatch = useDispatch();
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/email", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, newEmail: formValue.newEmail }),
    })
      .then(async (res) => {
        if (res.ok) {
          dispatch(setEmail(await res.json()));
          alert("Email Changed Successfully.");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!login) {
      navigate(-1);
    }
  }, [login]);
  return (
    <MDBContainer className="p-4 overflow-hidden">
      <MDBRow center>
        <MDBCard className="my-5 bg-glass">
          <MDBCardBody className="p-5">
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                alignItems: "last baseline",
                justifyContent: "space-evenly",
              }}
            >
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                value={formValue.newEmail}
                className="form-control w-50"
                id="email"
                type="email"
                name="newEmail"
                onChange={onChange}
                required
              />

              <input
                type="submit"
                className="btn btn-primary w-25 mt-4"
                value="Change Email"
                style={{
                  backgroundColor: "#f7744f",
                }}
              />
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
};

export default ProfilePage;
