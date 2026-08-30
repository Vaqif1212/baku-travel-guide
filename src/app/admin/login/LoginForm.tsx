"use client";

import { useActionState } from "react";
import type { AdminDict } from "@/lib/adminI18n";
import { loginAction } from "./actions";

export function LoginForm({ dict }: { dict: AdminDict }) {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
      <h1 className="text-lg font-bold text-neutral-900">{dict.login.title}</h1>
      <p className="mt-1 text-sm text-neutral-500">{dict.login.subtitle}</p>
      <input
        type="password"
        name="password"
        required
        autoFocus
        placeholder={dict.login.placeholder}
        className="mt-6 w-full rounded border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
      />
      {state?.error && <p className="mt-3 text-sm font-medium text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full rounded bg-neutral-900 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60"
      >
        {pending ? dict.login.checking : dict.login.submit}
      </button>
    </form>
  );
}
