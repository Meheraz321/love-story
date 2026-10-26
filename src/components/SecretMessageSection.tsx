import { useState } from 'react';
import { Lock, Unlock, Mail, Sparkles } from 'lucide-react';
import { LoveData } from '../data/loveData';

interface SecretMessageSectionProps {
  data: LoveData;
}

export default function SecretMessageSection({ data }: SecretMessageSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-rose-950/20 blur-[140px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 text-rose-300/80 text-xs tracking-widest font-sans-bn uppercase mb-3">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          <span>গোপন অনুভূতির খাম</span>
        </div>

        <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-light text-rose-100 tracking-wide mb-4">
          একটা কথা শুধু {data.recipientName} তোমার জন্য…
        </h2>

        {!isOpen ? (
          <div className="mt-10 p-10 rounded-2xl bg-[#140b15]/70 border border-rose-900/30 flex flex-col items-center backdrop-blur-sm transition-all duration-500">
            <div className="w-16 h-16 rounded-full bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-rose-300 mb-6 shadow-lg shadow-black">
              <Lock className="w-7 h-7 text-rose-400" />
            </div>

            <p className="font-serif-bn text-lg text-rose-200/80 mb-8">
              {data.secretMessage.teaser}
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-rose-900 to-rose-700 text-rose-100 text-sm font-serif-bn font-medium border border-rose-500/50 shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(244,114,182,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Unlock className="w-4 h-4 text-rose-300" />
              <span>{data.secretMessage.buttonText}</span>
            </button>
          </div>
        ) : (
          <div className="mt-10 rounded-3xl parchment-texture p-8 sm:p-12 text-left relative overflow-hidden animate-in zoom-in-95 duration-700 shadow-2xl">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-rose-900/40">
              <span className="flex items-center gap-2 text-xs font-sans-bn text-rose-300/80">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>উন্মোচিত গোপন কথা</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-rose-400/60 hover:text-rose-200 transition-colors"
              >
                আবার লুকিয়ে রাখুন
              </button>
            </div>

            <div className="space-y-4 font-serif-bn text-base sm:text-lg md:text-xl text-rose-100/90 leading-relaxed">
              {data.secretMessage.unfoldedText.map((line, idx) => (
                <p key={idx} className="transition-all duration-500">
                  {line.replace('তোমাকে', `${data.recipientName} কে`)}
                </p>
              ))}

              <div className="pt-6 my-4 border-t border-rose-900/40">
                <p className="text-xl sm:text-2xl font-serif-bn text-rose-200 font-medium bg-gradient-to-r from-rose-100 via-rose-300 to-amber-200 bg-clip-text text-transparent">
                  {data.secretMessage.closingHighlight}
                </p>
              </div>
            </div>

            <div className="mt-8 text-right font-serif-bn text-sm text-rose-300/60">
              — {data.senderName}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
