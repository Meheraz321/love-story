import { useState } from 'react';
import { Sparkles, Heart, X, Quote } from 'lucide-react';
import { SpecialReason } from '../data/loveData';

interface WhySpecialSectionProps {
  reasons: SpecialReason[];
  recipientName: string;
}

export default function WhySpecialSection({ reasons, recipientName }: WhySpecialSectionProps) {
  const [selectedReason, setSelectedReason] = useState<SpecialReason | null>(null);

  return (
    <section id="why-special" className="relative py-28 px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-rose-950/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-950/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-rose-300/80 text-xs tracking-widest font-sans-bn uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>অগণিত কারণের কয়েকটি</span>
          </div>
          <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-light text-rose-100 tracking-wide">
            {recipientName} আমার কাছে এতটা বিশেষ কেন?
          </h2>
          <p className="font-serif-bn text-rose-300/60 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            প্রতিটি কার্ডে স্পর্শ করে জেনে নাও হৃদয়ের লুকানো কথাগুলো
          </p>
        </div>

        {/* Floating Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedReason(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedReason(item);
                }
              }}
              className="group relative cursor-pointer text-left rounded-2xl bg-gradient-to-b from-[#180d19]/80 to-[#0e0710]/90 border border-rose-950/60 hover:border-rose-500/50 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(225,29,72,0.18)] flex flex-col justify-between"
            >
              {/* Soft corner glow */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-rose-500/10 rounded-full blur-xl group-hover:bg-rose-500/25 transition-all duration-300" />

              <div>
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow">
                  {item.icon}
                </div>
                <h3 className="font-serif-bn text-xl font-normal text-rose-100 group-hover:text-rose-200 transition-colors">
                  {item.title}
                </h3>
                <p className="font-serif-bn text-sm text-rose-300/70 mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-950/40 flex items-center justify-between text-xs font-sans-bn text-rose-400/80 group-hover:text-rose-300 transition-colors">
                <span>পুরোটা পড়ুন</span>
                <span className="text-lg leading-none transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Reason Modal */}
      {selectedReason && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#140b15] border border-rose-800/40 p-8 shadow-2xl shadow-rose-950/60">
            <button
              onClick={() => setSelectedReason(null)}
              className="absolute top-4 right-4 p-2 text-rose-300/60 hover:text-rose-100 transition-colors rounded-full hover:bg-rose-950/40"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-4xl mb-4">{selectedReason.icon}</div>
            <h3 className="font-serif-bn text-2xl font-light text-rose-100 mb-2">
              {selectedReason.title}
            </h3>
            <div className="h-0.5 w-12 bg-rose-600/50 mb-6" />

            <div className="relative pl-6 border-l-2 border-rose-500/30 my-4">
              <Quote className="w-4 h-4 text-rose-400/40 absolute -top-1 left-1" />
              <p className="font-serif-bn text-base sm:text-lg text-rose-200/90 leading-relaxed italic">
                {selectedReason.detailedThought}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-950/60 flex items-center justify-between text-xs text-rose-300/60 font-sans-bn">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>আমার হৃদয়ের কথা</span>
              </span>
              <button
                onClick={() => setSelectedReason(null)}
                className="px-4 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800/40 text-rose-200 text-xs transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
