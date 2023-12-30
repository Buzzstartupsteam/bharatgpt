import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useNanoId } from "@/hooks/use-id";

interface DeleteChatDialogProps {
  id: string;
}

const DeleteChatDialog: FC<DeleteChatDialogProps> = ({ id }) => {
  const router = useRouter();
  const { id: conversationId } = useNanoId();

  const { mutate: deleteChat, isLoading } = useMutation({
    mutationKey: ["delete conversation"],
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/chats/${id}`);
      return data;
    },
    onSuccess(data, variables, context) {
      router.refresh();
      router.push(`/conversation/${conversationId}`);
    },
    onError(error: any) {
      toast.error(error.message);
    },
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Trash2 className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            conversation.
          </DialogDescription>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"}>Cancel</Button>
            </DialogClose>

            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={() => deleteChat()}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChatDialog;
