# Supplier Quote Comparison Tool

## Overview

The Supplier Quote Comparison Tool is a full-stack web application for creating **Request for Quotations (RFQs)** and comparing supplier quotations.

The project consists of:

* **Backend:** FastAPI + PostgreSQL
* **Frontend:** React + Vite + Tailwind CSS

It enables procurement teams to manage RFQs, collect supplier quotes, and compare quotations based on the total cost.

---

## Features

### RFQ Management

* Create RFQs
* View RFQs
* Delete RFQs

### Supplier Quote Management

* Add supplier quotes
* Update supplier quotes
* Delete supplier quotes
* Compare supplier quotes

### CSV Import

* Import supplier quotes from a CSV file

### User Experience

* Responsive interface
* Modal-based forms
* Confirmation dialogs
* Toast notifications
* Client-side validation

---

## Repository Structure

```text
.
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

---

## Running the Application with Docker

### Prerequisites

* Docker
* Docker Compose

### Start all services

From the project root:

```bash
docker compose up --build
```

This will start:

* PostgreSQL
* FastAPI backend
* React frontend

---

## Access the Application

| Service     | URL                        |
| ----------- | -------------------------- |
| Frontend    | http://localhost:5173      |
| Backend API | http://localhost:8000      |
| Swagger UI  | http://localhost:8000/docs |

---

## Stopping the Application

```bash
docker compose down
```

To remove associated volumes as well:

```bash
docker compose down -v
```

---

## Additional Documentation

Detailed setup and implementation guides are available in:

* `backend/README.md`
* `frontend/README.md`