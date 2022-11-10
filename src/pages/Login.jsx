import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithFirebase } from "../stores/authSlice";
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      email: email.current.value,
      password: password.current.value,
    };
    dispatch(loginWithFirebase(user));
    if (state.user) {
      navigate("/");
    }
  };
  return (
    <div className="loginPage">
      <div className="container">
        <h1 className="logoText">Chat App</h1>
        <h2>Login</h2>
        <form className="formContainer">
          <input
            type="text"
            placeholder="email"
            className="inputField"
            ref={email}
          />

          <input
            type="password"
            placeholder="Password"
            className="inputField"
            ref={password}
          />
          <input type="file" id="getAvatar" />
          <button type="submit" className="btn" onClick={handleLogin}>
            Login
          </button>
        </form>
        <p>
          Don't have an account ?{" "}
          <NavLink to="/register" className="navLink">
            Register
          </NavLink>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
