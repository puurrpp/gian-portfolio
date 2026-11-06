"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { careerTimeline } from "@/app/data/portfolioData";

export default function CareerTimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const animatedHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"],
  );

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mb-16 flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-end">
        <div>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-purple-400">
            [ 02 // EXPERIENCE ]
          </div>
          <h2
            className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            My career &amp; experience
          </h2>
        </div>
        <p className="max-w-md font-mono text-sm text-zinc-500">
          A timeline of applied research, engineering practice, and academic
          milestones.
        </p>
      </div>

      <div ref={containerRef} className="relative pb-10">
        <div className="absolute bottom-0 left-1/2 top-4 hidden w-[2px] -translate-x-1/2 bg-purple-500/10 md:block" />
        <motion.div
          style={{ height: animatedHeight }}
          className="absolute left-1/2 top-4 hidden w-[2px] -translate-x-1/2 bg-purple-500 md:block"
        >
          <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-purple-500 bg-purple-300 shadow-[0_0_25px_10px_rgba(168,85,247,0.55)]" />
        </motion.div>

        <div className="relative z-10 space-y-16 md:space-y-24">
          {careerTimeline.map((item, index) => {
            const itemId = item.subtitle.toLowerCase().includes("unionbank")
              ? "experience-unionbank"
              : `experience-${item.year.toLowerCase()}`;

            return (
            <motion.article
              key={`${item.role}-${item.year}`}
              id={itemId}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="relative scroll-mt-28 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-4">
                <h3 className="text-2xl font-semibold leading-snug text-white sm:text-3xl">
                  {item.role}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-purple-400/90 sm:text-base">
                  {item.subtitle}
                </p>
              </div>

              <div className="md:col-span-2 md:pr-6 md:text-right">
                <p className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  {item.year}
                </p>
              </div>

              <div className="hidden md:col-span-1 md:block" aria-hidden="true" />

              <div className="md:col-span-5">
                <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {item.description}
                </p>
                <p className="mt-2 font-mono text-xs text-zinc-500">
                  {item.period}
                </p>
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
