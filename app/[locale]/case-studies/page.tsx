import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { getAllCaseStudies } from '@/lib/case-studies';
import { FinalCTA } from '@/components/sections/FinalCTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.caseStudies' });
  return { title: t('title'), description: t('description') };
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CaseStudiesPageInner />;
}

function CaseStudiesPageInner() {
  const hero = useTranslations('pageHero.caseStudies');
  const t = useTranslations('caseStudies');
  const studies = getAllCaseStudies();

  return (
    <>
      <PageHero
        eyebrow={hero('eyebrow')}
        index={hero('index')}
        title={hero('title')}
        description={hero('description')}
      />

      <section className="py-20">
        <div className="container-wide">
          <div className="grid gap-8 md:gap-12">
            {studies.map((s, i) => (
              <Reveal key={s.slug}>
                <Link
                  href={`/case-studies/${s.slug}` as never}
                  className="group relative grid overflow-hidden rounded-3xl border border-line bg-surface/30 transition-colors hover:border-subtle md:grid-cols-[1.2fr_1fr]"
                >
                  <div className="flex flex-col justify-between gap-8 p-8 md:p-12">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                        {t('case')} 0{i + 1} · {s.theme}
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal flip-rtl" />
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-fg/90">
                          {s.sector}
                        </span>
                        <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-fg/90">
                          {s.region}
                        </span>
                        <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-muted">
                          {s.year}
                        </span>
                      </div>
                      <h2 className="mt-4 font-display text-3xl leading-tight text-fg md:text-4xl">
                        {s.title}
                      </h2>
                      <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
                        {s.summary}
                      </p>
                      {s.client && (
                        <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                          Client · {s.client}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                      <span>{t('strip.challenge')}</span>
                      <span className="h-px w-6 bg-line" />
                      <span>{t('strip.action')}</span>
                      <span className="h-px w-6 bg-line" />
                      <span className="text-signal">{t('strip.result')}</span>
                    </div>
                  </div>
                  {s.cover && (
                    <div className="relative min-h-[280px] overflow-hidden md:min-h-[420px]">
                      <Image
                        src={s.cover}
                        alt={s.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ink-950/60" />
                    </div>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
