import { Contact } from "@/components/site/Contact";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Navbar } from "@/components/site/Navbar";
import { Pricing } from "@/components/site/Pricing";
import { ProblemSolution } from "@/components/site/ProblemSolution";
import { Process } from "@/components/site/Process";
import { SoapBubbles } from "@/components/site/SoapBubbles";
import { Services } from "@/components/site/Services";
import { Showcase } from "@/components/site/Showcase";
import { Testimonials } from "@/components/site/Testimonials";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Rayan Studio",
    description:
      "Freelance web spécialisé en création et refonte de sites vitrines premium pour commerces locaux français.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://rayanstudio.fr",
    areaServed: "France",
    email: "rayan.sekkat@gmail.com",
    telephone: "+33636365696",
    serviceType: [
      "Création de site internet",
      "Refonte de site existant",
      "Web design premium",
      "UX orientée conversion",
    ],
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden isolate">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pointer-events-none fixed inset-0 -z-20 hero-aurora" />
      <div className="pointer-events-none fixed inset-0 -z-10 hero-vignette" />
      <SoapBubbles className="fixed inset-0 z-0 opacity-75" variant="hero" />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ProblemSolution />
        <Services />
        <Showcase />
        <Process />
        <Pricing />
        <Testimonials />
        <Faq />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
