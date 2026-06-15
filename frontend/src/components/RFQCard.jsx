import { Link } from "react-router-dom";

function RFQCard({ rfq, onDelete }) {
  const formattedDate = rfq.delivery_expectation
    ? new Date(rfq.delivery_expectation).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-semibold text-slate-900 truncate">
              {rfq.item_name}
            </h2>
            {rfq.specification && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                {rfq.specification}
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            <MetaItem
              icon={
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              }
              label="Qty"
              value={rfq.quantity.toLocaleString()}
            />
            {formattedDate && (
              <MetaItem
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
                label="Delivery"
                value={formattedDate}
              />
            )}
            {rfq.notes && (
              <MetaItem
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                }
                label="Notes"
                value={rfq.notes}
                truncate
              />
            )}
          </div>
        </div>

        <div className="flex gap-2">
  <Link
    to={`/rfqs/${rfq.id}`}
    className="inline-flex items-center justify-center rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors duration-200 hover:bg-indigo-200"
  >
    View
  </Link>

  <button
    type="button"
    onClick={() => onDelete(rfq)}
    className="inline-flex items-center justify-center rounded-lg bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition-colors duration-200 hover:bg-rose-200"
  >
    Delete
  </button>
</div>
      </div>
    </div>
  );
}

function MetaItem({ icon, label, value, truncate = false }) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-slate-500">
      <span className="text-slate-400">{icon}</span>
      <span className="text-slate-400 text-xs">{label}:</span>
      <span className={`text-slate-700 font-medium ${truncate ? "max-w-xs truncate" : ""}`}>
        {value}
      </span>
    </div>
  );
}

export default RFQCard;