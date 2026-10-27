import React, { useEffect } from 'react';
import { ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import { useLanguage } from '../LanguageContext';
import { updateMetaTags } from '../lib/seo';

interface Props {
  onNavigate?: (path: string) => void;
}

export default function MembershipPage({ onNavigate }: Props) {
  const { language, membershipPlans } = useLanguage();
  const en = language === 'en';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    updateMetaTags(
      'Gym Membership Plans in Kengeri | Dhanus Gold Fitness',
      'Compare gym membership and personal training plans at Dhanus Gold Fitness, Hoysala Circle, Kengeri Satellite Town, Bengaluru. Book a free trial first.',
      'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg',
      '/gym-membership-kengeri'
    );
  }, []);

  const go = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (onNavigate) onNavigate(path);
    else window.location.href = path;
  };

  const waLink = (plan: string) =>
    `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
      `Hi Dhanus Gold Fitness, I would like to know the latest price and joining details for the ${plan} plan.`
    )}`;

  return (
    <div className="min-h-screen bg-black text-gray-200 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <a
          href="/"
          onClick={(e) => go(e, '/')}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#FFC400] hover:text-white transition-colors bg-zinc-900/80 px-3.5 py-1.5 rounded-lg border border-white/10 mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{en ? 'Back to Home' : 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ'}</span>
        </a>

        <header className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-[#FFC400] uppercase">
            {en ? 'Membership' : 'ಸದಸ್ಯತ್ವ'}
          </span>
          <h1 className="mt-3 text-4xl sm:text-6xl font-display font-black uppercase tracking-tight text-white leading-[0.95]">
            {en ? 'Gym membership plans in ' : 'ಜಿಮ್ ಸದಸ್ಯತ್ವ ಯೋಜನೆಗಳು '}
            <span className="text-[#FFC400]">{en ? 'Kengeri' : 'ಕೆಂಗೇರಿ'}</span>
          </h1>
          <p className="mt-5 text-zinc-400 leading-relaxed">
            {en
              ? 'Pick the level of guidance you want. Not sure yet? Book a free trial pass and try the gym before you decide.'
              : 'ನಿಮಗೆ ಬೇಕಾದ ಮಾರ್ಗದರ್ಶನದ ಮಟ್ಟವನ್ನು ಆರಿಸಿ. ಖಚಿತವಿಲ್ಲವೇ? ಮೊದಲು ಉಚಿತ ಟ್ರಯಲ್ ಪಾಸ್ ಬುಕ್ ಮಾಡಿ.'}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-5">
          {membershipPlans.map((p: any) => (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 bg-zinc-950 ${
                p.popular ? 'border-[#FFC400]/70 shadow-[0_0_40px_rgba(255,196,0,0.12)]' : 'border-white/10'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-[#FFC400] px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-black">
                  {en ? 'Most popular' : 'ಅತ್ಯಂತ ಜನಪ್ರಿಯ'}
                </span>
              )}
              <h2 className="text-xl font-display font-black uppercase text-white">{p.name}</h2>
              <p className="mt-1 text-sm text-zinc-400">{p.description}</p>
              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-xs font-mono text-zinc-500">{en ? 'from' : 'ಆರಂಭ'}</span>
                <span className="text-4xl font-display font-black text-[#FFC400]">₹{p.price}</span>
                <span className="text-sm text-zinc-500">/ {p.period}</span>
              </p>
              <ul className="mt-6 space-y-2.5 flex-1">
                {p.features.map((f: string) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={waLink(p.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-4 py-3 text-sm font-black uppercase tracking-wider text-black hover:brightness-110 transition"
              >
                <MessageCircle className="w-4 h-4" />
                {en ? 'Ask on WhatsApp' : 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕೇಳಿ'}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-zinc-500 max-w-3xl leading-relaxed">
          {en
            ? 'Prices shown are starting prices and can change with duration, offers and joining fees. Please confirm the latest fee at the gym or on WhatsApp before you pay.'
            : 'ತೋರಿಸಿರುವ ಬೆಲೆಗಳು ಆರಂಭಿಕ ಬೆಲೆಗಳು; ಅವಧಿ ಮತ್ತು ಆಫರ್‌ಗಳ ಪ್ರಕಾರ ಬದಲಾಗಬಹುದು. ಪಾವತಿಸುವ ಮೊದಲು ಜಿಮ್‌ನಲ್ಲಿ ಅಥವಾ ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ದೃಢಪಡಿಸಿ.'}
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-display font-black uppercase text-white">
              {en ? 'Try before you join' : 'ಸೇರುವ ಮೊದಲು ಪ್ರಯತ್ನಿಸಿ'}
            </h3>
            <p className="text-sm text-zinc-400">
              {en ? 'Book a free trial pass and see the gym in person.' : 'ಉಚಿತ ಟ್ರಯಲ್ ಪಾಸ್ ಬುಕ್ ಮಾಡಿ ಜಿಮ್ ಅನ್ನು ನೇರವಾಗಿ ನೋಡಿ.'}
            </p>
          </div>
          <a
            href="/contact"
            onClick={(e) => go(e, '/contact')}
            className="inline-flex items-center justify-center rounded-xl border border-[#FFC400] px-5 py-3 text-sm font-black uppercase tracking-wider text-[#FFC400] hover:bg-[#FFC400] hover:text-black transition"
          >
            {en ? 'Book free trial' : 'ಉಚಿತ ಟ್ರಯಲ್ ಬುಕ್ ಮಾಡಿ'}
          </a>
        </div>
      </div>
    </div>
  );
}
