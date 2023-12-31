import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { MAX_FREE_COUNTS } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProModal } from "@/hooks/use-pro-modal";
import { ApiLimit, Plan } from "@prisma/client";

export const FreeCounter = ({
  planName,
  apiLimitCount = 0,
  limit,
}: {
  planName: "FREE" | Plan;
  apiLimitCount: number;
  limit: ApiLimit | undefined | null;
}) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (planName == "TOP_NOTCH_KIT") {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="dark:bg-white/10 bg-black/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-black dark:text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {limit?.totalCount || MAX_FREE_COUNTS}{" "}
              {planName == "FREE" && "Free"} Generations
            </p>
            <Progress
              className="h-3"
              value={
                (apiLimitCount / (limit?.totalCount! || MAX_FREE_COUNTS)) * 100
              }
            />
          </div>
          {planName == "FREE" && (
            <Button
              onClick={proModal.onOpen}
              variant="premium"
              className="w-full"
            >
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
