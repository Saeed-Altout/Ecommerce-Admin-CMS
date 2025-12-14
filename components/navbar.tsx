import { UserButton } from "@clerk/nextjs";

import { StoreSwitcher } from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function Navbar() {
  const user = await currentUser();
  const stores = await db.store.findMany({
    where: {
      userId: user?.id,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher stores={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
}
