# Supplier Quote Comparison Tool - Frontend

A modern React application for creating RFQs, managing supplier quotes, comparing prices, and importing quotes from CSV files.

## Tech Stack

* React 19
* Vite
* JavaScript (ES Modules)
* Tailwind CSS v4
* React Router DOM
* Axios

---

## Features

### RFQ Management

* View all RFQs
* Create a new RFQ
* View RFQ details
* Delete an RFQ

Each RFQ includes:

* Item Name
* Material / Specification
* Quantity
* Delivery Expectation
* Notes

---

### Supplier Quote Management

For every RFQ:

* View supplier quotes
* Add supplier quotes
* Edit supplier quotes
* Delete supplier quotes

Each quote includes:

* Supplier Name
* Unit Price
* Currency
* Lead Time
* Payment Terms
* Remarks

---

### Quote Comparison

The application automatically displays supplier quotes in a comparison table.

The supplier with the **lowest total price** is visually highlighted.

```
Total Price = Unit Price × RFQ Quantity
```

---

### CSV Import

Supplier quotes can be imported using a CSV file.

Expected format:

```csv
supplier_name,unit_price,currency,lead_time,payment_terms,remarks
ABC Metals,10.50,USD,7,Net 30,High quality
XYZ Industries,9.75,USD,10,Advance,Fast delivery
```

---

## Project Structure

```
src/

├── api/
│   ├── axios.js
│   ├── rfq.js
│   └── quote.js
│
├── components/
│   ├── Header.jsx
│   ├── Loading.jsx
│   ├── EmptyState.jsx
│   ├── RFQCard.jsx
│   ├── RFQForm.jsx
│   ├── QuoteForm.jsx
│   ├── QuoteTable.jsx
│   └── CsvUpload.jsx
│
├── pages/
│   ├── RFQList.jsx
│   ├── CreateRFQ.jsx
│   └── RFQDetails.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation

Install dependencies:

```bash
npm install
```

or

```bash
npm ci
```

---

## Environment Variables

Create a `.env` file in the project root.

```
VITE_API_BASE_URL=http://localhost:8000
```

If omitted, the application defaults to:

```
http://localhost:8000
```

---

## Running the Development Server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Production Build

Generate a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Backend API

The frontend communicates with the following backend endpoints.

### RFQs

```
GET    /rfqs

POST   /rfqs

GET    /rfqs/{id}

PUT    /rfqs/{id}

DELETE /rfqs/{id}
```

### Supplier Quotes

```
GET    /rfqs/{id}/quotes

POST   /rfqs/{id}/quotes

PUT    /quotes/{id}

DELETE /quotes/{id}
```

### CSV Import

```
POST /rfqs/{id}/quotes/import-csv
```

---

## Running with Docker

Build the image:

```bash
docker build -t supplier-quote-frontend .
```

Run the container:

```bash
docker run -p 5173:5173 supplier-quote-frontend
```

Open:

```
http://localhost:5173
```

---

## Assumptions

* Authentication is intentionally omitted.
* Single procurement user.
* Backend handles persistence and validation.
* Quote comparison is based on the calculated total price.
* Currency conversion is outside the scope of the application.
