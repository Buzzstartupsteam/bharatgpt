import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export const UserAvatar = () => {
  const { data: session } = useSession();

  const { image, name } = session?.user!;

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={image!} />
      <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};
