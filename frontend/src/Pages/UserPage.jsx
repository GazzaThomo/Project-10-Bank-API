import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import AccountItem from "../Components/AccountItem";
import accountData from "../utils/data/accountData";
import { fetchProfile, updateProfile } from "../features/auth/authSlice";
import axios from "axios";

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userToken, userInfo } = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (firstName && lastName) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.put(
          "http://localhost:3001/api/v1/user/profile",
          { firstName, lastName },
          config
        );
        dispatch(updateProfile({ firstName, lastName }));
        console.log(response);
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setFirstName(userInfo.firstName || "");
    setLastName(userInfo.lastName || "");
    setIsEditing(false);
  };

  if (!userToken) {
    return null;
  }

  return (
    <>
      <Navbar isLoggedIn={true} username={userInfo?.firstName || "User"} />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userInfo?.firstName} {userInfo?.lastName}!
          </h1>
          {isEditing ? (
            <form onSubmit={handleUpdateProfile}>
              <div className="input-wrapper">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
              </div>
              <button
                type="submit"
                className="edit-button"
                disabled={!firstName || !lastName}
              >
                Save
              </button>
              <button
                type="button"
                className="edit-button"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Name
              </button>
            </>
          )}
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
