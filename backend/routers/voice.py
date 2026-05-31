from fastapi import APIRouter, Form, Request, Depends
from twilio.twiml.voice_response import VoiceResponse, Gather
from twilio.rest import Client
import os
from sqlalchemy.orm import Session
from database.db import get_db
from services.llm_service import generate_sales_response
from models.schema import Interaction, CallLog, User
from models.pydantic_schemas import ChatMessage

router = APIRouter()

# Get Twilio credentials from environment variables
account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
twilio_phone_number = os.environ.get("TWILIO_PHONE_NUMBER")

# Initialize Twilio client
client = Client(account_sid, auth_token)

# In-memory store for conversation history. In a production scenario, use a database like Redis.
conversation_history = {}

@router.post("/voice/start")
async def start_call(to_number: str = Form(...), name: str = Form(...), budget: str = Form(...), location: str = Form(...), db: Session = Depends(get_db)):
    """
    Starts an outbound call and provides the initial message.
    """
    try:
        # Create a user if they don't exist
        user = db.query(User).filter(User.phone == to_number).first()
        if not user:
            user = User(name=name, phone=to_number, budget=budget, location=location)
            db.add(user)
            db.commit()
            db.refresh(user)

        # URL for the webhook that will handle the call
        # IMPORTANT: This needs to be a publicly accessible URL. Use ngrok for local development.
        webhook_url = "https://defog-corset-reoccur.ngrok-free.dev/voice/inbound"
        transcribe_callback_url = "https://defog-corset-reoccur.ngrok-free.dev/voice/transcribe"

        call = client.calls.create(
            to=to_number,
            from_=twilio_phone_number,
            url=webhook_url,
            record=True,
            transcribe=True,
            transcribe_callback=transcribe_callback_url
        )

        # Create a new call log
        new_call_log = CallLog(call_id=call.sid, user_id=user.id, status='initiated')
        db.add(new_call_log)
        db.commit()

        conversation_history[call.sid] = []

        return {"status": "success", "call_sid": call.sid}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@router.post("/voice/inbound")
async def handle_inbound_call(request: Request):
    """
    Handles the initial part of the call when the user picks up.
    """
    response = VoiceResponse()
    response.say("Hello, this is an AI assistant from the real estate agency. I'm calling to follow up on your interest in our properties. How can I help you today?")
    
    # Start gathering user input
    gather = Gather(input='speech', action='/voice/process', speechTimeout='auto', record=True)
    response.append(gather)
    response.hangup()

    return str(response)

@router.post("/voice/process")
async def process_speech(request: Request, db: Session = Depends(get_db)):
    """
    Processes the user's speech and responds.
    """
    form = await request.form()
    call_sid = form.get("CallSid")
    user_speech = form.get("SpeechResult", "")
    
    history = conversation_history.get(call_sid, [])
    history.append(ChatMessage(role="user", content=user_speech))
    
    # Generate AI response
    ai_response_text = await generate_sales_response(user_input=user_speech, history=history)
    history.append(ChatMessage(role="assistant", content=ai_response_text))

    # Store interaction in the database
    call_log = db.query(CallLog).filter(CallLog.call_id == call_sid).first()
    if call_log:
        interaction = Interaction(
            user_id=call_log.user_id,
            message=user_speech,
            response=ai_response_text,
            source="voice"
        )
        db.add(interaction)
        db.commit()

    conversation_history[call_sid] = history
    
    response = VoiceResponse()
    response.say(ai_response_text)
    
    # Continue the conversation
    gather = Gather(input='speech', action='/voice/process', speechTimeout='auto', record=True)
    response.append(gather)
    response.hangup()
    
    return str(response)

@router.post("/voice/transcribe")
async def handle_transcription(request: Request, db: Session = Depends(get_db)):
    """
    Receives the transcription from Twilio and stores it.
    """
    form = await request.form()
    call_sid = form.get("CallSid")
    transcription_text = form.get("TranscriptionText", "")
    
    call_log = db.query(CallLog).filter(CallLog.call_id == call_sid).first()
    if call_log:
        call_log.transcript = transcription_text
        db.commit()
    
    return {"status": "success"}

@router.post("/voice/completed")
async def handle_completed_call(request: Request, db: Session = Depends(get_db)):
    """
    Updates the call log when the call is completed.
    """
    form = await request.form()
    call_sid = form.get("CallSid")
    call_status = form.get("CallStatus")
    call_duration = form.get("CallDuration")
    
    call_log = db.query(CallLog).filter(CallLog.call_id == call_sid).first()
    if call_log:
        call_log.status = call_status
        call_log.duration = int(call_duration)
        db.commit()
    
    return {"status": "success"}

@router.get("/voice/all-call-logs")
async def get_all_call_logs(db: Session = Depends(get_db)):
    """
    Retrieves all call logs from the database.
    """
    try:
        call_logs = db.query(CallLog).all()
        return call_logs
    except Exception as e:
        return {"status": "error", "message": str(e)}

@router.get("/voice/transcript-by-phone/{phone_number}")
async def get_transcript_by_phone(phone_number: str, db: Session = Depends(get_db)):
    """
    Retrieves call log transcripts for a given phone number.
    """
    try:
        user = db.query(User).filter(User.phone == phone_number).first()
        if not user:
            return {"status": "error", "message": "User not found"}
        
        call_logs = db.query(CallLog).filter(CallLog.user_id == user.id).all()
        return call_logs
    except Exception as e:
        return {"status": "error", "message": str(e)}