// Romantic Web Audio Synthesizer & Audio Player Manager
// Generates a lush, midnight romantic piano & warm celesta arpeggios chord progression.
// Also supports custom audio files (mp3, wav, etc.) uploaded by the user.

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isSynthesizerRunning = false;
  private currentVolume = 0.65;
  private timerId: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private isCustomMode = false;
  private playbackSeconds = 0;
  private totalDurationSeconds = 180; // virtual 3 min loop for synth
  private intervalTimer: number | null = null;
  private onTimeUpdateCallback: ((time: number, duration: number) => void) | null = null;
  private onStateChangeCallback: ((isPlaying: boolean) => void) | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft, warm piano/bell chime note
  private playPianoChime(freq: number, time: number, duration: number, gainValue = 0.15) {
    if (!this.ctx) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm, rounded tone filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.frequency.exponentialRampToValueAtTime(450, time + duration);

    // Sine + subtle triangle for harmonic warmth
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, time); // warm octave overtone

    // Master envelope: soft attack, natural decay
    gainNode.gain.setValueAtTime(0.0001, time);
    gainNode.gain.linearRampToValueAtTime(gainValue * this.currentVolume, time + 0.08);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(this.ctx.destination);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }

  // Romantic progression in D minor / F major (D, F, A, C, E, Bb, G...)
  private startSynthSequence() {
    if (!this.ctx) return;
    this.isSynthesizerRunning = true;

    // Frequencies (Hz) for a sweet, nostalgic romantic arpeggio
    // D3, F3, A3, C4, D4, E4, F4, G4, A4, Bb4, C5, D5
    const notes: { [key: string]: number } = {
      D3: 146.83, F3: 174.61, A3: 220.00,
      Bb3: 233.08, C4: 261.63, D4: 293.66,
      E4: 329.63, F4: 349.23, G4: 392.00,
      A4: 440.00, Bb4: 466.16, C5: 523.25, D5: 587.33
    };

    const chords = [
      // D minor / Fmaj7 romantic nocturnal vibe
      [notes.D3, notes.A3, notes.F4, notes.A4, notes.D5],
      // Bb Major 7 (hopeful, warm)
      [notes.Bb3, notes.F3, notes.D4, notes.F4, notes.A4],
      // C Major (gentle longing)
      [notes.C4, notes.G4, notes.E4, notes.C5, notes.E4],
      // F Major / A minor (sweet intimacy)
      [notes.F3, notes.C4, notes.A4, notes.C5, notes.A4],
      // G minor (deep emotional care)
      [notes.D3, notes.Bb3, notes.G4, notes.D5, notes.Bb4],
      // A minor 7 (eternal promise)
      [notes.A3, notes.E4, notes.C5, notes.G4, notes.E4]
    ];

    let chordIndex = 0;
    const playChordCycle = () => {
      if (!this.isSynthesizerRunning || !this.ctx) return;

      const chord = chords[chordIndex % chords.length];
      const now = this.ctx.currentTime;

      // Arpeggiate chord notes over 3.2 seconds
      chord.forEach((freq, i) => {
        const noteTime = now + (i * 0.42);
        this.playPianoChime(freq, noteTime, 3.0, i === 0 ? 0.22 : 0.14);
      });

      chordIndex++;
      this.timerId = window.setTimeout(playChordCycle, 2800);
    };

    playChordCycle();
  }

  public setCustomAudio(fileUrl: string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio.src = '';
    }
    this.customAudio = new Audio(fileUrl);
    this.customAudio.loop = true;
    this.customAudio.volume = this.currentVolume;
    this.isCustomMode = true;

    this.customAudio.addEventListener('timeupdate', () => {
      if (this.customAudio && this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.customAudio.currentTime, this.customAudio.duration || 180);
      }
    });

    this.customAudio.addEventListener('ended', () => {
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    });
  }

  public switchToDefaultSynth() {
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.isCustomMode = false;
  }

  public play() {
    this.initContext();

    if (this.isCustomMode && this.customAudio) {
      this.customAudio.play().catch(() => {
        // fallback to synth if user audio playback failed
        this.isCustomMode = false;
        this.startSynthSequence();
      });
    } else {
      this.startSynthSequence();
    }

    if (!this.intervalTimer) {
      this.intervalTimer = window.setInterval(() => {
        if (!this.isCustomMode) {
          this.playbackSeconds = (this.playbackSeconds + 1) % this.totalDurationSeconds;
          if (this.onTimeUpdateCallback) {
            this.onTimeUpdateCallback(this.playbackSeconds, this.totalDurationSeconds);
          }
        }
      }, 1000);
    }

    if (this.onStateChangeCallback) this.onStateChangeCallback(true);
  }

  public pause() {
    this.isSynthesizerRunning = false;
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.intervalTimer) {
      window.clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.onStateChangeCallback) this.onStateChangeCallback(false);
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.customAudio) {
      this.customAudio.volume = this.currentVolume;
    }
  }

  public getVolume() {
    return this.currentVolume;
  }

  public seek(seconds: number) {
    if (this.isCustomMode && this.customAudio) {
      this.customAudio.currentTime = seconds;
    } else {
      this.playbackSeconds = seconds;
    }
  }

  public onTimeUpdate(cb: (current: number, total: number) => void) {
    this.onTimeUpdateCallback = cb;
  }

  public onStateChange(cb: (isPlaying: boolean) => void) {
    this.onStateChangeCallback = cb;
  }
}

export const romanticAudio = new RomanticAudioEngine();
