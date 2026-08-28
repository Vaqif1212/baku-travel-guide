import { prisma } from "@/lib/prisma";
import { markRead, deleteMessage } from "./actions";

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">Сообщения</h1>
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
                <div className="mt-2 text-xs text-neutral-400">{new Date(m.createdAt).toLocaleString("ru-RU")}</div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 text-sm">
                <form action={markRead.bind(null, m.id, !m.read)}>
                  <button type="submit" className="text-neutral-600 hover:underline">
                    {m.read ? "Отметить непрочитанным" : "Отметить прочитанным"}
                  </button>
                </form>
                <form action={deleteMessage.bind(null, m.id)}>
                  <button type="submit" className="text-red-600 hover:underline">
                    Удалить
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-neutral-400">Сообщений пока нет.</p>}
      </div>
    </div>
  );
}
