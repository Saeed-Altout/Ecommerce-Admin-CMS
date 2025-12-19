import { getColorById } from "@/data/color";
import { ColorForm } from "./_components/color-form";

export default async function ColorPage({
  params,
}: {
  params: Promise<{ colorId: string }>;
}) {
  const colorId = (await params).colorId;
  const color = await getColorById(colorId);

  return <ColorForm initialData={color} />;
}
