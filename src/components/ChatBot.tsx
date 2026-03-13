import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export default function ChatBot() {
  const { themeColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Xin chào! Tôi là trợ lý AI của ShoeAdmin. Tôi có thể giúp gì cho bạn hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: `Bạn là một trợ lý quản trị cho trang web bán giày. Hãy trả lời câu hỏi sau một cách chuyên nghiệp và ngắn gọn: ${userMessage}` }] }
        ],
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || 'Xin lỗi, tôi không thể trả lời lúc này.' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 right-8 w-14 h-14 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50",
          `bg-${themeColor}-500 shadow-${themeColor}-500/20 hover:bg-${themeColor}-600`
        )}
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 w-96 h-[500px] bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden z-50 transition-colors"
          >
            <div className="p-4 bg-zinc-900 dark:bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", `bg-${themeColor}-500`)}>
                  <Bot size={20} />
                </div>
                <div>
                  <p className="font-semibold text-sm">AI Assistant</p>
                  <p className={cn("text-[10px] font-medium uppercase tracking-wider", `text-${themeColor}-400`)}>Trực tuyến</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                    msg.role === 'user' 
                      ? `bg-${themeColor}-500 text-white rounded-tr-none` 
                      : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-tl-none'
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-zinc-900 p-3 rounded-2xl rounded-tl-none border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <Loader2 size={18} className={cn("animate-spin", `text-${themeColor}-500`)} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className={cn(
                    "flex-1 bg-zinc-100 dark:bg-zinc-900 border-none rounded-xl px-4 py-2 text-sm transition-all text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-600",
                    `focus:ring-2 focus:ring-${themeColor}-500/20 focus:bg-white dark:focus:bg-zinc-800`
                  )}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "p-2 text-white rounded-xl transition-colors",
                    `bg-${themeColor}-500 hover:bg-${themeColor}-600 disabled:opacity-50 disabled:hover:bg-${themeColor}-500`
                  )}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
