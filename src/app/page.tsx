
import AboutSection from "@/components/home/AboutSection";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ServicesSection from "@/components/home/ServicesSection";
import { getServices } from "@/models/service";

export default async function  Home() {
  const services = await getServices();
  return (
    <main>
      <HeroSection></HeroSection>
      <ServicesSection services={services}></ServicesSection>
      <AboutSection></AboutSection>
      <HowItWorksSection></HowItWorksSection>
      <CTASection></CTASection>
    </main>
  );
}
