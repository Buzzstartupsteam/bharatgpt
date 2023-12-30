import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import { planDetails, planFeatures } from "../constants";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Plan } from "@prisma/client";

interface PricingCardProps {
  name: string;
  isMonthly: boolean;
  price: (isMonthly: boolean) => number;
  country: string;
  generations: number;
  planEnum: Plan;
  className?: string;
}

const planImageGenerations: { [key: string]: number } = {
  KICK_OFF_KIT: 100,
  PRIME_TIER_KIT: 300,
  TOP_NOTCH_KIT: 500,
  APP_CHAT: 0,
};

const PricingCard: FC<PricingCardProps> = ({
  name,
  price,
  isMonthly,
  country,
  generations,
  planEnum,
  className,
}) => {
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stripe", {
        subscriptionPeriod: isMonthly ? "month" : "year",
        price: price(isMonthly),
        generations,
        imageGenerations: planImageGenerations[planEnum],
        planName: name,
        currency: planDetails[country].currency,
        planEnum,
      });

      window.location.href = response.data.url;
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={cn(
        "py-20 bg-gradient-to-tr from-sky-500/20 to-sky-500/5",
        className
      )}
    >
      <div className="space-y-4 p-6 text-center">
        <p className="text-sm uppercase tracking-[0.35em] font-orbitron">
          {name}
        </p>
        <p className="text-3xl font-bold font-orbitron">
          {planDetails[country].symbol}{" "}
          {isMonthly ? price(isMonthly) : Math.ceil(price(isMonthly) / 12)}
          <span className="text-base font-normal">/month</span>
        </p>
        <Badge variant="outline" className="px-3 py-1.5 border-black/10">
          {isMonthly ? (
            <p>
              <span className="text-primary">
                {planDetails[country].symbol} {isMonthly && price(isMonthly)}{" "}
              </span>
              billed monthly
            </p>
          ) : (
            <p>
              <span className="text-primary">
                {planDetails[country].symbol}
                {!isMonthly && price(isMonthly)}{" "}
              </span>
              billed yearly
            </p>
          )}
        </Badge>

        <ul className="flex flex-col gap-4 py-8 min-h-[8rem]">
          {planFeatures[planEnum].map((feature) => (
            <li className="ml-4" key={feature}>
              {feature}
            </li>
          ))}
        </ul>

        <Button
          className="rounded-none"
          onClick={() => onSubscribe()}
          disabled={loading}
          variant="outline"
          size="lg"
        >
          {loading && <Loader2 size={20} className="mr-2 animate-spin" />}
          Buy {name}
        </Button>
      </div>
    </section>
  );
};

export default PricingCard;
