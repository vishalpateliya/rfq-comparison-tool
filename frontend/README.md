# Supplier Quote Comparison Tool - Frontend

## Overview

This project provides the user interface for the **Supplier Quote Comparison Tool**. It allows users to create and manage Request for Quotations (RFQs), add supplier quotes, compare quotations, and import quotes from CSV files.

The application is built using **React**, **Vite**, and **Tailwind CSS**.

---

## Technology Stack

* React 19
* Vite
* JavaScript
* Tailwind CSS
* Axios
* React Router
* Sonner (Toast Notifications)
* Docker

---

## Project Structure

```text
frontend/

├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── Dockerfile
├── package.json
└── README.md
```

---

## Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

Ensure that the backend API is running before starting the frontend.

---

## Features

### RFQ Management

* View all RFQs
* Create a new RFQ
* Delete an existing RFQ
* View RFQ details

### Supplier Quote Management

* Add supplier quotes
* Edit supplier quotes
* Delete supplier quotes
* Compare supplier quotes

### CSV Import

* Upload supplier quotes using a CSV file
* Display import success and failure information

### User Experience

* Responsive interface
* Modal-based create and edit forms
* Confirmation dialogs for destructive actions
* Toast notifications for user feedback
* Client-side form validation

---

## Backend Configuration

The frontend communicates with the backend using the environment variable:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Update this value if the backend is hosted on a different address.

---

## Notes

* The frontend expects the backend API to be available before use.
* Currency conversion between different quote currencies is not currently implemented.
* Quote comparison is based on the total price calculated from the supplier's unit price and the RFQ quantity.