from fastapi import FastAPI

from app.core.config import settings
from app.core.database import Base
from app.core.database import engine

from fastapi.middleware.cors import CORSMiddleware

from app.features.rfq.router import router as rfq_router
from app.features.quote.router import router as quote_router

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # "http://localhost:5173",
        # "http://localhost:4173",
        "*",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


app.include_router(rfq_router)
app.include_router(quote_router)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "Server is running",
    }
