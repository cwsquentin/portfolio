import { Block } from "../primitives/block";
import { Display } from "../primitives/display";

interface ContactHeroProps {
  title: string;
  intro: string;
}

export function ContactHero({ title, intro }: ContactHeroProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[50svh] border-b-2 border-ink">
      <Block color="magenta" border={false} className="flex items-center px-8 py-16 lg:px-16 lg:py-24">
        <Display
          size="hero"
          as="h1"
          weight={800}
          className="tracking-[0.04em]"
        >
          {title}
        </Display>
      </Block>
      <Block color="paper" border={false} className="flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24 lg:border-l-2 lg:border-ink">
        <p className="font-body text-lg leading-relaxed max-w-prose">{intro}</p>
      </Block>
    </section>
  );
}
