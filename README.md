# 📰 RAG Chatbot – Frontend  
<img width="382" height="183" alt="image" src="https://github.com/user-attachments/assets/68b5a640-7e18-454b-bb46-137f27b6a7c6" />

## 🚀 Tech Stack  
- **React.js** – UI framework  
- **Vite** – bundler + dev server  
- **TailwindCSS / SCSS** – styling  
- **Axios** – API requests  
- **Socket.IO Client** – real-time streaming responses  

---

## 📂 Repository  
- **Frontend repo**: [RAG-Chatbot-frontend](https://github.com/Lovey007/RAG-Chatbot-frontend)  
- **Backend repo**: [RAG-Chatbot-backend](https://github.com/Lovey007/RAG-Chatbot-backend)  

---

## 🔎 Code Walkthrough (Frontend)  
1. **Chat UI**  
   - Built with React components styled via SCSS + Tailwind utilities.  
   - User messages (🧑) and Bot responses (🤖) styled with distinct bubbles and timestamps.  

2. **API Calls**  
   - Uses `axios` to send user queries to the backend (`/chat` endpoint).  
   - Uses `Socket.IO` for streaming responses (typing effect).  

3. **Session Handling**  
   - Maintains `sessionId` in frontend state to persist conversation across multiple turns.  
   - Reset button clears both local state and backend Redis session history.  

4. **Design Decisions & Improvements**  
   - **Minimalist UI** for readability; theme can be extended (dark mode, multi-layouts).  
   - **Message virtualization** could be added for very long chats.  
   - **SSR/Next.js** could replace Vite for SEO-friendly deployment.  
