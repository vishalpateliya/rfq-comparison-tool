# Supplier Quote Comparison Tool - Backend

## Overview

This project provides a REST API for managing **Request for Quotations (RFQs)** and **Supplier Quotes**. It is built using **FastAPI**, **SQLAlchemy**, and **PostgreSQL**.

The application allows users to:

* Create and manage RFQs
* Add supplier quotations for an RFQ
* Compare supplier quotes
* Import supplier quotes from CSV files

---

## Technology Stack

* Python 3.13
* FastAPI
* SQLAlchemy 2.x
* PostgreSQL
* Pydantic v2
* uv
* Docker

---

## Project Structure

```
backend/

├── app/
│   ├── core/
│   ├── features/
│   │   ├── rfq/
│   │   └── quote/
│   ├── utils/
│   └── main.py
│
├── tests/
├── Dockerfile
├── pyproject.toml
└── README.md
```

---

## Running Locally

### 1. Create a virtual environment

```bash
uv sync
```

### 2. Create a `.env` file

```env
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5433/supplier_quote_db
```

### 3. Start PostgreSQL

If you already have PostgreSQL installed locally, ensure that the server is running and create a database named:

```
supplier_quote_db 
```

Alternatively, you can start PostgreSQL using Docker:

```
docker run --name supplier-quote-postgres-local -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=supplier_quote_db -p 5433:5433 -d postgres:17
```

### 4. Start the application

```bash
uv run uvicorn app.main:app --reload
```

The API will be available at:

```
http://localhost:8000
```

Swagger documentation:

```
http://localhost:8000/docs
```

---

## Database

The application uses PostgreSQL.

Tables are created automatically on startup using SQLAlchemy metadata.

No migration tool is currently configured.

---

## API Endpoints

### RFQs

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| GET    | `/rfqs`      | Retrieve all RFQs     |
| POST   | `/rfqs`      | Create a new RFQ      |
| GET    | `/rfqs/{id}` | Retrieve a single RFQ |
| PUT    | `/rfqs/{id}` | Update an RFQ         |
| DELETE | `/rfqs/{id}` | Delete an RFQ         |

---

### Supplier Quotes

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/rfqs/{id}/quotes` | Retrieve quotes for an RFQ |
| POST   | `/rfqs/{id}/quotes` | Create a supplier quote    |
| PUT    | `/quotes/{id}`      | Update a supplier quote    |
| DELETE | `/quotes/{id}`      | Delete a supplier quote    |

---

### CSV Import

| Method | Endpoint                       | Description                            |
| ------ | ------------------------------ | -------------------------------------- |
| POST   | `/rfqs/{id}/quotes/import-csv` | Import supplier quotes from a CSV file |

---

## CSV Format

The uploaded CSV should contain the following columns:

```csv
supplier_name,unit_price,currency,lead_time,payment_terms,remarks
ABC Metals,10.50,USD,7,Net 30,High quality
XYZ Industries,9.75,USD,10,Advance Payment,Fast delivery
```

---

## Testing

Run all tests:

```bash
uv run pytest
```

---

## Key Features

* RFQ CRUD operations
* Supplier Quote CRUD operations
* CSV import support
* Automatic quote comparison based on total price
* Input validation using Pydantic
* Modular feature-based project structure
* Docker support
* Unit tests with pytest

---

## Assumptions

* Authentication and authorization are not implemented.
* The application is intended for a single procurement user.
* Suppliers do not log in directly.
* Currency conversion is not implemented.
* Quote comparison is based on the calculated total price using:

```
Total Price = Unit Price × RFQ Quantity
```
