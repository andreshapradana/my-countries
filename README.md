# **MyCountries - Country Information with AI Assistant**

## **Project Overview**
**MyCountries** is a modern single-page application (SPA) built with React that provides detailed information about countries, integrated with AI-powered features for a seamless and interactive experience. Users can explore country data using a GraphQL API, ask questions about countries through a chat assistant powered by NVIDIA NIM API, and securely log in using Google OAuth authentication.

---

## **Features**

### **Core Features**
1. **Country Information Display**
   - List of countries showing:
     - Country name
     - Emoji flag
     - Capital
     - Currency
   - Responsive design for all screen sizes.
   - Click on a country for detailed information:
     - Languages spoken.
     - Continent details.

2. **AI Assistant Integration**
   - Chat interface with the NVIDIA NIM API to:
     - Ask questions about displayed countries.
     - Get travel recommendations.
     - Translate country information.
   - Typing indicators and graceful error handling.

3. **Google OAuth Authentication**
   - Secure login using Google OAuth.
   - Protected routes to restrict access to the main application.
   - Display user profile information after login.

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/andreshapradana/my-countries.git
cd mycountries
```
### **2. Install Dependencies**
```bash
npm install
```
### **3. Environment Variables**
 - Create a .env file in the root directory and add the following values (follow .env.example):
```bash
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
```
- Create a .env file in the backend directory and add the following values (follow .env.example):
 ```bash
NVIDIA_API_KEY=your-nvapi-key
```
### **4. Start the Development Server**
 ```bash
npm run start
```
- start the proxy server
 ```bash
cd backend
nodemon server
```
### **5. Open the App**
- Visit http://localhost:3000 in your browser.

## **Available Features**
## **1. Country Information Display**
- View country data fetched from a GraphQL API.
- Pagination
## **2. AI Assistant**
- Chat with an AI assistant powered by NVIDIA NIM API.
- Ask country-related questions and get travel recommendations.
Translate country data into different languages.
## **3. Authentication**
- Secure Google OAuth login.
- Protected routes for authenticated users.
- Personalized user experience with profile information taken from firebase.

## **Technical Decisions and Architecture**
## **1. Tech Stack**
- Frontend: React, TypeScript, Tailwind CSS.
- State Management: React hooks and local state.
- GraphQL: Apollo Client for fetching country data.
- Authentication: Firebase Google OAuth.
- AI Integration: NVIDIA NIM API for chat-based interactions.
## **2. Component Structure**
- src/components/: Shared reusable components for AI Chat Layout
- src/pages/: Page components for country list Layout
- src/auth/: Firebase configuration and authentication logic.

## **Future Improvement**
- Adding search and filtering features for countries by name, continent, and languages.
- Support localization and dark mode for better user experience.
- Include GitHub OAuth and other authentication providers




