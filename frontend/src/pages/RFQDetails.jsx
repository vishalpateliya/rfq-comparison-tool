import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "sonner";

import { getRFQById } from "../api/rfq";
import {
  createQuote,
  deleteQuote,
  getQuotesByRFQ,
  importQuotesFromCSV,
  updateQuote,
} from "../api/quote";

import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

import Loading from "../components/Loading";
import QuoteForm from "../components/QuoteForm";
import QuoteTable from "../components/QuoteTable";
import CsvUpload from "../components/CsvUpload";

function RFQDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [rfq, setRfq] = useState(null);

  const [quotes, setQuotes] = useState([]);

  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const [editingQuote, setEditingQuote] = useState(null);

  const [savingQuote, setSavingQuote] = useState(false);

  const [uploadingCsv, setUploadingCsv] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedQuote, setSelectedQuote] = useState(null);

  const bestQuoteId = useMemo(() => {
    if (quotes.length === 0) {
      return null;
    }

    return quotes.reduce((best, current) =>
      Number(current.total_price) < Number(best.total_price)
        ? current
        : best
    ).id;
  }, [quotes]);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);

      const [rfqResponse, quoteResponse] = await Promise.all([
        getRFQById(id),
        getQuotesByRFQ(id),
      ]);

      setRfq(rfqResponse);
      setQuotes(quoteResponse);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveQuote = async (payload) => {
    try {
      setSavingQuote(true);

      if (editingQuote) {
        await updateQuote(editingQuote.id, payload);

        toast.success("Supplier quote updated successfully.");
      } else {
        await createQuote(id, payload);

        toast.success("Supplier quote added successfully.");
      }

      await loadData();

      setEditingQuote(null);
      setShowQuoteForm(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSavingQuote(false);
    }
  };

  const handleEditQuote = (quote) => {
    setEditingQuote(quote);
    setShowQuoteForm(true);
  };

  const handleDeleteQuote = (quote) => {
    setSelectedQuote(quote);
    setShowDeleteModal(true);
  };

  const confirmDeleteQuote = async () => {
    if (!selectedQuote) {
      return;
    }

    try {
      await deleteQuote(selectedQuote.id);

      toast.success("Supplier quote deleted successfully.");

      setShowDeleteModal(false);
      setSelectedQuote(null);

      await loadData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCsvUpload = async (file) => {
    try {
      setUploadingCsv(true);

      const result = await importQuotesFromCSV(id, file);

      await loadData();

      toast.success(
        `Imported ${result.imported} quotes successfully.`
      );

      if (result.failed > 0) {
        toast.warning(
          `${result.failed} rows could not be imported.`
        );
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploadingCsv(false);
    }
  };

  if (loading) {
    return <Loading message="Loading RFQ..." />;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">
              {rfq.item_name}
            </h1>

            <p className="text-gray-600">
              <span className="font-medium">Specification:</span>{" "}
              {rfq.specification || "-"}
            </p>

            <p className="text-gray-600">
              <span className="font-medium">Quantity:</span>{" "}
              {rfq.quantity}
            </p>

            <p className="text-gray-600">
              <span className="font-medium">
                Delivery Expectation:
              </span>{" "}
              {rfq.delivery_expectation || "-"}
            </p>

            <p className="text-gray-600">
              <span className="font-medium">Notes:</span>{" "}
              {rfq.notes || "-"}
            </p>
          </div>

          <div className="flex h-fit gap-3">
            <button
              onClick={() => {
                setEditingQuote(null);
                setShowQuoteForm(true);
              }}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              + Add Quote
            </button>
          </div>
        </div>
      </section>

      <CsvUpload
        onUpload={handleCsvUpload}
        isUploading={uploadingCsv}
      />

      <Modal
        isOpen={showQuoteForm}
        onClose={() => {
          setShowQuoteForm(false);
          setEditingQuote(null);
        }}
        title={
          editingQuote
            ? "Edit Supplier Quote"
            : "Add Supplier Quote"
        }
      >
        <QuoteForm
          initialValues={editingQuote || {}}
          onSubmit={handleSaveQuote}
          onCancel={() => {
            setShowQuoteForm(false);
            setEditingQuote(null);
          }}
          submitLabel={
            editingQuote ? "Update Quote" : "Add Quote"
          }
          isSubmitting={savingQuote}
        />
      </Modal>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedQuote(null);
        }}
        onConfirm={confirmDeleteQuote}
        title="Delete Supplier Quote"
        description={`Are you sure you want to delete the quote from "${selectedQuote?.supplier_name}"?`}
        confirmText="Delete"
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Supplier Quotes
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {bestQuoteId
              ? "The lowest total price is highlighted."
              : "No supplier quotes available yet."}
          </p>
        </div>

        <QuoteTable
          quotes={quotes}
          onEdit={handleEditQuote}
          onDelete={handleDeleteQuote}
        />
      </section>
    </div>
  );
}

export default RFQDetails;