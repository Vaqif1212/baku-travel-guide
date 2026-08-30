import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { IconCheckCircle, IconInbox, IconMail } from "@/components/admin/icons";
import { markRead, deleteMessage } from "./actions";

const DATE_LOCALE: Record<string, string> = { ru: "ru-RU", az: "az-AZ", en: "en-GB" };

export default async function AdminMessagesPage() {
  const locale = await getAdminLocale();
  const dict = getAdminDict(locale);
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">{dict.messages.title}</h1>
      <div className="mt-6 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-xl border p-5 shadow-sm ${m.read ? "border-neutral-200 bg-white" : "border-[#C9A227]/40 bg-[#C9A227]/5"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3.5">
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    m.read ? "bg-neutral-100 text-neutral-400" : "bg-[#C9A227]/15 text-[#8A6D00]"
                  }`}
                >
                  <IconMail />
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">
                    {m.name} · <span className="font-normal text-neutral-500">{m.contact}</span>
                  </div>
                  <p className="mt-2 max-w-xl whitespace-pre-line text-sm text-neutral-700">{m.text}</p>
                  <div className="mt-2 text-xs text-neutral-400">{new Date(m.createdAt).toLocaleString(DATE_LOCALE[locale])}</div>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <form action={markRead.bind(null, m.id, !m.read)}>
                  <button type="submit" className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900">
                    <IconCheckCircle />
                    {m.read ? dict.messages.markUnread : dict.messages.markRead}
                  </button>
                </form>
                <DeleteButton action={deleteMessage.bind(null, m.id)} confirmText={dict.common.confirmDelete} label={dict.common.delete} />
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-neutral-200 py-16 text-neutral-400">
            <IconInbox />
            {dict.messages.empty}
          </div>
        )}
      </div>
    </div>
  );
}
