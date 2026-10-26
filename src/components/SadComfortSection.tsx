import { ShieldCheck, Moon } from 'lucide-react';
import { LoveData } from '../data/loveData';

interface SadComfortSectionProps {
  data: LoveData;
}

export default function SadComfortSection({ data }: SadComfortSectionProps) {
  return (
    <section className="relative py-28 px-6 overflow-hidden bg-gradient-to-b from-transparent via-[#100612]/70 to-transparent">
      {/* Soothing glowing ambient halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-rose-950/25 blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Soft Moon icon */}
        <div className="w-12 h-12 rounded-full bg-rose-950/40 border border-rose-800/30 mx-auto flex items-center justify-center text-rose-300 mb-6 shadow-[0_0_20px_rgba(244,114,182,0.25)]">
          <Moon className="w-5 h-5 text-rose-300 fill-rose-400/20" />
        </div>

        <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-light text-rose-100 tracking-wide mb-8">
          {data.sadComfort.heading.replace('তোমার', `${data.recipientName} এর`)}
        </h2>

        {/* Reassuring emotional card */}
        <div className="rounded-3xl bg-[#140a14]/80 border border-rose-900/30 p-8 sm:p-12 md:p-14 shadow-2xl shadow-black/60 backdrop-blur-md relative overflow-hidden">
          {/* Subtle soft gradient highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />

          <div className="space-y-4 font-serif-bn text-base sm:text-lg md:text-xl text-rose-100/90 leading-relaxed tracking-wide">
            {data.sadComfort.text.map((line, idx) => (
              <p
                key={idx}
                className={
                  idx === 3 || idx === 4 || idx === 5
                    ? 'text-rose-200 font-normal py-1'
                    : 'text-rose-200/80'
                }
              >
                {line.replace('তোমার', `${data.recipientName} এর`)}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-rose-950/50 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm font-sans-bn text-rose-300/80">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>{data.sadComfort.reassurance}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
