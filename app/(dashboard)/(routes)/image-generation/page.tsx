"use client";
import ComingSoon from "@/components/coming-soon";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { DotWave } from "@uiball/loaders";
import axios from "axios";
import { Download, ImageIcon, Info, Sparkle, Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { saveAs } from "file-saver";
import { useImage } from "@/hooks/use-image";
import ImageDialog from "./components/image-dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { useRouter } from "next/navigation";
import { imagePrompts } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageInfo from "@/components/dialogs/image-info";
import ImageCard from "./components/image-card";
import ImageGenerationTour from "@/components/tour/image-generation-tour";

const imageStyleWithDescriptions: { [key: string]: string } = {
  Abstract: `Vibrant, non-representational artwork that explores shapes, colors, and textures to evoke emotions and engage the viewer's imagination.`,
  "Anime Girl":
    "A captivating and vibrant depiction of an anime girl, showcasing the distinctive style and charm of this popular art form.",
  "Anime Man":
    "An anime man with vibrant hair and expressive eyes, showcasing the unique art style and charm of Japanese animation.",
  Architectural:
    "Aesthetic structures showcasing unique design elements, materials, and forms that blend artistry and functionality in the field of architecture.",
  Authentic:
    "A captivating image that exudes genuine emotions, real experiences, and true essence, capturing the raw beauty of life.",
  "Black and White":
    "Capturing the essence of timelessness, the image showcases a monochromatic world, evoking nostalgia and a sense of artistic elegance.",
  Cinematic:
    "A visually captivating image that evokes the atmosphere and storytelling of a cinematic experience.",
  "Digital Art":
    "A visually captivating form of artistic expression created using digital tools, blending imagination and technology seamlessly.",
  "3D Render":
    "A 3D render is a computer-generated image that mimics the appearance of a three-dimensional object or scene.",
  "Fictional Character":
    "A fictional character is an imaginary creation that exists within the realms of literature, film, or other forms of storytelling.",
  Hyperrealistic:
    "An art form that blurs the line between reality and illusion, capturing minute details with astonishing precision.",
  Impressionistic:
    "A vibrant and dreamy depiction of reality, capturing fleeting moments with bold brushstrokes and vibrant colors.",
  Landscape: `A breathtaking landscape showcasing nature's beauty, with rolling hills, lush forests, and a serene water body reflecting the sky.`,
  "Macro Photography":
    "Macro photography captures intricate details of small subjects, revealing a hidden world of textures, patterns, and beauty.",
  Minimalistic: `A simplistic and stripped-down design approach that focuses on essential elements, clean lines, and negative space.`,
  Mistical: `A captivating image that evokes a sense of enchantment, wonder, and hidden secrets waiting to be discovered.`,
  Mythological: `Enchanting and timeless, mythological images transport us to realms where gods, heroes, and mystical creatures intertwine in epic narratives.`,
  Novelistic:
    "A captivating image that evokes the imaginative and immersive world of a novel, inviting viewers to explore its narrative depths.",
  "Oil Painting":
    "An oil painting is a visual masterpiece created using pigments mixed with oils, known for its rich colors and textures.",
  Polaroid: `A vintage-style instant camera that produces unique, nostalgic prints with a signature white border.`,
  Portrait: `A portrait is a captured image that focuses on the face, conveying the subject's unique personality and emotions.`,
  "Studio Lighting": `A controlled and professional lighting setup used in photography studios to achieve desired lighting effects.`,
  "Street Photography": `Street photography captures the vibrant essence of urban life, showcasing candid moments and the beauty of everyday scenes.`,
  Surreal:
    "A captivating image type that blurs the line between reality and imagination, evoking a sense of dreamlike wonder.",
  "Van Gogh": `A vibrant, expressive masterpiece capturing emotion through bold brushstrokes and vivid colors, showcasing the artist's unique style.`,
  "Watercolor Paint": `Vibrant and translucent, watercolor paint creates beautiful and fluid artwork with its delicate and flowing pigments.`,
};

const formSchema = z.object({
  prompt: z.string().min(4),
  type: z.string(),
  numberOfGenerations: z.number(),
});

const PhotoPage = () => {
  const router = useRouter();
  const { image, setImage } = useImage();
  const { isOpen, onOpen } = useProModal();

  const [images, setImages] = useState<string[] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      numberOfGenerations: 1,
      type: "",
    },
  });

  const { mutate, isLoading, data } = useMutation({
    mutationKey: ["image"],
    mutationFn: async ({
      prompt,
      type,
      numberOfGenerations,
    }: z.infer<typeof formSchema>) => {
      const { data } = await axios.post<string[]>("/api/image", {
        prompt: `${prompt}, ${type}`,
        num_of_image: numberOfGenerations,
      });

      await Promise.all(
        data.map((url) =>
          axios.post("/api/history", {
            prompt: prompt,
            content: url,
            type: "IMAGE",
          })
        )
      );
      return data;
    },
    async onSuccess(data, variables, context) {
      setImages(data);
      router.refresh();
    },

    onError(error: any, variables, context) {
      if (error?.response?.status === 403) {
        onOpen();
        return;
      }
      toast.error("Sorry something went wrong:(");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <>
      {/* <ImageInfo /> */}
      <ImageGenerationTour />

      <div className="px-4 lg:px-8 overflow-y-auto scrollbar-hide">
        <div className="px-4 lg:px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="flex flex-col md:flex-row gap-4 md:items-end">
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="w-full" id="image-topic">
                      <FormLabel>Prompt</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="A whimsical underwater scene filled with colorful marine life and a hidden treasure chest."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button
                    id="image-suggestions"
                    className="shrink-0"
                    type="button"
                    variant="premium"
                    size="icon"
                    disabled={isLoading}
                    onClick={() => {
                      form.setValue(
                        "prompt",
                        imagePrompts[
                          Math.floor(Math.random() * imagePrompts.length + 1)
                        ]
                      );
                    }}
                  >
                    <Sparkles size={20} />
                  </Button>
                  <Button className="flex-1" type="submit" disabled={isLoading}>
                    Generate
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 items-end">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-2 mt-4" id="image-type">
                      <div className="flex justify-between">
                        <FormLabel>Image Type</FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild type="button">
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm p-4">
                              <p className="">
                                {imageStyleWithDescriptions[form.watch("type")]}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52 capitalize">
                            <SelectValue
                              className="capitalize"
                              placeholder="Select a Image type"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[15rem] overflow-y-auto ">
                          <SelectItem value="">None</SelectItem>
                          {Object.keys(imageStyleWithDescriptions).map(
                            (type) => (
                              <SelectItem
                                className="capitalize"
                                key={type}
                                value={type}
                              >
                                {type}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfGenerations"
                  render={({ field }) => (
                    <FormItem className="space-y-1 mt-4" id="image-count">
                      <FormLabel>Number Of Generations</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value.toString()}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52 capitalize">
                            <SelectValue
                              className="capitalize"
                              placeholder="Number Of Generations"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[15rem] overflow-y-auto">
                          {[1, 2, 3, 4].map((type) => (
                            <SelectItem
                              className="capitalize"
                              key={type}
                              value={type.toString()}
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>

          <div className="mt-6 mb-12">
            {isLoading ? (
              <div className="flex flex-1 items-center justify-center">
                <DotWave size={47} speed={1} color="rgb(14 165 233)" />
              </div>
            ) : (
              images && (
                <div className="grid md:grid-cols-2 gap-4 lg:gap-8">
                  {images.map((image, i) => (
                    <ImageCard key={i} image={image} />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoPage;
