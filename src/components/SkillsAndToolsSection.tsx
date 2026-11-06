"use client";

import { useRef } from "react";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

interface SkillItem {
  name: string;
  icon: string;
  invertOnDark?: boolean;
}

interface StackCategory {
  title: string;
  items: SkillItem[];
}

const stackCategories: StackCategory[] = [
  {
    title: "FRONTEND",
    items: [
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      },
      {
        name: "ReactJS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      },
      {
        name: "Next.Js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Framer Motion",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
        invertOnDark: true,
      },
      {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      },
      {
        name: "Flutter / Dart",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
      },
    ],
  },
  {
    title: "AI & VISION",
    items: [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      },
      {
        name: "HRNet / Pose",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
      },
      {
        name: "ED-TCN",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
      },
      {
        name: "OpenAI / Groq",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openapi/openapi-original.svg",
      },
      {
        name: "Computer Vision",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
      },
    ],
  },
  {
    title: "BACKEND",
    items: [
      {
        name: "Django",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
        invertOnDark: true,
      },
      {
        name: "Node.Js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      },
    ],
  },
  {
    title: "DATABASE",
    items: [
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      },
      {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
      },
    ],
  },
  {
    title: "TOOLS",
    items: [
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      },
      {
        name: "GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        invertOnDark: true,
      },
      {
        name: "Digital Ocean",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/digitalocean/digitalocean-original.svg",
      },
      {
        name: "Postman",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
      },
      {
        name: "Figma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
      },
    ],
  },
];

function ScrollSkillNode({
  item,
  index,
  total,
  smoothProgress,
}: {
  item: SkillItem;
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
}) {
  const start = 0.08 + (index / Math.max(total, 1)) * 0.45;
  const end = Math.min(start + 0.35, 0.98);
  const opacity = useTransform(
    smoothProgress,
    [0, start, end],
    [0.12, 0.35, 1],
  );
  const y = useTransform(smoothProgress, [0, start, end], [28, 10, 0]);
  const scale = useTransform(smoothProgress, [0, start, end], [0.95, 0.98, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="group flex cursor-default items-center gap-3.5"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.icon}
          alt={item.name}
          className={`h-9 w-9 object-contain ${
            item.invertOnDark ? "invert brightness-200" : ""
          }`}
        />
      </div>
      <span className="text-base font-medium tracking-tight text-zinc-200 transition-colors group-hover:text-white sm:text-xl">
        {item.name}
      </span>
    </motion.div>
  );
}

function StackCategoryRow({ category }: { category: StackCategory }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 92%", "end 58%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    mass: 0.6,
    restDelta: 0.001,
  });
  const titleOpacity = useTransform(smoothProgress, [0, 0.45], [0.12, 1]);
  const titleY = useTransform(smoothProgress, [0, 0.45], [28, 0]);
  const titleScale = useTransform(smoothProgress, [0, 0.45], [0.95, 1]);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 items-start gap-8 border-b border-white/[0.04] py-12 last:border-none md:grid-cols-12 md:gap-12"
    >
      <motion.div
        style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
        className="md:col-span-5"
      >
        <h3 className="select-none text-4xl font-black uppercase leading-none tracking-tight text-zinc-400 sm:text-6xl">
          {category.title}
        </h3>
      </motion.div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 md:col-span-7">
        {category.items.map((item, index) => (
          <ScrollSkillNode
            key={item.name}
            item={item}
            index={index}
            total={category.items.length}
            smoothProgress={smoothProgress}
          />
        ))}
      </div>
    </div>
  );
}

export default function SkillsAndToolsSection() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mb-16 flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-purple-400">
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="h-5 w-5 text-purple-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
            </motion.svg>
            [ 03 // STACK ]
          </div>
          <h2
            className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            My stack
          </h2>
        </div>
        <p className="max-w-md font-mono text-sm text-zinc-500">
          The systems, frameworks, and tools used to build reliable products.
        </p>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {stackCategories.map((category) => (
          <StackCategoryRow key={category.title} category={category} />
        ))}
      </div>
    </section>
  );
}
