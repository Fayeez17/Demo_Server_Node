import Footer from "../components/Footer";
import "./Home.css";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>
            Global relocation.
            <br />
            Expertly handled.
          </h1>

          <p>
            Get tailor-made guidance from legal experts and partners across the
            globe for stress-free immigration.
          </p>

          <button>Talk To An Expert →</button>
        </div>
      </section>

      <section className="content-section">
        <h2>Expertise you can trust. A network you can lean on.</h2>

        <div className="stats-card">
          <div>
            <h3>15 +</h3>
            <p>Years of Expertise</p>
          </div>

          <div>
            <h3>50 +</h3>
            <p>Countries</p>
          </div>

          <div>
            <h3>100 +</h3>
            <p>Legal and Tax Partners</p>
          </div>

          <div>
            <h3>200 +</h3>
            <p>Real Estate Partners</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;