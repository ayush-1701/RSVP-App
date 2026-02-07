from fastapi import APIRouter, Depends
from collections import defaultdict
from app.supabase_client import supabase
from app.auth import verify_admin

router = APIRouter()

# @router.get("/stats")
# def get_stats(admin=Depends(verify_admin)):
#     rsvps = supabase.table("rsvps").select("status, guests").execute().data

#     return {
#         "total_rsvps": len(rsvps),
#         "YES": sum(1 for r in rsvps if r["status"] == "YES"),
#         "NO": sum(1 for r in rsvps if r["status"] == "NO"),
#         "MAYBE": sum(1 for r in rsvps if r["status"] == "MAYBE"),
#         "total_guests": sum(r["guests"] for r in rsvps),
#     }

@router.get("/stats")
def get_stats():
    response = supabase.table("rsvps").select("*").execute()
    data = response.data or []

    yes_count = 0
    maybe_count = 0
    no_count = 0
    total_guests = 0

    for r in data:
        if r["status"] == "YES":
            yes_count += 1
            total_guests += r.get("guests", 0)
        elif r["status"] == "MAYBE":
            maybe_count += 1
            total_guests += r.get("guests", 0)
        elif r["status"] == "NO":
            no_count += 1
            # ❌ DO NOT add guests

    return {
        "total_rsvps": len(data),
        "YES": yes_count,
        "MAYBE": maybe_count,
        "NO": no_count,
        "total_guests": total_guests
    }

@router.get("/rsvps-list")
def list_rsvps():
    response = supabase.table("rsvps") \
        .select("name, contact, status, guests, arrival_time, created_at") \
        .order("created_at", desc=True) \
        .execute()

    return response.data or []



@router.get("/arrival-heatmap")
def arrival_heatmap():
    response = supabase.table("rsvps") \
        .select("arrival_time, guests, status") \
        .execute()

    slots = defaultdict(int)

    for r in response.data or []:
        # Skip NOs or missing arrival time
        if r.get("status") == "NO" or not r.get("arrival_time"):
            continue

        try:
            # Parse time safely (HH:MM or HH:MM:SS)
            time_parts = r["arrival_time"].split(":")
            hour = int(time_parts[0])
            minute = int(time_parts[1])

            slot_minute = 0 if minute < 30 else 30
            slot = f"{hour:02d}:{slot_minute:02d}"

            # Normalize guests
            guests = r.get("guests")
            guests = int(guests) if guests not in (None, "", "NULL") else 0

            slots[slot] += guests

        except Exception as e:
            # Skip bad rows instead of crashing
            print("Heatmap skip row:", r, e)
            continue

    return dict(sorted(slots.items()))
