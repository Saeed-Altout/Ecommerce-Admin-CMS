"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Check, ChevronsUpDown, PlusIcon, StoreIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Store } from "@/lib/prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  stores: Store[];
  className?: string;
}

export function StoreSwitcher({ stores, className }: StoreSwitcherProps) {
  const onOpenStoreModal = useStoreModal((state) => state.onOpen);

  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState<boolean>(false);

  const formattedStores = stores.map((store) => ({
    value: store.id,
    label: store.name,
  }));

  const currentStore = formattedStores.find(
    (store) => store.value === params.storeId,
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/dashboard/${store.value}`);
    router.refresh();
  };

  const onStoreAdd = () => {
    setOpen(false);
    onOpenStoreModal();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          size="sm"
          aria-expanded={open}
          aria-label="Select store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="size-4" />
          {currentStore ? currentStore?.label : "Select store..."}
          <ChevronsUpDown className="ml-auto size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandList>
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup>
              {formattedStores.map((store) => (
                <CommandItem
                  key={store.value}
                  value={store.value}
                  onSelect={() => onStoreSelect(store)}
                >
                  <StoreIcon className="size-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto size-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
              <CommandItem value="new" onSelect={onStoreAdd}>
                <PlusIcon className="size-4" />
                Add new store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
