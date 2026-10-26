import { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { LoveData } from '../data/loveData';

interface FinalSurpriseSectionProps {
  data: LoveData;
}

export default function FinalSurpriseSection({ data }: FinalSurpriseSectionProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#030205] py-32 px-6 overflow-hidden">
      {/* Deepest midnight radial backdrop */}
      <div className="absolute inset-0 bg-radial from-rose-950/15 via-[#060307] to-[#020104] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {!isRevealed ? (
          <div className="flex flex-col items-center">
            <span className="text-xs font-sans-bn uppercase tracking-widest text-rose-400/80 mb-3">
              {data.finalSurprise.initialPrompt}
            </span>

            <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-light text-rose-100 tracking-wide mb-8">
              {data.finalSurprise.secondaryPrompt}
            </h2>

            <button
              onClick={() => setIsRevealed(true)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-rose-100 font-serif-bn text-base border border-rose-500/50 shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:shadow-[0_0_40px_rgba(244,114,182,0.6)] hover:border-rose-400 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-rose-300" />
              <span>{data.finalSurprise.buttonText}</span>
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-1000 space-y-8">
            <div className="w-16 h-16 rounded-full bg-rose-950/60 border border-rose-700/40 mx-auto flex items-center justify-center text-rose-300 shadow-xl shadow-rose-950">
              <Heart className="w-8 h-8 text-rose-400 fill-rose-500 animate-pulse" />
            </div>

            {/* Revealed Poem */}
            <div className="space-y-3 font-serif-bn text-lg sm:text-xl md:text-2xl text-rose-100/90 leading-relaxed">
              {data.finalSurprise.revealedPoem.map((line, idx) => (
                <p key={idx} className="transition-all duration-700">
                  {line}
                </p>
              ))}
            </div>

            {/* Final Highlight */}
            <div className="py-6">
              <h3 className="font-serif-bn text-2xl sm:text-3xl md:text-4xl font-normal text-rose-200 bg-gradient-to-r from-rose-100 via-rose-300 to-amber-200 bg-clip-text text-transparent">
                {data.finalSurprise.finalHighlight.replace('তুমি', `${data.recipientName}`)}
              </h3>
            </div>

            {/* English Closing Gratitude */}
            <div className="pt-8 border-t border-rose-950/60">
              <p className="font-display-en text-xl sm:text-2xl italic text-rose-300/80 tracking-wide">
                "{data.finalSurprise.closingGratitude}"
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
