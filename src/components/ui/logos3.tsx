"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import type React from "react";
import {
  Beer,
  Coffee,
  Croissant,
  Hotel,
  Store,
  UtensilsCrossed,
  Wheat,
} from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel-embla";

interface Logo {
  id: string;
  description: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const defaultLogos: Logo[] = [
  { id: "restaurants", description: "Restaurants", label: "Restaurants", icon: UtensilsCrossed },
  { id: "cafes", description: "Cafés", label: "Cafés", icon: Coffee },
  { id: "hotels", description: "Hôtels", label: "Hôtels", icon: Hotel },
  { id: "boulangeries", description: "Boulangeries", label: "Boulangeries", icon: Wheat },
  { id: "patisseries", description: "Pâtisseries", label: "Pâtisseries", icon: Croissant },
  { id: "bars", description: "Bars", label: "Bars", icon: Beer },
  { id: "commerces-locaux", description: "Commerces locaux", label: "Commerces locaux", icon: Store },
];

const Logos3 = ({
  heading = "Secteurs accompagnés",
  logos = defaultLogos,
  className = "",
}: Logos3Props) => {
  return (
    <section className={className}>
      <div className="container flex flex-col items-center text-center">
        <p className="my-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{heading}</p>
      </div>
      <div className="pt-2 md:pt-3">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-6xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                speed: 0.7,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/2 justify-center pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <div className="mx-3 flex shrink-0 items-center justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/85 bg-white/78 px-3 py-2 text-sm font-medium text-slate-600 backdrop-blur-xl">
                      <logo.icon className="h-4 w-4 text-[#2f6dff]" />
                      {logo.label}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#eef4ff] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#eef4ff] to-transparent" />
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
