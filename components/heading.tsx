import { Icon } from "lucide-react";

import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
  icon: Icon;
  iconColor?: string;
  bgColor?: string;
  className?: string;
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
  className,
}: HeadingProps) => {
  return (
    <div className={cn("px-4 lg:px-8 flex items-center gap-x-3 mb-6", className)}>
      <div className={cn("p-2 w-fit rounded-md", bgColor)}>
        <Icon
          className={cn("h-6 w-6 md:h-8 md:w-8 lg:w-10 lg:h-10", iconColor)}
        />
      </div>
      <div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-orbitron">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
