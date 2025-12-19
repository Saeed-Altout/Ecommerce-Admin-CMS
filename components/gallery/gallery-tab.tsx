import Image from "next/image";
import { Tab } from "@headlessui/react";

import { Image as ImageType } from "@/lib/prisma/client";
import { cn } from "@/lib/utils";

export function GalleryTab({ image }: { image: ImageType }) {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md">
      {({ selected }) => (
        <div>
          <span className="absolute inset-0 aspect-square h-full w-full overflow-hidden rounded-md">
            <Image
              fill
              alt="product-image-item"
              src={image.url}
              className="rounded-md object-cover object-center"
            />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-primary" : "ring-transparent",
            )}
          />
        </div>
      )}
    </Tab>
  );
}
