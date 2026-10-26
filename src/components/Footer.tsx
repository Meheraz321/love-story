import { Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-6 bg-[#030204] border-t border-rose-950/40 text-center text-rose-300/60 font-serif-bn">
      <div className="max-w-xl mx-auto space-y-4">
        {/* Animated Little Heart */}
        <div className="flex justify-center">
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-rose-950/40 border border-rose-800/30 text-rose-400 hover:text-white hover:bg-rose-900/40 hover:scale-110 transition-all shadow-md"
            title="পৃষ্ঠার শুরুতে ফিরুন"
          >
            <Heart className="w-5 h-5 fill-rose-500 animate-pulse" />
          </button>
        </div>

        <p className="font-display-en text-sm sm:text-base italic text-rose-200/70 tracking-wide">
          “Some feelings are better felt than explained.”
        </p>

        <p className="text-xs text-rose-400/50 font-sans-en flex items-center justify-center gap-1.5">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          <span>and a little piece of my heart.</span>
        </p>

        <p className="text-[11px] text-rose-400/30 font-sans-bn pt-2">
          অনুভূতি · ভালোবাসার এক চিরন্তন উপহার
        </p>
      </div>
    </footer>
  );
}
