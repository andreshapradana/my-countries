import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaginatedCountries from "./pages/PaginatedCountries.tsx";
import ChatAssistant from "./components/ChatAssistant.tsx";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="p-4 bg-indigo-600 text-white text-center">
          <h1 className="text-xl font-bold">Country Portal</h1>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<PaginatedCountries />} />
          </Routes>
        </main>

        {/* AI Chat Assistant */}
        <ChatAssistant />
      </div>
    </Router>
  );
}

export default App;
