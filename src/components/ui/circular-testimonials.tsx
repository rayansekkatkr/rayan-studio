"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
  projectUrl?: string;
  beforeUrl?: string;
}

interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}

interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;

  if (width <= minWidth) return minGap;
  if (width >= maxWidth) {
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  }
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  const colorName = colors.name ?? "#0f172a";
  const colorDesignation = colors.designation ?? "#475569";
  const colorTestimony = colors.testimony ?? "#334155";
  const colorArrowBg = colors.arrowBackground ?? "#0f172a";
  const colorArrowFg = colors.arrowForeground ?? "#f8fafc";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#2f6dff";

  const fontSizeName = fontSizes.name ?? "1.55rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.95rem";
  const fontSizeQuote = fontSizes.quote ?? "1.06rem";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials],
  );

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!autoplay || testimonialsLength <= 1) {
      return;
    }

    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    }, 5000);

    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  const handleNext = useCallback(() => {
    if (testimonialsLength <= 1) {
      return;
    }
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    if (testimonialsLength <= 1) {
      return;
    }
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (!activeTestimonial) {
    return null;
  }

  return (
    <div className="testimonial-container">
      <div className="testimonial-grid">
        <div className="image-container" ref={imageContainerRef}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.src}
              className="testimonial-image"
              data-index={index}
              style={getImageStyle(index)}
            >
              <Image
                src={testimonial.src}
                alt={testimonial.name}
                fill
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="testimonial-image-inner"
              />
            </div>
          ))}
        </div>

        <div className="testimonial-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3
                className="name"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h3>
              <p
                className="designation"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </p>
              <motion.p
                className="quote"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote.split(" ").map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * index,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="actions-row">
            {activeTestimonial.beforeUrl ? (
              <a
                href={activeTestimonial.beforeUrl}
                target="_blank"
                rel="noreferrer"
                className="ghost-link"
              >
                Voir avant
              </a>
            ) : null}
            {activeTestimonial.projectUrl ? (
              <a
                href={activeTestimonial.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="primary-link"
              >
                Voir le projet
              </a>
            ) : null}
          </div>

          <div className="arrow-buttons">
            <button
              className="arrow-button prev-button"
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
            >
              <FaArrowLeft size={18} color={colorArrowFg} />
            </button>
            <button
              className="arrow-button next-button"
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
            >
              <FaArrowRight size={18} color={colorArrowFg} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-container {
          width: 100%;
          max-width: 72rem;
          padding: 1.25rem;
          border-radius: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.85);
          background: linear-gradient(
            142deg,
            rgba(255, 255, 255, 0.88) 0%,
            rgba(236, 245, 255, 0.72) 100%
          );
          backdrop-filter: blur(22px) saturate(150%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.96),
            0 30px 46px rgba(127, 154, 197, 0.2);
        }
        .testimonial-grid {
          display: grid;
          gap: 3rem;
        }
        .image-container {
          position: relative;
          width: 100%;
          height: 20rem;
          perspective: 1000px;
        }
        .testimonial-image {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 1.3rem;
          border: 1px solid rgba(255, 255, 255, 0.75);
          box-shadow: 0 18px 40px rgba(30, 55, 95, 0.22);
          overflow: hidden;
        }
        .testimonial-image-inner {
          object-fit: cover;
        }
        .testimonial-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .name {
          font-weight: 700;
          margin-bottom: 0.35rem;
          letter-spacing: -0.02em;
          font-family: var(--font-display), sans-serif;
        }
        .designation {
          margin-bottom: 1.15rem;
          font-weight: 500;
        }
        .quote {
          line-height: 1.72;
          min-height: 6.4rem;
        }
        .actions-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: 1rem;
        }
        .ghost-link,
        .primary-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 2.35rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          text-decoration: none;
          transition: all 0.25s ease;
          padding: 0 0.95rem;
        }
        .ghost-link {
          border: 1px solid rgba(255, 255, 255, 0.88);
          background: rgba(255, 255, 255, 0.75);
          color: #334155;
        }
        .ghost-link:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-1px);
        }
        .primary-link {
          border: 1px solid rgba(199, 220, 255, 1);
          background: #2f6dff;
          color: #ffffff;
          box-shadow: 0 12px 24px rgba(47, 109, 255, 0.34);
        }
        .primary-link:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 28px rgba(47, 109, 255, 0.4);
        }
        .arrow-buttons {
          display: flex;
          gap: 0.9rem;
          padding-top: 1.2rem;
        }
        .arrow-button {
          width: 2.7rem;
          height: 2.7rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s;
          border: none;
        }
        @media (min-width: 768px) {
          .testimonial-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3.3rem;
          }
          .image-container {
            height: 24rem;
          }
          .arrow-buttons {
            padding-top: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CircularTestimonials;
