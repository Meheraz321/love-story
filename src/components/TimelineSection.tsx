import { Compass, Sparkles } from 'lucide-react';
import { TimelineItem } from '../data/loveData';

interface TimelineSectionProps {
  timeline: TimelineItem[];
  recipientName: string;
}

export default function TimelineSection({ timeline, recipientName }: TimelineSectionProps) {
  return (
    <section id="story" className="relative py-28 px-6 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-rose-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-rose-300/80 text-xs tracking-widest font-sans-bn uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-rose-400" />
            <span>আমাদের অনুভূতির পথচলা</span>
          </div>
          <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-light text-rose-100 tracking-wide">
            আমাদের গল্প…
          </h2>
          <p className="font-serif-bn text-rose-300/60 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            {recipientName} এর সাথে প্রতিটি অধ্যায় এক অবিস্মরণীয় অনুভূতি
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-0">
          {/* Central Line for desktop, left line for mobile */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-rose-600/40 to-transparent" />

          <div className="space-y-16">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline central node dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#160a15] border-2 border-rose-500 shadow-[0_0_10px_rgba(244,114,182,0.8)] z-20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                  </div>

                  {/* Card Content container */}
                  <div
                    className={`w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0 ${
                      isEven ? 'sm:text-left sm:pr-0 sm:pl-0' : 'sm:text-right sm:pl-0 sm:pr-0'
                    }`}
                  >
                    <div className="group rounded-2xl bg-[#120914]/80 border border-rose-950/60 hover:border-rose-700/50 p-6 sm:p-7 shadow-xl shadow-black/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-rose-950/40">
                      {/* Chapter Badge */}
                      <div
                        className={`flex items-center gap-2 mb-2 text-xs font-sans-bn text-rose-400/90 ${
                          isEven ? 'justify-start' : 'sm:justify-end justify-start'
                        }`}
                      >
                        <Sparkles className="w-3 h-3 text-rose-400" />
                        <span className="tracking-wide uppercase text-[11px] font-sans-en">
                          {item.tag}
                        </span>
                        {item.date && (
                          <span className="text-rose-400/50">· {item.date}</span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif-bn text-xl sm:text-2xl font-normal text-rose-100 group-hover:text-rose-200 transition-colors mb-3">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="font-serif-bn text-sm sm:text-base text-rose-200/80 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Delicate note */}
                      {item.note && (
                        <div className="mt-4 pt-3 border-t border-rose-950/40 text-xs text-rose-300/60 italic font-serif-bn">
                          "{item.note}"
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
