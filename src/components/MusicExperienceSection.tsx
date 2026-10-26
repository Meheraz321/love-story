import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, RotateCcw } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';
import mySong from '../assets/my-song.mp3'; // ১. আপনার লোকাল অডিও ফাইলটি এভাবে ইমপোর্ট করুন

export default function MusicExperienceSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(romanticAudio.getVolume());
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);

  // ২. আপনার গানের নাম এখানে পার্মানেন্টভাবে সেট করে দিন
  const [songTitle, setSongTitle] = useState('আমাদের মিষ্টি সুর · My Special Song');

  useEffect(() => {
    // কম্পোনেন্ট লোড হওয়ার সাথে সাথেই পার্মানেন্ট গানটি সেট করে দেওয়া হলো
    romanticAudio.setCustomAudio(mySong);

    romanticAudio.onStateChange((playing) => {
      setIsPlaying(playing);
    });

    romanticAudio.onTimeUpdate((curr, total) => {
      setCurrentTime(curr);
      setDuration(total);
    });
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      romanticAudio.pause();
    } else {
      romanticAudio.play();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    romanticAudio.setVolume(newVol);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      romanticAudio.setVolume(volume || 0.5);
      setIsMuted(false);
    } else {
      romanticAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    romanticAudio.seek(val);
  };

  const handleResetToDefault = () => {
    romanticAudio.setCustomAudio(mySong);
    romanticAudio.play();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-rose-950/20 blur-[140px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {/* Animated equalizer or music note icon */}
        <div className="w-16 h-16 rounded-full bg-rose-950/60 border border-rose-800/40 mx-auto flex items-center justify-center text-rose-300 mb-6 shadow-xl shadow-rose-950/40">
          {isPlaying ? (
            <div className="flex items-end gap-1 h-6">
              <span className="w-1 bg-rose-400 rounded-full animate-eq-1" />
              <span className="w-1 bg-rose-400 rounded-full animate-eq-2" />
              <span className="w-1 bg-rose-400 rounded-full animate-eq-3" />
              <span className="w-1 bg-rose-400 rounded-full animate-eq-4" />
            </div>
          ) : (
            <Music className="w-7 h-7 text-rose-300" />
          )}
        </div>

        <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-light text-rose-100 tracking-wide mb-3">
          এই গল্পের সাথে একটা সুর…
        </h2>
        <p className="font-serif-bn text-rose-300/60 text-sm sm:text-base mb-10 max-w-md mx-auto">
          কিছু অনুভূতিকে পূর্ণতা দিতে ব্যাকগ্রাউন্ডে বেজে ওঠে এক স্নিগ্ধ মায়াবী পিয়ানোর সুর
        </p>

        {/* Music Player Container */}
        <div className="rounded-3xl bg-[#140b15]/90 border border-rose-800/40 p-6 sm:p-8 shadow-2xl shadow-black/60 backdrop-blur-md">
          {/* Track title & Mode */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-6 pb-4 border-b border-rose-950/60">
            <div className="text-left">
              <div className="text-[11px] font-sans-bn text-rose-400/80 uppercase tracking-widest">
                পার্মানেন্ট ব্যাকগ্রাউন্ড মিউজিক
              </div>
              <div className="font-serif-bn text-base sm:text-lg text-rose-100 font-medium">
                {songTitle}
              </div>
            </div>

            {/* Reset / Replay button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetToDefault}
                className="p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/30 text-rose-300 text-xs transition-colors flex items-center gap-1.5"
                title="গান শুরু থেকে বাজান"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>প্রথম থেকে</span>
              </button>
            </div>
          </div>

          {/* Progress Slider */}
          <div className="space-y-1.5 mb-6">
            <input
              type="range"
              min={0}
              max={duration || 180}
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-rose-500 h-1.5 bg-rose-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-rose-300/60 tabular-nums">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-between gap-4">
            {/* Play/Pause Master CTA */}
            <button
              onClick={handleTogglePlay}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-900 to-rose-700 hover:from-rose-800 hover:to-rose-600 text-white font-serif-bn text-sm shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all hover:scale-105 active:scale-95 border border-rose-400/40"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>সুর থামান</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Play Our Song ♫</span>
                </>
              )}
            </button>

            {/* Volume control */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMute}
                className="text-rose-300/70 hover:text-rose-100 transition-colors"
                aria-label="Toggle mute"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-24 accent-rose-500 h-1.5 bg-rose-950 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}