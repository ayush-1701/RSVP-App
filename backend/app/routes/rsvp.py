from fastapi import APIRouter, HTTPException
from app.schemas import RSVPCreate
from app.supabase_client import supabase

router = APIRouter()

@router.post("/")
def create_rsvp(data: RSVPCreate):

    if not data.contact.isdigit() or len(data.contact) != 10:
        raise HTTPException(
            status_code=400,
            detail="Invalid phone number"
        )

    payload = {
        "name": data.name,
        "contact": data.contact,
        "status": data.status,
        "guests": data.guests,
        "event_id": data.event_id,
        # 🔥 FIX IS HERE
        "arrival_time": data.arrival_time if data.arrival_time else None
    }
    
    try:
        response = supabase.table("rsvps").insert(payload).execute()
        return {"success": True, "data": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
