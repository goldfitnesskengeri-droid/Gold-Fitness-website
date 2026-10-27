import React, { useEffect } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import { updateMetaTags } from '../lib/seo';

interface Props {
  onNavigate?: (path: string) => void;
}

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: 'Using this website',
    body: [
      'This website gives information about Dhanus Gold Fitness and lets you send enquiries and request free trial passes. Please give correct details when you do. The BMI calculator and any tips on this site are general information only and are not medical advice.',
    ],
  },
  {
    title: 'Membership, fees and refunds',
    body: [
      'Membership plans, fees, validity, any joining charges and offers are confirmed by our team at the time you join. Prices on the website are starting prices and may change.',
      'Rules on freezing, transferring or refunding a membership are explained at joining. Please ask for them before you pay.',
    ],
  },
  {
    title: 'Health and safety',
    body: [
      'Exercise carries a risk of injury. Before you start, tell our team about any medical condition, injury or pregnancy, and speak to your doctor if you are unsure whether you are fit to train.',
      'Please follow trainer and staff instructions and use equipment correctly. Members train at their own risk, except where the law says otherwise.',
    ],
  },
  {
    title: 'Conduct at the gym',
    body: [
      'We expect respectful behaviour towards members and staff. We may refuse entry or end a membership where a person breaks gym rules or puts others at risk.',
    ],
  },
  {
    title: 'Free trial passes',
    body: [
      'A free trial pass is for first-time visitors and is subject to availability. We may limit or decline trial passes at our discretion.',
    ],
  },
  {
    title: 'Content and links',
    body: [
      'Photos, text and logos on this site belong to Dhanus Gold Fitness or are used with permission. Please do not copy them without asking. Links to other sites, such as Instagram, Facebook, YouTube and Google Maps, are provided for convenience, and we are not responsible for their content.',
    ],
  },
  {
    title: 'Changes to these terms',
    body: [
      'We may update these terms from time to time. The version on this page is the current one. Your use of our personal data is explained in our Privacy Policy.',
    ],
  },
];

export default function TermsPage({ onNavigate }: Props) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    updateMetaTags(
      'Terms of Service | Dhanus Gold Fitness Kengeri Bangalore',
      'Terms for using the Dhanus Gold Fitness website and joining our gym in Kengeri Satellite Town, Bengaluru.',
      'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png',
      '/terms'
    );
  }, []);

  const go = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (onNavigate) onNavigate(path);
    else window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 pt-28 pb-20 selection:bg-[#FFC400] selection:text-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          onClick={(e) => go(e, '/')}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#FFC400] hover:text-white transition-colors bg-zinc-900/80 px-3.5 py-1.5 rounded-lg border border-white/10 mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </a>

        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-[#FFC400] uppercase mb-3">
            <FileText className="w-4 h-4" />
            <span>Terms</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">Terms of Service</h1>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
            Dhanus Gold Fitness, Hoysala Circle, Kengeri Satellite Town, Bengaluru 560060.
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-zinc-300">
          {SECTIONS.map((s, i) => (
            <section key={s.title} className="bg-zinc-950/70 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-3">
              <h2 className="text-lg font-display font-black text-white flex items-center gap-2">
                <span className="text-[#FFC400] font-mono text-base">{String(i + 1).padStart(2, '0')}.</span>
                {s.title}
              </h2>
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}

          <section className="bg-zinc-950/70 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-2">
            <h2 className="text-lg font-display font-black text-white">Questions</h2>
            <p>
              Call <a className="text-[#FFC400] underline" href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phoneNumber}</a> or email{' '}
              <a className="text-[#FFC400] underline" href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>. See also our{' '}
              <a className="text-[#FFC400] underline" href="/privacy-policy" onClick={(e) => go(e, '/privacy-policy')}>Privacy Policy</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
