"use client";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function Currency({ value }: { value: string | number }) {
  return <div className="font-semibold">{formatter.format(Number(value))}</div>;
}
