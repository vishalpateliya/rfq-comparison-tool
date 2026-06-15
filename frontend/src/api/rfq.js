import api from "./axios";

/**
 * Fetch all RFQs
 */
export const getRFQs = async () => {
  const response = await api.get("/rfqs");
  return response.data;
};

/**
 * Fetch a single RFQ by ID
 */
export const getRFQById = async (rfqId) => {
  const response = await api.get(`/rfqs/${rfqId}`);
  return response.data;
};

/**
 * Create a new RFQ
 */
export const createRFQ = async (payload) => {
  const response = await api.post("/rfqs", payload);
  return response.data;
};

/**
 * Update an existing RFQ
 */
export const updateRFQ = async (rfqId, payload) => {
  const response = await api.put(`/rfqs/${rfqId}`, payload);
  return response.data;
};

/**
 * Delete an RFQ
 */
export const deleteRFQ = async (rfqId) => {
  const response = await api.delete(`/rfqs/${rfqId}`);
  return response.data;
};