import { useState, useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import IntroLetterSection from './components/IntroLetterSection';
import WhySpecialSection from './components/WhySpecialSection';
import CinematicQuotesSection from './components/CinematicQuotesSection';
import TimelineSection from './components/TimelineSection';
import MemorySection from './components/MemorySection';
import SadComfortSection from './components/SadComfortSection';
import HeartExperienceSection from './components/HeartExperienceSection';
import SecretMessageSection from './components/SecretMessageSection';
import LoveLetterSection from './components/LoveLetterSection';
import MusicExperienceSection from './components/MusicExperienceSection';
import MissYouSection from './components/MissYouSection';
import FutureDreamsSection from './components/FutureDreamsSection';
import FinalSurpriseSection from './components/FinalSurpriseSection';
import Footer from './components/Footer';
import PersonalizeModal from './components/PersonalizeModal';
import { initialLoveData, LoveData, MemoryItem } from './data/loveData';

export default function App() {
  const [data, setData] = useState<LoveData>(() => {
    try {
      const saved = localStorage.getItem('romantic_love_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback if localStorage is inaccessible
    }
    return initialLoveData;
  });

  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);

  // Synchronize document title with recipient's name
  useEffect(() => {
    document.title = `${data.recipientName} · অনুভূতি | A Cinematic Love Story`;
  }, [data.recipientName]);

  const handleSaveData = (newData: LoveData) => {
    setData(newData);
    try {
      localStorage.setItem('romantic_love_data', JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const handleResetData = () => {
    setData(initialLoveData);
    try {
      localStorage.removeItem('romantic_love_data');
    } catch (e) {
      console.error('Failed to reset localStorage:', e);
    }
  };

  const handleAddMemory = (newMemory: MemoryItem) => {
    const updatedMemories = [newMemory, ...data.memories];
    const updatedData = { ...data, memories: updatedMemories };
    handleSaveData(updatedData);
  };

  const handleUpdateLetter = (
    salutation: string,
    body: string[],
    signature: string
  ) => {
    const updatedData = {
      ...data,
      loveLetter: {
        ...data.loveLetter,
        salutation,
        body,
        signature,
      },
    };
    handleSaveData(updatedData);
  };

  const scrollToStory = () => {
    const element = document.getElementById('story');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050408] text-[#f7f2ea] overflow-x-hidden selection:bg-rose-900/60 selection:text-rose-100 font-sans-bn">
      {/* Ambient background particles & stars */}
      <ParticleCanvas />

      {/* Desktop subtle glowing cursor */}
      <CustomCursor />

      {/* Top Bar Navigation */}
      <Navbar
        recipientName={data.recipientName}
        onOpenPersonalize={() => setIsPersonalizeOpen(true)}
      />

      <main className="relative z-10 flex flex-col">
        {/* 1. Cinematic Hero Section */}
        <HeroSection data={data} onStartStory={scrollToStory} />

        {/* 2. Personal Love Introduction */}
        <IntroLetterSection data={data} />

        {/* 3. “Why You Are Special” Section */}
        <WhySpecialSection
          reasons={data.reasons}
          recipientName={data.recipientName}
        />

        {/* 4. Emotional Quotes Interlude */}
        <CinematicQuotesSection quotes={data.quotes} />

        {/* 5. Love Story Timeline */}
        <TimelineSection
          timeline={data.timeline}
          recipientName={data.recipientName}
        />

        {/* 6. Memory Section */}
        <MemorySection
          memories={data.memories}
          onAddMemory={handleAddMemory}
        />

        {/* 7. “If You Ever Feel Sad” Comfort Section */}
        <SadComfortSection data={data} />

        {/* 8. Interactive Heart / Emotion Experience */}
        <HeartExperienceSection
          messages={data.heartMessages}
          recipientName={data.recipientName}
        />

        {/* 9. Secret Message Section */}
        <SecretMessageSection data={data} />

        {/* 10. Love Letter Section */}
        <LoveLetterSection
          data={data}
          onUpdateLetter={handleUpdateLetter}
        />

        {/* 11. Romantic Music Experience */}
        <MusicExperienceSection />

        {/* 12. “I Miss You” Interaction */}
        <MissYouSection data={data} />

        {/* 13. Future Dreams Section */}
        <FutureDreamsSection data={data} />

        {/* 14. Final Surprise Section */}
        <FinalSurpriseSection data={data} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Personalization Modal */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        data={data}
        onSave={handleSaveData}
        onReset={handleResetData}
      />
    </div>
  );
}
