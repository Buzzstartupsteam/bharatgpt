import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { saveAs } from "file-saver";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const formatDate = (date: Date | string, format?: string) => {
  return moment(date).format(format || "h:mm A, MMM DD, yyyy");
};

export const fetcher = async (prompt: string, endPoint?: string) => {
  const { data } = await axios.post<string>(endPoint ?? "/api/lumina", {
    prompt,
  });

  return data;
};

export function generateOTP() {
  // Generate a random 6-digit number
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;

  // Ensure the generated number has exactly 6 digits
  return otp.toString().padStart(6, "0");
}

export async function convertImageToBase64(
  imageUrl: string,
  name?: string
): Promise<string> {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    if (response.status === 200) {
      const contentType = response.headers["content-type"];
      const base64Image = `data:${contentType};base64,${Buffer.from(
        response.data,
        "binary"
      ).toString("base64")}`;
      saveAs(base64Image, name || "generation");
      return base64Image;
    } else {
      throw new Error(`Failed to fetch image. Status code: ${response.status}`);
    }
  } catch (error: any) {
    toast.error(error.message);
    throw new Error(`Error converting image to base64: ${error.message}`);
  }
}
