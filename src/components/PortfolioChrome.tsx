"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FileText, GitFork, Link, Mail, Phone } from "lucide-react";
import { personalInfo } from "@/app/data/portfolioData";

const navigationLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "SKILLS", href: "#skills" },
  { label: "WORK", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

function getUrl(value: string) {
  const markdownUrl = value.match(/\]\(([^)]+)\)/);
  return markdownUrl?.[1] ?? value;
}

export default function PortfolioChrome() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const ringX = useSpring(rawX, {
    stiffness: 1000,
    damping: 48,
    mass: 0.12,
    restDelta: 0.001,
  });
  const ringY = useSpring(rawY, {
    stiffness: 1000,
    damping: 48,
    mass: 0.12,
    restDelta: 0.001,
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePointer = (event: MouseEvent | PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      if (!isVisible) {
        setIsVisible(true);
      }

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, input, textarea, video, [role="button"], [data-cursor]',
      );
      setIsHovering(Boolean(interactive));
    };
    const handleMouseLeaveViewport = (event: MouseEvent) => {
      const legacyTarget = (event as MouseEvent & {
        toElement?: EventTarget | null;
      }).toElement;
      if (!event.relatedTarget && !legacyTarget) {
        setIsVisible(false);
      }
    };
    const handleFullscreenAndFocus = () => {
      setIsHovering(false);
      setIsVisible(true);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("mousemove", updatePointer, { passive: true });
    window.addEventListener("mousedown", updatePointer, { passive: true });
    document.addEventListener("mouseout", handleMouseLeaveViewport);
    document.addEventListener("fullscreenchange", handleFullscreenAndFocus);
    window.addEventListener("focus", handleFullscreenAndFocus);

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("mousemove", updatePointer);
      window.removeEventListener("mousedown", updatePointer);
      document.removeEventListener("mouseout", handleMouseLeaveViewport);
      document.removeEventListener("fullscreenchange", handleFullscreenAndFocus);
      window.removeEventListener("focus", handleFullscreenAndFocus);
    };
  }, [isVisible, rawX, rawY]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/90 bg-[#050508]/90 px-4 py-5 backdrop-blur-xl sm:px-6 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 lg:gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <a href="#about" className="text-xl font-extrabold tracking-tight text-white transition hover:text-purple-300">
              GJB.
            </a>
            <span className="hidden items-center gap-2 whitespace-nowrap rounded-sm border border-purple-500/25 bg-purple-500/10 px-3 py-1 font-mono text-[11px] text-purple-300 xl:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
              AVAILABLE FOR AI &amp; FULL-STACK ROLES
            </span>
          </div>
          <div className="hidden items-center gap-4 rounded-sm border border-zinc-800/90 bg-[#0E1014] px-4 py-2.5 backdrop-blur-xl md:flex lg:gap-7 lg:px-6">
            {navigationLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-[11px] font-semibold tracking-widest text-zinc-300 transition hover:text-white lg:text-xs">
                {link.label}
              </a>
            ))}
          </div>
          <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-zinc-800/90 bg-[#0E1014] px-4 py-2 text-sm font-medium text-zinc-100 transition hover:-translate-y-0.5 hover:border-purple-500/45">
            Resume <ArrowUpRightIcon />
          </a>
        </div>
      </nav>

      <aside className="fixed bottom-8 left-6 z-40 hidden flex-col gap-5 text-zinc-400 lg:flex">
        <a href={getUrl(personalInfo.github)} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition hover:scale-110 hover:text-purple-400"><GitFork size={19} /></a>
        <a href={getUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition hover:scale-110 hover:text-purple-400"><Link size={19} /></a>
        <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="transition hover:scale-110 hover:text-purple-400"><Mail size={19} /></a>
        <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} aria-label="Phone" className="transition hover:scale-110 hover:text-purple-400"><Phone size={19} /></a>
      </aside>

      <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-6 z-40 hidden items-center gap-2 font-mono text-xs tracking-[0.25em] text-zinc-400 transition hover:text-purple-300 lg:flex">
        RESUME <FileText size={16} />
      </a>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden items-center justify-center will-change-transform md:flex"
        style={{ x: rawX, y: rawY, translateX: "-50%", translateY: "-50%", opacity: isVisible ? 1 : 0 }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.95)]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden items-center justify-center will-change-transform md:flex"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%", opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          animate={{
            width: isHovering ? 42 : 24,
            height: isHovering ? 42 : 24,
            borderColor: isHovering ? "rgba(192, 132, 252, 0.95)" : "rgba(168, 85, 247, 0.55)",
            backgroundColor: isHovering ? "rgba(168, 85, 247, 0.08)" : "rgba(10, 13, 20, 0.15)",
          }}
          transition={{ type: "spring", stiffness: 700, damping: 35, mass: 0.2 }}
          className="flex items-center justify-center rounded-full border-[1.5px] shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
          {isHovering && <span className="absolute -top-6 whitespace-nowrap rounded-sm border border-purple-500/40 bg-[#0A0D14]/95 px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-purple-200 shadow-md">TARGET</span>}
        </motion.div>
      </motion.div>
    </>
  );
}

function ArrowUpRightIcon() {
  return <span aria-hidden="true" className="text-base leading-none">↗</span>;
}
