import { useState } from "react";

const initialFormState = {
  item_name: "",
  specification: "",
  quantity: "",
  delivery_expectation: "",
  notes: "",
};

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

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition";

function RFQForm({
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = "Save",
  isSubmitting = false,
}) {
  const [formData, setFormData] = useState({ ...initialFormState, ...initialValues });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.item_name.trim()) errs.item_name = "Item name is required";
    if (!formData.quantity || Number(formData.quantity) < 1) errs.quantity = "Enter a valid quantity";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit({ ...formData, quantity: Number(formData.quantity) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Item Name" required>
        <input
          name="item_name"
          type="text"
          value={formData.item_name}
          onChange={handleChange}
          placeholder="e.g. Steel Bolt M10"
          className={`${inputClass} ${errors.item_name ? "border-red-300 bg-red-50" : ""}`}
        />
        {errors.item_name && <p className="mt-1 text-xs text-red-500">{errors.item_name}</p>}
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Material / Specification" hint="optional">
          <input
            name="specification"
            type="text"
            value={formData.specification}
            onChange={handleChange}
            placeholder="e.g. SS304"
            className={inputClass}
          />
        </FormField>

        <FormField label="Quantity" required>
          <input
            name="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 500"
            className={`${inputClass} ${errors.quantity ? "border-red-300 bg-red-50" : ""}`}
          />
          {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>}
        </FormField>
      </div>

      <FormField label="Delivery Expectation" hint="optional">
        <input
          name="delivery_expectation"
          type="date"
          value={formData.delivery_expectation ?? ""}
          onChange={handleChange}
          className={inputClass}
        />
      </FormField>

      <FormField label="Notes" hint="optional">
        <textarea
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional requirements or context..."
          className={`${inputClass} resize-none`}
        />
      </FormField>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition"
        >
          Cancel
        </button>
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

export default RFQForm;