import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosSend } from "react-icons/io";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I\'m the Graphic Verse AI assistant. Ask me about our design services, pricing, or contact information!' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [typingMessage, setTypingMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typingMessage]);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Typing effect function
    const startTypingEffect = (fullText) => {
        setIsTyping(true);
        setTypingMessage('');
        let index = 0;

        const interval = setInterval(() => {
            if (index < fullText.length) {
                setTypingMessage(prev => prev + fullText[index]);
                index++;
            } else {
                clearInterval(interval);
                setIsTyping(false);
                // Add the complete message to messages array
                setMessages(prev => [...prev, { role: 'assistant', content: fullText }]);
                setTypingMessage('');
            }
        }, 20); // Adjust speed as needed

        return () => clearInterval(interval);
    };

    // Convert URLs in text to clickable links
    // Convert markdown links [text](url) and raw URLs to clickable links
    const linkifyText = (text) => {
        // First, handle markdown style links: [text](url)
        const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

        let processedText = text;
        const markdownMatches = [];
        let match;

        // Extract all markdown links
        while ((match = markdownLinkRegex.exec(text)) !== null) {
            markdownMatches.push({
                fullMatch: match[0],
                text: match[1],
                url: match[2],
                index: match.index
            });
        }

        // Replace markdown links with React components
        if (markdownMatches.length > 0) {
            const parts = [];
            let lastIndex = 0;

            for (const mdLink of markdownMatches) {
                // Add text before the link
                if (mdLink.index > lastIndex) {
                    parts.push(text.substring(lastIndex, mdLink.index));
                }
                // Add the link component
                parts.push(
                    <a
                        key={mdLink.index}
                        href={mdLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF7537] hover:text-[#022F2B] underline transition-colors"
                    >
                        {mdLink.text}
                    </a>
                );
                lastIndex = mdLink.index + mdLink.fullMatch.length;
            }
            // Add remaining text
            if (lastIndex < text.length) {
                parts.push(text.substring(lastIndex));
            }
            return <>{parts}</>;
        }

        // If no markdown links, handle raw URLs (convert to clickable with domain as text)
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);

        return parts.map((part, index) => {
            if (urlRegex.test(part)) {
                // Extract domain for display text
                let displayText = part;
                try {
                    const urlObj = new URL(part);
                    displayText = urlObj.hostname.replace('www.', '');
                } catch (e) {
                    // If URL parsing fails, keep original
                }
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF7537] hover:text-[#022F2B] underline transition-colors"
                    >
                        {displayText}
                    </a>
                );
            }
            return part;
        });
    };

    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading || isTyping) return;

        const userMessage = inputValue.trim();
        setInputValue('');

        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            // Prepare conversation history (last 10 messages to save tokens)
            const history = messages.slice(-10).map(msg => ({
                role: msg.role,
                content: msg.content
            }));
            history.push({ role: 'user', content: userMessage });

            const response = await fetch('https://grahic-verse-server.vercel.app/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: history }),
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            // Start typing effect with the response
            startTypingEffect(data.reply);

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I\'m having trouble connecting right now. Please try again later.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-[#FF7537] text-white p-4 rounded-full shadow-lg hover:bg-[#022F2B] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF7537] focus:ring-offset-2"
                aria-label="Open chat assistant"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-50"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed bottom-24 right-6 w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                            style={{ height: '500px', maxHeight: 'calc(100vh - 120px)' }}
                        >
                            {/* Header */}
                            <div className="bg-[#022F2B] text-white p-4 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-[#FF7537] rounded-full animate-pulse" />
                                    <div>
                                        <h3 className="font-semibold">Graphic Verse AI</h3>
                                        <p className="text-xs text-gray-300">Online • Ready to help</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:text-gray-300 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user'
                                                ? 'bg-[#FF7537] text-white'
                                                : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                                                }`}
                                        >
                                            {message.role === 'assistant' ? (
                                                <div className="space-y-1">
                                                    {linkifyText(message.content)}
                                                </div>
                                            ) : (
                                                <div>{message.content}</div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Typing Indicator */}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white text-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 max-w-[80%]">
                                            {linkifyText(typingMessage)}
                                            <span className="inline-block w-1.5 h-4 bg-[#FF7537] ml-0.5 animate-pulse" />
                                        </div>
                                    </div>
                                )}

                                {/* Loading Indicator (while waiting for API) */}
                                {isLoading && !isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white text-gray-500 rounded-lg p-3 shadow-sm border border-gray-200">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="border-t border-gray-200 p-4 bg-white">
                                <div className="flex gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask about our services, pricing, or contact info..."
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF7537] focus:border-transparent"
                                        disabled={isLoading || isTyping}
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={!inputValue.trim() || isLoading || isTyping}
                                        className="bg-[#FF7537] text-white px-3 py-2 rounded-full hover:bg-[#022F2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <IoIosSend />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Graphic Verse LLC Assistant
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;