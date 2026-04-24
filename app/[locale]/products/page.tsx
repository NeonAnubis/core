import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Cpu, Radar, Wind, Wrench } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { PilotPartners } from '@/components/sections/PilotPartners';
import { Button } from '@/components/ui/Button';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.products' });
  return { title: t('title'), description: t('description') };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductsPageInner />;
}

function ProductsPageInner() {
  const hero = useTranslations('pageHero.products');
  const t = useTranslations('products');
  const current = t.raw('hpe.modules.current') as { name: string; desc: string }[];
  const future = t.raw('hpe.modules.future') as { name: string; desc: string }[];
  const sssTags = t.raw('sss.tags') as string[];
  const smsTags = t.raw('sms.tags') as string[];

  return (
    <>
      <PageHero
        eyebrow={hero('eyebrow')}
        index={hero('index')}
        title={hero('title')}
        description={hero('description')}
      />

      <section id="hpe" className="scroll-mt-28 border-b border-line py-24">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-signal">
                  <Cpu className="h-3.5 w-3.5" /> {t('hpe.badge')}
                </span>
              </div>
              <h2 className="mt-6 font-display text-display tracking-tightest text-fg">
                {t('hpe.title1')} <span className="text-gradient-warm">{t('hpe.title2')}</span>
              </h2>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                {t('hpe.desc')}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                <Image
                  src="/images/section4/1.webp"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <Reveal>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
                {t('hpe.currentPhase')}
              </div>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {current.map((m) => (
                  <li key={m.name} className="grid grid-cols-[auto_1fr] gap-6 py-5">
                    <span className="h-2 w-2 translate-y-2 rounded-full bg-signal" />
                    <div>
                      <div className="font-display text-xl text-fg">{m.name}</div>
                      <div className="mt-1 text-sm text-muted">{m.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                {t('hpe.futurePhase')}
              </div>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {future.map((m) => (
                  <li key={m.name} className="grid grid-cols-[auto_1fr] gap-6 py-5">
                    <span className="h-2 w-2 translate-y-2 rounded-full border border-faint" />
                    <div>
                      <div className="font-display text-xl text-fg/90">{m.name}</div>
                      <div className="mt-1 text-sm text-muted">{m.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/contact?type=pilot" size="lg" withArrow>
                {t('hpe.cta1')}
              </Button>
              <Button href="/contact?type=product" size="lg" variant="outline">
                {t('hpe.cta2')}
              </Button>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <Link
              href="/case-studies/digital-fit-for-duty-system"
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-signal/30 bg-signal/5 p-6 transition-colors hover:border-signal/60 md:flex-row md:items-center md:gap-8 md:p-8"
            >
              <div className="flex-1">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
                  ⟐ {t('hpe.provenEyebrow')}
                </div>
                <h4 className="mt-3 font-display text-xl leading-tight text-fg md:text-2xl">
                  {t('hpe.provenTitle')}
                </h4>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {t('hpe.provenDesc')}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-signal px-4 py-2 text-sm text-signal transition-colors group-hover:bg-signal group-hover:text-ink-950 md:self-center">
                {t('hpe.provenCta')}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flip-rtl" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="sss" className="scroll-mt-28 border-b border-line py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/section4/2.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              <Radar
                className="absolute start-5 top-5 h-6 w-6 text-ink-50"
                strokeWidth={1.5}
              />
            </div>
          </Reveal>
          <Reveal>
            <span className="eyebrow">{t('sss.eyebrow')}</span>
            <h3 className="mt-6 font-display text-display-sm text-balance tracking-tighter text-fg">
              {t('sss.title')}
            </h3>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              {t('sss.desc')}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {sssTags.map((x) => (
                <li
                  key={x}
                  className="rounded-full border border-line bg-surface/40 px-3.5 py-1.5 text-sm text-fg/90"
                >
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="sms" className="scroll-mt-28 border-b border-line py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">{t('sms.eyebrow')}</span>
            <h3 className="mt-6 font-display text-display-sm text-balance tracking-tighter text-fg">
              {t('sms.title1')} <span className="text-gradient-warm">{t('sms.title2')}</span>
            </h3>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              {t('sms.desc')}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {smsTags.map((x) => (
                <li
                  key={x}
                  className="rounded-full border border-line bg-surface/40 px-3.5 py-1.5 text-sm text-fg/90"
                >
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/section4/3.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              <Wind
                className="absolute end-5 top-5 h-6 w-6 text-ink-50"
                strokeWidth={1.5}
              />
            </div>
          </Reveal>
        </div>

        <div className="container-wide">
          <Reveal className="mt-12">
            <Link
              href="/case-studies/sand-mitigation-abu-dhabi"
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-signal/30 bg-signal/5 p-6 transition-colors hover:border-signal/60 md:flex-row md:items-center md:gap-8 md:p-8"
            >
              <div className="flex-1">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
                  ⟐ {t('sms.provenEyebrow')}
                </div>
                <h4 className="mt-3 font-display text-xl leading-tight text-fg md:text-2xl">
                  {t('sms.provenTitle')}
                </h4>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {t('sms.provenDesc')}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-signal px-4 py-2 text-sm text-signal transition-colors group-hover:bg-signal group-hover:text-ink-950 md:self-center">
                {t('sms.provenCta')}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flip-rtl" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="bespoke" className="scroll-mt-28 border-b border-line py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">{t('bespoke.eyebrow')}</span>
            <h3 className="mt-6 font-display text-display-sm text-balance tracking-tighter text-fg">
              {t('bespoke.title')}
            </h3>
            <Wrench className="mt-8 h-8 w-8 text-signal" strokeWidth={1.5} />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-pretty text-xl leading-relaxed text-fg/90 md:text-2xl">
              {t('bespoke.desc')}
            </p>
            <div className="mt-8">
              <Link
                href="/contact?type=product"
                className="group inline-flex items-center gap-2 text-fg hover:text-signal"
              >
                {t('bespoke.cta')}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flip-rtl" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <PilotPartners />
    </>
  );
}
