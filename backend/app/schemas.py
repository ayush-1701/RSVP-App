from pydantic import BaseModel
from typing import Optional

class RSVPCreate(BaseModel):
    name: str
    contact: str
    status: str
    guests: int
    arrival_time: Optional[str] = None
    event_id: str
