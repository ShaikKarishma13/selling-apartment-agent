from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db import engine, Base
from routers import chat
from routers import dashboard
import logging
import models.schema

# Setup basic logging
logging.basicConfig(level=logging.INFO)
from database.db import engine, Base

# Create tables
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

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Backend is running"}