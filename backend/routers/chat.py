from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db

from models.pydantic_schemas import (
    ChatRequest,
    ChatResponse,
    ChatMessage
)

from models.schema import Interaction, LeadStatus
from fastapi import HTTPException
from services.llm_service import generate_sales_response
from services.lead_scoring import classify_lead

import logging

router = APIRouter(
    prefix="/api/chat",
    tags=["Conversational AI"]
)

logger = logging.getLogger(__name__)


@router.post("/process-input", response_model=ChatResponse)
async def process_chat_input(
    request: ChatRequest,
    db: Session = Depends(get_db)
):
    logger.info(f"Processing chat input for session: {request.session_id}")

    # Generate AI response
    bot_response = await generate_sales_response(
        user_input=request.user_input,
        history=request.history
    )

    # Lead analysis
    full_history = request.history + [
        ChatMessage(role="assistant", content=bot_response)
    ]

    analysis = await classify_lead(full_history)

    # Save interaction
    user_interaction = Interaction(
        user_id=None,
        message=request.user_input,
        response=bot_response,
        source="text"
    )

    db.add(user_interaction)

    # Save lead status
    lead_status = LeadStatus(

    name=request.name,

    phone=request.phone,

    status=request.status,

    budget=request.budget,

    location=request.location,

    follow_up_date=request.follow_up_date,

    ai_response=bot_response

)

    db.add(lead_status)

    db.commit()

    return ChatResponse(
        response_text=bot_response,
        sentiment=analysis.get("reason", "No reason provided"),
        detected_intent=analysis.get("classification", "Unknown")
    )
@router.get("/all-leads")
def get_all_leads(db: Session = Depends(get_db)):

    leads_data = db.query(LeadStatus).all()

    leads = []

    for item in leads_data:

        leads.append({

            "id": item.id,

            "name": item.name,

            "phone": item.phone,

            "status": item.status,

            "budget": item.budget,

            "location": item.location,

            "follow_up_date": item.follow_up_date,

            "ai_response": item.ai_response,

            "created_at": str(item.created_at)

        })

    return leads
@router.delete("/delete-lead/{lead_id}")
def delete_lead(lead_id: int, db: Session = Depends(get_db)):

    lead = db.query(LeadStatus).filter(LeadStatus.id == lead_id).first()

    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    db.delete(lead)
    db.commit()

    return {"message": "Lead deleted successfully"}