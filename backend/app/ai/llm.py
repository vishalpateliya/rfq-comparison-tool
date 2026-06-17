"""Central LLM factory.

Single place to construct chat models so every agent shares the same
configuration and we can swap providers/models in one spot. Models are
created lazily by callers (not at import time) so the app and test suite
import cleanly without an ``OPENAI_API_KEY``.
"""

from langchain_openai import ChatOpenAI

DEFAULT_MODEL = "gpt-4.1-mini"


def get_llm(
    model: str = DEFAULT_MODEL,
    temperature: float = 0,
    structured_output=None,
):
    """Build a chat model, optionally bound to a structured-output schema."""

    llm = ChatOpenAI(model=model, temperature=temperature)

    if structured_output is not None:
        return llm.with_structured_output(structured_output)

    return llm
