import { UserButton } from "@clerk/nextjs";
export default function RootPage() {
  return (
    <main className="p-4">
      <UserButton />
    </main>
  );
}
