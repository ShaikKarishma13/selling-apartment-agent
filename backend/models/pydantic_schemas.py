from pydantic import BaseModel, Field
from typing import Optional, List


class ChatMessage(BaseModel):
    role: str = Field(..., description="'user' or 'assistant'")
    content: str


class ChatRequest(BaseModel):
    session_id: str = Field(..., description="Unique session identifier")
    user_input: str = Field(..., min_length=1, max_length=1000)

    history: Optional[List[ChatMessage]] = []

    # LEAD DATA
    name: str
    phone: str
    status: str
    budget: str
    location: str
    follow_up_date: str


class ChatResponse(BaseModel):
    response_text: str
    sentiment: str = Field(default="neutral")
    detected_intent: str = Field(default="unknown")