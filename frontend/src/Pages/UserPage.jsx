import Navbar from "../Components/Navbar";
import AccountItem from "../Components/AccountItem";
import accountData from "../utils/data/accountData";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UserPage = () => {
  const navigate = useNavigate();
  const { userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userToken) {
      navigate("/sign-in");
    }
  }, [userToken, navigate]);

  if (!userToken) {
    return null;
  }

  return (
    <>
      <Navbar isLoggedIn={true} username="Tony" />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            Tony Jarvis!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        {accountData.map((account, index) => (
          <AccountItem
            key={index}
            title={account.title}
            amount={account.amount}
            description={account.description}
          />
        ))}
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default UserPage;
