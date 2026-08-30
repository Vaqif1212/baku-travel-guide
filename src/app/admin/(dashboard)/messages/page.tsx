import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { markRead, deleteMessage } from "./actions";

const DATE_LOCALE: Record<string, string> = { ru: "ru-RU", az: "az-AZ", en: "en-GB" };

export default async function AdminMessagesPage() {
  const locale = await getAdminLocale();
  const dict = getAdminDict(locale);
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">{dict.messages.title}</h1>
      <div className="mt-6 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-lg border p-5 ${m.read ? "border-neutral-200 bg-white" : "border-neutral-900/20 bg-amber-50"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-neutral-900">
                  {m.name} · <span className="font-normal text-neutral-500">{m.contact}</span>
                </div>
                <p className="mt-2 max-w-xl whitespace-pre-line text-sm text-neutral-700">{m.text}</p>
                <div className="mt-2 text-xs text-neutral-400">{new Date(m.createdAt).toLocaleString(DATE_LOCALE[locale])}</div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 text-sm">
                <form action={markRead.bind(null, m.id, !m.read)}>
                  <button type="submit" className="text-neutral-600 hover:underline">
                    {m.read ? dict.messages.markUnread : dict.messages.markRead}
                  </button>
                </form>
                <form action={deleteMessage.bind(null, m.id)}>
                  <button type="submit" className="text-red-600 hover:underline">
                    {dict.common.delete}
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-neutral-400">{dict.messages.empty}</p>}
      </div>
    </div>
  );
}
