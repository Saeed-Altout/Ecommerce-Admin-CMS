"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";

export function AlertModal({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  loading: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}) {
  return (
    <Modal
      title="Are you sure?"
      description="Are you sure you want to delete this store?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-end gap-x-2">
        <Button variant="outline" disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" disabled={loading} onClick={onConfirm}>
          Confirm {loading && <Spinner />}
        </Button>
      </div>
    </Modal>
  );
}
