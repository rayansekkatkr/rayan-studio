"use client";

import { ArrowRight, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { BRAND } from "@/lib/brand";
import { isEnglish, type Locale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";

export function Contact({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    businessType: "",
    email: "",
    message: "",
    website: "",
  });

  return (
    <section id="contact" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <Card className="h-full">
            <CardHeader>
              <SectionHeading
                eyebrow={en ? "Contact" : "Contact"}
                title={en ? "Let's discuss your project" : "Discutons de votre projet"}
                description={
                  en
                    ? "I'll provide a clear first direction to create or redesign your website. Reply within 24h."
                    : "Je vous propose une première direction claire pour créer ou refondre votre site. Réponse en moins de 24h."
                }
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href={`mailto:${BRAND.email}`}
                onClick={() => trackEvent("email_click", { location: "contact" })}
                className="flex items-center gap-3 rounded-2xl border border-white/85 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700"
              >
                <Mail size={16} className="text-[#2f6dff]" />
                {BRAND.email}
              </a>
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "contact" })}
                className="flex items-center gap-3 rounded-2xl border border-white/85 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700"
              >
                <Phone size={16} className="text-[#2f6dff]" />
                {BRAND.phoneDisplay} (WhatsApp)
              </a>
            </CardContent>
          </Card>

          <Card>
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
                      throw new Error(data.error || "Envoi impossible pour le moment.");
                    }

                    trackEvent("form_submit", { location: "contact", form: "lead_contact" });
                    setIsSent(true);
                    setFormData({
                      firstName: "",
                      businessType: "",
                      email: "",
                      message: "",
                      website: "",
                    });
                  } catch (error) {
                    setErrorMessage(error instanceof Error ? error.message : "Une erreur inattendue est survenue.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-semibold text-slate-800">
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
                    <label htmlFor="businessType" className="text-sm font-semibold text-slate-800">
                      {en ? "Business type" : "Type de commerce"}
                    </label>
                    <Input
                      id="businessType"
                      placeholder={en ? "Restaurant, hotel, cafe..." : "Restaurant, hôtel, café..."}
                      value={formData.businessType}
                      onChange={(event) => setFormData((prev) => ({ ...prev, businessType: event.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-800">
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
                  <label htmlFor="message" className="text-sm font-semibold text-slate-800">
                    {en ? "Your request" : "Votre besoin"}
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder={
                      en
                        ? "Creation or redesign? Your goals? Your timeline?"
                        : "Création ou refonte ? Vos objectifs ? Votre délai ?"
                    }
                    value={formData.message}
                    onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                    required
                  />
                </div>

                <input
                  tabIndex={-1}
                  autoComplete="off"
                  name="website"
                  value={formData.website}
                  onChange={(event) => setFormData((prev) => ({ ...prev, website: event.target.value }))}
                  className="hidden"
                  aria-hidden="true"
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (en ? "Sending..." : "Envoi en cours...") : en ? "Send my request" : "Envoyer ma demande"}
                  <ArrowRight size={15} className="ml-2" />
                </Button>

                <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                  {en
                    ? "No commitment • Reply within 24h • Direct WhatsApp available"
                    : "Sans engagement • Réponse sous 24h • WhatsApp direct disponible"}
                </p>

                {isSent ? (
                  <p className="rounded-xl border border-[#d5e5ff] bg-[#edf4ff] px-3 py-2 text-sm font-medium text-[#1f5ed4]">
                    {en
                      ? "Thank you, your request has been sent successfully. I'll reply very soon."
                      : "Merci, votre demande est bien envoyée. Je vous réponds très vite."}
                  </p>
                ) : null}
                {errorMessage ? (
                  <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
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
