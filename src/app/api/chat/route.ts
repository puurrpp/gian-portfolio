import { NextResponse } from "next/server";
import {
  personalInfo,
  careerTimeline,
  projects,
  skills,
  certifications,
} from "@/data/portfolioData";

const ipRateMap = new Map<
  string,
  { count: number; windowStart: number; lastRequest: number }
>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQ_PER_IP_PER_MIN = 6;
const MIN_INTERVAL_MS = 1_500;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRateMap.get(ip);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipRateMap.set(ip, { count: 1, windowStart: now, lastRequest: now });
    return false;
  }

  if (now - record.lastRequest < MIN_INTERVAL_MS) {
    return true;
  }

  record.count += 1;
  record.lastRequest = now;
  return record.count > MAX_REQ_PER_IP_PER_MIN;
}

const SYSTEM_INSTRUCTION = `
You are GIAN'S.AI, the official portfolio assistant for Gian Jim Bernales, powered by Google Gemini.
Your audience consists of technical recruiters, hiring managers, and engineering leads evaluating Gian for full-time roles.

### FORMATTING & GROUNDING RULES:
1. Keep answers concise, sharp, and helpful: 2 to 4 sentences, or up to 3 short bullet points starting with "- ".
2. You may use **bold text** for key metrics, technologies, and project names. Do not use markdown headers or code blocks.
3. Base answers strictly on the verified portfolio facts below. Do not invent or assume certifications, awards, or employers.
4. If a recruiter pastes a job description, match Gian's actual projects, UnionBank internship, and tech stack directly against its requirements.
5. Politely decline off-topic questions and redirect to Gian's engineering portfolio and availability.

### VERIFIED PORTFOLIO CONTEXT:
- **Name & Role**: Gian Jim Bernales, AI & Computer Vision Engineer and Full-Stack Developer based in Metro Manila, Philippines.
- **Education**: B.S. in Computer Science, Cum Laude, University of Santo Tomas (UST), Manila, Philippines.
- **Availability**: Completed his college internship in June 2026 and graduated Cum Laude. Actively seeking full-time AI/Computer Vision, Full-Stack, Software Engineering, or Backend Engineering roles. Available for immediate onboarding.
- **Experience (UnionBank of the Philippines, Apr 2026 - Jun 2026)**: HR Tech & Systems UAT Intern. Conducted UAT for Biometrics, QR Scanner validation workflows, and Pension modules. Engineered lookup formulas that reduced manual data auditing time by 50% to 80% and isolated ledger anomalies across datasets.
- **Project 01**: Led a 4-person Computer Vision thesis team building YOLOv8 + HRNet pose extraction with ED-TCN and Spatial-Temporal Pooling attention. The system achieved a 53.12% F1-score versus an 18.05% short-range baseline on UCF-Crime.
- **Project 02**: Built a localized Payroll & Attendance System for 30+ employees with ReactJS, Tailwind CSS, PostgreSQL, Docker, Digital Ocean, and Postman.
- **Project 03**: Served as Solutions Architect & Pitch Lead for Komiku at the Breaking Enigma 2025 National Hackathon, designing a platform for Filipino komiks publishing and monetization.
- **Verified Certifications**: ${JSON.stringify(certifications)}
- **Technical Stack**: ${JSON.stringify(skills)}
- **Direct Contact**: Email: ${personalInfo.email} | Phone: ${personalInfo.phone} | LinkedIn: ${personalInfo.linkedin}
- **Portfolio Data Export**: ${JSON.stringify({ personalInfo, careerTimeline, projects, skills, certifications })}
`.trim();

function buildFallbackReply(query: string): string {
  const q = query.toLowerCase();

  if (
    q.includes("intern") ||
    q.includes("available") ||
    q.includes("hire") ||
    q.includes("job") ||
    q.includes("full-time") ||
    q.includes("role") ||
    q.includes("start")
  ) {
    return `Gian graduated **Cum Laude** with a B.S. in Computer Science from the University of Santo Tomas and completed his **UnionBank** internship in June 2026. He is available for full-time **AI/Computer Vision Engineer, Full-Stack Developer, and Software Engineer** roles. Contact him at **${personalInfo.email}** or **${personalInfo.phone}**.`;
  }
  if (
    q.includes("unionbank") ||
    q.includes("uat") ||
    q.includes("experience") ||
    q.includes("work")
  ) {
    return "At **UnionBank**, Gian served as an **HR Tech & Systems UAT Intern** (Apr - Jun 2026):\n- Led UAT for Biometrics, QR Scanner validation, and Pension modules.\n- Engineered lookup formulas that cut manual data auditing time by **50% to 80%** while isolating ledger anomalies.";
  }
  if (
    q.includes("strongest") ||
    q.includes("thesis") ||
    q.includes("shoplifting") ||
    q.includes("vision") ||
    q.includes("f1")
  ) {
    return "Gian's flagship AI project is his **Computer Vision Undergraduate Thesis**, where he led a 4-person team building a **YOLOv8 + HRNet + ED-TCN** pipeline with Spatial-Temporal Pooling that achieved a **53.12% F1-score** versus an 18.05% short-range baseline on UCF-Crime. He also built a Dockerized **ReactJS + PostgreSQL Payroll System** on Digital Ocean.";
  }
  if (
    q.includes("cert") ||
    q.includes("credential") ||
    q.includes("ibm") ||
    q.includes("coursera") ||
    q.includes("freecodecamp") ||
    q.includes("education") ||
    q.includes("ust") ||
    q.includes("cum laude")
  ) {
    return "Gian graduated **Cum Laude** in B.S. Computer Science from **UST** and holds three verified credentials:\n- **Explore Emerging Tech** (IBM / Credly Verified Badge, Jan 2026)\n- **Databases and SQL for Data Science with Python** (Coursera, Nov 2024)\n- **Responsive Web Design** (freeCodeCamp, Aug 2023)";
  }
  if (q.includes("payroll") || q.includes("docker") || q.includes("postgres")) {
    return "For the **Payroll & Attendance System**, Gian engineered a localized full-stack application for 30+ employees using **ReactJS, Tailwind CSS, and PostgreSQL**, containerized with **Docker** and deployed on **Digital Ocean**.";
  }
  if (q.includes("komiku") || q.includes("hackathon") || q.includes("enigma")) {
    return "At the **Breaking Enigma 2025 National Hackathon**, Gian served as **Solutions Architect & Pitch Lead** for **Komiku**, a centralized digital home for Filipino komiks focused on creator monetization and IP protection.";
  }
  if (
    q.includes("stack") ||
    q.includes("skill") ||
    q.includes("tech") ||
    q.includes("language")
  ) {
    return "Gian's core stack spans **Python, PyTorch, TensorFlow, YOLOv8, HRNet, and ED-TCN** for AI and Computer Vision, paired with **ReactJS, Next.js, TypeScript, Tailwind CSS, Docker, PostgreSQL, and Digital Ocean** for full-stack development.";
  }

  return `Gian is a **Cum Laude B.S. Computer Science** graduate from UST specializing in **AI/Computer Vision** and **Full-Stack Development**, with enterprise UAT experience at **UnionBank**. Ask about his **53.12% F1-score thesis**, **Payroll System**, **Komiku**, or paste a job description to evaluate his fit.`;
}

type ChatHistoryMessage = { role?: unknown; text?: unknown };

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "local-client";
    const body = await req.json();
    const rawMessage =
      typeof body?.message === "string" ? body.message.trim() : "";
    const history = Array.isArray(body?.history)
      ? body.history.slice(-6)
      : [];

    if (!rawMessage) {
      return NextResponse.json(
        {
          reply:
            "Please enter a question or paste a job description to evaluate Gian's fit.",
        },
        { status: 400 },
      );
    }

    const userMessage = rawMessage.slice(0, 1000);
    if (isRateLimited(ip)) {
      return NextResponse.json({
        reply: buildFallbackReply(userMessage),
        source: "rate-shield-fallback",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: buildFallbackReply(userMessage),
        source: "local-knowledge-engine",
      });
    }

    const formattedContents = [
      ...history.map((msg: ChatHistoryMessage) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: String(msg.text || "").slice(0, 700) }],
      })),
      { role: "user", parts: [{ text: userMessage }] },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents: formattedContents,
          generationConfig: { temperature: 0.25, maxOutputTokens: 350 },
        }),
      },
    );

    if (!response.ok) {
      console.error("Gemini API request failed with status", response.status);
      return NextResponse.json({
        reply: buildFallbackReply(userMessage),
        source: "fallback-engine",
      });
    }

    const data = await response.json();
    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      buildFallbackReply(userMessage);

    return NextResponse.json({ reply: aiText, source: "gemini-2.5-flash" });
  } catch (error) {
    console.error("Gemini chat route failed", error);
    return NextResponse.json({
      reply:
        "Gian is a **Cum Laude B.S. Computer Science** graduate from UST and an AI/Computer Vision & Full-Stack Engineer. Ask about his **YOLOv8 + HRNet + ED-TCN** thesis, **UnionBank** internship, or reach him at **gianbernales23@gmail.com**.",
      source: "fallback-engine",
    });
  }
}
