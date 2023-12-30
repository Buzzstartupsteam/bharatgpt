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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DeleteHistoryDialogProps {
  id: string;
  onSuccessEndpoint: string;
}

const DeleteHistoryDialog: FC<DeleteHistoryDialogProps> = ({
  id,
  onSuccessEndpoint,
}) => {
  const router = useRouter();

  const { mutate: deleteHistory, isLoading } = useMutation({
    mutationKey: ["delete history", id],
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/history/${id}`);
      return data;
    },
    onSuccess() {
      router.refresh();
      router.push(onSuccessEndpoint);
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
            This action cannot be undone. This will permanently delete your this
            history.
          </DialogDescription>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"}>Cancel</Button>
            </DialogClose>

            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={() => deleteHistory()}
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

export default DeleteHistoryDialog;
