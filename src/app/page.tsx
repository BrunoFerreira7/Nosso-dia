"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "@/components/animations";
import { FloatingHearts } from "@/components/floating-hearts";
import { SectionDivider } from "@/components/section-divider";
import { FoldCard, FoldSection } from "@/components/fold-card";
import { ImageModal } from "@/components/image-modal";
import Image from "next/image";



/*
  ╔══════════════════════════════════════════════════╗
  ║  ✏️  EDIT YOUR TIMELINE HERE                    ║
  ║  Each object = one card on the page.            ║
  ║  Change title, time, date, description freely.  ║
  ╚══════════════════════════════════════════════════╝
*/

interface TimelineItem {
  emoji: string;
  time: string;
  date: string;
  title: string;
  description: string;
  image: string | null;
}

const TIMELINE: TimelineItem[] = [];

/*
  ╔══════════════════════════════════════════════════╗
  ║  ✏️  EDIT YOUR "YOU & ME" WORDS HERE            ║
  ║  These float around the centre piece.           ║
  ╚══════════════════════════════════════════════════╝
*/
const FLOATING_WORDS = [
  "celebrate",
  "shine",
  "joy",
  "dream",
  "blessed",
  "sparkle",
  "23",
  "glow",
];

export default function Home() {
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <main className="relative overflow-x-hidden">
      <FloatingHearts />

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 text-center sm:px-6"
      >
        {/* Gradient orbs - smaller on mobile */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-orchid/20 blur-[80px] sm:h-96 sm:w-96 sm:blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-plum/15 blur-[60px] sm:h-80 sm:w-80 sm:blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-powder/10 blur-[50px] sm:h-64 sm:w-64 sm:blur-[80px]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10"
        >
          <Reveal variant="fadeDown" duration={0.8}>
            <motion.p
              className="text-xs font-medium tracking-[0.3em] uppercase text-plum sm:text-sm"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Happy 23rd Birthday! 🎂
            </motion.p>
          </Reveal>

          <Reveal variant="scaleUp" delay={0.2} duration={1}>
            <h1 className="mt-2 font-display text-5xl leading-tight tracking-tight sm:mt-4 sm:text-8xl md:text-9xl">
              <motion.span
                className="bg-gradient-to-r from-plum via-saffron to-powder bg-[length:300%_100%] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                Anu
              </motion.span>
            </h1>
          </Reveal>

          <Reveal variant="blur" delay={0.5}>
            <p className="mx-auto mt-4 max-w-sm font-signature text-xl text-plum/70 sm:mt-6 sm:max-w-lg sm:text-2xl md:text-3xl">
              23 looks beautiful on you ✨
            </p>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.7}>
            <p className="mx-auto mt-4 max-w-xs text-xs leading-relaxed text-white/50 sm:mt-6 sm:max-w-md sm:text-sm">
              A corner of the internet dedicated to celebrating you - Anu.
              Every candle, every wish, every smile is for you today.
            </p>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.9}>
            <motion.a
              href="#birthday-wishes"
              className="animate-pulse-glow group mt-8 inline-flex items-center gap-2 rounded-full border border-orchid/30 bg-orchid/10 px-6 py-2.5 text-xs font-medium text-plum backdrop-blur-sm transition-all duration-300 hover:border-orchid/60 hover:bg-orchid/20 sm:mt-10 sm:px-8 sm:py-3 sm:text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Birthday Wishes
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </motion.a>
          </Reveal>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0e0b16] to-transparent sm:h-32" />
      </section>

      <SectionDivider />

      {/* ═══════════ BIRTHDAY WISHES ═══════════ */}
      <FoldSection id="birthday-wishes" className="relative px-4 py-16 sm:px-6 sm:py-28">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orchid/8 blur-[80px] sm:h-96 sm:w-96 sm:blur-[120px]" />
          <div className="absolute left-1/3 top-1/3 h-32 w-32 rounded-full bg-tomato/5 blur-[60px] sm:h-48 sm:w-48" />
          <div className="absolute right-1/3 bottom-1/3 h-32 w-32 rounded-full bg-plum/5 blur-[60px] sm:h-48 sm:w-48" />
        </div>

        <div className="relative mx-auto max-w-lg text-center">
          {/* Floating words orbit */}
          <div className="relative mx-auto mb-8 h-48 w-48 sm:mb-12 sm:h-64 sm:w-64">
            {FLOATING_WORDS.map((word, i) => {
              const angle = (360 / FLOATING_WORDS.length) * i;
              const radius = 38;
              return (
                <motion.span
                  key={word}
                  className="absolute left-1/2 top-1/2 font-signature text-xs text-white/15 sm:text-sm"
                  style={{
                    x: `calc(-50% + ${Math.cos((angle * Math.PI) / 180) * radius}%)`,
                    y: `calc(-50% + ${Math.sin((angle * Math.PI) / 180) * radius}%)`,
                  }}
                  animate={{
                    opacity: [0.1, 0.35, 0.1],
                    scale: [0.9, 1.05, 0.9],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.6,
                  }}
                >
                  {word}
                </motion.span>
              );
            })}

            {/* Centre candle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-[8rem] sm:text-[12rem]"
                animate={{
                  scale: [1, 1.15, 1],
                  filter: [
                    "drop-shadow(0 0 8px rgba(255,170,234,0.3))",
                    "drop-shadow(0 0 20px rgba(255,170,234,0.6))",
                    "drop-shadow(0 0 8px rgba(255,170,234,0.3))",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                🎂
              </motion.span>
            </div>
          </div>

          {/* Main text */}
          <Reveal variant="fadeUp">
            <h2 className="font-heading text-3xl tracking-wide text-plum sm:text-4xl md:text-5xl">
              <motion.span
                whileInView={{ backgroundSize: ["0% 2px", "100% 2px"] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  backgroundImage: "linear-gradient(to right, #FB4D3D, #FFAAEA)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom center",
                  backgroundSize: "0% 2px",
                  paddingBottom: 4,
                }}
              >
                Happy Birthday Anu!
              </motion.span>
            </h2>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.15}>
            <p className="mt-4 font-signature text-lg text-white/30 sm:mt-5 sm:text-xl">
              23 and absolutely glowing
            </p>
          </Reveal>

          {/* Birthday Wishes */}
          <Reveal variant="fadeUp" delay={0.3}>
            <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
              <p className="text-sm leading-relaxed text-white/50 sm:text-base">
                Another year older, another year brighter.
              </p>
              <p className="text-sm leading-relaxed text-white/50 sm:text-base">
                May your day be filled with laughter, cake, and everything you love.
              </p>
              <motion.p
                className="pt-2 font-signature text-lg text-plum/60 sm:text-xl"
                whileInView={{ opacity: [0, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.8 }}
              >
                the world is luckier because you&apos;re in it
              </motion.p>
            </div>
          </Reveal>

          {/* 23 badge */}
          <Reveal variant="scaleUp" delay={0.5}>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-5 py-2.5 sm:mt-10 sm:px-6 sm:py-3">
              <motion.span
                className="text-sm text-saffron/70 sm:text-base"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✦
              </motion.span>
              <span className="text-xs tracking-widest text-white/40 uppercase sm:text-sm">
                Year 23 of Awesome
              </span>
              <motion.span
                className="text-sm text-saffron/70 sm:text-base"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                ✦
              </motion.span>
            </div>
          </Reveal>
        </div>
      </FoldSection>

      <SectionDivider />

      {/* ═══════════ BIRTHDAY LETTER ═══════════ */}
      <FoldSection className="px-4 py-20 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-2xl">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 sm:rounded-3xl sm:p-10 md:p-14"
            whileInView={{
              boxShadow: [
                "0 0 0px rgba(99,29,118,0)",
                "0 0 60px rgba(99,29,118,0.15)",
              ],
            }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            {/* Animated border shimmer */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-transparent sm:rounded-3xl"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,170,234,0.1), transparent) border-box",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Corner decorations */}
            <motion.div
              className="absolute right-4 top-4 text-2xl text-orchid/10 sm:right-6 sm:top-6 sm:text-4xl"
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
            <motion.div
              className="absolute bottom-4 left-4 text-xl text-plum/10 sm:bottom-6 sm:left-6 sm:text-3xl"
              animate={{ rotate: [360, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
            <motion.div
              className="absolute left-4 top-4 text-lg text-saffron/5 sm:left-6 sm:top-6 sm:text-2xl"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              ✶
            </motion.div>

            <Reveal variant="fadeUp">
              <p className="font-signature text-2xl text-plum sm:text-3xl md:text-4xl">
                Dear Anu,
              </p>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.2}>
              <div className="mt-4 space-y-3 text-xs leading-relaxed text-white/60 sm:mt-6 sm:space-y-4 sm:text-sm">
                <p>
                  Happy 23rd birthday! Today is all about you - the amazing, wonderful, one-of-a-kind person that you are.
                </p>
                <p>
                  Twenty-three years around the sun, and look at you. You've grown, you've learned, you've laughed, and you've become someone truly incredible. And this is only the beginning.
                </p>
                <p>
                  May this year bring you everything you've been wishing for. May you smile until your cheeks hurt, may you find joy in the little things, and may you always remember how special you are.
                </p>
                <p>
                  You deserve all the happiness the world has to offer. Today, we celebrate you - your heart, your light, your beautiful soul. The world is brighter with you in it.
                </p>
                <p className="text-white/80">
                  Stay golden, keep shining, and never forget - you are loved, you are enough, and you are magic.
                </p>
              </div>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.4}>
              <p className="mt-6 font-signature text-xl text-saffron/60 sm:mt-8 sm:text-2xl">
                With all the birthday love, 03 June 2026 🎂
              </p>
            </Reveal>
          </motion.div>
        </div>
      </FoldSection>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative border-t border-white/5 py-12 text-center sm:py-16">
        <Reveal variant="fadeUp">
          <motion.p
            className="font-signature text-xl text-plum/40 sm:text-2xl"
            whileInView={{ scale: [0.9, 1] }}
            viewport={{ once: true }}
          >
            Made with{" "}
            <motion.span
              className="inline-block text-saffron/60"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ✨
            </motion.span>
            {" "}for the birthday girl
          </motion.p>
          <p className="mt-3 text-xs text-white/30 sm:mt-4 sm:text-sm">
            your little corner of the internet
          </p>
          <p className="mt-2 text-[10px] text-white/15 sm:text-xs">
            03 June 2026 🎂 celebrate the light you are
          </p>
        </Reveal>
      </footer>
      {/* Image lightbox modal */}
      <ImageModal
        src={modalImage?.src ?? null}
        alt={modalImage?.alt ?? ""}
        onClose={() => setModalImage(null)}
      />
    </main>
  );
}
