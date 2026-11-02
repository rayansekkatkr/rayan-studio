"use client";

import { useState } from "react";
import Image from "next/image";
import { CONCEPT_CAPTURE_DATE, CONCEPTS } from "@/content/concepts";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Before / after of concept redesigns: pick a business, then drag (or arrow-key) the divider.
 * The range input is the real control, so keyboard and screen readers get it for free.
 */
export function ConceptGallery({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const [index, setIndex] = useState(0);
  const [split, setSplit] = useState(50);
  const concept = CONCEPTS[index];
  const src = (variant: "before" | "after") => `/realisations/concepts/${concept.slug}-${variant}.webp`;

  return (
    <div className="mt-8">
      <div role="group" aria-label={fr ? "Choisir un exemple" : "Choose an example"} className="flex flex-wrap gap-2">
        {CONCEPTS.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            aria-pressed={i === index}
            onClick={() => {
              setIndex(i);
              setSplit(50);
            }}
            className={cn(
              "border px-4 py-2.5 text-left text-sm transition-colors duration-150",
              i === index
                ? "border-rs-fg bg-rs-fg text-rs-bg"
                : "border-(--rs-border) hover:border-rs-fg active:bg-(--rs-border)",
            )}
          >
            <span className="block font-semibold">{item.name}</span>
            <span className={cn("block text-xs", i === index ? "opacity-75" : "text-rs-muted")}>
              {item.sector[locale]} · {item.place}
            </span>
          </button>
        ))}
      </div>

      <div className="relative mt-6 aspect-8/5 select-none overflow-hidden border border-(--rs-border) bg-(--rs-border)">
        <Image
          key={`${concept.slug}-before`}
          src={src("before")}
          alt={fr ? `Page d'accueil actuelle du site ${concept.name}` : `Current ${concept.name} home page`}
          fill
          sizes="(min-width: 1280px) 74rem, 94vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
          <Image
            key={`${concept.slug}-after`}
            src={src("after")}
            alt={fr ? `Maquette concept de la page d'accueil ${concept.name}` : `Concept mockup of the ${concept.name} home page`}
            fill
            sizes="(min-width: 1280px) 74rem, 94vw"
            className="object-cover object-top"
          />
          <span className="absolute bottom-3 right-3 bg-black/75 px-2 py-1 text-xs text-white">
            {fr ? "Photos d'illustration" : "Illustrative photos"}
          </span>
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
          style={{ left: `${split}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm font-bold text-black shadow-md">
            ↔
          </span>
        </span>
        <span aria-hidden className="pointer-events-none absolute left-3 top-3 bg-black/75 px-2 py-1 text-xs font-semibold text-white">
          {fr ? "Avant" : "Before"}
        </span>
        <span aria-hidden className="pointer-events-none absolute right-3 top-3 bg-black/75 px-2 py-1 text-xs font-semibold text-white">
          {fr ? "Après" : "After"}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={split}
          onChange={(event) => setSplit(Number(event.target.value))}
          aria-label={fr ? `Comparer avant et après, ${concept.name}` : `Compare before and after, ${concept.name}`}
          aria-valuetext={fr ? `${100 - split} % de la maquette visible` : `${100 - split}% of the mockup visible`}
          className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
        <span aria-hidden className="pointer-events-none absolute inset-0 hidden outline-solid outline-2 -outline-offset-2 outline-(--rs-accent-fg) peer-focus-visible:block" />
      </div>
      <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-rs-muted">
        {fr
          ? `Refonte concept réalisée par le studio, non commandée par ${concept.name}. Avant : capture du site actuel le ${CONCEPT_CAPTURE_DATE.fr}. Après : textes repris uniquement du site de ${concept.name}, photos d'illustration libres de droits.`
          : `Concept redesign by the studio, not commissioned by ${concept.name}. Before: capture of the current website on ${CONCEPT_CAPTURE_DATE.en}. After: copy taken only from ${concept.name}'s own website, royalty-free illustrative photos.`}
      </p>
    </div>
  );
}
