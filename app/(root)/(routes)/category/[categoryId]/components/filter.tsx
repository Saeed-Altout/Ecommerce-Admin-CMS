"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import { Color, Size } from "@/lib/prisma/client";
import { Button } from "@/components/ui/button";

export function Filter({
  data,
  name,
  valueKey,
}: {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());
    const query = { ...current, [valueKey]: id };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      { url: window.location.href, query },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedValue === filter.id ? "default" : "outline"}
            onClick={() => onClick(filter.id)}
            className="capitalize"
            size="sm"
          >
            {filter.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
