import { useState } from "react";

const initialFormState = {
  supplier_name: "",
  unit_price: "",
  currency: "USD",
  lead_time: "",
  payment_terms: "",
  remarks: "",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition";

function FormField({ label, hint, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {hint && <span className="ml-2 text-xs font-normal text-slate-400">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "SGD", "AED"];

function QuoteForm({ initialValues = {}, onSubmit, onCancel, submitLabel = "Save Quote", isSubmitting = false }) {
  const [formData, setFormData] = useState({ ...initialFormState, ...initialValues });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.supplier_name.trim()) errs.supplier_name = "Supplier name is required";
    if (!formData.unit_price || Number(formData.unit_price) <= 0) errs.unit_price = "Enter a valid price";
    if (!formData.lead_time || Number(formData.lead_time) < 0) errs.lead_time = "Enter a valid lead time";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit({ ...formData, unit_price: Number(formData.unit_price), lead_time: Number(formData.lead_time) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Supplier Name" required>
        <input
          name="supplier_name"
          type="text"
          value={formData.supplier_name}
          onChange={handleChange}
          placeholder="e.g. ABC Metals Ltd."
          className={`${inputClass} ${errors.supplier_name ? "border-red-300 bg-red-50" : ""}`}
        />
        {errors.supplier_name && <p className="mt-1 text-xs text-red-500">{errors.supplier_name}</p>}
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Unit Price" required>
          <input
            name="unit_price"
            type="number"
            min="0"
            step="0.01"
            value={formData.unit_price}
            onChange={handleChange}
            placeholder="0.00"
            className={`${inputClass} ${errors.unit_price ? "border-red-300 bg-red-50" : ""}`}
          />
          {errors.unit_price && <p className="mt-1 text-xs text-red-500">{errors.unit_price}</p>}
        </FormField>

        <FormField label="Currency">
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className={inputClass}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Lead Time (Days)" required>
          <input
            name="lead_time"
            type="number"
            min="0"
            value={formData.lead_time}
            onChange={handleChange}
            placeholder="e.g. 14"
            className={`${inputClass} ${errors.lead_time ? "border-red-300 bg-red-50" : ""}`}
          />
          {errors.lead_time && <p className="mt-1 text-xs text-red-500">{errors.lead_time}</p>}
        </FormField>

        <FormField label="Payment Terms" hint="optional">
          <input
            name="payment_terms"
            type="text"
            value={formData.payment_terms}
            onChange={handleChange}
            placeholder="e.g. Net 30"
            className={inputClass}
          />
        </FormField>
      </div>

      <FormField label="Remarks" hint="optional">
        <textarea
          name="remarks"
          rows={3}
          value={formData.remarks}
          onChange={handleChange}
          placeholder="Any additional notes about this quote..."
          className={`${inputClass} resize-none`}
        />
      </FormField>

      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving…
            </>
          ) : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default QuoteForm;