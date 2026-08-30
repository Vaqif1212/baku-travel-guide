"use client";

import { useRef } from "react";
import { IconTrash } from "./icons";

export function DeleteButton({
  action,
  confirmText,
  label,
}: {
  action: (formData: FormData) => void | Promise<void>;
  confirmText: string;
  label: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        <IconTrash />
        {label}
      </button>
    </form>
  );
}
