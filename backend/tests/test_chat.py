import pytest

from app.ai.registry import available_agents, get_agent
from app.core.exceptions import NotFoundError
from app.features.chat.service import ChatService


def test_registry_resolves_rfq_assistant():
    agent = get_agent("rfq_assistant")
    assert callable(agent)
    assert "rfq_assistant" in available_agents()


def test_registry_unknown_agent_raises():
    with pytest.raises(KeyError):
        get_agent("does_not_exist")


async def test_chat_missing_rfq_raises_not_found(db_session):
    # The RFQ lookup happens before any LLM call, so this needs no API key.
    with pytest.raises(NotFoundError):
        await ChatService.answer(
            db=db_session,
            rfq_id=999,
            question="Which supplier is cheapest?",
        )
