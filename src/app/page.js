import Artwall from "./components/Artwall";
import Buy from "./components/Buy";
import HeroSection from "./components/HeroSection";
import Invite from "./components/Invite";
import Navbar from "./components/Navbar";


export default function Home() {
  return <>
  <Navbar></Navbar>
  <HeroSection></HeroSection>
  <Invite></Invite>
  <Artwall></Artwall>
  <Buy></Buy>
  </>
}
