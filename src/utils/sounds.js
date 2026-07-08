// Sound synthesizer using Web Audio API for retro arcade sound effects
// This eliminates the need for external MP3 files and prevents 404 errors.

let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Play a short retro beep when clicking a grid cell or button
export const playClickSound = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    // Retro click: rapid sweep down in pitch
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.warn("Audio Context failed to play click sound:", e);
  }
};

// Play a high-pitched retro beep on hover
export const playHoverSound = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(800, ctx.currentTime);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // Fail silently on hover
  }
};

// Play a triumphant retro arpeggio when a player wins
export const playWinSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // A simple retro arpeggio: C4 -> E4 -> G4 -> C5
    const notes = [261.63, 329.63, 392.00, 523.25];
    const duration = 0.12;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(freq, now + index * duration);

      // Volume envelope
      gain.gain.setValueAtTime(0.1, now + index * duration);
      gain.gain.exponentialRampToValueAtTime(0.01, now + index * duration + duration - 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * duration);
      osc.stop(now + index * duration + duration);
    });
  } catch (e) {
    console.warn("Audio Context failed to play win sound:", e);
  }
};

// Play a sad sliding note for draw/ties
export const playDrawSound = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.warn("Audio Context failed to play draw sound:", e);
  }
};
