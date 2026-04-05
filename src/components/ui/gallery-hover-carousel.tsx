"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface GalleryHoverCarouselItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  impact: string;
  before: string;
  after: string;
  image: string;
  url: string;
  beforeUrl?: string;
}

type GalleryHoverCarouselProps = {
  items: GalleryHoverCarouselItem[];
  className?: string;
};

export default function GalleryHoverCarousel({ items, className }: GalleryHoverCarouselProps) {
  const [index, setIndex] = useState(0);
  const canScrollPrev = index > 0;
  const canScrollNext = index < items.length - 1;

  return (
    <div className={cn("relative mt-10", className)}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#2f6dff] backdrop-blur-xl">
          <Sparkles size={13} />
          Réalisations live
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIndex((current) => Math.max(current - 1, 0))}
            disabled={!canScrollPrev}
            aria-label="Slide précédente"
            className="h-11 w-11 border-white/80 bg-white/75 backdrop-blur-xl"
          >
            <ChevronLeft size={17} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIndex((current) => Math.min(current + 1, items.length - 1))}
            disabled={!canScrollNext}
            aria-label="Slide suivante"
            className="h-11 w-11 border-white/80 bg-white/75 backdrop-blur-xl"
          >
            <ChevronRight size={17} />
          </Button>
        </div>
      </div>

      <Carousel index={index} onIndexChange={setIndex}>
        <CarouselContent className="-ml-4 pb-4 pt-2">
          {items.map((item) => (
            <CarouselItem key={item.id} className="basis-[88%] pl-4 sm:basis-[64%] lg:basis-[48%] xl:basis-[38%]">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-[460px] overflow-hidden rounded-[32px] border border-white/85 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(224,238,255,0.66))] shadow-[0_34px_54px_rgba(123,157,217,0.28)]"
              >
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 42vw, (min-width: 640px) 58vw, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/8 via-slate-900/12 to-slate-900/62" />
                </div>

                <div className="pointer-events-none absolute -left-8 top-10 h-36 w-36 rounded-full bg-[#9ec3ff]/50 blur-[70px]" />
                <div className="pointer-events-none absolute -right-8 bottom-16 h-40 w-40 rounded-full bg-white/50 blur-[80px]" />

                <div className="absolute left-5 top-5 z-20 flex max-w-[85%] flex-wrap items-center gap-2">
                  <Badge variant="neutral" className="border-white/80 bg-white/78 text-slate-800">
                    {item.category}
                  </Badge>
                  <span className="rounded-full border border-[#d6e7ff] bg-[#eff5ff]/88 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2f6dff]">
                    {item.impact}
                  </span>
                </div>

                <div className="absolute inset-x-4 bottom-4 z-20">
                  <div className="rounded-[24px] border border-white/80 bg-white/75 p-4 backdrop-blur-2xl transition duration-500 group-hover:-translate-y-1 group-hover:bg-white/84">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-slate-900">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                      </div>
                      <span className="mt-1 rounded-full border border-[#d7e7ff] bg-white/90 p-2 text-[#2f6dff]">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-xl border border-slate-900/10 bg-slate-900 px-3 py-2.5 text-white">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Avant</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-300">{item.before}</p>
                      </div>
                      <div className="rounded-xl border border-[#d4e5ff] bg-[#edf4ff] px-3 py-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2f6dff]">Après</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-700">{item.after}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.beforeUrl ? (
                        <Button asChild variant="outline" size="sm" className="h-9">
                          <Link href={item.beforeUrl} target="_blank" rel="noreferrer">
                            Voir avant
                          </Link>
                        </Button>
                      ) : null}
                      <Button asChild size="sm" className="h-9">
                        <Link href={item.url} target="_blank" rel="noreferrer">
                          Voir le projet
                          <ExternalLink size={14} className="ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
