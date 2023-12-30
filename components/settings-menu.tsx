"use client";
import React, { FC } from "react";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApiLimit, Plan, Subscription } from "@prisma/client";
import moment from "moment";
import { SubscriptionButton } from "./subscription-button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Label } from "./ui/label";

interface SettingsMenuProps {
  isPro: boolean;
  apiLimitCount: number;
  planName: "FREE" | Plan;
  limit: ApiLimit | null | undefined;
  subscription: Subscription | null | undefined;
  isCancelled: boolean;
}

const SettingsMenu: FC<SettingsMenuProps> = ({
  apiLimitCount,
  isPro,
  limit,
  planName,
  subscription,
  isCancelled,
}) => {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-4 space-y-2 rounded-2xl">
        <div>
          <h3 className="text-lg font-semibold leading-tight">
            Subscription Plan
          </h3>
          <p className="text-xs text-muted-foreground">
            You are currenty on{" "}
            <span className="font-semibold">
              {planName.split("_").join(" ")}
            </span>{" "}
            plan.
          </p>
        </div>
        <div className="text-sm font-medium flex gap-1">
          <p className="text-gray-700 dark:text-gray-300">Generations : </p>
          {/* for free plan */}
          {planName == "FREE" &&
            `${limit ? limit.count : 0} / ${limit?.totalCount ?? 10}`}
          {/* for kick of kit */}
          {planName == "KICK_OFF_KIT" &&
            `${limit ? limit.count : 0} / ${limit?.totalCount}`}
          {/* for prime tier */}
          {planName == "PRIME_TIER_KIT" &&
            `${limit ? limit.count : 0} / ${limit?.totalCount}`}
          {/* for top notch kit */}
          {planName == "TOP_NOTCH_KIT" && "Unlimited"}
          {/* for bharat chat */}
          {planName == "APP_CHAT" &&
            `${limit ? limit.count : 0} / ${limit?.totalCount}`}
        </div>

        <div>
          <p className="text-gray-700 dark:text-gray-300">
            Image Generations :{" "}
            <span className="text-white">{limit?.imageGenerations ?? 0}</span>
          </p>
        </div>

        <p>
          {" "}
          {isPro && (
            <p className="text-xs">
              {isCancelled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
              <span className="font-semibold">
                {isPro &&
                  moment(subscription?.stripeCurrentPeriodEnd as Date).format(
                    "MMM DD, yyyy"
                  )}
              </span>
            </p>
          )}
        </p>
        <SubscriptionButton isPro={isPro} />
        <DropdownMenuSeparator />
        <div className="flex items-center gap-2">
          <Label className="font-bold" htmlFor="switch">
            Toggle Theme :{" "}
          </Label>
          <Switch
            id="switch"
            checked={theme == "dark"}
            onCheckedChange={(checked) =>
              setTheme(checked == false ? "light" : "dark")
            }
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMenu;
