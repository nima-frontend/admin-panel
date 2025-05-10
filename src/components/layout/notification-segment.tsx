'use client'

import { useState, useRef, useEffect } from "react"
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "../ui/button";

export default function NotificationSegment() {
  const [messages, setMessages] = useState([
  { id: 1, variant: "sent", fallback: "NI",url:"/avatar.png", text: "Hello, I need a rundown on recent stats",isLoading: false, },
  { id: 2, variant: "received", fallback: "AL",url:"/person_1.jpg", text: "Hello Sir, I'm on it.",isLoading: false, },
  { id: 3, variant: "received", fallback: "AL",url:"/person_2.jpg", text: "Hi everyone, When is the due date to the project?",isLoading: false, },
  { id: 4, variant: "sent", fallback: "AL",url:"/avatar.png", text: "By the end of the next month",isLoading: false, },
  { id: 5, variant: "received", fallback: "AL",url:"/person_3.jpg", text: "",isLoading:true },
])
const [input, setInput] = useState("")
const bottomRef = useRef<HTMLDivElement | null>(null)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        variant: "sent",
        fallback: "NI",
        url:"/avatar.png",
        text: input,
        isLoading: false,
      },
    ])
    setInput("")
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])


  return (
<div className="flex flex-col h-[calc(100vh-4rem)] p-4 space-y-4">

  <div className="flex-1 overflow-y-auto pr-2">
   <ChatMessageList>
          {messages.map(({ id, variant, fallback,url, text,isLoading }) => (
            <ChatBubble key={id} variant={variant as "sent" | "received"}>
              <ChatBubbleAvatar src={url} fallback={fallback} />
              <ChatBubbleMessage variant={variant as "sent" | "received"} isLoading={isLoading}>
                {text}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          <div ref={bottomRef} />
        </ChatMessageList>
  </div>

  <form
        onSubmit={handleSend}
        className="mt-4 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
      >
        <ChatInput
          placeholder="Type your message here..."
          className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex items-center p-3 pt-0">
          <Button variant="ghost" size="icon" type="button">
            <Paperclip className="size-4" />
            <span className="sr-only">Attach file</span>
          </Button>

          <Button variant="ghost" size="icon" type="button">
            <Mic className="size-4" />
            <span className="sr-only">Use Microphone</span>
          </Button>

          <Button size="sm" className="ml-auto gap-1.5" type="submit">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
</div>

  );
}