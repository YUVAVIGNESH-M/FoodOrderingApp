import React, { useState, useEffect} from "react";
import { useLocation, useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import "./Auth.css";
const Auth = () => {
  const [isSignUp, setisSignUp] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [passwrodStyle, setPasswordStyle] = useState({});
  const [wrongPassword, setWrongPassword] = useState(false);
  const location = useLocation();
  const navigate=useNavigate()
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");
    if (type === "login") setisSignUp(false);
  }, []);

  const handleChange = (e) => {
    if (
      e.target.name === "confirmpassword" &&
      e.target.value !== userDetails.password
    )
      setPasswordStyle({ borderColor: "red" });
    else setPasswordStyle({});

    setUserDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (userDetails.password !== userDetails.confirmpassword) {
        setWrongPassword(true);
        return;
      } else setWrongPassword(false);
      const newuser = await axios.post(
        "http://localhost:5000/api/auth/signup",
        userDetails
      );
      navigate('/auth?type=login')
    } else {
      const loginUser = await axios.post(
        "http://localhost:5000/api/auth/login",
        userDetails
      );
      if (loginUser)
        sessionStorage.setItem("authuser", JSON.stringify(loginUser.data));
      navigate('/home')
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            type="password"
            style={passwrodStyle}
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          {isSignUp && (
            <input
              type="password"
              style={passwrodStyle}
              name="confirmpassword"
              placeholder="confirmpassword"
              onChange={handleChange}
            />
          )}
          {isSignUp && (
            <input
              type="text"
              name="phoneno"
              placeholder="phne number"
              onChange={handleChange}
            />
          )}
          {isSignUp && (
            <input
              type="text"
              name="place"
              placeholder="place"
              onChange={handleChange}
            />
          )}
          <button type="submit">{isSignUp ? "SignUp" : "Login"}</button>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setisSignUp((prev) => !prev)}
          >
            {isSignUp
              ? "already have an account,Login"
              : "don't have an account, signUp"}
          </span>
          {wrongPassword && (
            <span style={{ color: "red" }}>*wrong pasword</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
