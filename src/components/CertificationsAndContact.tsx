"use client";

import React, { useRef, useState } from "react";
import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Copy, ExternalLink, FileText, Mail, Phone } from "lucide-react";
import { certifications, personalInfo } from "@/app/data/portfolioData";

function getUrl(value: string) {
  const markdownUrl = value.match(/\]\(([^)]+)\)/);
  return markdownUrl?.[1] ?? value;
}

function ScrollDelayedCard({
  children,
  index,
  total,
  smoothProgress,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
  className?: string;
}) {
  const start = 0.06 + (index / Math.max(total, 1)) * 0.42;
  const end = Math.min(start + 0.38, 0.98);
  const opacity = useTransform(
    smoothProgress,
    [0, start, end],
    [0.06, 0.16, 1],
  );
  const y = useTransform(smoothProgress, [0, start, end], [28, 16, 0]);
  const scale = useTransform(smoothProgress, [0, start, end], [0.94, 0.97, 1]);

  return (
    <motion.div style={{ opacity, y, scale }} className={className}>
      {children}
    </motion.div>
  );
}

export default function CertificationsAndContact() {
  const [copied, setCopied] = useState(false);
  const credentialsRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: credScroll } = useScroll({
    target: credentialsRef,
    offset: ["start 92%", "end 58%"],
  });
  const smoothCredProgress = useSpring(credScroll, {
    stiffness: 65,
    damping: 18,
    mass: 0.7,
    restDelta: 0.001,
  });

  const { scrollYProgress: connectScroll } = useScroll({
    target: connectRef,
    offset: ["start 92%", "end 62%"],
  });
  const smoothConnectProgress = useSpring(connectScroll, {
    stiffness: 65,
    damping: 18,
    mass: 0.7,
    restDelta: 0.001,
  });

  const credHeaderOpacity = useTransform(smoothCredProgress, [0, 0.42], [0.12, 1]);
  const credHeaderY = useTransform(smoothCredProgress, [0, 0.42], [22, 0]);
  const connectHeaderOpacity = useTransform(
    smoothConnectProgress,
    [0, 0.45],
    [0.12, 1],
  );
  const connectHeaderY = useTransform(smoothConnectProgress, [0, 0.45], [24, 0]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div ref={credentialsRef} className="mb-28">
        <motion.div
          style={{ opacity: credHeaderOpacity, y: credHeaderY }}
          className="mb-14 flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-purple-400">
              [ 06 // CONTACT ]
            </div>
            <h2
              className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Contact &amp; credentials
            </h2>
          </div>
          <p className="max-w-md font-mono text-sm text-zinc-500">
            Verified credentials and direct channels for the next system to
            build.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {certifications.map((certification, index) => (
            <ScrollDelayedCard
              key={certification.title}
              index={index}
              smoothProgress={smoothCredProgress}
              total={certifications.length}
            >
              <article className="arch-card group flex h-full flex-col justify-between p-7">
                <div>
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-purple-400">
                      {certification.issued}
                    </span>
                    <div className="flex h-9 items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/[0.04] px-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getUrl(certification.logo)}
                        alt={certification.provider}
                        draggable={false}
                        onContextMenu={(event) => event.preventDefault()}
                        className="h-5 w-auto max-w-[64px] select-none object-contain"
                      />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                        {certification.provider}
                      </span>
                    </div>
                  </div>
                  <h3
                    className="mb-3 text-xl font-bold leading-snug text-zinc-100"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {certification.title}
                  </h3>
                  <p className="mb-6 text-sm text-zinc-400">
                    {certification.issuer}
                  </p>
                </div>
                <a
                  href={getUrl(certification.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-purple-300 transition hover:text-purple-200"
                >
                  Verify Credential <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </article>
            </ScrollDelayedCard>
          ))}
        </div>
      </div>

      <div ref={connectRef} className="pt-6">
        <motion.div
          style={{ opacity: connectHeaderOpacity, y: connectHeaderY }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-purple-400">
            LET&apos;S CONNECT
          </div>
          <h2
            className="mb-4 text-4xl font-bold tracking-tight text-zinc-100 sm:text-6xl"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Let&apos;s Build Something Extraordinary
          </h2>
          <p className="text-base text-zinc-400 sm:text-lg">
            Have a thoughtful product, research problem, or ambitious system in
            mind? Let&apos;s make it real.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ScrollDelayedCard
            index={0}
            smoothProgress={smoothConnectProgress}
            total={4}
          >
            <div className="arch-card flex h-full flex-col justify-between p-6">
              <div>
                <Mail className="mb-5 h-5 w-5 text-purple-400" />
                <div className="mb-1 font-mono text-xs uppercase tracking-wider text-zinc-500">
                  EMAIL
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="break-all text-sm font-medium text-zinc-100 transition hover:text-purple-300"
                >
                  {personalInfo.email}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-purple-400 transition hover:text-purple-300"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>
          </ScrollDelayedCard>

          <ScrollDelayedCard
            index={1}
            smoothProgress={smoothConnectProgress}
            total={4}
          >
            <a
              href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
              className="arch-card flex h-full flex-col justify-between p-6"
            >
              <div>
                <Phone className="mb-5 h-5 w-5 text-purple-400" />
                <div className="mb-1 font-mono text-xs uppercase tracking-wider text-zinc-500">
                  PHONE
                </div>
                <div className="text-sm font-medium text-zinc-100">
                  {personalInfo.phone}
                </div>
              </div>
              <span className="mt-5 font-mono text-xs text-zinc-500">
                Direct Line
              </span>
            </a>
          </ScrollDelayedCard>

          <ScrollDelayedCard
            index={2}
            smoothProgress={smoothConnectProgress}
            total={4}
          >
            <a
              href={getUrl(personalInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="arch-card flex h-full flex-col justify-between p-6"
            >
              <div>
                <ExternalLink className="mb-5 h-5 w-5 text-purple-400" />
                <div className="mb-1 font-mono text-xs uppercase tracking-wider text-zinc-500">
                  LINKEDIN
                </div>
                <div className="text-sm font-medium text-zinc-100">
                  linkedin.com/in/gian-bernales
                </div>
              </div>
              <span className="mt-5 font-mono text-xs text-purple-400">
                Connect ↗
              </span>
            </a>
          </ScrollDelayedCard>

          <ScrollDelayedCard
            index={3}
            smoothProgress={smoothConnectProgress}
            total={4}
          >
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="arch-card flex h-full flex-col justify-between p-6"
            >
              <div>
                <FileText className="mb-5 h-5 w-5 text-purple-400" />
                <div className="mb-1 font-mono text-xs uppercase tracking-wider text-zinc-500">
                  RESUME PDF
                </div>
                <div className="text-sm font-medium text-zinc-100">
                  Download resume
                </div>
              </div>
              <span className="mt-5 font-mono text-xs text-purple-400">
                Open PDF ↗
              </span>
            </a>
          </ScrollDelayedCard>
        </div>
      </div>
    </section>
  );
}
