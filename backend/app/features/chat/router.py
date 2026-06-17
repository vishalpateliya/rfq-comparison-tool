from fastapi import APIRouter

from app.core.dependencies import DBSession
from app.features.chat.schema import ChatRequest, ChatResponse
from app.features.chat.service import ChatService

router = APIRouter(
    tags=["Chat"],
)


@router.post(
    "/rfqs/{rfq_id}/chat",
    response_model=ChatResponse,
)
async def chat_about_rfq(
    rfq_id: int,
    payload: ChatRequest,
    db: DBSession,
):
    answer = await ChatService.answer(
        db=db,
        rfq_id=rfq_id,
        question=payload.question,
    )

    return ChatResponse(answer=answer)
