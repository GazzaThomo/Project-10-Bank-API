import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import InputField from "../Components/InputField";
import { userLogin } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userToken } = useSelector((state) => state.auth);
  // console.log(userInfo);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userToken) {
      navigate("/user");
    }
  }, [navigate, userToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };

  return (
    <>
      <Navbar isLoggedIn={false} />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {/* <Link to="/user" className="sign-in-button">
              Sign In
            </Link> */}
            <button type="submit" className="sign-in-button" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SignInPage;
