import Navbar from "../Components/Navbar";
import FeatureItem from "../Components/FeatureItem";
import featureData from "../utils/data/featureData";

const HomePage = () => {
  return (
    <>
      <Navbar isLoggedIn={false} />
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">
              Open a savings account with Argent Bank today!
            </p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          {featureData.map((feature, index) => (
            <FeatureItem
              key={index}
              imgSrc={feature.imgSrc}
              imgAlt={feature.imgAlt}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default HomePage;
