import React, { useState } from "react";

const AI_PROXY_ENDPOINT = "http://localhost:8080/proxy";

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add the user message to the chat
    const newMessage = { role: "user", content: input };
    setMessages((prev) => {
      const updatedMessages = [...prev, newMessage];
      console.log("Updated Messages State (User Message):", updatedMessages); // Debug
      return updatedMessages;
    });
    setInput(""); // Clear input
    setLoading(true);

    try {
      const response = await fetch(AI_PROXY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta/llama-3.1-405b-instruct", // Ensure the correct model is used
          messages: [
            { role: "system", content: "You are a travel assistant." }, // System instructions
            newMessage, // User's new message
          ],
          temperature: 0.2,
          top_p: 0.7,
          max_tokens: 1024,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data); // Debug the API response

      // Extract AI's response
      const reply = data?.choices?.[0]?.message?.content || "I'm not sure, please try again!";
      setMessages((prev) => {
        const updatedMessages = [...prev, { role: "assistant", content: reply }];
        console.log("Updated Messages State (AI Response):", updatedMessages); // Debug
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error fetching response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 w-80 bg-white border rounded shadow-lg p-4">
      <h2 className="text-lg font-bold mb-2">AI Assistant</h2>

      {/* Chat History */}
      <div className="h-40 overflow-y-auto border p-2">
        {messages.map((msg, index) => (
          <p key={index} className={`p-1 ${msg.role === "user" ? "text-blue-600" : "text-gray-800"}`}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
          </p>
        ))}
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        className="w-full p-2 border rounded mt-2"
        placeholder="Ask something..."
        disabled={loading}
      />

      {/* Send Button */}
      <button
        onClick={sendMessage}
        className="mt-2 bg-blue-500 text-white w-full p-2 rounded"
        disabled={loading}
      >
        {loading ? "Typing..." : "Send"}
      </button>
    </div>
  );
};

export default ChatAssistant;
