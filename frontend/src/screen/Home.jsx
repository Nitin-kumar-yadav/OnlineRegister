import Fleet from "../components/Fleet";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Imperatives from "../components/Imperatives";


const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-[100vh] flex-col">
      <Hero />
      <main >
        <Fleet />
        <Imperatives />
      </main>
      <Footer />
    </div>
  );
};

export default Home;