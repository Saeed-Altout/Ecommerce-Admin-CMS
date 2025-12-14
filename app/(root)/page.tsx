
"use client"

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export default function RootPage() {
  const storeModal = useStoreModal();

  useEffect(() => {
    if (!storeModal.isOpen) {
      storeModal.onOpen();
    }
  }, [storeModal]);

  return (
    <main className="p-4">
      This page is protected by Clerk
    </main>
  );
}
