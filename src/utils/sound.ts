import { SoundEffectType } from '../types';

class SoundSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playKeySound(type: SoundEffectType, volume: number = 0.5, isSpace: boolean = false) {
    if (type === 'mute' || volume <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.4, now);
      masterGain.connect(ctx.destination);

      if (type === 'mechanical') {
        // High click + subtle thock
        const osc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(isSpace ? 420 : 750 + Math.random() * 80, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);

        clickGain.gain.setValueAtTime(0.8, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        // Noise buffer for mechanical spring contact
        const bufferSize = Math.floor(ctx.sampleRate * 0.02);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = isSpace ? 1200 : 2800;

        osc.connect(clickGain);
        clickGain.connect(masterGain);

        whiteNoise.connect(noiseFilter);
        noiseFilter.connect(masterGain);

        osc.start(now);
        whiteNoise.start(now);
        osc.stop(now + 0.04);
        whiteNoise.stop(now + 0.02);

      } else if (type === 'typewriter') {
        // Crisp metallic impact
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(isSpace ? 300 : 900, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.025);

        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.03);

      } else if (type === 'soft') {
        // Low soft laptop membrane tap
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(isSpace ? 180 : 320, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.03);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.03);
      }
    } catch {
      // Audio fallback silent
    }
  }

  playErrorSound(volume: number = 0.5) {
    const ctx = this.getContext();
    if (!ctx || volume <= 0) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.08);

      gain.gain.setValueAtTime(volume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Audio fallback
    }
  }

  playFinishChime(volume: number = 0.5) {
    const ctx = this.getContext();
    if (!ctx || volume <= 0) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const start = now + index * 0.08;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(volume * 0.3, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const soundManager = new SoundSynthesizer();
