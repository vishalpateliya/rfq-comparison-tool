from fastapi import File
from fastapi import UploadFile

from app.features.quote.csv_service import CSVImportService

from typing import Annotated

from fastapi import APIRouter
from fastapi import Depends
from fastapi import Response
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.features.quote.schema import QuoteCreate
from app.features.quote.schema import QuoteResponse
from app.features.quote.schema import QuoteUpdate
from app.features.quote.service import QuoteService
from app.features.rfq.model import RFQ

router = APIRouter(
    tags=["Quotes"],
)

DBSession = Annotated[
    Session,
    Depends(get_db),
]


def build_quote_response(
    quote,
) -> QuoteResponse:
    """
    Convert ORM model to API response by injecting
    RFQ quantity required for computed total_price.
    """

    return QuoteResponse(
        id=quote.id,
        rfq_id=quote.rfq_id,
        supplier_name=quote.supplier_name,
        unit_price=quote.unit_price,
        currency=quote.currency,
        lead_time=quote.lead_time,
        payment_terms=quote.payment_terms,
        remarks=quote.remarks,
        quantity=quote.rfq.quantity,
    )


@router.get(
    "/rfqs/{rfq_id}/quotes",
    response_model=list[QuoteResponse],
)
def get_quotes(
    rfq_id: int,
    db: DBSession,
):
    quotes = QuoteService.get_all_for_rfq(
        db=db,
        rfq_id=rfq_id,
    )

    return [build_quote_response(q) for q in quotes]


@router.post(
    "/rfqs/{rfq_id}/quotes",
    response_model=QuoteResponse,
    status_code=201,
)
def create_quote(
    rfq_id: int,
    payload: QuoteCreate,
    db: DBSession,
):
    quote = QuoteService.create(
        db=db,
        rfq_id=rfq_id,
        payload=payload,
    )

    return build_quote_response(
        quote,
    )


@router.post(
    "/rfqs/{rfq_id}/quotes/import-csv",
    status_code=200,
)
async def import_quotes_csv(
    rfq_id: int,
    db: DBSession,
    file: UploadFile = File(...),
):
    return await CSVImportService.import_quotes(
        db=db,
        rfq_id=rfq_id,
        file=file,
    )


@router.put(
    "/quotes/{quote_id}",
    response_model=QuoteResponse,
)
def update_quote(
    quote_id: int,
    payload: QuoteUpdate,
    db: DBSession,
):
    quote = QuoteService.update(
        db=db,
        quote_id=quote_id,
        payload=payload,
    )

    return build_quote_response(
        quote,
    )


@router.delete(
    "/quotes/{quote_id}",
    status_code=204,
)
def delete_quote(
    quote_id: int,
    db: DBSession,
):
    QuoteService.delete(
        db=db,
        quote_id=quote_id,
    )

    return Response(
        status_code=204,
    )
