import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getAllCaseStudies, getCaseStudy } from '@/lib/case-studies';
import { routing } from '@/i18n/routing';
import { Reveal } from '@/components/ui/Reveal';
import { GridLines, RadialGlow } from '@/components/ui/GridLines';
import { FinalCTA } from '@/components/sections/FinalCTA';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const slugs = getAllCaseStudies().map((s) => s.slug);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: 'Case Study' };
  return { title: cs.meta.title, description: cs.meta.summary };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="mt-16 font-display text-3xl text-fg md:text-4xl" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="mt-10 font-display text-xl text-fg md:text-2xl" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mt-5 text-pretty text-lg leading-relaxed text-muted" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mt-5 flex flex-col gap-3" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      {...props}
      className="relative ps-6 text-pretty text-lg leading-relaxed text-fg/90 before:absolute before:start-0 before:top-[0.85em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-signal"
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-semibold text-fg" />
  ),
};

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const { meta, content } = cs;
  const t = await getTranslations({ locale, namespace: 'caseStudies' });

  return (
    <>
      <section className="relative overflow-hidden border-b border-line pt-36 pb-20 md:pt-44">
        <GridLines className="opacity-40" />
        <RadialGlow from="rgba(242,106,31,0.08)" className="top-0 h-[520px]" />
        <div className="container-wide relative">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-signal"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5 flip-rtl" />
            {t('backAll')}
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-signal">
              {t('case')} 0{meta.order} · {meta.theme}
            </span>
            <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-fg/90">
              {meta.sector}
            </span>
            <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-fg/90">
              {meta.region}
            </span>
            <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-muted">
              {meta.year}
            </span>
          </div>
          <h1 className="mt-8 max-w-4xl font-display text-display text-balance tracking-tighter text-fg">
            {meta.title}
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            {meta.summary}
          </p>
          {meta.client && (
            <div className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              Client · {meta.client}
            </div>
          )}
        </div>
      </section>

      {meta.cover && (
        <section className="border-b border-line">
          <div className="container-wide py-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line">
              <Image
                src={meta.cover}
                alt={meta.title}
                fill
                priority
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-line bg-surface/20 py-14">
        <div className="container-wide grid gap-8 md:grid-cols-3">
          {[
            { label: t('strip.challenge'), body: meta.challenge },
            { label: t('strip.action'), body: meta.action },
            { label: t('strip.result'), body: meta.result, accent: true },
          ].map((b) => (
            <Reveal key={b.label}>
              <div
                className={`rounded-2xl border p-8 ${
                  b.accent ? 'border-signal/30 bg-signal/5' : 'border-line bg-bg/40'
                }`}
              >
                <div
                  className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
                    b.accent ? 'text-signal' : 'text-subtle'
                  }`}
                >
                  {b.label}
                </div>
                <p className="mt-4 text-pretty leading-relaxed text-fg/90">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <article className="py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <MDXRemote source={content} components={mdxComponents} />
          </div>
        </div>
      </article>

      <FinalCTA />
    </>
  );
}
