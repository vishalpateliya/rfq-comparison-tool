import { useCallback, useState } from "react";

import { sendChatMessage } from "./api";

/**
 * Conversation state for the RFQ assistant. Keeps an in-memory transcript;
 * a future version can persist history or stream tokens without changing the
 * component contract.
 */
export function useChat(rfqId) {
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  const ask = useCallback(
    async (question) => {
      const trimmed = question.trim();
      if (!trimmed || sending) return;

      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);

      try {
        setSending(true);
        const { answer } = await sendChatMessage(rfqId, trimmed);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: answer },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { role: "error", content: error.message },
        ]);
      } finally {
        setSending(false);
      }
    },
    [rfqId, sending]
  );

  return { messages, sending, ask };
}
