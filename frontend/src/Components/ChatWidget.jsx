import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  FaRobot,
  FaUser,
  FaTimes,
  FaPaperPlane,
  FaComments,
} from "react-icons/fa";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Set your API key directly here, or use environment variables
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Please give concise and short answers (2–3 sentences maximum). ${text}`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const aiReply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "Sorry, I didn't get that.";

      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Oops! Something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "#2563EB",
          color: "white",
          border: "none",
          boxShadow: "0 4px 12px rgb(0 0 0 / 0.15)",
          cursor: "pointer",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Open chat"
        title="Open Chat"
      >
        <FaComments size={24} />
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: 320,
            maxHeight: "70vh",
            backgroundColor: "white",
            boxShadow: "0 4px 16px rgb(0 0 0 / 0.25)",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <FaRobot size={20} color="#2563EB" />
              AI Assistant
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#6b7280",
              }}
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              backgroundColor: "#f9fafb",
            }}
          >
            {messages.length === 0 && (
              <div
                style={{ color: "#9ca3af", textAlign: "center", marginTop: 20 }}
              >
                Say hi 👋
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 8,
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.sender === "ai" && (
                  <FaRobot
                    size={20}
                    color="#2563EB"
                    style={{ flexShrink: 0 }}
                  />
                )}
                <div
                  style={{
                    backgroundColor:
                      msg.sender === "user" ? "#2563EB" : "#e5e7eb",
                    color: msg.sender === "user" ? "white" : "black",
                    padding: "8px 12px",
                    borderRadius: 16,
                    maxWidth: "75%",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <FaUser size={20} style={{ flexShrink: 0 }} />
                )}
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#6b7280",
                }}
              >
                <FaRobot />
                <span>Typing...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: 12,
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              gap: 8,
            }}
          >
            <input
              type="text"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 16,
                border: "1px solid #d1d5db",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              style={{
                backgroundColor: "#2563EB",
                border: "none",
                borderRadius: 16,
                padding: "0 16px",
                color: "white",
                cursor:
                  isLoading || !inputValue.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Send message"
              title="Send message"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
