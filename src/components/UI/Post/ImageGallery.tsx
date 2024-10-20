"use client";

import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Link from "next/link";
import Image from "next/image";

type IImages = {
  images: string[];
};

const ImageGallery = ({ images }: IImages) => {
  return (
    <LightGallery
      elementClassNames={`grid place-items-center mt-2 gap-2 ${
        images.length === 1 ? "grid-cols-1 justify-center" : "grid-cols-2"
      }`}
      plugins={[lgThumbnail, lgZoom]}
      speed={500}
    >
      {images.map((img: string, index) => (
        <Link
          key={index}
          className={`w-full ${images.length === 3 && index === 0 ? "col-span-3" : "col-span-1"}`}
          href={img}
        >
          <Image
            alt={`image-${index}`}
            className="h-[400px] w-full object-cover"
            height={500}
            src={img}
            width={500}
          />
        </Link>
      ))}
    </LightGallery>
  );
};

export default ImageGallery;
