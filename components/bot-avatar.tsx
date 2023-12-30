import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar className="">
      <AvatarImage className="h-10 w-10 object-contain" src="/logo.png" />
    </Avatar>
  );
};
