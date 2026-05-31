## ZAINAB_MODULE_README.md: Twilio Voice Integration and Frontend Validation

This document outlines the work done by Zainab to integrate a two-way Twilio voice communication system and enforce frontend phone number validation. All changes are designed to be modular and seamlessly integrate with the existing project structure.

### 1. Twilio Voice Integration (Backend)

A robust two-way voice communication system has been integrated into the backend, allowing users to interact with the AI in real time over the phone.

#### Key Changes:

- **`backend/routers/voice.py`:**
  - This new file contains the core logic for handling the Twilio voice integration.
  - **`/voice/start`:** A new endpoint to initiate outbound calls. It takes the user's phone number, name, budget, and location as input and starts the call using the Twilio API.
  - **`/voice/inbound`:** This webhook handles the initial phase of the call when the user picks up. It greets the user and starts gathering their speech input.
  - **`/voice/process`:** This endpoint processes the user's speech, sends it to the AI for a response, and continues the conversation. It also logs the interaction in the database.

- **`backend/models/schema.py`:**
  - A `CallLog` model has been added to the database schema to store detailed information about each call. This includes the Twilio Call SID, user ID, call status, duration, and timestamps.

- **`backend/main.py`:**
  - The `voice.router` has been included in the main FastAPI application to expose the new voice endpoints.

- **`backend/.env` and `backend/.env.example`:**
  - The `.env` file has been created to securely store Twilio credentials (Account SID, Auth Token, and Phone Number).
  - An `.env.example` file is provided as a template for setting up the environment variables.

- **`.gitignore`:**
  - The `.gitignore` file has been updated to exclude the `.env` file from version control, ensuring that credentials are not exposed.

### 2. Frontend Phone Number Validation

To ensure that only valid Indian phone numbers are used to initiate calls with Twilio, the frontend has been updated to enforce the `+91` format.

#### Key Changes:

- **`frontend/src/components/LeadForm.js`:**
  - The phone number input field now strictly validates that the input matches the `+91XXXXXXXXXX` format.
  - The input field's placeholder has been updated to **Enter Phone in +91 format** to guide the user.
  - A clear error message is displayed if the phone number does not match the required format.
  - The input handling logic has been updated to allow the `+` symbol and digits, ensuring a smooth user experience while maintaining the validation rules.

### 3. Call Transcription Integration

To provide a complete record of user interactions, Twilio's call transcription service has been integrated. This allows call transcripts to be stored and displayed within the application.

#### Backend Changes:

- **`backend/models/schema.py`:**
  - The `CallLog` model has been updated to include a `transcript` column of type `Text` to store the full call transcript.

- **`backend/routers/voice.py`:**
  - In the `/voice/start` endpoint, `transcribe=True` and a `transcribe_callback` URL have been added to the `client.calls.create` method. This tells Twilio to automatically transcribe the call.
  - A new `/voice/transcribe` endpoint has been created to handle the callback from Twilio. It receives the transcription text and saves it to the corresponding call log in the database.
  - A new `/voice/completed` endpoint has been added to receive a callback when a call is finished, updating the call's status and duration in the database.
  - A new `/voice/transcript-by-phone/{phone_number}` GET endpoint was created to allow the frontend to easily retrieve all call logs, including transcripts, for a specific user.

#### Frontend Changes:

- **`frontend/src/pages/Leads.js`:**
  - A new state variable `transcripts` has been added to hold the call transcripts for a selected lead.
  - An `useEffect` hook has been implemented to automatically fetch the call transcripts from the `/voice/transcript-by-phone/{phone_number}` endpoint whenever a new lead is selected.
  - A new "Call Transcripts" section has been added to the lead details view. This section dynamically renders the fetched transcripts, displaying each call's SID and the full transcription text.

These changes provide a complete, end-to-end voice integration that is robust, secure, and user-friendly. The modular design ensures that the new functionality will not interfere with the existing work of other team members.
