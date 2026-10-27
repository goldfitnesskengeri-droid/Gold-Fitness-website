import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Service {
  title: string;
  blurb: string;
  path: string;
  tag: string;
}

// Services the gym actually offers, each linking to its own page
const SERVICES: Service[] = [
  { tag: '01', title: 'Strength & Bodybuilding', blurb: 'Free weights, machines and structured programs to build muscle and power.', path: '/muscle-building-kengeri' },
  { tag: '02', title: 'Personal Training', blurb: 'One-to-one coaching built around your body, schedule and goal.', path: '/personal-training-kengeri' },
  { tag: '03', title: 'Weight Loss', blurb: 'Training and nutrition guidance focused on sustainable fat loss.', path: '/weight-loss-training-kengeri' },
  { tag: '04', title: "Women's Fitness", blurb: 'A comfortable, supportive space with programs designed for women.', path: '/womens-fitness-kengeri' },
  { tag: '05', title: 'Group Fitness & Zumba', blurb: 'High-energy group sessions that make training social and fun.', path: '/group-fitness' },
  { tag: '06', title: 'Nutrition Guidance', blurb: 'Simple, practical eating plans that support your training.', path: '/nutrition-guidance' },
];

const TICKER_WORDS = ['Strength', 'Personal Training', 'Weight Loss', 'Bodybuilding', 'Zumba', "Women's Fitness", 'Nutrition'];

function go(e: React.MouseEvent, path: string) {
  e.preventDefault();
  window.history.pushState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0 });
}

export function ServiceTicker() {
  const row = [...TICKER_WORDS, ...TICKER_WORDS];
  return (
    <div className="relative overflow-hidden border-y border-gold-premium/20 bg-gold-premium py-4" aria-hidden="true">
      <style>{`
        @keyframes dgf-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .dgf-ticker { display: flex; width: max-content; animation: dgf-ticker 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .dgf-ticker { animation: none; } }
      `}</style>
      <div className="dgf-ticker">
        {row.map((w, i) => (
          <span key={i} className="flex items-center whitespace-nowrap font-display font-black uppercase tracking-tight text-black text-xl sm:text-3xl">
            <span className="px-6 sm:px-10">{w}</span>
            <span className="text-black/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ServicesShowcase() {
  return (
    <section id="services" className="bg-black py-20 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gold-premium uppercase">What we offer</span>
            <h2 className="mt-3 text-4xl sm:text-6xl font-display font-black uppercase tracking-tight text-white leading-[0.95]">
              Our <span className="text-gold-premium">services</span>
            </h2>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              Everything you need to train properly in Kengeri, from first-day beginners to serious lifters.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SERVICES.map((s) => (
            <a
              key={s.path}
              href={s.path}
              onClick={(e) => go(e, s.path)}
              className="group relative flex flex-col justify-between min-h-[220px] rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 transition-all duration-300 hover:border-gold-premium/60 hover:bg-zinc-900 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-sm font-bold text-gold-premium">{s.tag}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors group-hover:bg-gold-premium group-hover:text-black group-hover:border-gold-premium">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{s.blurb}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
