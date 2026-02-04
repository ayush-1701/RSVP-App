from fastapi import APIRouter, Depends
from app.supabase_client import supabase
from app.auth import verify_admin

router = APIRouter()

@router.get("/stats")
def get_stats(admin=Depends(verify_admin)):
    rsvps = supabase.table("rsvps").select("status, guests").execute().data

    return {
        "total_rsvps": len(rsvps),
        "YES": sum(1 for r in rsvps if r["status"] == "YES"),
        "NO": sum(1 for r in rsvps if r["status"] == "NO"),
        "MAYBE": sum(1 for r in rsvps if r["status"] == "MAYBE"),
        "total_guests": sum(r["guests"] for r in rsvps),
    }
