import { useState } from "react";

import { Button } from "@/shared/components/ui";

import { useChat } from "../hooks";

const SUGGESTIONS = [
  "Which supplier is cheapest overall?",
  "Compare the fastest vs. the cheapest quote.",
  "Any quotes with risky payment terms?",
];

function ChatPanel({ rfqId }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sending, ask } = useChat(rfqId);

  const submit = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    ask(trimmed);
    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(input);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-border-default bg-surface shadow-card">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-surface-hover"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-violet-500 text-white">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M21 12a8 8 0 01-11.6 7.1L3 21l1.9-6.4A8 8 0 1121 12z"
              />
            </svg>
          </span>
          <span>
            <span className="block text-sm font-semibold text-content">
              Ask about these quotes
            </span>
            <span className="block text-xs text-muted">
              AI assistant grounded in this RFQ's data
            </span>
          </span>
        </span>

        <svg
          className={`h-4 w-4 text-subtle transition ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-border-default px-5 py-4">
          <div className="max-h-80 space-y-3 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="space-y-3 py-2">
                <p className="text-sm text-muted">
                  Try one of these to get started:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => submit(s)}
                      disabled={sending}
                      className="rounded-full border border-border-default bg-surface-2 px-3 py-1.5 text-xs text-muted transition hover:border-primary/40 hover:text-content disabled:opacity-60"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <ChatBubble key={index} message={message} />
              ))
            )}

            {sending && (
              <div className="flex items-center gap-2 text-xs text-subtle">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-border-strong border-t-primary" />
                Thinking…
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about these quotes…"
              className="w-full rounded-xl border border-border-default bg-surface-inset px-4 py-2.5 text-sm text-content placeholder:text-subtle transition focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
            <Button type="submit" size="sm" loading={sending} disabled={!input.trim()}>
              Ask
            </Button>
          </form>
        </div>
      )}
    </section>
  );
}

function ChatBubble({ message }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-fg">
          {message.content}
        </p>
      </div>
    );
  }

  if (message.role === "error") {
    return (
      <div className="flex justify-start">
        <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-danger-soft px-3.5 py-2 text-sm text-danger-soft-fg">
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-surface-2 px-3.5 py-2 text-sm text-content">
        {message.content}
      </p>
    </div>
  );
}

export default ChatPanel;
