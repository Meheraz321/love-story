import { useState } from 'react';
import { PenTool, Copy, Check, Heart, Edit3 } from 'lucide-react';
import { LoveData } from '../data/loveData';

interface LoveLetterSectionProps {
  data: LoveData;
  onUpdateLetter?: (salutation: string, body: string[], signature: string) => void;
}

export default function LoveLetterSection({ data, onUpdateLetter }: LoveLetterSectionProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableSalutation, setEditableSalutation] = useState(data.loveLetter.salutation);
  const [editableBody, setEditableBody] = useState(data.loveLetter.body.join('\n\n'));
  const [editableSignature, setEditableSignature] = useState(data.loveLetter.signature);

  const handleCopy = () => {
    const fullText = `${data.loveLetter.salutation}\n\n${data.loveLetter.body.join('\n\n')}\n\n${data.loveLetter.signature}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    const paragraphs = editableBody.split('\n\n').filter((p) => p.trim().length > 0);
    if (onUpdateLetter) {
      onUpdateLetter(editableSalutation, paragraphs, editableSignature);
    }
    setIsEditing(false);
  };

  return (
    <section id="letter" className="relative py-28 px-6 overflow-hidden">
      {/* Background soft ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-rose-950/20 blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-rose-300/80 text-xs tracking-widest font-sans-bn uppercase mb-3">
            <PenTool className="w-3.5 h-3.5 text-rose-400" />
            <span>চিঠির খামে বন্ধ ভালোবাসা</span>
          </div>
          <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-light text-rose-100 tracking-wide"> 
            {data.recipientName} তোমার জন্য একটা চিঠি…
          </h2>
          <p className="font-serif-bn text-rose-300/60 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            কালির স্পর্শে আঁকা কিছু নিঃস্বার্থ অনুভূতির রূপরেখা
          </p>
        </div>

        {/* Digital Handwritten Letter Paper */}
        <div className="relative rounded-3xl parchment-texture p-8 sm:p-14 md:p-16 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-rose-900/30">
          {/* Action Bar (Copy & Edit) */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-rose-900/30 text-xs font-sans-bn text-rose-300/60">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500/80" />
              <span>ডিজিটাল পাণ্ডুলিপি</span>
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/30 text-rose-300 hover:text-white transition-colors"
                title="চিঠির লেখা পড়"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'প্রিভিউ' : 'চিঠি এডিট করুন'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/30 text-rose-300 hover:text-white transition-colors"
                title="চিঠিটি কপি করুন"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>কপি</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Letter Body or Edit Form */}
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-sans-bn text-rose-300 mb-1">
                  সম্বোধন:
                </label>
                <input
                  type="text"
                  value={editableSalutation}
                  onChange={(e) => setEditableSalutation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-rose-800/50 text-rose-100 font-serif-bn text-base focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-bn text-rose-300 mb-1">
                  চিঠির মূল বক্তব্য (অনুচ্ছেদগুলোর মাঝে খালি লাইন রাখুন):
                </label>
                <textarea
                  rows={8}
                  value={editableBody}
                  onChange={(e) => setEditableBody(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-rose-800/50 text-rose-100 font-serif-bn text-base leading-relaxed focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-bn text-rose-300 mb-1">
                  ইতি / ইতিবাচক বার্তা:
                </label>
                <input
                  type="text"
                  value={editableSignature}
                  onChange={(e) => setEditableSignature(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-rose-800/50 text-rose-100 font-serif-bn text-base focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-5 py-2 rounded-lg bg-rose-800 hover:bg-rose-700 text-white text-xs font-medium shadow-md shadow-rose-950 transition-colors"
                >
                  চিঠি সংরক্ষণ করুন
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Salutation */}
              <h3 className="font-serif-bn text-xl sm:text-2xl text-rose-200 font-normal">
                {data.loveLetter.salutation.replace('তুমি', `${data.recipientName}`)}
              </h3>

              {/* Paragraphs */}
              <div className="space-y-6 font-serif-bn text-base sm:text-lg md:text-xl text-rose-100/90 leading-relaxed text-justify sm:text-left">
                {data.loveLetter.body.map((para, idx) => (
                  <p key={idx} className="transition-all duration-300">
                    {para.replace('তুমি', `${data.recipientName}`)}
                  </p>
                ))}
              </div>

              {/* Signature and Wax Stamp Lockup */}
              <div className="pt-10 mt-10 border-t border-rose-900/30 flex items-center justify-between">
                {/* Wax seal look */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-700 to-rose-950 border-2 border-rose-500/50 flex items-center justify-center shadow-lg shadow-black/80">
                    <Heart className="w-5 h-5 text-rose-200 fill-rose-200/80" />
                  </div>
                  <div className="text-[11px] font-sans-bn text-rose-300/60 leading-tight">
                    <div>সিলমোহরকৃত</div>
                    <div>হৃদয়ের সত্য ভালোবাসা</div>
                  </div>
                </div>

                <div className="text-right font-serif-bn text-base sm:text-lg text-rose-300/90 italic">
                  {data.loveLetter.signature}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
