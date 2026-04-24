import type { Metadata } from 'next';
import Image from 'next/image';
import { Award, Globe, Briefcase, Target, type LucideIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { DualClock } from '@/components/ui/DualClock';
import { FinalCTA } from '@/components/sections/FinalCTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.about' });
  return { title: t('title'), description: t('description') };
}

const icons: LucideIcon[] = [Target, Briefcase, Award, Globe];
const founderImgs = ['/images/hero/2.webp', '/images/hero/3.webp'];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPageInner />;
}

function AboutPageInner() {
  const hero = useTranslations('pageHero.about');
  const t = useTranslations('about');
  const pillars = t.raw('pillars') as { title: string; desc: string }[];
  const darryl = t.raw('founders.darryl') as {
    name: string;
    role: string;
    bullets: string[];
  };
  const will = t.raw('founders.will') as {
    name: string;
    role: string;
    bullets: string[];
  };

  return (
    <>
      <PageHero
        eyebrow={hero('eyebrow')}
        index={hero('index')}
        title={hero('title')}
        description={hero('description')}
      />

      <section className="border-b border-line py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <span className="eyebrow">{t('positioning.eyebrow')}</span>
            <p className="mt-6 font-display text-3xl leading-tight text-fg md:text-4xl">
              {t('positioning.statement')}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid gap-6 md:grid-cols-2">
              {pillars.map((p, i) => {
                const Icon = icons[i] ?? Target;
                return (
                  <div key={p.title} className="rounded-2xl border border-line bg-surface/30 p-6">
                    <Icon className="h-5 w-5 text-signal" strokeWidth={1.5} />
                    <div className="mt-4 font-display text-lg text-fg">{p.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line py-24">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <span className="eyebrow">{t('leadershipEyebrow')}</span>
              <h2 className="mt-6 font-display text-display-sm text-balance tracking-tighter text-fg">
                {t('leadershipTitle')}
              </h2>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <FounderCard
              name={darryl.name}
              role={darryl.role}
              bullets={darryl.bullets}
              img={founderImgs[0]}
            />
            <FounderCard
              name={will.name}
              role={will.role}
              bullets={will.bullets}
              img={founderImgs[1]}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-line py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">{t('methodology.eyebrow')}</span>
            <h2 className="mt-6 font-display text-display-sm text-balance tracking-tighter text-fg">
              {t('methodology.title1')}{' '}
              <span className="text-muted">{t('methodology.title2')}</span>
            </h2>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted">
              {t('methodology.desc')}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/30 p-6 md:p-8">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/case_studies/Methodology.webp"
                  alt="Core methodology diagram"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">{t('regional.eyebrow')}</span>
            <h2 className="mt-6 font-display text-display-sm text-balance text-fg">
              {t('regional.title1')} <span className="text-muted">{t('regional.title2')}</span>
            </h2>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted">
              {t('regional.desc')}
            </p>
            <div className="mt-8">
              <DualClock />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/section5/2.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
              <div className="absolute inset-6 flex items-end justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                    {t('regional.ukLabel')}
                  </div>
                  <div className="mt-1 font-display text-xl text-ink-50">
                    {t('regional.ukValue')}
                  </div>
                </div>
                <div className="text-end">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                    {t('regional.meLabel')}
                  </div>
                  <div className="mt-1 font-display text-xl text-ink-50">
                    {t('regional.meValue')}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

function FounderCard({
  name,
  role,
  bullets,
  img,
}: {
  name: string;
  role: string;
  bullets: string[];
  img: string;
}) {
  return (
    <Reveal>
      <div className="group relative overflow-hidden rounded-3xl border border-line bg-surface/30">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={img}
            alt={name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
          <div className="absolute bottom-6 start-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
              {role}
            </div>
            <div className="mt-1 font-display text-3xl text-ink-50">{name}</div>
          </div>
        </div>
        <ul className="divide-y divide-line p-8">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-4 py-3 text-fg/90">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
              <span className="text-sm leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
