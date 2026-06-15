# Supplier Quote Comparison Tool

A full-stack take-home assignment backend built with FastAPI and PostgreSQL.

## Tech Stack

* Python 3.13
* FastAPI
* SQLAlchemy 2.x
* PostgreSQL
* Pydantic v2
* uv

---

## Features

* Create RFQs

* Update RFQs

* Delete RFQs

* List RFQs

* Add supplier quotes

* Update supplier quotes

* Delete supplier quotes

* Compare supplier quotes

* Automatically calculate:

```
Total Price = Unit Price × RFQ Quantity
```

* CSV import for supplier quotes

---

## Project Structure

```
backend/

app/
    core/
    features/
        rfq/
        quote/

tests/
```

---

## Setup

Create a virtual environment and install dependencies:

```bash
uv sync
```

Create a `.env` file:

```
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/supplier_quote_db
```

Start the server:

```bash
uvicorn app.main:app --reload
```

> Database tables are created automatically on application startup using **SQLAlchemy metadata** (`Base.metadata.create_all`).

---

## API Endpoints

### RFQs

```
GET    /rfqs

POST   /rfqs

GET    /rfqs/{id}

PUT    /rfqs/{id}

DELETE /rfqs/{id}
```

### Quotes

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

## CSV Format

```
supplier_name,unit_price,currency,lead_time,payment_terms,remarks

ABC Metals,10.50,USD,7,Net 30,High quality

XYZ Industries,9.75,USD,10,Advance,Fast delivery
```

---

## Assumptions

* Authentication is intentionally omitted.
* Single procurement user.
* Suppliers do not log in to the system.
* Currency conversion is out of scope.
* Lowest quote is determined using total price.
* Total price is calculated dynamically instead of being stored.

---

## Future Improvements

* Authentication and authorization
* Multi-user support
* Currency conversion
* Pagination
* Search and filtering
* Soft deletes
* Audit logs
* Docker support
* Unit and integration tests
