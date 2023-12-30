"use client";

import axios from "axios";
import { useState } from "react";
import { Loader2, Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const SubscriptionButton = ({ isPro = false }: { isPro: boolean }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/stripe", {
        subscriptionPeriod: "month",
        price: 20,
        generations: 3000,
        planName: "Prime Tier",
        currency: "usd",
        planEnum: "FREE",
      });

      window.location.href = response.data.url;
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isPro ? "default" : "premium"}
      disabled={loading}
      onClick={() =>router.push("/pricing")}
    >
      {loading && <Loader2 size={20} className="animate-spin mr-2" />}
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
