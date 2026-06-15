import api from "./axios";

/**
 * Fetch all supplier quotes for an RFQ
 */
export const getQuotesByRFQ = async (rfqId) => {
  const response = await api.get(`/rfqs/${rfqId}/quotes`);
  return response.data;
};

/**
 * Create a supplier quote for an RFQ
 */
export const createQuote = async (rfqId, payload) => {
  const response = await api.post(`/rfqs/${rfqId}/quotes`, payload);
  return response.data;
};

/**
 * Update an existing supplier quote
 */
export const updateQuote = async (quoteId, payload) => {
  const response = await api.put(`/quotes/${quoteId}`, payload);
  return response.data;
};

/**
 * Delete a supplier quote
 */
export const deleteQuote = async (quoteId) => {
  const response = await api.delete(`/quotes/${quoteId}`);
  return response.data;
};

/**
 * Import supplier quotes from a CSV file
 */
export const importQuotesFromCSV = async (rfqId, file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/rfqs/${rfqId}/quotes/import-csv`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};