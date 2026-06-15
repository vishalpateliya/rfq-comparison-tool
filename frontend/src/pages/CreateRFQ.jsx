import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { createRFQ } from "../api/rfq";

import RFQForm from "../components/RFQForm";

function CreateRFQ() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateRFQ = async (payload) => {
    try {
      setIsSubmitting(true);

      const createdRFQ = await createRFQ(payload);

      navigate(`/rfqs/${createdRFQ.id}`);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Create RFQ
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new Request for Quotation to start collecting supplier
          quotes.
        </p>
      </div>

      <RFQForm
        onSubmit={handleCreateRFQ}
        submitLabel="Create RFQ"
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default CreateRFQ;