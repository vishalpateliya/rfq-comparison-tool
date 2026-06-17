from pydantic import BaseModel
from pydantic import Field


class ChatRequest(BaseModel):
    question: str = Field(
        min_length=1,
        max_length=2000,
    )


class ChatResponse(BaseModel):
    answer: str
