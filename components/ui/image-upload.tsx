"use client";

import Image from "next/image";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { ImagePlusIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: {
  disabled?: boolean;
  onChange?: (url: string) => void;
  onRemove?: (url: string) => void;
  value: string[];
}) {
  const onUpload = (result: CloudinaryUploadWidgetResults) => {
    if (onChange) {
      onChange(result.info?.thumbnail_url);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative size-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant="destructive"
                size="icon-sm"
                onClick={() => onRemove?.(url)}
              >
                <TrashIcon className="size-3" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        uploadPreset="upload-ecommarce-admin"
        onSuccess={onUpload}
      >
        {({ open }) => (
          <Button
            disabled={disabled}
            onClick={() => open()}
            type="button"
            variant="outline"
          >
            <ImagePlusIcon className="size-4" />
            Upload
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
}
