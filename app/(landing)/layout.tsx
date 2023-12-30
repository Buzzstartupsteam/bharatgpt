import { LandingNavbar } from "./components/landing-navbar";
import LandingFooter from "./footer/page";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <main className="h-full overflow-auto bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 bg-cover">
      <div className="mx-auto h-full w-full">
        <LandingNavbar />
        <main className="flex-grow">{children}</main>
        <LandingFooter />
      </div>
    </main>
  );
};

export default LandingLayout;
