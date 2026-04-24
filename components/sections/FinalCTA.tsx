'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/ui/Reveal';
import { GridLines, RadialGlow } from '@/components/ui/GridLines';

export function FinalCTA() {
  const t = useTranslations('finalCTA');
  return (
    <section className="relative overflow-hidden border-t border-line py-28 md:py-40">
      <GridLines />
      <RadialGlow from="rgba(242,106,31,0.18)" />
      <div className="container-wide relative">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center">
          <Reveal>
            <span className="eyebrow !mx-auto">{t('eyebrow')}</span>
          </Reveal>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="font-display text-display-lg text-balance tracking-tightest text-fg"
          >
            {t('title1')}{' '}
            <span className="text-muted">{t('title2')}</span>
            {t('title3')}
            <br />
            {t('title4')}
            <br />
            <span className="text-gradient-warm">{t('title5')}</span>
          </motion.h2>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Button href="/contact" size="lg" withArrow>
                  {t('cta1')}
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button href="/contact" size="lg" variant="outline">
                  {t('cta2')}
                </Button>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
