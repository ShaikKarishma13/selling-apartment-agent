from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from database.db import engine
from models.schema import Base

import models.schema

from routers import chat
from routers import dashboard
from routers import voice

import logging


# Setup basic logging
logging.basicConfig(level=logging.INFO)

# Create tables (Alembic now handles this, but it's safe to keep for now)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Selling Apartment Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(chat.router)
app.include_router(dashboard.router)
app.include_router(voice.router)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Backend is running"}