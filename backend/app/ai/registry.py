"""Agent registry — the single place agents are registered and resolved.

Today it holds one conversational agent. It's the seed for orchestration:
as more agents are added, callers (and a future orchestrator) discover and
route to them by name through ``get_agent`` instead of importing each agent
module directly.
"""

from collections.abc import Callable

from app.ai.agents.rfq_assistant import answer_question

# name -> agent entry point (callable)
AGENTS: dict[str, Callable] = {
    "rfq_assistant": answer_question,
}


def get_agent(name: str) -> Callable:
    """Resolve a registered agent by name.

    Raises:
        KeyError: if no agent is registered under ``name``.
    """

    if name not in AGENTS:
        raise KeyError(f"Unknown agent: {name!r}")

    return AGENTS[name]


def available_agents() -> list[str]:
    return list(AGENTS)
