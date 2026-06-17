import client from "@/shared/api/client";

/**
 * Ask the RFQ assistant a question about a specific RFQ and its quotes.
 */
export const sendChatMessage = async (rfqId, question) => {
  const response = await client.post(`/rfqs/${rfqId}/chat`, { question });
  return response.data; // { answer }
};
