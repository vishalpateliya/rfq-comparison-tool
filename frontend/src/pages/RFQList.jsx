import { useEffect, useState } from "react";

import { toast } from "sonner";

import { createRFQ, deleteRFQ, getRFQs } from "../api/rfq";

import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import RFQForm from "../components/RFQForm";

import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import RFQCard from "../components/RFQCard";

function RFQList() {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedRFQ, setSelectedRFQ] = useState(null);

  useEffect(() => {
    fetchRFQs();
  }, []);

  const fetchRFQs = async () => {
    try {
      setLoading(true);

      const data = await getRFQs();

      setRfqs(data);
    } catch (error) {
      console.error(error);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRFQ = async (payload) => {
    try {
      setIsSubmitting(true);

      await createRFQ(payload);

      setShowCreateModal(false);

      toast.success("RFQ created successfully.");
      
      await fetchRFQs();
    } catch (error) {
      console.error(error);

      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRFQ = (rfq) => {
    setSelectedRFQ(rfq);
    setShowDeleteModal(true);
  };

  const confirmDeleteRFQ = async () => {
    if (!selectedRFQ) {
      return;
    }

    try {
      await deleteRFQ(selectedRFQ.id);

      toast.success("RFQ deleted successfully.");

      setShowDeleteModal(false);
      setSelectedRFQ(null);

      await fetchRFQs();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <Loading message="Loading RFQs..." />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Request for Quotations
          </h1>

          <p className="mt-2 text-gray-500">
            Create RFQs and compare supplier quotes.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + Create RFQ
        </button>
      </div>

      {rfqs.length === 0 ? (
        <EmptyState
          title="No RFQs found"
          description="Create your first RFQ to start collecting supplier quotes."
        />
      ) : (
        <div className="grid gap-6">
          {rfqs.map((rfq) => (
            <RFQCard
              key={rfq.id}
              rfq={rfq}
              onDelete={handleDeleteRFQ}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create RFQ"
      >
        <RFQForm
          onSubmit={handleCreateRFQ}
          onCancel={() => setShowCreateModal(false)}
          submitLabel="Create RFQ"
          isSubmitting={isSubmitting}
        />
      </Modal>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedRFQ(null);
        }}
        onConfirm={confirmDeleteRFQ}
        title="Delete RFQ"
        description={`Are you sure you want to delete "${selectedRFQ?.item_name}"?`}
        confirmText="Delete"
      />
    </div>
  );
}

export default RFQList;