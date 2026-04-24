'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealText, Reveal } from '@/components/ui/Reveal';
import { HeroCanvas } from '@/components/ui/HeroCanvas';
import { DualClock } from '@/components/ui/DualClock';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const t = useTranslations('hero');

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 md:pt-32"
    >
      {/* Interactive dot grid */}
      <HeroCanvas className="pointer-events-none absolute inset-0 z-0 opacity-70 mask-fade-b" />

      {/* Parallax background image */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/hero/1.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70 dark:opacity-45 dark:mix-blend-luminosity"
          />
          {/* Readability scrim — lighter in light mode so image still shows through */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-bg/20 to-bg dark:from-bg/80 dark:via-bg/60 dark:to-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-bg/50 dark:from-bg dark:via-transparent dark:to-bg/80" />
        </div>
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="container-wide relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end"
      >
        <div className="flex max-w-4xl flex-col gap-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <span className="eyebrow">{t('eyebrow')}</span>
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[11px] text-signal">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                {t('badge')}
              </span>
            </div>
          </Reveal>

          <h1 className="font-display text-display text-balance tracking-tightest text-fg">
            <RevealText text={t('headline1')} />{' '}
            <RevealText text={t('headline2')} delay={0.1} />
            <br />
            <span className="text-muted">
              <RevealText text={t('headline3')} delay={0.2} />{' '}
              <RevealText text={t('headline4')} delay={0.3} />
            </span>
          </h1>

          <Reveal delay={0.5}>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted md:text-xl">
              {t('subheading')}
            </p>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Button href="/contact" size="lg" withArrow>
                  {t('cta1')}
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button href="/products#pilot" size="lg" variant="outline" withArrow>
                  {t('cta2')}
                </Button>
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.6} className="hidden lg:block">
          <div className="glass-card border-line/80 bg-surface/60 p-6">
            <div className="flex items-center justify-between">
              <span className="eyebrow">{t('metaEyebrow')}</span>
              <span className="font-mono text-xs text-subtle">01 / 04</span>
            </div>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-fg/90">
              {t('metaBody')}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-6">
              <Stat k={t('stats.sectors')} v="7+" />
              <Stat k={t('stats.regions')} v="UK·ME" />
              <Stat k={t('stats.phase')} v="Pilot" />
            </div>
          </div>
        </Reveal>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-line/60 bg-bg/60 backdrop-blur-sm">
        <div className="container-wide flex items-center justify-between gap-4 py-3 text-xs">
          <DualClock />
          <div className="hidden items-center gap-2 text-subtle md:flex">
            <span className="font-mono uppercase tracking-wider">{t('scroll')}</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </div>
          <div className="hidden items-center gap-4 font-mono text-subtle md:flex">
            <span>UK · UAE</span>
            <span className="h-1 w-1 rounded-full bg-faint" />
            <span>⌘K</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-fg">{v}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
        {k}
      </div>
    </div>
  );
}
