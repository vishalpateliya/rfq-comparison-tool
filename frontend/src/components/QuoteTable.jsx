function QuoteTable({ quotes = [], onEdit, onDelete }) {
  if (quotes.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-600">No quotes yet</p>
        <p className="text-xs text-slate-400 mt-1">Add a quote manually or import via CSV</p>
      </div>
    );
  }

  const bestQuote = quotes.reduce((best, cur) =>
    Number(cur.total_price) < Number(best.total_price) ? cur : best
  );

  const formatPrice = (price, currency) => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "USD",
        maximumFractionDigits: 2,
      }).format(Number(price));
    } catch {
      return `${currency || ""} ${price}`;
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {["Supplier", "Unit Price", "Lead Time", "Payment Terms", "Total Price", "Remarks", ""].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quotes.map((quote) => {
              const isBest = quote.id === bestQuote.id;
              return (
                <tr
                  key={quote.id}
                  className={`transition ${isBest ? "bg-emerald-50/60" : "hover:bg-slate-50/60"}`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs shrink-0">
                        {quote.supplier_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-medium text-slate-900 leading-none">{quote.supplier_name}</span>
                        {isBest && (
                          <span className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-xs font-semibold">
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Best
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-700 font-medium whitespace-nowrap">
                    {formatPrice(quote.unit_price, quote.currency)}
                  </td>

                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                    {quote.lead_time} days
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {quote.payment_terms || <span className="text-slate-300">—</span>}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`font-semibold ${isBest ? "text-emerald-700" : "text-slate-900"}`}>
                      {formatPrice(quote.total_price, quote.currency)}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-500 max-w-xs truncate">
                    {quote.remarks || <span className="text-slate-300">—</span>}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit?.(quote)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                        title="Edit quote"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete?.(quote)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Delete quote"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {quotes.length > 1 && (
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <p className="text-xs text-slate-500">
            Best price: <span className="font-semibold text-emerald-700">{bestQuote.supplier_name}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default QuoteTable;