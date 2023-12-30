import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { checkSubscription, getPlanName } from "@/lib/subscription";
import { getApiLimitCount, getLimit } from "@/lib/api-limit";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  const planName = await getPlanName();
  const limit = await getLimit();

  return (
    <div className="min-h-screen relative bg-white dark:bg-gray-950">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar
          planName={planName}
          apiLimitCount={apiLimitCount}
          limit={limit}
        />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
