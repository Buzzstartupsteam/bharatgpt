import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const ImageDialog = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          className="max-w-lg w-full cursor-pointer"
          height={2000}
          width={2000}
          src={imageUrl}
          alt="image"
        />
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <Image
          className="max-w-2xl w-full mt-6 rounded-xl"
          height={1000}
          width={1000}
          src={imageUrl}
          alt="image"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
