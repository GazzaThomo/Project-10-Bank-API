import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import InputField from "../Components/InputField";

const SignInPage = () => {
  return (
    <>
      <Navbar isLoggedIn={false} />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <InputField label="Username" type="text" id="username" />
            <InputField label="Password" type="password" id="password" />
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <Link to="/user" className="sign-in-button">
              Sign In
            </Link>
            {/* Should be a button, but kept as a link for now */}
            {/* <button className="sign-in-button">Sign In</button> */}
          </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default SignInPage;
