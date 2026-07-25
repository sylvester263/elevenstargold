"use client";

import { useTransition } from "react";

export function DeleteButton({
  action,
  label = "Delete",
  confirmText = "Delete this item? This can't be undone.",
}: {
  action: () => Promise<void>;
  label?: string;
  confirmText?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(confirmText)) return;
        startTransition(() => {
          action();
        });
      }}
      className="text-xs text-rust hover:underline disabled:opacity-50"
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}
