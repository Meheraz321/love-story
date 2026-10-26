import { Stars } from 'lucide-react';
import { LoveData } from '../data/loveData';

interface FutureDreamsSectionProps {
  data: LoveData;
}

export default function FutureDreamsSection({ data }: FutureDreamsSectionProps) {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-rose-950/20 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-rose-300/80 text-xs tracking-widest font-sans-bn uppercase mb-3">
            <Stars className="w-3.5 h-3.5 text-rose-400" />
            <span>অনাগত দিনের সহজ ইচ্ছেগুলো</span>
          </div>
          <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-light text-rose-100 tracking-wide">
            আর যদি ভবিষ্যৎটা একটু সুন্দর হয়…
          </h2>
          <p className="font-serif-bn text-rose-300/60 text-sm sm:text-base mt-3 max-w-lg mx-auto">
            কোনো বড় অবাস্তব প্রতিশ্রুতি নয়, শুধু সাধারণ কিছু মুহূর্ত তোমায় পাশে নিয়ে কাটানো
          </p>
        </div>

        {/* Dreams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.futureDreams.map((dream, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-[#130a14]/80 border border-rose-950/60 hover:border-rose-700/50 p-6 shadow-xl shadow-black/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-rose-950/40"
            >
              <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {dream.icon}
              </div>
              <h3 className="font-serif-bn text-xl font-normal text-rose-100 group-hover:text-rose-200 transition-colors mb-2">
                {dream.title}
              </h3>
              <p className="font-serif-bn text-sm text-rose-200/70 leading-relaxed">
                {dream.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
