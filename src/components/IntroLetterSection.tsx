import { useState, useEffect } from 'react';
import { Feather, Calendar, Clock, Heart } from 'lucide-react';
import { LoveData } from '../data/loveData';

interface IntroLetterSectionProps {
  data: LoveData;
}

export default function IntroLetterSection({ data }: IntroLetterSectionProps) {
  const [timeTogether, setTimeTogether] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!data.anniversaryDate) return;

    const calculateTime = () => {
      const start = new Date(data.anniversaryDate).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, now - start);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [data.anniversaryDate]);

  return (
    <section id="story" className="relative py-28 px-6 overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-rose-950/15 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header kicker */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-rose-300/80 text-xs tracking-widest font-sans-bn uppercase mb-3">
            <Feather className="w-3.5 h-3.5 text-rose-400" />
            <span>অব্যক্ত অনুভূতির চিঠি</span>
          </div>
          <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-light text-rose-100 tracking-wide">
            {data.introduction.heading}
          </h2>
          <p className="font-serif-bn text-rose-300/60 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            {data.introduction.subheading}
          </p>
        </div>

        {/* Narrative Box with letter styling */}
        <div className="relative rounded-2xl bg-[#120a11]/70 border border-rose-900/30 p-8 sm:p-12 md:p-16 shadow-2xl shadow-black/60 backdrop-blur-sm">
          {/* Decorative corner accents */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-rose-500/30" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-rose-500/30" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-rose-500/30" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-rose-500/30" />

          <div className="space-y-6 sm:space-y-8 text-rose-100/90 font-serif-bn text-base sm:text-lg md:text-xl leading-relaxed tracking-wide text-justify sm:text-left">
            {data.introduction.paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="first-letter:text-3xl first-letter:font-serif first-letter:text-rose-400 first-letter:mr-1 transition-all duration-700"
              >
                {para.replace('তুমি', `${data.recipientName}`)}
              </p>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-rose-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans-bn text-rose-300/60">
            <div className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>প্রতিটি শব্দ তোমার জন্য সত্য</span>
            </div>
            <div className="font-serif-bn italic text-rose-200/80 text-sm">
              — {data.senderName}
            </div>
          </div>
        </div>

        {/* Live Milestone Counter */}
        {data.anniversaryDate && (
          <div className="mt-14 rounded-xl bg-gradient-to-r from-rose-950/30 via-[#180d19]/60 to-rose-950/30 border border-rose-900/20 p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-rose-300 text-xs mb-3 font-sans-bn">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>আমাদের একসাথে পথচলার সুন্দর মুহূর্তগুলো</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
              <div className="p-3 rounded-lg bg-black/40 border border-rose-950/40">
                <div className="text-2xl sm:text-3xl font-serif text-rose-100 tabular-nums">
                  {timeTogether.days}
                </div>
                <div className="text-[11px] text-rose-300/70 font-sans-bn mt-0.5">দিন</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-rose-950/40">
                <div className="text-2xl sm:text-3xl font-serif text-rose-100 tabular-nums">
                  {timeTogether.hours}
                </div>
                <div className="text-[11px] text-rose-300/70 font-sans-bn mt-0.5">ঘণ্টা</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-rose-950/40">
                <div className="text-2xl sm:text-3xl font-serif text-rose-100 tabular-nums">
                  {timeTogether.minutes}
                </div>
                <div className="text-[11px] text-rose-300/70 font-sans-bn mt-0.5">মিনিট</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-rose-950/40">
                <div className="text-2xl sm:text-3xl font-serif text-rose-100 tabular-nums">
                  {timeTogether.seconds}
                </div>
                <div className="text-[11px] text-rose-300/70 font-sans-bn mt-0.5">সেকেন্ড</div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-rose-300/50">
              <Clock className="w-3 h-3" />
              <span>প্রতিটি মুহূর্ত শুধুই তোমাকে নিয়ে সমৃদ্ধ</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
