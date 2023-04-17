import { useContext } from "react";
import uploadContext from "../contextAPI/context";
import { Link } from "react-router-dom";
const Register = () => {
  const { reg_data, setReg_data, RegisterSubmit, confirm, setConfirm } =
    useContext(uploadContext);

  const RegisterData = () => {
    if (validateUser) {
      RegisterSubmit();
    }
  };
  let validateUser = (value) => {
    if (!value.email) {
      alert("email is require");
      return 0;
    } else if (!value.password) {
      alert("password is require");
      return 0;
    } else if (value.password.length < 6) {
      alert("length should be greater than 6");
      return 0;
    } else if (value.password !== confirm) {
      alert("password doesnt match");
      return 0;
    }
    return 1;
  };
  return (
    <div
      style={{
        width: "300px",
        height: "auto",
        boxShadow: "5px 5px 5px #cccc",
        margin: "100px auto",
        borderRadius: "20px",
        padding: "30px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <h3>Register</h3>
      <div className="email div">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Enter email Adderss"
          onChange={(e) => {
            setReg_data({ ...reg_data, email: e.target.value });
          }}
        />
      </div>
      <div className="password div">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setReg_data({ ...reg_data, password: e.target.value });
          }}
        />
      </div>
      <div className="password div">
        <label htmlFor="confirm">Confirm Password</label>
        <input
          type="password"
          onChange={(e) => {
            setConfirm(e.target.value);
          }}
        />
      </div>
      <button className="reg-btn" onClick={RegisterData}>
        Register
      </button>
      <Link to="/">
        <p style={{ color: "red" }}>login</p>
      </Link>
    </div>
  );
};
export default Register;
