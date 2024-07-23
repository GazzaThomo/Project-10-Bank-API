import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import AccountItem from "../Components/AccountItem";
import accountData from "../utils/data/accountData";
import { fetchProfile } from "../features/profile/profileSlice";
import { handleUpdateProfile } from "../utils/profileUtils";
import Footer from "../Components/Footer";

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userToken } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

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
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [profile]);

  //the logic of this is in a utils file for cleaner code an seperate api call
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await handleUpdateProfile(firstName, lastName, userToken, dispatch);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setIsEditing(false);
  };

  if (!userToken) {
    return null;
  }

  return (
    <>
      <Navbar isLoggedIn={true} username={profile?.firstName || "User"} />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {profile?.firstName} {profile?.lastName}!
          </h1>
          {isEditing ? (
            <form onSubmit={handleSaveProfile}>
              <div className="input-fields">
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
              </div>
              <div className="button-fields">
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
              </div>
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
      <Footer />
    </>
  );
};

export default UserPage;
