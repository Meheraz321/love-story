import { useState, useEffect } from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { LoveData } from '../data/loveData';

interface HeroSectionProps {
  data: LoveData;
  onStartStory: () => void;
}

export default function HeroSection({ data, onStartStory }: HeroSectionProps) {
  const [revealStep, setRevealStep] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Staggered cinematic reveals
    const timer1 = setTimeout(() => setRevealStep(1), 500);
    const timer2 = setTimeout(() => setRevealStep(2), 2200);
    const timer3 = setTimeout(() => setRevealStep(3), 3800);
    const timer4 = setTimeout(() => setRevealStep(4), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 18;
    const y = (clientY / innerHeight - 0.5) * 18;
    setMouseOffset({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20 pb-16"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #1a0815 0%, #0c040b 50%, #050307 100%)',
      }}
    >
      {/* Cinematic subtle ambient lighting blobs reacting to mouse */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-950/20 blur-[130px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mouseOffset.x}px), calc(-50% + ${mouseOffset.y}px))`,
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-purple-950/25 blur-[120px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px)`,
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Subtle romantic badge */}
        <div
          className={`transition-all duration-1000 transform ${
            revealStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/40 border border-rose-800/30 text-rose-300 text-xs tracking-wider mb-8">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400/40 animate-pulse" />
            <span className="font-serif-bn">{data.recipientNickname || 'আমার অনুভূতি'}</span>
          </div>
        </div>

        {/* Line 1: “তোমাকে ভালোবাসার কোনো নির্দিষ্ট কারণ নেই…” */}
        <h1
          className={`font-serif-bn text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-rose-100/90 leading-relaxed tracking-wide transition-all duration-1200 transform ${
            revealStep >= 1 ? 'opacity-100 filter blur-0 translate-y-0' : 'opacity-0 filter blur-sm translate-y-8'
          }`}
        >
          {data.heroReveals.line1}
        </h1>

        {/* Line 2: “কারণ তুমি আমার কাছে কারণের থেকেও বেশি কিছু।” */}
        <div
          className={`mt-4 sm:mt-6 transition-all duration-1400 delay-200 transform ${
            revealStep >= 2 ? 'opacity-100 filter blur-0 translate-y-0' : 'opacity-0 filter blur-md translate-y-8'
          }`}
        >
          <p className="font-serif-bn text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal bg-gradient-to-r from-rose-200 via-rose-300 to-amber-200 bg-clip-text text-transparent leading-relaxed tracking-wide">
            {data.heroReveals.line2}
          </p>
        </div>

        {/* Subline: “এই ছোট্ট ওয়েবপেজটা শুধু তোমার জন্য…” */}
        <p
          className={`font-serif-bn text-sm sm:text-base md:text-lg text-rose-200/60 mt-8 tracking-wider transition-all duration-1000 transform ${
            revealStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {data.heroReveals.subline.replace('তোমার জন্য', `${data.recipientName} এর জন্য`)}
        </p>

        {/* CTA Button: “আমাদের গল্পটা শুরু করি ❤️” */}
        <div
          className={`mt-10 transition-all duration-1000 transform ${
            revealStep >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <button
            onClick={onStartStory}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-900/80 via-rose-800 to-rose-950 text-rose-100 text-base font-serif-bn font-medium border border-rose-500/40 shadow-[0_0_25px_rgba(225,29,72,0.3)] hover:shadow-[0_0_35px_rgba(244,114,182,0.45)] hover:border-rose-400 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>{data.heroReveals.buttonText}</span>
            <ChevronDown className="w-4 h-4 text-rose-300 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Floating gentle down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 hover:opacity-80 transition-opacity">
        <span className="text-[11px] font-sans-bn tracking-widest text-rose-200/70 mb-1">
          নিচে দেখো 
        </span>
        <div className="w-5 h-8 rounded-full border border-rose-300/30 flex justify-center pt-1">
          <div className="w-1 h-2 rounded-full bg-rose-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
