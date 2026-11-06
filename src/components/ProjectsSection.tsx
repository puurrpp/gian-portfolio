"use client";

import { useEffect, useRef, useState } from "react";
import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/app/data/portfolioData";
import type { ReactNode } from "react";

function ThesisVideoPreview({
  videoUrl,
}: {
  videoUrl: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<"ready" | "error">("ready");

  return (
    <div className="arch-card overflow-hidden shadow-[0_0_35px_rgba(168,85,247,0.12)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#0E1117] px-4 py-3">
        <span className="flex min-w-0 items-center gap-2 font-mono text-[10px] text-zinc-400 sm:text-xs">
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-purple-400" />
          <span className="truncate">
            ACTUAL MODEL INFERENCE // YOLOv8 + HRNet + ED-TCN
          </span>
        </span>
        <span className="shrink-0 rounded-sm border border-purple-400/20 bg-purple-400/10 px-2 py-1 font-mono text-[10px] text-purple-300">
          F1: 53.12% (UCF-CRIME)
        </span>
      </div>
      <div className="group relative bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          autoPlay
          muted
          loop
          playsInline
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          onContextMenu={(event) => event.preventDefault()}
          onError={() => setVideoState("error")}
          className="aspect-video w-full select-none bg-black object-cover"
        />
        {videoState === "error" && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/65 p-6 text-center font-mono text-xs text-zinc-300">
            Drop thesis-demo.mp4 into /public to preview actual inference video
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectPreview({
  className,
  images,
  videoUrl,
  onImageClick,
}: {
  className?: string;
  images?: string[];
  videoUrl?: string;
  onImageClick: (index: number) => void;
}) {
  if (videoUrl) {
    return (
      <div className={`${className ?? ""} mt-8 flex w-full flex-col justify-center md:mt-0`}>
        <ThesisVideoPreview videoUrl={videoUrl} />
      </div>
    );
  }

  if (images && images.length > 0) {
    return (
      <div className={`${className ?? ""} mt-8 flex w-full flex-col justify-center md:mt-0`}>
        <div className="w-full space-y-4">
          <div className="mb-2 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-500" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                SYSTEM_PREVIEW // LIVE_INTERFACE
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {images.map((image, index) => (
              <button
                type="button"
                onClick={() => onImageClick(index)}
                onContextMenu={(event) => event.preventDefault()}
                data-cursor="true"
                key={image}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-sm border border-zinc-800/90 bg-[#0A0D14] text-left transition-all hover:border-purple-500/50"
                aria-label={`Open project interface ${index + 1} fullscreen`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={`Project interface ${index + 1}`}
                  draggable={false}
                  onContextMenu={(event) => event.preventDefault()}
                  className="h-auto w-full select-none object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="Suite-overlay absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-sm border border-purple-500/50 bg-[#0A0D14]/95 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
                    [ EXPAND FULLSCREEN ⤢ ]
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function ScrollRevealProject({
  children,
  index,
  total,
  smoothProgress,
}: {
  children: ReactNode;
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
}) {
  const start = Math.min(0.1 + index * 0.15, 0.7, total);
  const end = Math.min(start + 0.3, 1);
  const opacity = useTransform(
    smoothProgress,
    [0, start, end],
    [0.05, 0.15, 1],
  );
  const y = useTransform(smoothProgress, [0, start, end], [40, 20, 0]);
  const scale = useTransform(smoothProgress, [0, start, end], [0.96, 0.98, 1]);

  return (
    <motion.div style={{ opacity, y, scale }} className="w-full">
      {children}
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
    title: string;
  } | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 70%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 18,
    mass: 0.7,
    restDelta: 0.001,
  });
  const headerOpacity = useTransform(smoothProgress, [0, 0.25], [0.1, 1]);
  const headerY = useTransform(smoothProgress, [0, 0.25], [20, 0]);

  useEffect(() => {
    if (!lightbox) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
      } else if (event.key === "ArrowRight") {
        setLightbox((current) =>
          current
            ? {
                ...current,
                index: (current.index + 1) % current.images.length,
              }
            : null,
        );
      } else if (event.key === "ArrowLeft") {
        setLightbox((current) =>
          current
            ? {
                ...current,
                index:
                  (current.index - 1 + current.images.length) %
                  current.images.length,
              }
            : null,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  return (
    <>
      <section id="work" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:px-12 md:py-28">
        <div ref={sectionRef}>
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="mb-16 flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-end"
          >
            <div>
              <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-purple-400">
                [ 04 // WORKS ]
              </div>
              <h2
                className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Selected works
              </h2>
            </div>
            <p className="max-w-md font-mono text-sm text-zinc-500">
              Engineering intelligent vision models, agentic AI, and full-stack
              platforms.
            </p>
          </motion.div>

          <div className="space-y-12 md:space-y-20">
            {projects.map((project, index) => (
              <ScrollRevealProject
                key={project.index}
                index={index}
                smoothProgress={smoothProgress}
                total={projects.length}
              >
                <article
                  id={`project-${project.index}`}
                  className="arch-card scroll-mt-28 p-8 md:p-10"
                >
                  <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
                    <div className="md:col-span-6">
                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-5xl font-extrabold text-purple-400 md:text-6xl">
                          {project.index}
                        </span>
                        <span className="rounded-sm border border-zinc-800/90 bg-[#0E1014] px-3 py-1 text-xs text-zinc-300">
                          {project.category}
                        </span>
                        <span className="font-mono text-xs text-zinc-500">{project.period}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white md:text-3xl">{project.title}</h3>
                      <p className="mt-2 font-medium text-purple-400">{project.role}</p>
                      {project.presentationUrl && (
                        <a
                          href={project.presentationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-300 underline decoration-purple-500/50 underline-offset-4 transition hover:text-purple-200 hover:decoration-purple-300"
                        >
                          Undergraduate Thesis <ArrowUpRight size={15} />
                        </a>
                      )}
                      <p className="mt-5 text-sm leading-relaxed text-zinc-400 sm:text-base">{project.description}</p>
                      <ul className="mt-5 space-y-2 text-sm leading-relaxed text-zinc-500">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((technology) => (
                          <span key={technology} className="rounded-sm border border-zinc-800/90 bg-[#0E1014] px-3 py-1 font-mono text-xs text-zinc-300">
                            {technology}
                          </span>
                        ))}
                      </div>
                      {project.presentationUrl && (
                        <a
                          href={project.presentationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center gap-2 rounded-sm border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-medium text-purple-200 transition hover:bg-purple-500/20 sm:text-sm"
                        >
                          View Thesis Presentation Slides <ArrowUpRight size={15} />
                        </a>
                      )}
                    </div>
                    <ProjectPreview
                      className="md:col-span-6"
                      images={project.images}
                      videoUrl={project.videoUrl}
                      onImageClick={(imageIndex) => {
                        if (project.images) {
                          setLightbox({
                            images: project.images,
                            index: imageIndex,
                            title: project.title,
                          });
                        }
                      }}
                    />
                  </div>
                </article>
              </ScrollRevealProject>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          onContextMenu={(event) => event.preventDefault()}
          className="fixed inset-0 z-[150] flex select-none flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen project image"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="mb-4 flex w-full max-w-6xl items-center justify-between rounded-sm border border-zinc-800 bg-[#0A0D14] px-4 py-2.5"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-purple-400">
              PREVIEW {String(lightbox.index + 1).padStart(2, "0")} /{" "}
              {String(lightbox.images.length).padStart(2, "0")} {"//"}{" "}
              {lightbox.title}
            </span>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              data-cursor="true"
              className="rounded-sm border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-mono text-xs text-purple-300 transition hover:bg-purple-500/20"
            >
              [ CLOSE ✕ ]
            </button>
          </div>
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative flex w-full max-w-6xl items-center justify-center"
          >
            {lightbox.images.length > 1 && (
              <button
                type="button"
                data-cursor="true"
                onClick={() =>
                  setLightbox({
                    ...lightbox,
                    index:
                      (lightbox.index - 1 + lightbox.images.length) %
                      lightbox.images.length,
                  })
                }
                className="absolute left-2 z-10 rounded-sm border border-purple-500/40 bg-[#0A0D14]/90 px-3.5 py-2 font-mono text-sm text-purple-300 transition hover:bg-purple-950/80 sm:left-4"
                aria-label="Previous image"
              >
                ←
              </button>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.images[lightbox.index]}
              alt={`${lightbox.title} fullscreen preview`}
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
              className="h-auto max-h-[80vh] max-w-full select-none rounded-sm border border-purple-500/30 object-contain shadow-[0_0_50px_rgba(168,85,247,0.2)]"
            />
            {lightbox.images.length > 1 && (
              <button
                type="button"
                data-cursor="true"
                onClick={() =>
                  setLightbox({
                    ...lightbox,
                    index: (lightbox.index + 1) % lightbox.images.length,
                  })
                }
                className="absolute right-2 z-10 rounded-sm border border-purple-500/40 bg-[#0A0D14]/90 px-3.5 py-2 font-mono text-sm text-purple-300 transition hover:bg-purple-950/80 sm:right-4"
                aria-label="Next image"
              >
                →
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
