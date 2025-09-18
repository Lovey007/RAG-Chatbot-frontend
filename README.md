# 📰 RAG Chatbot – Frontend
<img width="1277" height="612" alt="image" src="https://github.com/user-attachments/assets/f0225c18-d224-4402-9c64-b12b74ca0796" />

A modern frontend for a Retrieval-Augmented Generation (RAG) News Chatbot, enabling conversational AI with persistent session history and fast responses.

---

## 🚀 Tech Stack

- **React.js** – UI framework for building interactive components
- **Vite** – Lightning-fast bundler + development server
- **SCSS** – Modern, modular styling
- **Axios** – Promise-based HTTP client for API requests

--- 

## 📂 Git Repositories

- **Frontend repo:** [RAG-Chatbot-frontend](https://github.com/Lovey007/RAG-Chatbot-frontend)
- **Backend repo:** [RAG-Chatbot-backend](https://github.com/Lovey007/RAG-Chatbot-backend)

Both repositories are public and contain complete codebases and clear README.md files.

---

## 🔍 Code Walkthrough

### 1. Redis Caching & Session History

- **Session Management:** Each chat session is identified by a generated `sessionId` (see `generateSessionId()` in frontend).
- **Frontend:** The `sessionId` is kept in React state. All chat requests include this ID.
- **Backend:** Associates chat history and context with each `sessionId` and stores/retrieves it from Redis.
- **Reset:** The frontend “Reset” button clears local state and sends a request to the backend to delete the session’s Redis entry, starting a fresh conversation.

### 2. How the Frontend Calls API/Socket and Handles Responses

- **API Calls:** Axios is used to POST user messages to the `/chat` endpoint and GET session history from `/history`.
- **UI Update:** User messages are optimistically rendered in the chat. Once a response is received, it is appended to the chat with a typing animation.
- **Session Persistence:** Chat history and session state are maintained until reset, supporting multi-turn conversations.

**Flow:**
1. User types message and submits.
2. Message is added to local chat state and POSTed to backend.
3. While waiting, a loading/typing indicator is shown.
4. Once backend responds, the bot’s reply is appended.
5. Scroll position is automatically updated to show the latest message.

### 3. Noteworthy Design Decisions & Potential Improvements

- **Minimalist UI:** Focused on clarity and usability. Easily extendable for dark mode or alternate layouts.
- **Session Resilience:** Session IDs and backend storage allow for robust multi-turn conversations and easy resets.
- **Performance:** SCSS styles and message list are optimized for speed; message virtualization (lazy rendering for long chats) could be added for scalability.
- **Extensibility:** Designed for easy integration of additional features such as context citation, file uploads, or voice input.

---

## 🛠️ Local Setup

1. Clone this repo and the backend repo.
2. Install frontend dependencies: `npm install`
3. Set backend API URL in `.env` if not using default (`localhost:5000`)
4. Start frontend: `npm run dev`
5. Start backend (see backend README for instructions)

---
