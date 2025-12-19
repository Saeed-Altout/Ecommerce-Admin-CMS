import { getSizeById } from "@/data/size";
import { SizeForm } from "./_components/size-form";

export default async function sizesPage({
  params,
}: {
  params: Promise<{ sizeId: string }>;
}) {
  const sizeId = (await params).sizeId;
  const size = await getSizeById(sizeId);

  return <SizeForm initialData={size} />;
}
