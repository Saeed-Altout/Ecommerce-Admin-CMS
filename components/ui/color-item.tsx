export function ColorItem({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-x-2">
      <span
        className="block size-6 rounded-full border"
        style={{ backgroundColor: color }}
      />
      {color}
    </div>
  );
}
