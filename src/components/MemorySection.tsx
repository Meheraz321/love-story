import { useState } from 'react';
import { Camera, Image as ImageIcon, Heart, X, Plus } from 'lucide-react';
import { MemoryItem } from '../data/loveData';

interface MemorySectionProps {
  memories: MemoryItem[];
  onAddMemory?: (memory: MemoryItem) => void;
}

export default function MemorySection({ memories, onAddMemory }: MemorySectionProps) {
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newImage, setNewImage] = useState<string | undefined>(undefined);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newMem: MemoryItem = {
      id: `custom_${Date.now()}`,
      title: newTitle,
      subtitle: newSubtitle || 'একটি সুন্দর মুহূর্ত',
      note: newNote || 'হৃদয়ে চিরকাল অক্ষত থাকবে এই স্মৃতি।',
      tag: newTag || 'প্রিয় স্মৃতি',
      image: newImage,
    };

    if (onAddMemory) {
      onAddMemory(newMem);
    }

    setNewTitle('');
    setNewSubtitle('');
    setNewNote('');
    setNewTag('');
    setNewImage(undefined);
    setShowAddModal(false);
  };

  return (
    <section id="memories" className="relative py-28 px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-rose-950/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-rose-300/80 text-xs tracking-widest font-sans-bn uppercase mb-3">
            <Camera className="w-3.5 h-3.5 text-rose-400" />
            <span>স্মৃতির অ্যালবাম</span>
          </div>
          <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-light text-rose-100 tracking-wide">
            ছোট ছোট মুহূর্ত, বড় বড় অনুভূতি
          </h2>
          <p className="font-serif-bn text-rose-300/60 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            সময় বয়ে যায়, কিন্তু হৃদয়ের ফ্রেমে বাঁধানো অনুভূতিগুলো কখনো ম্লান হয় না
          </p>
        </div>

        {/* Memories Grid - Polaroid style & visual cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {memories.map((mem) => (
            <div
              key={mem.id}
              onClick={() => setActiveMemory(mem)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveMemory(mem);
                }
              }}
              className="group cursor-pointer rounded-2xl bg-[#140b15]/90 border border-rose-950/70 hover:border-rose-600/50 p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_35px_rgba(225,29,72,0.15)] flex flex-col justify-between"
            >
              {/* Media Container */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#1f101d] mb-4">
                {mem.image ? (
                  <img
                    src={mem.image}
                    alt={mem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-rose-950/50 via-[#180916] to-[#0e050f]">
                    <div className="w-12 h-12 rounded-full bg-rose-900/30 border border-rose-700/30 flex items-center justify-center text-rose-300 mb-2">
                      <Heart className="w-6 h-6 fill-rose-500/30 text-rose-400" />
                    </div>
                    <span className="text-xs font-serif-bn text-rose-200/80 italic">
                      "না-বলা অনুভূতির মিষ্টি স্মৃতি"
                    </span>
                  </div>
                )}

                {/* Subtle tag overlay */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-rose-200 font-sans-bn">
                  {mem.tag}
                </div>
              </div>

              {/* Text Info */}
              <div className="px-1 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-bn text-lg font-normal text-rose-100 group-hover:text-rose-200 transition-colors">
                    {mem.title}
                  </h3>
                  <p className="text-xs text-rose-400/70 font-sans-bn mt-1">
                    {mem.subtitle}
                  </p>
                  <p className="font-serif-bn text-xs text-rose-200/70 line-clamp-2 mt-2 leading-relaxed">
                    {mem.note}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-rose-950/50 flex items-center justify-between text-[11px] font-sans-bn text-rose-300/60">
                  <span>বড় করে দেখুন</span>
                  <span className="text-rose-400">🔍</span>
                </div>
              </div>
            </div>
          ))}

          {/* Add a New Memory Card Button */}
          <div
            onClick={() => setShowAddModal(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowAddModal(true);
              }
            }}
            className="group cursor-pointer rounded-2xl border-2 border-dashed border-rose-900/40 hover:border-rose-500/50 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-rose-950/20 min-h-[280px]"
          >
            <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-rose-300 group-hover:scale-110 group-hover:bg-rose-900/60 transition-all mb-3">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="font-serif-bn text-lg font-normal text-rose-200">
              একটি নতুন স্মৃতি যোগ করুন
            </h3>
            <p className="font-serif-bn text-xs text-rose-400/60 mt-1 max-w-[200px]">
              তোমার পছন্দের বিশেষ কোনো মুহূর্ত বা ছবি যোগ করে রাখো
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox / Expanded Memory Modal */}
      {activeMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#120813] border border-rose-800/50 p-6 sm:p-8 shadow-2xl shadow-rose-950/60 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveMemory(null)}
              className="absolute top-4 right-4 p-2 text-rose-300/60 hover:text-rose-100 transition-colors rounded-full hover:bg-rose-950/50"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {activeMemory.image && (
              <div className="rounded-xl overflow-hidden mb-6 aspect-video max-h-[380px] bg-black">
                <img
                  src={activeMemory.image}
                  alt={activeMemory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="inline-block px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/30 text-rose-300 text-xs font-sans-bn mb-3">
              {activeMemory.tag}
            </div>

            <h3 className="font-serif-bn text-2xl sm:text-3xl font-normal text-rose-100">
              {activeMemory.title}
            </h3>
            <p className="text-sm text-rose-400/80 font-sans-bn mt-1 mb-6">
              {activeMemory.subtitle}
            </p>

            <div className="p-5 rounded-xl bg-black/40 border border-rose-950/60 text-rose-100/90 font-serif-bn text-base leading-relaxed italic">
              "{activeMemory.note}"
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveMemory(null)}
                className="px-5 py-2 rounded-lg bg-rose-950/90 hover:bg-rose-900 border border-rose-800/50 text-rose-200 text-xs transition-colors"
              >
                স্মৃতি অ্যালবাম বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Memory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#140b15] border border-rose-800/50 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-rose-300/60 hover:text-rose-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-bn text-2xl text-rose-100 mb-1">
              নতুন স্মৃতি যোগ করুন
            </h3>
            <p className="font-serif-bn text-xs text-rose-300/60 mb-6">
              তুমি চাইলে নিজস্ব কোনো ছবি বা আবেগের কথা এখানে যুক্ত করতে পারো।
            </p>

            <form onSubmit={handleCreateMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-sans-bn text-rose-300 mb-1">
                  স্মৃতির শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: প্রথম একসাথে বৃষ্টি ভেজা"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0c050d] border border-rose-900/60 text-rose-100 text-sm focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-bn text-rose-300 mb-1">
                  তারিখ বা মুহূর্তের উপশিরোনাম
                </label>
                <input
                  type="text"
                  placeholder="যেমন: এক বিকেলে ক্যাফের বারান্দায়"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0c050d] border border-rose-900/60 text-rose-100 text-sm focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-bn text-rose-300 mb-1">
                  স্মৃতিকথা বা আবেগপূর্ণ বার্তা
                </label>
                <textarea
                  rows={3}
                  placeholder="এই মুহূর্তটি কেন তোমার কাছে এত বিশেষ..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0c050d] border border-rose-900/60 text-rose-100 text-sm focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-bn text-rose-300 mb-1">
                  ছবি আপলোড করুন (ঐচ্ছিক)
                </label>
                <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-rose-800/60 cursor-pointer bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 text-xs">
                  <ImageIcon className="w-4 h-4 text-rose-400" />
                  <span>{newImage ? 'ছবি নির্বাচন করা হয়েছে ✓' : 'ডিভাইস থেকে ছবি বাছাই করুন'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-transparent border border-rose-900/60 text-rose-300 text-xs hover:bg-rose-950/40"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-rose-800 hover:bg-rose-700 text-white text-xs font-medium shadow-md shadow-rose-950"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
