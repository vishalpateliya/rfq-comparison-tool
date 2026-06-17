from sqlalchemy.orm import Session

from app.ai.registry import get_agent
from app.features.quote.service import QuoteService
from app.features.rfq.service import RFQService


class ChatService:
    """Answers questions about an RFQ by delegating to a registered agent.

    The agent is resolved by name through the registry, so swapping in a
    different assistant — or later, an orchestrator that picks among several
    agents — does not touch this service.
    """

    AGENT_NAME = "rfq_assistant"

    @staticmethod
    async def answer(
        db: Session,
        rfq_id: int,
        question: str,
    ) -> str:
        # Reuse existing services so RFQ-not-found raises the shared
        # NotFoundError and quotes come back in the canonical order.
        rfq = RFQService.get_by_id(db=db, rfq_id=rfq_id)
        quotes = QuoteService.get_all_for_rfq(db=db, rfq_id=rfq_id)

        agent = get_agent(ChatService.AGENT_NAME)

        return await agent(rfq, quotes, question)
