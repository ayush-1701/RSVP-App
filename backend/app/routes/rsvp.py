from fastapi import APIRouter, HTTPException
from app.schemas import RSVPCreate
from app.supabase_client import supabase

router = APIRouter()

@router.post("/")
def create_rsvp(data: RSVPCreate):
    response = supabase.table("rsvps").insert(data.dict()).execute()

    if response.data is None:
        raise HTTPException(status_code=400, detail="Insert failed")

    return {
        "success": True,
        "rsvp_id": response.data[0]["id"]
    }
