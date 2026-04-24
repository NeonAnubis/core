import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { WhatYouCanGet } from '@/components/sections/WhatYouCanGet';
import { HowCoreWorks } from '@/components/sections/HowCoreWorks';
import { CoreSystems } from '@/components/sections/CoreSystems';
import { HPEInteractive } from '@/components/sections/HPEInteractive';
import { PilotPartners } from '@/components/sections/PilotPartners';
import { WhyCore } from '@/components/sections/WhyCore';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <WhatYouCanGet />
      <HowCoreWorks />
      <CoreSystems />
      <HPEInteractive />
      <PilotPartners />
      <WhyCore />
      <FinalCTA />
    </>
  );
}
