import { BadgeIcon, DollarSignIcon, Wallet2Icon } from "lucide-react";

import { getSalesCount, getStoreCount, getTotalRevenue } from "@/data/overview";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { ChartAreaInteractive } from "./_components/chart-area-interactive";

export default async function OverviewPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const totalRevenue = await getTotalRevenue(storeId);
  const salesCount = await getSalesCount(storeId);
  const storeCount = await getStoreCount(storeId);

  return (
    <>
      <Heading title="Dashboard" description="Overview of your store" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalRevenue}$
            </CardTitle>
            <CardAction>
              <DollarSignIcon className="size-4" />
            </CardAction>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Sales</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              +{salesCount}
            </CardTitle>
            <CardAction>
              <Wallet2Icon className="size-4" />
            </CardAction>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Product in store</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              +{storeCount}
            </CardTitle>
            <CardAction>
              <BadgeIcon className="size-4" />
            </CardAction>
          </CardHeader>
        </Card>
      </div>
      <ChartAreaInteractive />
    </>
  );
}
