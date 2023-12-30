import { MobileSidebar } from "@/components/mobile-sidebar";
import { getApiLimitCount, getLimit } from "@/lib/api-limit";
import {
  checkSubscription,
  getPlanName,
  getSubscription,
} from "@/lib/subscription";
import { ThemeMenu } from "./theme-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { Zap } from "lucide-react";
import Image from "next/image";
import UserMenu from "@/components/UserMenu";
import { FC } from "react";
import SettingsMenu from "@/components/settings-menu";
import { stripe } from "@/lib/stripe";

const Navbar = async () => {
  const [apiLimitCount, isPro, planName, limit, subscription] =
    await Promise.all([
      getApiLimitCount(),
      checkSubscription(),
      getPlanName(),
      getLimit(),
      getSubscription(),
    ]);

  let isCanceled = false;
  // if (subscription && subscription.stripeSubscriptionId) {
  //   const stripePlan = await stripe.subscriptions.retrieve(
  //     subscription.stripeSubscriptionId
  //   );
  //   isCanceled = stripePlan.cancel_at_period_end;
  // }

  return (
    <div className="flex items-center px-4 py-3.5 h-16 sticky top-0 backdrop-blur-sm z-10 bg-background/90">
      <div className="flex gap-2 items-center">
        <MobileSidebar
          limit={limit}
          apiLimitCount={apiLimitCount!}
          planName={planName}
        />
        <Link className="shrink-0 md:hidden" href="/dashboard">
          <Image
            className="h-10 w-auto"
            src="/logo.png"
            height={200}
            width={300}
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex w-full justify-end items-center gap-2 md:gap-4">
        {!isPro && (
          <Link href="/pricing">
            <Button variant="premium" id="upgrade-button">
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </Link>
        )}
        {/* <ThemeMenu /> */}
        <SettingsMenu
          apiLimitCount={apiLimitCount}
          isPro={isPro}
          limit={limit}
          planName={planName}
          subscription={subscription}
          isCancelled={isCanceled}
        />

        <UserMenu />
      </div>
    </div>
  );
};

export default Navbar;
