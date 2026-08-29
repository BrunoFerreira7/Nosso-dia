"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "@/components/animations";
import { FloatingHearts } from "@/components/floating-hearts";
import { SectionDivider } from "@/components/section-divider";
import { FoldCard, FoldSection } from "@/components/fold-card";
import { ImageModal } from "@/components/image-modal";
import {BackgroundMusic} from "@/components/background-music";
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
  date: string;
  title: string;
  description: string;
  image: string | null;
}

const TIMELINE: TimelineItem[] = [
  {
    emoji: "💬",
    date: "17/05/2026",
    title: "Nossa primeiro beijo no centro",
    description:
      "O nosso primeiro beijo carrega a magia dos recomeços. Naquele dia no centro, depois de conversarmos e nos entendermos, o tempo pareceu congelar só para nós dois. Quando nossos lábios se tocaram, o barulho da rua sumiu, tudo parou e o primeiro capítulo da nossa história realmente começou. A gente ainda não sabia que aquele beijo nos traria tão longe, mas foi ele a semente desse amor gigante que dividimos hoje.🥰.",
    image: null,
  },
  {
    emoji: "💘",
    date: "10/04/2026",
    title: "O primeiro date",
    description:
      "Nosso primeiro date oficial não poderia ter acontecido em uma data mais especial: o seu aniversário! Lembro como se fosse hoje do brilho nos seus olhos e de ver você toda felizona ganhando aquele relógio de presente. Ver a sua alegria naquele dia encheu meu coração e me deu a certeza de que eu queria arrancar esses sorrisos de você para o resto da vida. Ali, enquanto comemorávamos a sua vida, começamos a construir a nossa juntos.",
    image: "/imgs/niver.jpeg",
  },
  {
    emoji: "💋",
    date: "16/04/2026",
    title: "Açai da baixada",
    description:
      "Aquele dia na hamburgueria em Irajá é a prova viva de que a nossa história é cheia de momentos aleatórios e inesquecíveis. Fomos até lá e, no fim das contas, ficamos só na batata frita! A gente riu tanto que o hambúrguer nem fez falta. São essas pequenas loucuras diárias que tornam o nosso relacionamento tão leve e divertido. Não importa o que a gente faça, desde que eu esteja com você.",
    image: "/imgs/acai.jpeg",
  },
  {
    emoji: "💕",
    date: "05/05/2026",
    title: "Planetario",
    description:
      "Aquele nosso passeio no planetário foi simplesmente mágico. Olhar para todas aquelas estrelas, constelações e planetas só me fez ter uma certeza: o meu universo inteiro estava ali, de mãos dadas comigo. Enquanto a gente viajava pelas galáxias projetadas no teto, eu só conseguia pensar no quão sortudo eu sou por ter a estrela mais brilhante de todas iluminando a minha vida.",
    image: "/imgs/plametario.jpeg",
  },
  {
    emoji: "❤️",
    date: "9/05/2026",
    title: "Quinta da boa vista",
    description:
      "O nosso date duplo no mesmo dia! Tem coisa melhor do que um piquenique a dois, cheio de chamego e risadas na Quinta da Boa Vista? Tem sim: emendar esse passeio direto na Feira de São Cristóvão para comer um baião de dois perfeito! Aquele dia foi a prova de que a gente sabe aproveitar a vida juntos, seja curtindo a calmaria do parque ou se acabando na comida nordestina. Com você, até o roteiro mais inusitado vira a melhor lembrança.",
    image: "/imgs/quinta.jpeg",
  },
  {
    emoji: "❤️",
    date: "28/05/2026",
    title: "Urca",
    description:
      "O nosso fim de tarde na Urca foi daqueles momentos que a gente guarda para sempre. Ficar ali, lado a lado, vendo o pôr do sol dar lugar à noite, trouxe uma paz gigante para o meu coração. Naquele instante, não precisávamos de mais nada: só a brisa, aquela vista incrível do Rio e a sua companhia, que faz qualquer lugar do mundo se tornar o meu favorito.",
    image: "/imgs/urca.jpeg",
  },
  {
    emoji: "❤️",
    date: "31/05/2026",
    title: "Feira da Gloria",
    description:
      "A Feira da Glória sempre vai ter um gostinho especial nas nossas lembranças. Foi lá que nos acabamos naquele sanduíche de alcatra com queijo no pão de alho e também dividimos o nosso primeiríssimo burrito! São esses momentos leves, cheios de comilança e sorrisos compartilhados, que mostram como a gente se diverte juntos em qualquer situação. Colecionar essas pequenas primeiras vezes ao seu lado é, sem dúvida, o meu passatempo favorito.",
    image: "/imgs/feira.jpeg",
  },
  {
    emoji: "❤️",
    date: "04/06/2026",
    title: "Outback",
    description:
      "Quando te levei ao Outback pela primeira vez, o meu maior objetivo era simples: te impressionar e proporcionar uma experiência inesquecível para nós dois. Eu queria que cada detalhe fosse especial, porque você merece o mundo inteiro. Entre as nossas risadas, o jantar e os brindes, eu tive a certeza de que cada segundo ao seu lado é um presente. Ver você toda feliz e sorrindo para mim naquela mesa foi, de longe, a melhor parte da noite.",
    image: "/imgs/outback.jpeg",
  },
  {
    emoji: "❤️",
    date: "06/06/2026",
    title: "Cafe do forte",
    description:
      "Aquele dia no Café do Forte foi a verdadeira definição de um date perfeito. Nós dois juntos, comidinhas deliciosas e aquela vista maravilhosa e icônica de Copacabana de pano de fundo. É engraçado como a imensidão do mar e a beleza do Forte eram incríveis, mas eu mal conseguia desviar o olhar de você. Foi um daqueles passeios que enchem o coração de paz e deixam a nossa história ainda mais especial.",
    image: "/imgs/forte.jpeg",
  },
  {
    emoji: "❤️",
    date: "12/06/2026",
    title: "nosso primeira dia dos namorados",
    description:
      "O nosso primeiro Dia dos Namorados não poderia ter sido em um lugar mais charmoso. A Ilha da Gigóia, com aquele clima aconchegante, a travessia de barco e a calmaria no meio do Rio de Janeiro, foi o cenário perfeito para celebrar o nosso amor. Lembrar daquele dia é sentir de novo a emoção e a alegria de ter passado o nosso primeiro 12 de junho juntos, criando memórias que eu vou guardar no coração para sempre.",
    image: "/imgs/namorado.jpeg",
  },
  {
    emoji: "❤️",
    date: "09/07/2026",
    title: "Teatro municipal e afins",
    description:
      "Explorar o Theatro Municipal e toda aquela região da Cinelândia de mãos dadas com você foi uma experiência maravilhosa. É bom demais poder turistar pela nossa própria cidade, admirar a história de cada cantinho e transformar uma caminhada pelo centro em um verdadeiro encontro romântico. A beleza daquele lugar é imensa, mas a alegria e a paz que eu sinto passeando ao seu lado conseguem ser ainda maiores.",
    image: "/imgs/teatro.jpeg",
  },
  {
    emoji: "❤️",
    date: "18/07/2026",
    title: "Ilha de paqueta",
    description:
      "Andamos horrores na Ilha de Paquetá, mas cada passo valeu a pena! Aquele clima charmoso e tranquilo fez a gente se conectar de uma forma linda e super profunda, caminhando de mãos dadas e dividindo os sonhos. E para recompensar toda aquela nossa caminhada, tivemos um almoço perfeito onde eu provei parmegiana pela primeira vez! Descobrir novos lugares, experimentar sabores novos e sentir o nosso amor crescendo a cada passeio é o que faz a nossa história ser tão especial.",
    image: "/imgs/paqueta.jpeg",
  },
  {
    emoji: "💍",
    date: "22/08/2026",
    title: "Pedido de Namoro Oficial",
    description:
      "Mesmo depois de todos os nossos dates incríveis, das risadas e da nossa sintonia absurda, meu coração disparou no dia do pedido oficial. Eu queria que tudo fosse perfeito, porque a mulher incrível que você é não merece nada menos que o mundo. Quando finalmente fiz a pergunta e vi o seu sorriso ao dizer sim, senti uma alegria gigantesca tomar conta de mim. Aquele dia marcou o início oficial de nós dois e sacramentou a certeza de que encontrei o grande amor da minha vida.",
    image: "/imgs/3.png",
  },
  
  
  
];

const HERO_PHOTOS = [
  "/imgs/1.1.jpeg",
  "/imgs/1.2.jpeg",
  "/imgs/1.3.jpeg",
  "/imgs/1.4.jpeg",
  "/imgs/1.5.jpeg",
  "/imgs/1.6.jpeg",
  "/imgs/1.7.jpeg",
  "/imgs/1.8.jpeg",
  "/imgs/1.9.jpeg",
  "/imgs/2.0.jpeg",
  "/imgs/2.1.jpeg",
  "/imgs/2.2.jpeg",
  "/imgs/2.3.jpeg",
  "/imgs/2.4.jpeg",
  "/imgs/2.5.jpeg",
  "/imgs/2.6.jpeg",
  "/imgs/2.7.jpeg",
  "/imgs/2.8.jpeg",
];
/*
  ╔══════════════════════════════════════════════════╗
  ║  ✏️  EDIT YOUR "YOU & ME" WORDS HERE            ║
  ║  These float around the centre piece.           ║
  ╚══════════════════════════════════════════════════╝
*/
const FLOATING_WORDS = [
  "forever",
  "us",
  "home",
  "dream",
  "always",
  "together",
  "yours",
  "heart",
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
      <BackgroundMusic />

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 text-center sm:px-6"
      >
        {/* Gradient orbs — smaller on mobile */}
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
              Nosso dia 22/08 💍
            </motion.p>
          </Reveal>
          <Reveal variant="scaleUp" delay={0.2} duration={1}>
            <h1 className="mt-4 font-display text-5xl leading-tight tracking-tight sm:mt-6 sm:text-8xl md:text-9xl">
              <motion.span
                className="bg-gradient-to-r from-plum via-saffron to-powder bg-[length:300%_100%] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                Para a razão do meu viver, Minha princesa!
              </motion.span>
            </h1>
          </Reveal>

          <Reveal variant="blur" delay={0.5}>
            <p className="mx-auto mt-4 max-w-sm font-signature text-xl text-plum/70 sm:mt-6 sm:max-w-lg sm:text-2xl md:text-3xl">
              22/08/2026
            </p>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.7}>
            <p className="mx-auto mt-4 max-w-xs text-xs leading-relaxed text-white/50 sm:mt-6 sm:max-w-md sm:text-sm">
            Que nossos dias 22´s seja repleto de amor! ❤️
            </p>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.9}>
            <motion.a
              href="#our-story"
              className="animate-pulse-glow group mt-8 inline-flex items-center gap-2 rounded-full border border-orchid/30 bg-orchid/10 px-6 py-2.5 text-xs font-medium text-plum backdrop-blur-sm transition-all duration-300 hover:border-orchid/60 hover:bg-orchid/20 sm:mt-10 sm:px-8 sm:py-3 sm:text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Nossa História
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

      {/* ═══════════ TIMELINE — folding cards ═══════════ */}
      <section id="our-story" className="relative px-4 py-20 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <Reveal variant="fadeUp">
            <h2 className="text-center font-heading text-3xl tracking-wide text-plum sm:text-4xl md:text-5xl">
              <motion.span
                whileInView={{ backgroundSize: ["0% 2px", "100% 2px"] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  backgroundImage: "linear-gradient(to right, #FFAAEA, #98C1D9)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom center",
                  backgroundSize: "0% 2px",
                  paddingBottom: 4,
                }}
              >
                Nosso Amor
              </motion.span>
            </h2>
            <p className="mt-3 text-center text-xs text-white/40 sm:mt-4 sm:text-sm">
                Nossos primeiros momentos mais marcantes!
            </p>
          </Reveal>

          {/* Timeline with fold-in cards */}
          <div className="relative mt-8 sm:mt-20">
            {/* Vertical line — desktop only */}
            <motion.div
              className="absolute left-1/2 top-0 hidden h-full w-px sm:block"
              style={{ background: "linear-gradient(to bottom, rgba(99,29,118,0.6), rgba(255,170,234,0.3), transparent)", transformOrigin: "top" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {TIMELINE.map((item, i) => (
              <FoldCard key={i} index={i} className="relative mb-5 last:mb-0 sm:mb-16">
                <div
                  className={`flex items-start sm:gap-16 ${
                    i % 2 === 0
                      ? "sm:flex-row"
                      : "sm:flex-row-reverse sm:text-right"
                  }`}
                >
                  {/* Dot on timeline — desktop only */}
                  <div className="absolute left-1/2 top-6 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:flex">
                    <motion.span
                      className="absolute h-4 w-4 rounded-full border-2 border-orchid bg-[#0e0b16]"
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                    <motion.span
                      className="absolute h-2 w-2 rounded-full bg-plum"
                      whileInView={{ scale: [0, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                    />
                  </div>

                  {/* Content card */}
                  <div
                    className={`w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] transition-all duration-300 hover:border-orchid/20 hover:bg-white/[0.06] sm:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? "" : "sm:ml-auto"
                    }`}
                  >
                    {/* Text content */}
                    <div className="p-4 sm:p-6">
                      <div
                        className={`flex items-center gap-2 sm:gap-3 ${
                          i % 2 !== 0 ? "sm:flex-row-reverse" : ""
                        }`}
                      >
                        <motion.span
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-orchid/20 text-base sm:h-8 sm:w-8"
                          whileInView={{ rotate: [0, 10, -10, 0] }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.15 }}
                        >
                          {item.emoji}
                        </motion.span>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-white/20 sm:text-[10px]">•</span>
                          <span className="text-[9px] text-white/25 sm:text-[10px]">
                            {item.date}
                          </span>
                        </div>
                      </div>
                      <h3 className="mt-2 font-display text-lg text-white sm:mt-3 sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/50 sm:mt-2 sm:text-sm">
                        {item.description}
                      </p>
                    </div>

                    {/* Chat screenshot — tap to open modal */}
                    {item.image && (
                      <button
                        type="button"
                        onClick={() => setModalImage({ src: item.image!, alt: item.title })}
                        className="block w-full border-t border-white/5 active:opacity-80"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="w-full object-cover"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </FoldCard>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════ YOU & ME ═══════════ */}
      <FoldSection className="relative px-4 py-16 sm:px-6 sm:py-28">
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

            {/* Centre heart */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-5xl sm:text-6xl"
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
                💕
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
                Bruno 💍 Isabella
              </motion.span>
            </h2>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.15}>
            <p className="mt-4 font-signature text-lg text-white/30 sm:mt-5 sm:text-xl">
              Isso é apenas o começo!
            </p>
          </Reveal>

          {/* Verse */}
          <Reveal variant="fadeUp" delay={0.3}>
            <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
              <p className="text-sm leading-relaxed text-white/50 sm:text-base">
              </p>
              <p className="text-sm leading-relaxed text-white/50 sm:text-base">
              </p>
              <motion.p
                className="pt-2 font-signature text-lg text-plum/60 sm:text-xl"
                whileInView={{ opacity: [0, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.8 }}
              >
                Vou estar com você pra toda a vida.
              </motion.p>
            </div>
          </Reveal>

          {/* Day 1 badge */}
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
                Nossos melhores momentos juntos
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
        <Reveal variant="fadeUp" delay={0.1} duration={0.8}>
          <div className="mx-auto mt-6 grid max-w-[280px] grid-cols-2 gap-3 sm:mt-8 sm:max-w-md sm:gap-4 md:max-w-lg">
            {HERO_PHOTOS.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                onClick={() => setModalImage({ src, alt: `Nós ${i + 1}` })}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 sm:rounded-2xl"
                initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -4 : 4 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                whileHover={{ scale: 1.08, zIndex: 10 }}
                whileTap={{ scale: 0.94 }}
              >
                <Image
                  src={src}
                  alt={`Nós ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 40vw, 220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.button>
            ))}
          </div>
        </Reveal>
      <SectionDivider />

      {/* ═══════════ LETTER — folds open ═══════════ */}
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
                Meu amor,
              </p>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.2}>
              <div className="mt-4 space-y-3 text-xs leading-relaxed text-white/60 sm:mt-6 sm:space-y-4 sm:text-sm">
                <p  className="text-white/80">
                  Obrigado por ser a melhor namorada do mundo! ❤️❤️❤️
                </p>
                <p  className="text-white/80">
                 Meu amor, quando paro para pensar em tudo o que já vivemos e em tudo o que ainda vamos construir, meu coração simplesmente transborda de gratidão. Este espaço foi criado não apenas para guardar as nossas melhores memórias, mas para celebrar todos os dias a sorte imensa que é dividir a jornada da vida com você.
                </p>
                <p  className="text-white/80">
                  Deus foi incrivelmente generoso quando cruzou os nossos caminhos. Desde o primeiro momento, você trouxe uma luz diferente para os meus dias e me ensinou o verdadeiro significado de companheirismo. Não se trata apenas de ter alguém caminhando ao lado, mas de ter uma parceira incrível que me apoia, que me compreende no olhar e que me faz querer ser a minha melhor versão a cada amanhecer. É uma honra imensurável poder acordar e te chamar de minha namorada, minha vida e meu porto seguro.
                </p>
                <p className="text-white/80">
                  Eu te admiro de uma forma que as palavras muitas vezes não dão conta de explicar. Você é, de fato, a perfeição em todos os aspectos — uma mulher deslumbrante por fora, mas dona de uma essência e de um coração ainda mais lindos por dentro. Cada sorriso seu ilumina o meu mundo, e cada obstáculo que superamos juntos me dá a certeza de que nascemos para pertencer um ao outro. Você é o grande amor da minha vida! ❤️❤️❤️
                </p>
                <p  className="text-white/80">
                  Quero que este site seja um reflexo do nosso amor: um lugar cheio de alegria, de cumplicidade e da nossa história. Que fique registrado aqui para quem quiser ver o quanto eu sou grato por cada segundo ao seu lado. Obrigado por ter me escolhido, por nunca soltar a minha mão e por transformar a minha realidade em um sonho diário.
                </p>
              </div>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.4}>
                <p className="mt-6 font-signature text-xl text-saffron/60 sm:mt-8 sm:text-2xl">
                  você é e sempre será o grande amor da minha vida e a minha eterna princesa. 💖 
                </p>
            </Reveal>
          </motion.div>
        </div>
      </FoldSection>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative border-t border-white/5 py-12 text-center sm:py-16">
        <Reveal variant="fadeUp">
          <motion.p
            className="font-signature text-xl text-plum/40 sm:text-2xl text-white/80"
            whileInView={{ scale: [0.9, 1] }}
            viewport={{ once: true }}
          >
            Feito para a minha bebela {" "}
            <motion.span
              className="inline-block text-tomato/60"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ♥
            </motion.span>
            {" "}
          </motion.p>
          <p className="mt-3 text-xs text-white/30 sm:mt-4 sm:text-sm text-white/80">
            EU TE AMO MUITO 💍❤️💍
          </p>
          <p className="mt-2 text-[10px] text-white/15 sm:text-xs">
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
