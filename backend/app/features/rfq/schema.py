from datetime import date

from pydantic import BaseModel
from pydantic import ConfigDict
from pydantic import Field


class RFQCreate(BaseModel):
    item_name: str = Field(
        min_length=1,
        max_length=255,
    )

    specification: str | None = None

    quantity: int = Field(
        gt=0,
    )

    delivery_expectation: date | None = None

    notes: str | None = None


class RFQUpdate(BaseModel):
    item_name: str | None = None

    specification: str | None = None

    quantity: int | None = Field(
        default=None,
        gt=0,
    )

    delivery_expectation: date | None = None

    notes: str | None = None


class RFQResponse(BaseModel):
    id: int

    item_name: str

    specification: str | None

    quantity: int

    delivery_expectation: date | None

    notes: str | None

    model_config = ConfigDict(
        from_attributes=True,
    )
