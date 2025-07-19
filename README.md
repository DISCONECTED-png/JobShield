# 🛡️ JobShield

**JobShield** is an AI-powered platform that analyzes job offers and employment patterns to detect potential scams and fraud. It leverages GPT-based analysis, community voting, and secure authentication to help job seekers make informed decisions.

## 🔗 Live Demo

🌐 https://jobshield.onrender.com

---

## 🚀 Features

- 🔍 **Scam Radar**: AI-powered analysis using GPT and Cohere APIs to identify suspicious job offers.
- 🧠 **Smart Ratings**: Generate automated credibility scores based on job offer text.
- 👥 **Community Voting**: Users can upvote/downvote job reports to build a trustworthy dataset.
- 🔐 **Secure Login**: Passwordless Google authentication using Firebase Auth.
- 🛡️ **JWT-based API Security**: All private routes are protected with JWT tokens.
- 💾 **MongoDB Backend**: Stores users, jobs, and votes.
- 📊 **Responsive Design**: Fully responsive on all screen sizes (mobile-first design).
- 🌍 **Deployed on Render**: Server and frontend hosted with uptime in mind.

---

## 🛠️ Tech Stack

**Frontend**:  
- React.js + Vite  
- Firebase Authentication  
- AOS (Animate On Scroll)  
- CSS Modules / Custom Styles

**Backend**:  
- Node.js + Express  
- MongoDB + Mongoose  
- JWT Authentication  
- Firebase Admin SDK  
- OpenAI + Cohere APIs

---

## 📦 Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Firebase project

### 1. Clone the Repository
- git clone https://github.com/DISCONECTED-png/JobShield.git
- cd jobshield

Backend Setup
- cd backend
- npm install

Create a .env
- PORT=5000
- MONGO_URI=your_mongo_connection
- JWT_SECRET=your_jwt_secret
- OPENAI_API_KEY=your_openai_key
- COHERE_API_KEY=your_cohere_key
- FB_PROJECT_ID=fb_project_id
- FB_PRIVATE_KEY=fb_private_key
- FB_CLIENT_EMAIL=fb_client_email
- FB_CLIENT_ID=fb_client_id
- FB_AUTH_URI=fb_auth_uri
- FB_TOKEN_URI=fb_token_uri
- FB_AUTH_PROVIDER_CERT_URL=auth_provider_cert_url
- FB_CLIENT_CERT_URL=client_cert_url
- FB_UNIVERSE_DOMAIN=universe_domain
Run the dev server:npm run dev

Frontend Setup
- cd frontend
- npm install

Create a .env
- VITE_API_BASE_URL=http://localhost:5000
Run the dev server:npm run dev

Test Credentials:
- Email: test123@gmail.com
- Password: password
