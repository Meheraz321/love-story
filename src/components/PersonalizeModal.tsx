import { useState } from 'react';
import { X, Save, RotateCcw, Sparkles, Heart } from 'lucide-react';
import { LoveData, initialLoveData } from '../data/loveData';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: LoveData;
  onSave: (newData: LoveData) => void;
  onReset: () => void;
}

export default function PersonalizeModal({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
}: PersonalizeModalProps) {
  const [formData, setFormData] = useState<LoveData>(data);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    if (confirm('আপনি কি পূর্বনির্ধারিত লেখায় ফিরে যেতে চান?')) {
      onReset();
      setFormData(initialLoveData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#140a15] border border-rose-800/50 shadow-2xl shadow-black overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-rose-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-950/80 border border-rose-700/40 flex items-center justify-center text-rose-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-bn text-xl text-rose-100 font-normal">
                ওয়েবপেজটি কাস্টমাইজ করুন
              </h3>
              <p className="font-sans-bn text-xs text-rose-300/60">
                তোমার ভালোবাসার মানুষের নাম ও বিশেষ তথ্য দিয়ে সাজিয়ে নাও
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-rose-300/60 hover:text-rose-100 transition-colors rounded-full hover:bg-rose-950/50"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Scrollable */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Recipient's Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans-bn text-rose-300 mb-1.5">
                যার জন্য এই উপহার (নাম):
              </label>
              <input
                type="text"
                required
                value={formData.recipientName}
                onChange={(e) =>
                  setFormData({ ...formData, recipientName: e.target.value })
                }
                placeholder="যেমন:মায়াবতী"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-rose-900/60 text-rose-100 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-sans-bn text-rose-300 mb-1.5">
                মিষ্টি ডাকনাম / সম্বোধন:
              </label>
              <input
                type="text"
                value={formData.recipientNickname}
                onChange={(e) =>
                  setFormData({ ...formData, recipientNickname: e.target.value })
                }
                placeholder="যেমন: আমার অনুভূতি / চাঁদের কণা"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-rose-900/60 text-rose-100 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Sender's Name & Anniversary Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans-bn text-rose-300 mb-1.5">
                তোমার নিজের নাম / স্বাক্ষর:
              </label>
              <input
                type="text"
                value={formData.senderName}
                onChange={(e) =>
                  setFormData({ ...formData, senderName: e.target.value })
                }
                placeholder="যেমন: তোমার মানুষ"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-rose-900/60 text-rose-100 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-sans-bn text-rose-300 mb-1.5">
                প্রথম কথা বা সম্পর্কের তারিখ (কাউন্টারের জন্য):
              </label>
              <input
                type="date"
                value={formData.anniversaryDate}
                onChange={(e) =>
                  setFormData({ ...formData, anniversaryDate: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-rose-900/60 text-rose-100 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Hero Line 1 */}
          <div>
            <label className="block text-xs font-sans-bn text-rose-300 mb-1.5">
              হিরো সেকশনের প্রথম কথা:
            </label>
            <input
              type="text"
              value={formData.heroReveals.line1}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  heroReveals: { ...formData.heroReveals, line1: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-rose-900/60 text-rose-100 text-sm focus:outline-none focus:border-rose-500 font-serif-bn"
            />
          </div>

          {/* Hero Line 2 */}
          <div>
            <label className="block text-xs font-sans-bn text-rose-300 mb-1.5">
              হিরো সেকশনের দ্বিতীয় কথা:
            </label>
            <input
              type="text"
              value={formData.heroReveals.line2}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  heroReveals: { ...formData.heroReveals, line2: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-rose-900/60 text-rose-100 text-sm focus:outline-none focus:border-rose-500 font-serif-bn"
            />
          </div>

          {/* Final Surprise Highlight */}
          <div>
            <label className="block text-xs font-sans-bn text-rose-300 mb-1.5">
              শেষ চমকের মূল ভালোবাসার উক্তি:
            </label>
            <input
              type="text"
              value={formData.finalSurprise.finalHighlight}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  finalSurprise: {
                    ...formData.finalSurprise,
                    finalHighlight: e.target.value,
                  },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-rose-900/60 text-rose-100 text-sm focus:outline-none focus:border-rose-500 font-serif-bn"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/40 text-xs text-rose-300/80 font-sans-bn leading-relaxed">
            💡 <strong>টিপ:</strong> আপনি চাইলে সরাসরি কোডের{' '}
            <code className="text-rose-200">src/data/loveData.ts</code> ফাইলটিতেও
            স্থায়ীভাবে সম্পূর্ণ গল্প, ছবি ও সময়রেখা পরিবর্তন করতে পারবেন।
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-rose-950/60 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-rose-400 hover:text-rose-200 text-xs transition-colors hover:bg-rose-950/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>রিসেট করুন</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-rose-300 hover:text-white bg-transparent border border-rose-900/60 hover:bg-rose-950/40 transition-colors"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-rose-900 to-rose-700 hover:from-rose-800 hover:to-rose-600 shadow-lg shadow-rose-950/50 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>পরিবর্তন সংরক্ষণ করুন</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
