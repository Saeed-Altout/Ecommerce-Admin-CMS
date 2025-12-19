"use client";
import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Billboard as BillboardType } from "@/lib/prisma/client";

export function Billboard({ data }: { data: BillboardType }) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className="overflow-hidden rounded-xl p-4 sm:p-6 lg:p-8">
      <div className="relative aspect-square overflow-hidden rounded-xl md:aspect-[2.4/1]">
        <Image
          src={data?.imageUrl}
          alt={data?.label}
          fill
          className={cn(
            "z-0 scale-95 object-cover opacity-0 blur-3xl transition-all ease-in-out",
            isLoaded && "scale-100 opacity-100 blur-none",
          )}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="relative z-50 flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
          <div className="max-w-xs text-3xl font-bold sm:max-w-xl sm:text-5xl lg:text-6xl">
            {data?.label}
          </div>
        </div>
      </div>
    </div>
  );
}
