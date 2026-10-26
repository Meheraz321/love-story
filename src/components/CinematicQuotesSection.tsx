import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface CinematicQuotesSectionProps {
  quotes: string[];
}

export default function CinematicQuotesSection({ quotes }: CinematicQuotesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setFadeState('in');
      }, 600);
    }, 7000);

    return () => clearInterval(timer);
  }, [quotes.length]);

  const handleNext = () => {
    setFadeState('out');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
      setFadeState('in');
    }, 400);
  };

  const handlePrev = () => {
    setFadeState('out');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
      setFadeState('in');
    }, 400);
  };

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center bg-[#040306] px-6 py-24 overflow-hidden border-y border-rose-950/30">
      {/* Deep starry subtle vignette */}
      <div className="absolute inset-0 bg-radial from-rose-950/10 via-transparent to-[#040306] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
        <Quote className="w-10 h-10 text-rose-500/20 mb-8 filter drop-shadow" />

        {/* Current Quote with cinematic transition */}
        <div className="min-h-[140px] flex items-center justify-center">
          <blockquote
            className={`font-serif-bn text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-rose-100/95 leading-relaxed tracking-wide transition-all duration-700 transform ${
              fadeState === 'in'
                ? 'opacity-100 filter blur-0 scale-100 translate-y-0'
                : 'opacity-0 filter blur-sm scale-95 translate-y-4'
            }`}
          >
            "{quotes[currentIndex]}"
          </blockquote>
        </div>

        {/* Controls and dots */}
        <div className="mt-12 flex items-center gap-6">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full text-rose-300/50 hover:text-rose-100 hover:bg-rose-950/40 transition-colors"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setFadeState('out');
                  setTimeout(() => {
                    setCurrentIndex(idx);
                    setFadeState('in');
                  }, 400);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-rose-400' : 'w-2 bg-rose-900/60 hover:bg-rose-700/60'
                }`}
                aria-label={`Go to quote ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full text-rose-300/50 hover:text-rose-100 hover:bg-rose-950/40 transition-colors"
            aria-label="Next quote"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
