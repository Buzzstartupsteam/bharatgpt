import { Loader2 } from "lucide-react";
import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin" />
      <p className="text-sm text-muted-foreground">Generating ...</p>
    </div>
  );
};
