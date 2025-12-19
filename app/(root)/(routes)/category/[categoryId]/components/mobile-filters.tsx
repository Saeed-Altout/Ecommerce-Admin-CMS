"use client";

import { useState } from "react";
import { Color, Size } from "@/lib/prisma/client";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import Filter from "./filter";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(true);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button className="flex items-center gap-x-2 lg:hidden" onClick={onOpen}>
        Filters
        <Plus size={20} />
      </Button>
      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* Background */}
        <div className="bg-opacity-25 fixed inset-0 bg-black" />
        {/* Dialog Position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* Close Button */}
            <div className="flex items-center justify-end px-4">
              <Button>
                <X />
              </Button>
            </div>
            {/* Render the filters */}
            <div className="p-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
