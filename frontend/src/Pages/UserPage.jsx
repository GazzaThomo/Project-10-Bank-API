import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import AccountItem from "../Components/AccountItem";
import accountData from "../utils/data/accountData";
import { fetchProfile } from "../features/auth/authSlice";

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userToken, userInfo } = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (!userToken) {
      navigate("/sign-in");
    } else {
      dispatch(fetchProfile());
    }
  }, [userToken, navigate, dispatch]);

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
    }
  }, [userInfo]);

  const handleUpdateProfile = () => {
    return null;
  };

  if (!userToken) {
    return null;
  }

  return (
    <>
      <Navbar isLoggedIn={true} username={userInfo?.firstName || "User"} />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back</h1>
        </div>
        <form onSubmit={handleUpdateProfile}>
          <div className="name-inputs">
            <div className="input-wrapper">
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="edit-button">
            Edit Name
          </button>
        </form>
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
