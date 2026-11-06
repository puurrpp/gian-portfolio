"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/app/data/portfolioData";

function HudBracket({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-6 w-6 border-purple-400/80 ${className}`}
    />
  );
}

export default function HeroSection() {
  const [hudEnabled, setHudEnabled] = useState(true);

  return (
    <section
      id="about"
      className="flex min-h-screen items-center px-5 pb-16 pt-28 sm:px-8 md:px-12 md:pt-32"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-12 lg:gap-12">
        <div className="md:col-span-7">
          <div className="mb-7 flex flex-wrap gap-2">
            <span className="rounded-sm border border-zinc-800/90 bg-[#0E1014] px-3 py-1.5 text-xs font-medium text-zinc-300">
              🎓 BS Computer Science • Cum Laude (UST)
            </span>
            <span className="rounded-sm border border-zinc-800/90 bg-[#0E1014] px-3 py-1.5 text-xs font-medium text-zinc-300">
              📍 Marikina City, PH
            </span>
          </div>

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-purple-400">
            HELLO, I&apos;M
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl">
            GIAN JIM
            <br />
            BERNALES
          </h1>
          <h2 className="mt-3 text-2xl font-bold sm:text-4xl">
            <span className="text-purple-400">
              AI &amp; Computer Vision Engineer
            </span>
            <span className="text-white"> &amp; Full-Stack Developer</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {personalInfo.summary}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            <a href="#experience-unionbank" data-cursor="true" className="group relative block overflow-hidden rounded-sm border border-orange-500/45 bg-gradient-to-br from-orange-500/[0.20] via-[#170E08] to-[#0A0D14] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400/85 hover:shadow-[0_0_25px_rgba(249,115,22,0.22)]">
              <div className="mb-2.5 flex items-center justify-between gap-2">
                <div className="font-mono text-sm font-bold tracking-tight text-orange-300 sm:text-base">
                  UnionBank
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-orange-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">↗</span>
                  <div className="flex h-6 shrink-0 items-center justify-center rounded-sm border border-orange-300/50 bg-[#F37021] px-1.5 shadow-[0_0_10px_rgba(243,112,33,0.4)]">
                    <span className="select-none font-sans text-[10px] font-black leading-none tracking-tighter text-white">UB</span>
                  </div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-orange-100/75">HR Tech &amp; Systems UAT Intern</p>
            </a>

            <a href="#project-01" data-cursor="true" className="group relative block overflow-hidden rounded-sm border border-purple-500/35 bg-gradient-to-br from-purple-500/[0.14] via-[#0B0D16] to-[#0A0D14] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-400/75 hover:shadow-[0_0_25px_rgba(168,85,247,0.18)]">
              <div className="mb-2.5 flex items-center justify-between gap-2">
                <div className="font-mono text-sm font-bold tracking-tight text-purple-200 sm:text-base">
                  53.12% F1-Score
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-purple-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">↗</span>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-purple-400/30 bg-purple-500/15">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg"
                      alt="Computer Vision"
                      draggable={false}
                      onContextMenu={(event) => event.preventDefault()}
                      className="h-3.5 w-3.5 select-none object-contain"
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-zinc-400">YOLOv8 + HRNet + ED-TCN Thesis</p>
            </a>

            <a href="#project-02" data-cursor="true" className="group relative block overflow-hidden rounded-sm border border-emerald-500/35 bg-gradient-to-br from-emerald-500/[0.14] via-[#0A1612] to-[#0A0D14] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/75 hover:shadow-[0_0_25px_rgba(16,185,129,0.18)]">
              <div className="mb-2.5 flex items-center justify-between gap-2">
                <div className="truncate font-mono text-sm font-bold tracking-tight text-emerald-200 sm:text-base">
                  Payroll System
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-emerald-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">↗</span>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-emerald-400/30 bg-emerald-500/15">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                      alt="ReactJS"
                      draggable={false}
                      onContextMenu={(event) => event.preventDefault()}
                      className="h-3.5 w-3.5 select-none object-contain"
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-zinc-400">ReactJS, Docker &amp; PostgreSQL</p>
            </a>

            <a href="#project-03" data-cursor="true" className="group relative block overflow-hidden rounded-sm border border-amber-400/45 bg-gradient-to-br from-amber-400/[0.18] via-red-500/[0.10] to-[#12152E] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/85 hover:shadow-[0_0_25px_rgba(251,191,36,0.20)]">
              <div className="mb-2.5 flex items-center justify-between gap-2">
                <div className="bg-gradient-to-r from-amber-300 via-yellow-200 to-red-400 bg-clip-text font-mono text-sm font-bold tracking-tight text-transparent sm:text-base">
                  Komiku
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-amber-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">↗</span>
                  <div className="flex h-6 w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-amber-400/50 bg-[#1E2246] shadow-[0_0_8px_rgba(251,191,36,0.2)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/komiku_logo.png"
                    alt="Komiku"
                    draggable={false}
                    onContextMenu={(event) => event.preventDefault()}
                    className="h-full w-full select-none object-cover"
                  />
                  </div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-amber-100/75">
                Architecture &amp; Pitch • Breaking Enigma
              </p>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-sm bg-purple-600 px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all hover:-translate-y-0.5 hover:bg-purple-500"
            >
              Explore Selected Works <ArrowUpRight size={17} />
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-zinc-800/90 bg-[#0E1014] px-7 py-3.5 font-medium text-zinc-100 transition-all hover:-translate-y-0.5 hover:border-purple-500/45"
            >
              View Full Resume (PDF) <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="group relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-none">
            <div className="absolute -inset-2 rounded-sm bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-purple-400/10 opacity-75 blur-2xl transition duration-500 group-hover:opacity-100" />
            <div className="arch-card relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#0E1117] px-3 py-3">
                <span className="flex min-w-0 items-center gap-2 truncate font-mono text-[11px] text-zinc-300">
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-purple-400" />
                  VISION_ID // GIAN_BERNALES.JPG
                </span>
                <button
                  type="button"
                  onClick={() => setHudEnabled((enabled) => !enabled)}
                  className="shrink-0 rounded-sm border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 font-mono text-[10px] text-purple-300"
                  aria-pressed={hudEnabled}
                >
                  [ HUD: {hudEnabled ? "ON" : "OFF"} ]
                </button>
              </div>
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personalInfo.photoUrl}
                  alt="Gian Jim A. Bernales"
                  draggable={false}
                  onContextMenu={(event) => event.preventDefault()}
                  className="aspect-[4/5] w-full select-none object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/20 to-transparent" />
                {hudEnabled && (
                  <>
                    <HudBracket className="left-4 top-4 border-l-2 border-t-2" />
                    <HudBracket className="right-4 top-4 border-r-2 border-t-2" />
                    <HudBracket className="bottom-24 left-4 border-b-2 border-l-2" />
                    <HudBracket className="bottom-24 right-4 border-b-2 border-r-2" />
                    <span className="absolute right-4 top-4 rounded-sm border border-purple-500/40 bg-black/65 px-2.5 py-1 font-mono text-[10px] text-purple-300 backdrop-blur-md">
                      SUBJECT_VERIFIED // 99.8%
                    </span>
                  </>
                )}
                <div className="absolute inset-x-4 bottom-4 rounded-sm border border-zinc-800/90 bg-black/50 p-3 backdrop-blur-md">
                  <p className="text-sm font-semibold text-white">
                    B.S. Computer Science • Cum Laude
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">
                    University of Santo Tomas • Manila, PH
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
