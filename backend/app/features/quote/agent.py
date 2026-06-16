from typing import TypedDict

from langchain_core.messages import HumanMessage
from langchain_core.messages import SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import END
from langgraph.graph import START
from langgraph.graph import StateGraph

import base64

from app.features.quote.prompts import (
    QUOTE_EXTRACTION_SYSTEM_PROMPT,
)
from app.features.quote.tools import (
    ExtractedQuotes,
)


class QuoteExtractionState(TypedDict):
    pdf_bytes: bytes

    extracted_quotes: ExtractedQuotes | None


def extract_quotes(
    state: QuoteExtractionState,
) -> QuoteExtractionState:
    llm = ChatOpenAI(
        model="gpt-4.1-mini",
        temperature=0,
    ).with_structured_output(
        ExtractedQuotes,
    )

    
    encoded_pdf = base64.b64encode(
        state["pdf_bytes"]
    ).decode("utf-8")

    result = llm.invoke(
        [
            SystemMessage(
                content=QUOTE_EXTRACTION_SYSTEM_PROMPT,
            ),
            HumanMessage(
                content=[
                    {
                        "type": "file",
                        "source_type": "base64",
                        "mime_type": "application/pdf",
                        "data": encoded_pdf,
                    },
                ]
            ),
        ]
    )

    return {
        **state,
        "extracted_quotes": result,
    }


builder = StateGraph(
    QuoteExtractionState,
)

builder.add_node(
    "extract_quotes",
    extract_quotes,
)

builder.add_edge(
    START,
    "extract_quotes",
)

builder.add_edge(
    "extract_quotes",
    END,
)

quote_extraction_graph = builder.compile()