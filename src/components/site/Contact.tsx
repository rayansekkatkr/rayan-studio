"use client";

import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { BRAND } from "@/lib/brand";
import { isEnglish, type Locale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";

const projectTypes = [
  { id: "dated-site", labelFr: "J'ai un site daté", labelEn: "I have a dated site" },
  { id: "no-site", labelFr: "Je n'ai pas encore de site", labelEn: "I do not have a site yet" },
  { id: "other", labelFr: "Autre besoin", labelEn: "Other need" },
];

const diagnosticPointsFr = ["Image et crédibilité", "Mobile et parcours de contact", "SEO, DNS, hébergement, VPS"];
const diagnosticPointsEn = ["Image and credibility", "Mobile and contact journey", "SEO, DNS, hosting, VPS"];
const diagnosticDeliverablesFr = ["3 priorités d'action", "capture commentée", "plan de correction simple"];
const diagnosticDeliverablesEn = ["3 action priorities", "annotated screenshot", "simple correction plan"];

export function Contact({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const diagnosticPoints = en ? diagnosticPointsEn : diagnosticPointsFr;
  const diagnosticDeliverables = en ? diagnosticDeliverablesEn : diagnosticDeliverablesFr;
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    projectType: "dated-site",
    businessType: "",
    email: "",
    siteUrl: "",
    message: "",
    companyWebsite: "",
  });

  return (
    <section id="contact" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <Card className="h-full rounded-none border-[#2a231d]/14 bg-[#fffaf0]/82">
            <CardHeader>
              <SectionHeading
                eyebrow={en ? "Contact" : "Contact"}
                title={en ? "Let's discuss your project" : "Discutons de votre projet"}
                description={
                  en
                    ? "Send your current website if you have one. I will reply with a clear first diagnosis."
                    : "Envoyez votre site actuel si vous en avez un. Je vous répondrai avec un premier diagnostic clair."
                }
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href={`mailto:${BRAND.email}`}
                onClick={() => trackEvent("email_click", { location: "contact" })}
                className="flex items-center gap-3 rounded-none border border-[#2a231d]/14 bg-[#f5f1e8] px-4 py-3 text-sm font-bold text-[#63584d]"
              >
                <Mail size={16} className="text-[#d94f2b]" />
                {BRAND.email}
              </a>
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "contact" })}
                className="flex items-center gap-3 rounded-none border border-[#2a231d]/14 bg-[#f5f1e8] px-4 py-3 text-sm font-bold text-[#63584d]"
              >
                <Phone size={16} className="text-[#d94f2b]" />
                {BRAND.phoneDisplay} (WhatsApp)
              </a>
              <div className="border border-[#2a231d]/14 bg-[#17120f] p-4 text-[#fffaf0]">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#f0a064]">
                  {en ? "What I check first" : "Ce que je regarde d'abord"}
                </p>
                <div className="mt-3 space-y-2">
                  {diagnosticPoints.map((point) => (
                    <div key={point} className="flex items-start gap-2 text-sm font-semibold text-[#f7ead8]">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#f0a064]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-[#2a231d]/14 bg-[#f5f1e8] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#d94f2b]">
                  {en ? "Diagnosis deliverable" : "Livrable diagnostic"}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#342b24]">
                  {en
                    ? "You receive a concrete reply within 24h, before any quote."
                    : "Vous recevez une réponse sous 24h, concrète, avant tout devis."}
                </p>
                <div className="mt-3 grid gap-2">
                  {diagnosticDeliverables.map((point) => (
                    <div key={point} className="flex items-start gap-2 text-sm font-semibold text-[#63584d]">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#d94f2b]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-[#2a231d]/14 bg-[#fffaf0]/88">
            <CardHeader>
              <CardTitle>{en ? "Tell me about your needs" : "Parlez-moi de votre besoin"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={async (event) => {
                  event.preventDefault();
                  setErrorMessage(null);
                  setIsSent(false);
                  setIsSubmitting(true);

                  try {
                    const response = await fetch("/api/contact", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(formData),
                    });

                    if (!response.ok) {
                      const data = (await response.json()) as { error?: string };
                      throw new Error(data.error || (en ? "Unable to send for now." : "Envoi impossible pour le moment."));
                    }

                    trackEvent("form_submit", { location: "contact", form: "lead_contact" });
                    setIsSent(true);
                    setFormData({
                      firstName: "",
                      projectType: "dated-site",
                      businessType: "",
                      email: "",
                      siteUrl: "",
                      message: "",
                      companyWebsite: "",
                    });
                  } catch (error) {
                    setErrorMessage(
                      error instanceof Error
                        ? error.message
                        : en
                          ? "An unexpected error occurred."
                          : "Une erreur inattendue est survenue.",
                    );
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#342b24]">
                    {en ? "What situation are you in?" : "Votre situation actuelle"}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {projectTypes.map((type) => {
                      const active = formData.projectType === type.id;

                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, projectType: type.id }))}
                          className={`min-h-11 rounded-none border px-3 py-2 text-sm font-black transition ${
                            active
                              ? "border-[#17120f] bg-[#17120f] text-[#fffaf0]"
                              : "border-[#2a231d]/14 bg-[#fffaf0]/72 text-[#63584d] hover:bg-[#fffaf0] hover:text-[#17120f]"
                          }`}
                          aria-pressed={active}
                        >
                          {en ? type.labelEn : type.labelFr}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-semibold text-[#342b24]">
                      {en ? "First name" : "Prénom"}
                    </label>
                    <Input
                      id="firstName"
                      placeholder={en ? "Marie" : "Marie"}
                      value={formData.firstName}
                      onChange={(event) => setFormData((prev) => ({ ...prev, firstName: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="businessType" className="text-sm font-semibold text-[#342b24]">
                      {en ? "Business type" : "Type de commerce"}
                    </label>
                    <Input
                      id="businessType"
                      placeholder={en ? "Example: restaurant, hotel, bakery..." : "Exemple : restaurant, hôtel, boulangerie..."}
                      value={formData.businessType}
                      onChange={(event) => setFormData((prev) => ({ ...prev, businessType: event.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-[#342b24]">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={en ? "you@business.com" : "vous@commerce.fr"}
                    value={formData.email}
                    onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="siteUrl" className="text-sm font-semibold text-[#342b24]">
                    {en ? "Current website URL (if you have one)" : "URL de votre site actuel (si vous en avez un)"}
                  </label>
                  <Input
                    id="siteUrl"
                    type="url"
                    placeholder={en ? "https://your-business.com" : "https://votre-entreprise.fr"}
                    value={formData.siteUrl}
                    onChange={(event) => setFormData((prev) => ({ ...prev, siteUrl: event.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-[#342b24]">
                    {en ? "Your request" : "Votre besoin"}
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder={
                      en
                        ? "Example: I need a new website. I want more calls and WhatsApp messages."
                        : "Exemple : j'ai besoin d'un nouveau site. Je veux plus d'appels et de messages WhatsApp."
                    }
                    value={formData.message}
                    onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                    required
                  />
                </div>

                <input
                  tabIndex={-1}
                  autoComplete="off"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={(event) => setFormData((prev) => ({ ...prev, companyWebsite: event.target.value }))}
                  className="hidden"
                  aria-hidden="true"
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (en ? "Sending..." : "Envoi en cours...") : en ? "Request my diagnosis" : "Demander mon diagnostic"}
                  <ArrowRight size={15} className="ml-2" />
                </Button>

                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#63584d]">
                  {en
                    ? "No commitment • Reply within 24h • Practical first diagnosis"
                    : "Sans engagement • Réponse sous 24h • Premier diagnostic concret"}
                </p>

                {isSent ? (
                  <p className="rounded-none border border-[#2a231d]/14 bg-[#f5f1e8] px-3 py-2 text-sm font-bold text-[#17120f]">
                    {en
                      ? "Thank you, your request has been sent successfully. I'll reply very soon."
                      : "Merci, votre demande est bien envoyée. Je vous réponds très vite."}
                  </p>
                ) : null}
                {errorMessage ? (
                  <p className="rounded-none border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
                    {errorMessage}
                  </p>
                ) : null}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
