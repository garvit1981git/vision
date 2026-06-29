import Artwall from "./components/Artwall";
import HeroSection from "./components/HeroSection";
import Invite from "./components/Invite";
import Navbar from "./components/Navbar";
import AboutArtists from "./components/AboutArtists";
import HeroSection2 from "./components/HeroSection2";


export default function Home() {
  return <>
  <Navbar></Navbar>
  <HeroSection></HeroSection>
  {/* <HeroSection2></HeroSection2> */}
  <Invite></Invite>
  <Artwall></Artwall>
  <AboutArtists></AboutArtists>
  </>
}
