import Link from "next/link";

import { MainNav } from "../../../components/store/main-nav";
import { NavbarActions } from "../../../components/store/navbar-actions";

import { getCategories } from "@/data/category";
import { Container } from "@/components/ui/container";

export async function Navbar() {
  const categories = await getCategories();

  return (
    <header className="bg-background border-b">
      <Container>
        <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl">
            STORE
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </header>
  );
}
