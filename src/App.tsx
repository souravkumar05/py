/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  Smile, 
  Frown, 
  Zap, 
  Coffee, 
  Target, 
  Briefcase, 
  Car, 
  Dumbbell, 
  PartyPopper, 
  Moon,
  ChevronRight,
  RotateCcw,
  Copy,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

// --- Types & Constants ---

type Mood = 'happy' | 'sad' | 'energetic' | 'chill' | 'focused';
type Situation = 'working' | 'commuting' | 'gym' | 'party' | 'relaxing';
type Energy = 'low' | 'medium' | 'high' | 'max';

interface PlaylistResult {
  name: string;
  description: string;
  genres: string[];
  bpmRange: string;
  bpmValue: number; // 0-100 for visualization
  soundsLike: string[];
}

const MOODS: { id: Mood; label: string; emoji: string; icon: any }[] = [
  { id: 'happy', label: 'Happy', emoji: '😊', icon: Smile },
  { id: 'sad', label: 'Melancholic', emoji: '😔', icon: Frown },
  { id: 'energetic', label: 'Energetic', emoji: '⚡', icon: Zap },
  { id: 'chill', label: 'Chill', emoji: '🌊', icon: Coffee },
  { id: 'focused', label: 'Focused', emoji: '🎯', icon: Target },
];

const SITUATIONS: { id: Situation; label: string; icon: any }[] = [
  { id: 'working', label: 'Deep Work', icon: Briefcase },
  { id: 'commuting', label: 'On the Move', icon: Car },
  { id: 'gym', label: 'Powering Through', icon: Dumbbell },
  { id: 'party', label: 'Socializing', icon: PartyPopper },
  { id: 'relaxing', label: 'Unwinding', icon: Moon },
];

const ENERGIES: { id: Energy; label: string; desc: string }[] = [
  { id: 'low', label: 'Low', desc: 'Gentle & Soft' },
  { id: 'medium', label: 'Medium', desc: 'Steady Rhythm' },
  { id: 'high', label: 'High', desc: 'Upbeat & Driving' },
  { id: 'max', label: 'Max', desc: 'Pure Adrenaline' },
];

// --- Logic Engine ---

const generatePlaylist = (mood: Mood, situation: Situation, energy: Energy): PlaylistResult => {
  // A simplified mapping logic to ensure variety
  const combinations: Record<string, Partial<PlaylistResult>> = {
    'happy-party-max': {
      name: 'Electric Euphoria',
      description: 'A high-octane explosion of joy designed for the peak of the night. Pure dopamine in audio form.',
      genres: ['Nu-Disco', 'Future House', 'Pop'],
      bpmRange: '124 - 128 BPM',
      bpmValue: 85,
      soundsLike: ['Dua Lipa', 'Kaytranada', 'Purple Disco Machine']
    },
    'sad-relaxing-low': {
      name: 'Midnight Reflections',
      description: 'Soft, cinematic textures for when you just need to feel everything. A gentle embrace in the dark.',
      genres: ['Ambient', 'Modern Classical', 'Post-Rock'],
      bpmRange: '60 - 75 BPM',
      bpmValue: 20,
      soundsLike: ['Olafur Arnalds', 'Sigur Rós', 'Explosions in the Sky']
    },
    'focused-working-medium': {
      name: 'Flow State Protocol',
      description: 'Steady, non-intrusive rhythms to keep your brain in the zone. Perfect for deep coding or writing.',
      genres: ['Lo-fi Beats', 'Deep Techno', 'Minimal'],
      bpmRange: '90 - 110 BPM',
      bpmValue: 50,
      soundsLike: ['Bonobo', 'Christian Löffler', 'Tycho']
    },
    'energetic-gym-max': {
      name: 'Iron & Pulse',
      description: 'Aggressive beats and heavy basslines to push you past your limits. No excuses, just power.',
      genres: ['Phonk', 'Hardstyle', 'Industrial'],
      bpmRange: '140 - 160 BPM',
      bpmValue: 95,
      soundsLike: ['Kordhell', 'Gesaffelstein', 'Mick Gordon']
    },
    'chill-commuting-low': {
      name: 'Urban Transit',
      description: 'Smooth jazz-infused hip hop for watching the city lights blur past your window.',
      genres: ['Jazz Hop', 'Neo-Soul', 'Chillhop'],
      bpmRange: '80 - 95 BPM',
      bpmValue: 35,
      soundsLike: ['Nujabes', 'Erykah Badu', 'Tom Misch']
    },
    'happy-relaxing-medium': {
      name: 'Golden Hour Glow',
      description: 'Warm, acoustic melodies that feel like a sunset on a summer evening. Pure relaxation.',
      genres: ['Indie Folk', 'Acoustic Pop', 'Tropical House'],
      bpmRange: '100 - 115 BPM',
      bpmValue: 55,
      soundsLike: ['Jack Johnson', 'Kygo', 'Maggie Rogers']
    }
  };

  const key = `${mood}-${situation}-${energy}`;
  const base = combinations[key];

  if (base) return base as PlaylistResult;

  // Fallback dynamic generation if specific combo isn't mapped
  const fallbackNames: Record<Mood, string[]> = {
    happy: ['Sun-Drenched', 'Vibrant', 'Joyride'],
    sad: ['Echoes', 'Blue', 'Solitude'],
    energetic: ['Voltage', 'Kinetic', 'Ignition'],
    chill: ['Drift', 'Mist', 'Lush'],
    focused: ['Nexus', 'Core', 'Precision']
  };

  const fallbackGenres: Record<Mood, string[]> = {
    happy: ['Pop', 'Funk', 'Disco'],
    sad: ['Indie', 'Slowcore', 'Ambient'],
    energetic: ['Rock', 'EDM', 'Drum & Bass'],
    chill: ['R&B', 'Lo-fi', 'Soul'],
    focused: ['IDM', 'Classical', 'Techno']
  };

  const moodName = fallbackNames[mood][Math.floor(Math.random() * 3)];
  const sitLabel = SITUATIONS.find(s => s.id === situation)?.label || 'Vibes';
  
  const energyBPM: Record<Energy, { range: string, val: number }> = {
    low: { range: '60-85', val: 25 },
    medium: { range: '90-115', val: 55 },
    high: { range: '120-140', val: 80 },
    max: { range: '145-175', val: 95 }
  };

  return {
    name: `${moodName} ${sitLabel}`,
    description: `A carefully curated selection of ${mood} sounds tailored for ${situation}. Designed to match your ${energy} energy preference.`,
    genres: fallbackGenres[mood],
    bpmRange: `${energyBPM[energy].range} BPM`,
    bpmValue: energyBPM[energy].val,
    soundsLike: ['Various Artists', 'Curated Selection', 'AI Discovery']
  };
};

// --- Components ---

export default function App() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<Mood | null>(null);
  const [situation, setSituation] = useState<Situation | null>(null);
  const [energy, setEnergy] = useState<Energy | null>(null);
  const [result, setResult] = useState<PlaylistResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('last_playlist');
    if (saved) {
      try {
        setResult(JSON.parse(saved));
        setStep(4);
      } catch (e) {
        console.error("Failed to parse saved playlist", e);
      }
    }
  }, []);

  const handleNext = () => {
    if (step === 1 && mood) setStep(2);
    else if (step === 2 && situation) setStep(3);
    else if (step === 3 && energy) {
      const newResult = generatePlaylist(mood!, situation!, energy!);
      setResult(newResult);
      localStorage.setItem('last_playlist', JSON.stringify(newResult));
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    setMood(null);
    setSituation(null);
    setEnergy(null);
    setResult(null);
    localStorage.removeItem('last_playlist');
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `Playlist: ${result.name}\nDescription: ${result.description}\nGenres: ${result.genres.join(', ')}\nBPM: ${result.bpmRange}\nSounds Like: ${result.soundsLike.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen animate-gradient flex flex-col items-center justify-center p-4 md:p-8">
      {/* Header / Progress */}
      <div className="w-full max-w-2xl mb-8 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-500 rounded-2xl shadow-lg shadow-purple-500/20">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Mood Curator
          </h1>
        </div>
        
        {step < 4 && (
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-purple-500 progress-bar-fill shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}
        <p className="text-sm text-white/40 font-medium uppercase tracking-widest">
          {step === 1 && "Step 1: Your Mood"}
          {step === 2 && "Step 2: Your Situation"}
          {step === 3 && "Step 3: Energy Level"}
          {step === 4 && "Your Custom Vibe"}
        </p>
      </div>

      <main className="w-full max-w-2xl relative">
        <AnimatePresence mode="wait">
          {/* Step 1: Mood */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="col-span-full mb-2">
                <h2 className="text-xl font-semibold text-white/90">How are you feeling right now?</h2>
              </div>
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  className={`glass p-6 rounded-3xl text-left transition-all duration-300 group hover:scale-[1.02] active:scale-95 ${
                    mood === m.id ? 'neon-border neon-glow bg-purple-500/10' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${mood === m.id ? 'bg-purple-500 text-white' : 'bg-white/5 text-purple-400 group-hover:text-purple-300'}`}>
                      <m.icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl">{m.emoji}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{m.label}</h3>
                  <p className="text-sm text-white/50">Select this if you feel {m.label.toLowerCase()}.</p>
                </button>
              ))}
              <div className="col-span-full mt-6 flex justify-end">
                <button
                  disabled={!mood}
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-xl shadow-purple-500/20"
                >
                  Next <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Situation */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="col-span-full mb-2">
                <h2 className="text-xl font-semibold text-white/90">What's your current situation?</h2>
              </div>
              {SITUATIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSituation(s.id)}
                  className={`glass p-6 rounded-3xl text-left transition-all duration-300 group hover:scale-[1.02] active:scale-95 ${
                    situation === s.id ? 'neon-border neon-glow bg-purple-500/10' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${situation === s.id ? 'bg-purple-500 text-white' : 'bg-white/5 text-purple-400 group-hover:text-purple-300'}`}>
                      <s.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{s.label}</h3>
                  <p className="text-sm text-white/50">Music tailored for {s.label.toLowerCase()}.</p>
                </button>
              ))}
              <div className="col-span-full mt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-4 text-white/60 hover:text-white font-bold transition-all"
                >
                  Back
                </button>
                <button
                  disabled={!situation}
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-xl shadow-purple-500/20"
                >
                  Next <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Energy */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 gap-4"
            >
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-white/90">What energy level do you want?</h2>
              </div>
              {ENERGIES.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setEnergy(e.id)}
                  className={`glass p-6 rounded-3xl text-left transition-all duration-300 group hover:scale-[1.01] active:scale-95 flex items-center justify-between ${
                    energy === e.id ? 'neon-border neon-glow bg-purple-500/10' : 'hover:bg-white/10'
                  }`}
                >
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{e.label}</h3>
                    <p className="text-sm text-white/50">{e.desc}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 transition-all ${energy === e.id ? 'border-purple-500 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'border-white/20'}`} />
                </button>
              ))}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-4 text-white/60 hover:text-white font-bold transition-all"
                >
                  Back
                </button>
                <button
                  disabled={!energy}
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-xl shadow-purple-500/20"
                >
                  Generate Playlist <Sparkles className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Result */}
          {step === 4 && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 rounded-[2.5rem] relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <span className="px-4 py-1.5 bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest rounded-full border border-purple-500/30">
                    AI Curated
                  </span>
                  <div className="flex gap-2">
                    {result.genres.map(g => (
                      <span key={g} className="px-3 py-1 bg-white/5 text-white/70 text-[10px] font-semibold uppercase rounded-lg border border-white/10">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                  {result.name}
                </h2>
                
                <p className="text-lg text-white/70 mb-8 leading-relaxed italic">
                  "{result.description}"
                </p>

                <div className="space-y-6 mb-10">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-white/40 uppercase tracking-tighter">BPM Intensity</span>
                      <span className="text-sm font-mono text-purple-400">{result.bpmRange}</span>
                    </div>
                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.bpmValue}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-purple-600 to-teal-400 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                      />
                    </div>
                  </div>

                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Sounds Like</h4>
                    <div className="flex flex-wrap gap-3">
                      {result.soundsLike.map(artist => (
                        <div key={artist} className="flex items-center gap-2 text-white/90 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                          {artist}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all border border-white/10"
                  >
                    {copied ? (
                      <> <CheckCircle2 className="w-5 h-5 text-teal-400" /> Copied! </>
                    ) : (
                      <> <Copy className="w-5 h-5" /> Copy Description </>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-purple-500/20"
                  >
                    <RotateCcw className="w-5 h-5" /> Regenerate
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-12 text-white/20 text-xs font-medium tracking-widest uppercase">
        Built with AI & Passion &bull; 2024
      </footer>
    </div>
  );
}
