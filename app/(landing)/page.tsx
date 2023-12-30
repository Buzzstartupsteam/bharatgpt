import  LandingHero  from "@/app/(landing)/components/landing-hero";
import  LandingContent from "@/app/(landing)/components/landing-content";
import  LandingSectionFirst  from "./components/landing-section-first";
import LandingSectionSecond from "./components/landing-section-second";
import LandingSectionFour from "./components/landing-section-four";
import LandingSectionFive from "./components/landing-section-five";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingHero />
      <LandingSectionFirst />
      <LandingSectionSecond />
      <LandingContent />
      <LandingSectionFour />
      <LandingSectionFive />
    </div>
  );
};

export default LandingPage;
