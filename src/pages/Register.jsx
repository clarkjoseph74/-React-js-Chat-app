import { useRef } from "react";
import { FcAddImage } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { registerWithFirebase } from "../stores/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const file = useRef(null);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!file.current.files[0]) {
      toast.error("Please choose a Image first!", { hideProgressBar: true });
    } else {
      const user = {
        email: email.current.value,
        password: password.current.value,
        name: name.current.value,
        file: file.current.files[0],
      };

      dispatch(registerWithFirebase({ user }));
    }
  };
  return (
    <div className="loginPage">
      <div className="container">
        <h1 className="logoText">Chat App</h1>
        <h2>Register</h2>
        <form className="formContainer" onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="inputField"
            ref={name}
          />
          <input
            type="email"
            placeholder="Email address"
            className="inputField"
            ref={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="inputField"
            ref={password}
          />
          <input type="file" id="getAvatar" ref={file} />
          <label htmlFor="getAvatar" className="getAvatar">
            <FcAddImage size={30} />
            Choose an Avatar
          </label>
          <button type="submit" className="btn">
            {state.loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account ?{" "}
          <NavLink to="/login" className="navLink">
            Login
          </NavLink>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
