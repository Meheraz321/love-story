import { useState } from 'react';
import { Heart, MessageCircleHeart } from 'lucide-react';
import { LoveData } from '../data/loveData';

interface MissYouSectionProps {
  data: LoveData;
}

export default function MissYouSection({ data }: MissYouSectionProps) {
  const [selectedResponse, setSelectedResponse] = useState<'yes' | 'muchMore' | null>(null);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number }[]>([]);

  const triggerHearts = () => {
    const newHearts = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 80 + 10,
    }));
    setFloatingHearts(newHearts);
    setTimeout(() => setFloatingHearts([]), 1800);
  };

  const handleChoice = (type: 'yes' | 'muchMore') => {
    setSelectedResponse(type);
    triggerHearts();
  };

  const currentInfo =
    selectedResponse === 'yes'
      ? data.missYouResponses.yes
      : selectedResponse === 'muchMore'
      ? data.missYouResponses.muchMore
      : null;

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Floating hearts burst on click */}
      {floatingHearts.map((h) => (
        <div
          key={h.id}
          className="fixed pointer-events-none z-50 animate-bounce duration-1000"
          style={{
            bottom: '20%',
            left: `${h.left}%`,
            animation: 'softPulse 1.2s forwards',
          }}
        >
          <Heart className="w-6 h-6 text-rose-400 fill-rose-500 filter drop-shadow" />
        </div>
      ))}

      <div className="max-w-xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 text-rose-300/80 text-xs tracking-widest font-sans-bn uppercase mb-3">
          <MessageCircleHeart className="w-3.5 h-3.5 text-rose-400" />
          <span>মনের দরজার প্রশ্ন</span>
        </div>

        <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-light text-rose-100 tracking-wide mb-8">
          কখনো কি আমাকে মিস করো?
        </h2>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5 mb-10">
          <button
            onClick={() => handleChoice('yes')}
            className={`px-8 py-3.5 rounded-full font-serif-bn text-base transition-all duration-300 border ${
              selectedResponse === 'yes'
                ? 'bg-rose-900 border-rose-500 text-white shadow-[0_0_25px_rgba(225,29,72,0.5)] scale-105'
                : 'bg-[#180c18] border-rose-900/50 text-rose-200 hover:border-rose-500/50 hover:bg-rose-950/60'
            }`}
          >
            হ্যাঁ ❤️
          </button>

          <button
            onClick={() => handleChoice('muchMore')}
            className={`px-8 py-3.5 rounded-full font-serif-bn text-base transition-all duration-300 border ${
              selectedResponse === 'muchMore'
                ? 'bg-rose-900 border-rose-500 text-white shadow-[0_0_25px_rgba(225,29,72,0.5)] scale-105'
                : 'bg-[#180c18] border-rose-900/50 text-rose-200 hover:border-rose-500/50 hover:bg-rose-950/60'
            }`}
          >
            অনেক বেশি 🥺
          </button>
        </div>

        {/* Emotional Response Revealed */}
        {currentInfo && (
          <div className="rounded-2xl bg-[#140b15]/90 border border-rose-800/40 p-8 shadow-2xl backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500">
            <h3 className="font-serif-bn text-2xl text-rose-200 font-normal mb-3">
              {currentInfo.title}
            </h3>
            <p className="font-serif-bn text-base sm:text-lg text-rose-100/90 leading-relaxed">
              "{currentInfo.message}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
