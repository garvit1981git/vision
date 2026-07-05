import Artwall from "./components/Artwall";
import HeroSection from "./components/HeroSection";
import Invite from "./components/Invite";
import Navbar from "./components/Navbar";
import AboutArtists from "./components/AboutArtists";
import ImageDisplay from "./components/ImageDisplay";
import Footer from "./components/Footer";
import BuyTrain from "./components/BuyTrain";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <BuyTrain></BuyTrain>
      <Invite></Invite>
      <ImageDisplay></ImageDisplay>
      <Artwall></Artwall>
      <AboutArtists></AboutArtists>
      <Footer></Footer>
    </>
  );
}
