import React from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  thumbnail: string;
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, thumbnail, title }) => {
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="  relative w-full aspect-square rounded-lg overflow-hidden border-2 bg-green-100">
        <div className="absolute inset-0 p-2">
          <Image
            src={thumbnail}
            alt={title}
            layout="fill"
            objectFit="contain"
            priority
            className="rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.slice(0, 4).map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-square rounded-md overflow-hidden border border-gray-300 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <div className="absolute inset-0 p-1">
              <Image
                src={image}
                alt={`${title} ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;