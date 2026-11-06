"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { RotateCcw, Send } from "lucide-react";

interface ChatMessage {
  role: "assistant" | "user";
  text: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  text: "Hi! I'm Gian's portfolio assistant, grounded by **Google Gemini**. I only know what is on his resume and in his projects. Ask me about his **53.12% F1-score Computer Vision thesis**, his **UnionBank** internship, his **Payroll & Komiku** projects, or paste a job description below to evaluate his fit.",
};

const STARTER_PROMPTS = [
  "What is his strongest AI or Full-Stack project?",
  "What did he do during his UnionBank internship?",
  "Is he available for full-time engineering roles?",
  "What are his education, tech stack, and credentials?",
];

function renderInlineBold(line: string) {
  const parts = line.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={index} className="font-semibold text-purple-200">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function renderFormattedMessage(text: string) {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);

  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        const trimmed = line.trim();

        if (
          trimmed.startsWith("- ") ||
          trimmed.startsWith("* ") ||
          trimmed.startsWith("• ")
        ) {
          const content = trimmed.replace(/^(-|\*|•)\s+/, "");

          return (
            <div key={index} className="flex items-start gap-2.5 pl-1">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
              <span>{renderInlineBold(content)}</span>
            </div>
          );
        }

        return <p key={index}>{renderInlineBold(trimmed)}</p>;
      })}
    </div>
  );
}

function GeminiStarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gemini-star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
      </defs>
      <path
        d="M12 2C12 7.52285 16.4772 12 22 12C16.4772 12 12 16.4772 12 22C12 16.4772 7.52285 12 2 12C7.52285 12 12 7.52285 12 2Z"
        fill="url(#gemini-star-grad)"
      />
    </svg>
  );
}

export default function AskGianSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cooldownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 65%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 18,
    mass: 0.7,
    restDelta: 0.001,
  });

  const headerOpacity = useTransform(smoothProgress, [0, 0.35], [0.1, 1]);
  const headerY = useTransform(smoothProgress, [0, 0.35], [22, 0]);
  const cardOpacity = useTransform(smoothProgress, [0.1, 0.65], [0.08, 1]);
  const cardY = useTransform(smoothProgress, [0.1, 0.65], [32, 0]);
  const cardScale = useTransform(smoothProgress, [0.1, 0.65], [0.96, 1]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      if (cooldownTimeoutRef.current) {
        clearTimeout(cooldownTimeoutRef.current);
      }
    };
  }, []);

  const sendMessage = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading || isCooldown) return;

    const updatedHistory = [
      ...messages,
      { role: "user" as const, text: trimmed },
    ];
    setMessages(updatedHistory);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(1),
        }),
      });

      const data = await response.json();
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          text:
            data?.reply ||
            "I couldn't process that right now, but you can reach Gian directly at **gianbernales23@gmail.com**.",
        },
      ]);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          text: "Connection interrupted. Feel free to explore Gian's Selected Works above or reach out via **gianbernales23@gmail.com**.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsCooldown(true);
      cooldownTimeoutRef.current = setTimeout(
        () => setIsCooldown(false),
        1_600,
      );
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <section
      id="agent"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className="mb-14 flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-end"
      >
        <div>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-purple-400">
            [ 05 // ASK_GIAN ]
          </div>
          <h2
            className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Ask Gian
          </h2>
        </div>
        <p className="max-w-md font-mono text-sm text-zinc-500">
          Resume-grounded neural interface for evaluating Gian&apos;s
          engineering record, metrics, and role fit.
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
        className="arch-card overflow-hidden border border-zinc-800/90"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 bg-[#080A10] px-5 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span
              className={`h-2 w-2 rounded-full ${
                isLoading
                  ? "animate-ping bg-amber-400"
                  : "animate-pulse bg-purple-500"
              }`}
            />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
              {isLoading ? "GIAN'S.AI • SYNTHESIZING..." : "GIAN'S.AI • ONLINE"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {messages.length > 1 && (
              <button
                type="button"
                onClick={() => setMessages([INITIAL_MESSAGE])}
                data-cursor="true"
                className="inline-flex items-center gap-1.5 rounded-sm border border-zinc-800 px-2.5 py-1 font-mono text-[11px] text-zinc-400 transition hover:border-purple-500/40 hover:text-purple-300"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            )}

            <div className="inline-flex items-center gap-2 rounded-sm border border-purple-500/35 bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-pink-500/10 px-3 py-1 shadow-[0_0_18px_rgba(168,85,247,0.15)]">
              <GeminiStarIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-300 sm:text-[11px]">
                Inference Engine //{" "}
                <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text font-semibold text-transparent">
                  Google Gemini
                </span>
              </span>
            </div>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className="h-[350px] space-y-4 overflow-y-auto scroll-smooth bg-[#0A0D14]/60 p-6"
        >
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-2xl rounded-sm border px-5 py-3.5 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "border-purple-500/40 bg-purple-600/20 text-zinc-100"
                    : "border-zinc-800/90 bg-[#10141F] text-zinc-200"
                }`}
              >
                {message.role === "assistant" ? (
                  renderFormattedMessage(message.text)
                ) : (
                  <p className="whitespace-pre-line">{message.text}</p>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-sm border border-purple-500/30 bg-[#10141F] px-5 py-3.5 font-mono text-xs text-purple-300">
                <GeminiStarIcon className="h-3.5 w-3.5 animate-spin" />
                <span>
                  Google Gemini is analyzing Gian&apos;s portfolio telemetry...
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 border-t border-zinc-800/80 bg-[#080A10]/90 p-6">
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {STARTER_PROMPTS.map((promptText) => (
              <button
                key={promptText}
                type="button"
                disabled={isLoading || isCooldown}
                onClick={() => sendMessage(promptText)}
                data-cursor="true"
                className="rounded-sm border border-zinc-800/90 bg-[#0E121B] px-4 py-2.5 text-left text-xs text-zinc-300 transition hover:border-purple-500/40 hover:bg-purple-950/30 hover:text-zinc-100 disabled:opacity-50"
              >
                {promptText}
              </button>
            ))}
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-2">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                disabled={isLoading || isCooldown}
                maxLength={1000}
                placeholder="Ask about Gian's thesis, UnionBank internship, tech stack, or paste a job description..."
                className="flex-1 rounded-sm border border-zinc-800 bg-[#0E121B] px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-purple-500/60 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || isCooldown || !input.trim()}
                data-cursor="true"
                className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-purple-600 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-purple-500 disabled:bg-purple-900/40 disabled:text-zinc-500"
              >
                <span>Ask</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 font-mono text-[10px] text-zinc-500">
              <span>GROUNDED CONTEXT // VERIFIED RESUME &amp; PROJECT METRICS</span>
              <span>{input.length} / 1000 CHARS (JD MATCHING READY)</span>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
