import { useState, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface HeartExperienceSectionProps {
  messages: string[];
  recipientName: string;
}

interface BurstHeart {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  rotation: number;
}

export default function HeartExperienceSection({ messages, recipientName }: HeartExperienceSectionProps) {
  const [currentMessage, setCurrentMessage] = useState(
    messages[0] || 'তুমি আমার খুব প্রিয় একজন মানুষ।'
  );
  const [isBeating, setIsBeating] = useState(false);
  const [burstParticles, setBurstParticles] = useState<BurstHeart[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClickHeart = () => {
    setIsBeating(true);
    setTimeout(() => setIsBeating(false), 500);

    // Pick a new random message
    const filtered = messages.filter((m) => m !== currentMessage);
    const randomMsg =
      filtered[Math.floor(Math.random() * filtered.length)] || messages[0];
    setCurrentMessage(randomMsg);

    // Generate burst particles
    const newBursts: BurstHeart[] = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const distance = Math.random() * 90 + 50;
      newBursts.push({
        id: Date.now() + i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: Math.random() * 0.7 + 0.6,
        opacity: 1,
        rotation: (Math.random() - 0.5) * 60,
      });
    }

    setBurstParticles(newBursts);
    setTimeout(() => {
      setBurstParticles([]);
    }, 1200);
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-rose-300/80 text-xs tracking-widest font-sans-bn uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>একটি স্পর্শের অনুভূতি</span>
        </div>

        <h2 className="font-serif-bn text-3xl sm:text-4xl font-light text-rose-100 tracking-wide mb-3">
          হৃদয়ে স্পর্শ কর
        </h2>
        <p className="font-serif-bn text-xs sm:text-sm text-rose-300/60 mb-12">
          নিচের হৃদয়ে ক্লিক করে নতুন নতুন মিষ্টি বার্তা উন্মোচন করো
        </p>

        {/* Heart Interactive Container */}
        <div
          ref={containerRef}
          className="relative w-40 h-40 mx-auto flex items-center justify-center cursor-pointer select-none"
          onClick={handleClickHeart}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClickHeart();
            }
          }}
          aria-label="Click to reveal sweet message"
        >
          {/* Ambient glowing ripple */}
          <div className="absolute inset-0 rounded-full bg-rose-600/20 blur-2xl animate-soft-pulse pointer-events-none" />

          {/* Burst Hearts */}
          {burstParticles.map((p) => (
            <div
              key={p.id}
              className="absolute pointer-events-none transition-all duration-1000 ease-out"
              style={{
                transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg) scale(${p.scale})`,
                opacity: 0,
              }}
            >
              <Heart className="w-6 h-6 text-rose-400 fill-rose-500 filter drop-shadow" />
            </div>
          ))}

          {/* Main Clickable Heart */}
          <div
            className={`transition-transform duration-300 ${
              isBeating ? 'scale-125' : 'hover:scale-110 active:scale-95'
            }`}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-900 to-rose-600 flex items-center justify-center shadow-[0_0_35px_rgba(225,29,72,0.6)] border border-rose-400/50">
              <Heart className="w-12 h-12 text-white fill-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Dynamic Heart Message Box */}
        <div className="mt-12 min-h-[90px] flex items-center justify-center">
          <div className="rounded-2xl bg-[#140a14]/90 border border-rose-900/40 px-8 py-5 max-w-lg shadow-xl shadow-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <p className="font-serif-bn text-lg sm:text-xl text-rose-100 leading-relaxed tracking-wide">
              {currentMessage.replace('তুমি', `${recipientName}`)}
            </p>
          </div>
        </div>

        <span className="block mt-4 text-[11px] text-rose-300/40 font-sans-bn">
          (আরও বার্তার জন্য বারবার হৃদয়ে স্পর্শ করো)
        </span>
      </div>
    </section>
  );
}
