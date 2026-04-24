import { Reveal, RevealText } from './Reveal';
import { GridLines, RadialGlow } from './GridLines';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  index?: string;
}

export function PageHero({ eyebrow, title, description, index }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-20 pt-36 md:pt-44">
      <GridLines className="opacity-40" />
      <RadialGlow from="rgba(242,106,31,0.08)" className="top-0 h-[520px]" />
      <div className="container-wide relative">
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-4xl">
            <Reveal>
              <span className="eyebrow">{eyebrow}</span>
            </Reveal>
            <h1 className="mt-6 font-display text-display text-balance tracking-tighter text-fg">
              <RevealText text={title} />
            </h1>
            {description && (
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                  {description}
                </p>
              </Reveal>
            )}
          </div>
          {index && (
            <Reveal delay={0.3} className="hidden shrink-0 md:block">
              <div className="font-mono text-sm uppercase tracking-widest text-subtle">
                <span className="text-signal">⟐</span> {index}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
