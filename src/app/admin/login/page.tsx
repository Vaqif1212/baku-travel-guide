"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <form action={formAction} className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-lg font-bold text-neutral-900">Baku Travel Guide — админ</h1>
        <p className="mt-1 text-sm text-neutral-500">Введите пароль для входа в панель управления.</p>
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="Пароль"
          className="mt-6 w-full rounded border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
        />
        {state?.error && <p className="mt-3 text-sm font-medium text-red-600">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="mt-5 w-full rounded bg-neutral-900 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60"
        >
          {pending ? "Проверка…" : "Войти"}
        </button>
      </form>
    </div>
  );
}
