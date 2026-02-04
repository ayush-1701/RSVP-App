from pydantic import BaseModel, EmailStr
from typing import Optional

class RSVPCreate(BaseModel):
    event_id: str
    name: str
    contact: str
    status: str  # yes | no | maybe
    guests: int = 0
    message: Optional[str] = None
