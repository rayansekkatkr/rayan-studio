"use client";

import { ArrowRight, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const [isSent, setIsSent] = useState(false);

  return (
    <section id="contact" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <Card className="h-full">
            <CardHeader>
              <SectionHeading
                eyebrow="Contact"
                title="Discutons de votre projet"
                description="Je vous propose une première direction claire pour créer ou refondre votre site. Réponse en moins de 24h."
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href="mailto:rayan.sekkat@gmail.com"
                onClick={() => trackEvent("email_click", { location: "contact" })}
                className="flex items-center gap-3 rounded-2xl border border-white/85 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700"
              >
                <Mail size={16} className="text-[#2f6dff]" />
                rayan.sekkat@gmail.com
              </a>
              <a
                href="https://wa.me/33636365696"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "contact" })}
                className="flex items-center gap-3 rounded-2xl border border-white/85 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700"
              >
                <Phone size={16} className="text-[#2f6dff]" />
                +33 6 36 36 56 96 (WhatsApp)
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parlez-moi de votre besoin</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  trackEvent("form_submit", { location: "contact", form: "lead_contact" });
                  setIsSent(true);
                }}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-semibold text-slate-800">
                      Prénom
                    </label>
                    <Input id="firstName" placeholder="Marie" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="businessType" className="text-sm font-semibold text-slate-800">
                      Type de commerce
                    </label>
                    <Input id="businessType" placeholder="Restaurant, hôtel, café..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-800">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="vous@commerce.fr" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-800">
                    Votre besoin
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Création ou refonte ? Vos objectifs ? Votre délai ?"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Envoyer ma demande
                  <ArrowRight size={15} className="ml-2" />
                </Button>

                <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                  Sans engagement • Réponse sous 24h • WhatsApp direct disponible
                </p>

                {isSent ? (
                  <p className="rounded-xl border border-[#d5e5ff] bg-[#edf4ff] px-3 py-2 text-sm font-medium text-[#1f5ed4]">
                    Merci, votre demande est bien envoyée. Je vous réponds très vite.
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
