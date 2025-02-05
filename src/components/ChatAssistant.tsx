import React, { useState } from "react";

const AI_ENDPOINT = "https://build.nvidia.com/meta/llama-3_1-405b-instruct";
const API_KEY = "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"; // Replace with your actual API key

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(AI_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: "system", text: "You are a travel assistant." }, newMessage],
        }),
      });

      const data = await response.json();
      const reply = data?.text || "I'm not sure, please try again!";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { role: "assistant", text: "Error fetching response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 w-80 bg-white border rounded shadow-lg p-4">
      <h2 className="text-lg font-bold mb-2">AI Assistant</h2>
      <div className="h-40 overflow-y-auto border p-2">
        {messages.map((msg, index) => (
          <p key={index} className={`p-1 ${msg.role === "user" ? "text-blue-600" : "text-gray-800"}`}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        className="w-full p-2 border rounded mt-2"
        placeholder="Ask something..."
        disabled={loading}
      />
      <button onClick={sendMessage} className="mt-2 bg-blue-500 text-white w-full p-2 rounded" disabled={loading}>
        {loading ? "Typing..." : "Send"}
      </button>
    </div>
  );
};

export default ChatAssistant;
