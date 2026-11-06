import AskGianSection from "@/components/AskGianSection";
import CareerTimelineSection from "@/components/CareerTimelineSection";
import CertificationsAndContact from "@/components/CertificationsAndContact";
import HeroSection from "@/components/HeroSection";
import PortfolioChrome from "@/components/PortfolioChrome";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsAndToolsSection from "@/components/SkillsAndToolsSection";

export default function Home() {
  return (
    <main className="ambient-glow relative min-h-screen bg-[#050508] text-zinc-100">
      <PortfolioChrome />
      <HeroSection />
      <CareerTimelineSection />
      <SkillsAndToolsSection />
      <ProjectsSection />
      <AskGianSection />
      <CertificationsAndContact />
    </main>
  );
}
