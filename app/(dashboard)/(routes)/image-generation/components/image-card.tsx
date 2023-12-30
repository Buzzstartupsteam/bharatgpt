import React, { FC } from "react";
import ImageDialog from "./image-dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import axios from "axios";
import { saveAs } from "file-saver";
import { convertImageToBase64 } from "@/lib/utils";

interface ImageCardProps {
  image: string;
}

const ImageCard: FC<ImageCardProps> = ({ image }) => {
  const download = async () => {
    saveAs(image, "generation.png");
  };

  return (
    <div className="relative bg-white" key={image}>
      <ImageDialog imageUrl={image} />
      <Button
        className="absolute right-2 bottom-2 backdrop-blur text-white bg-black/40"
        onClick={async () => await convertImageToBase64(image)}
        size="icon"
        variant="ghost"
      >
        <Download size={20} />
      </Button>
    </div>
  );
};

export default ImageCard;
