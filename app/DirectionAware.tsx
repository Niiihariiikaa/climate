import Image from "next/image";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

const images = [
  {
    url: "/images/classification.png",
    text: "Nature's Beauty",
  },
  {
    url: "/images/pic2.jpg",
    text: "Serene Waters",
  },
  {
    url: "/images/pic3.jpg",
    text: "Majestic Mountains",
  },
  {
    url: "/images/pic4.jpg",
    text: "Golden Sunset",
  },
];

export default function HoverGallery() {
  return (
    <div className="min-h-screen flex flex-wrap justify-center items-center gap-6 bg-gray-900 p-10">
      {images.map((image, index) => (
        <DirectionAwareHover key={index} imageUrl={image.url} className="md:w-80 md:h-80 w-60 h-60">
          <p className="text-lg font-semibold">{image.text}</p>
        </DirectionAwareHover>
      ))}
    </div>
  );
}
