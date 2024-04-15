import Navbar from "../components/Navbar/Navbar";
import PresaleSection from "../components/PresaleSection/PresaleSection";
import FooterSection from "../components/FooterSection/FooterSection";

const HomePage = () => {
    return (
        <section className="flex flex-col justify-between h-[100vh]">
            <Navbar />
            <PresaleSection />
            <FooterSection />
        </section>
    );
};

export default HomePage;
