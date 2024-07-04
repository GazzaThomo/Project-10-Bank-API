import Navbar from "../Components/Navbar";
import AccountItem from "../Components/AccountItem";
import accountData from "../utils/data/accountData";

const UserPage = () => {
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
