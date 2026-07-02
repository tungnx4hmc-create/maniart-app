import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, RefreshCcw, HelpCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function AICourseAdvisor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Xin chào! Tôi là **Cố vấn Thực Chiến AI** đại diện cho học viện. 🎬\n\nTôi sẵn sàng hỗ trợ bạn thiết kế lộ trình học dựng phim và đề xuất gói khóa học phù hợp nhất với mục tiêu của bạn (làm TikTok, đi làm Editor Freelancer, hay sản xuất phim cinematic).\n\nBạn có thể hỏi tôi bất kỳ điều gì, hoặc chọn nhanh các câu hỏi gợi ý bên dưới nhé!",
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "Dựng video TikTok triệu view nên học gói nào?",
    "Người chưa biết gì có học được Gói 2 không?",
    "Học viện hỗ trợ sửa bài tập cho học viên ra sao?",
    "Gói 3 có cam kết cơ hội việc làm thực tế không?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Map chat messages for standard history schema
      const chatHistory = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/chat-advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          chatHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gặp lỗi khi kết nối server AI.");
      }

      const modelMsg: ChatMessage = {
        id: `msg-${Date.now()}-model`,
        role: "model",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-error`,
        role: "model",
        text: `⚠️ **Lỗi hệ thống:** Không thể kết nối với trí tuệ nhân tạo lúc này. Lỗi: ${err.message}. Bạn vẫn có thể điền số điện thoại ở form tư vấn bên dưới để tư vấn viên hỗ trợ trực tiếp.`,
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const formatMarkdown = (text: string) => {
    return text.split("\n").map((line, idx) => {
      // Bold handling: **text**
      let formatted = line;
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-yellow-400 font-bold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const content = parts.length > 0 ? parts : formatted;

      if (line.trim().startsWith("-") || line.trim().startsWith("*")) {
        return (
          <li key={idx} className="ml-4 list-disc text-gray-300 my-1">
            {typeof content === "string" ? content.replace(/^[-*]\s*/, "") : content}
          </li>
        );
      }
      return <p key={idx} className="my-1.5 text-gray-300 leading-relaxed text-sm sm:text-base">{content}</p>;
    });
  };

  return (
    <section id="ai-advisor-panel" className="relative py-20 bg-[#050505] border-t border-b border-[#C5A022]/20">
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-[#C5A022] rounded-full blur-[100px] opacity-[0.06] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A022]/30 bg-[#C5A022]/5 px-4 py-1.5 text-xs text-[#FFD700] font-mono tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5 text-[#FFD700] animate-pulse" />
            <span>AI COURSE ADVISOR 24/7</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Trò Chuyện Với <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#C5A022] to-[#FFD700]">Cố Vấn Thực Chiến AI</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Đặt bất kỳ câu hỏi nào về khóa học, thời gian rảnh rỗi của bạn, hoặc ngân sách của bạn để nhận định hướng tư vấn chuyên sâu tức thì từ Trí Tuệ Nhân Tạo.
          </p>
        </div>

        {/* Chat Widget Container */}
        <div className="rounded-2xl border border-[#C5A022]/20 bg-[#0A0A0A] backdrop-blur-md shadow-2xl overflow-hidden flex flex-col h-[550px]" id="chat-widget">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1A1A1A] via-[#0A0A0A] to-[#1A1A1A] px-6 py-4 border-b border-[#C5A022]/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#C5A022]/10 border border-[#C5A022]/30">
                <Sparkles className="h-4 w-4 text-[#FFD700] animate-spin-slow" />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border border-black" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">Cố Vấn Thực Chiến AI</h4>
                <p className="text-[10px] text-[#FFD700]/80 font-mono">Đang hoạt động • Phản hồi tức thì</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                setMessages([messages[0]]);
              }}
              className="text-gray-400 hover:text-[#FFD700] transition-colors"
              title="Đặt lại hội thoại"
              id="chat-btn-reset"
            >
              <RefreshCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Messages view list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-zinc-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "model" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C5A022]/10 border border-[#C5A022]/30 text-[#FFD700] text-xs font-mono">
                    AI
                  </div>
                )}
                
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-[#C5A022] to-[#FFD700] text-black font-semibold rounded-tr-none shadow-[0_0_10px_rgba(197,160,34,0.15)]"
                    : "bg-zinc-900 text-gray-200 border border-zinc-800/80 rounded-tl-none"
                }`}>
                  <div className="whitespace-pre-wrap">
                    {msg.role === "model" ? formatMarkdown(msg.text) : msg.text}
                  </div>
                  <span className={`block text-[9px] mt-1.5 text-right ${msg.role === "user" ? "text-black/60" : "text-gray-500"}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-gray-300 text-xs">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C5A022]/10 border border-[#C5A022]/30 text-[#FFD700] text-xs animate-spin">
                  <RefreshCcw className="h-4 w-4" />
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-none px-4 py-3">
                  <div className="flex space-x-1.5 items-center py-1">
                    <div className="h-2 w-2 bg-[#FFD700] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 bg-[#FFD700] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 bg-[#FFD700] rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Prompt Suggestion Chips */}
          <div className="px-4 py-3 bg-zinc-950/70 border-t border-zinc-800/55">
            <p className="text-[10px] text-gray-500 uppercase font-mono mb-2 flex items-center space-x-1">
              <HelpCircle className="h-3 w-3 text-[#FFD700]" />
              <span>Gợi ý câu hỏi nhanh:</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  disabled={loading}
                  className="text-xs text-gray-300 bg-zinc-900 border border-zinc-800 hover:border-[#C5A022]/40 hover:text-[#FFD700] rounded-full px-3 py-1 transition-all text-left cursor-pointer disabled:opacity-50"
                  id={`chat-chip-${idx}`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input Form */}
          <div className="p-4 bg-zinc-900/90 border-t border-[#C5A022]/10 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Nhập câu hỏi của bạn tại đây..."
              disabled={loading}
              className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-[#C5A022]/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C5A022]/20 disabled:opacity-50"
              id="chat-input"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || loading}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#C5A022] to-[#FFD700] text-black hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#C5A022]/10 disabled:opacity-40 cursor-pointer"
              id="chat-send-btn"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
