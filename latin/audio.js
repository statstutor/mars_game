// Music, sound effects and voice. Everything is synthesised with Web Audio except the voices,
// which are pre-recorded clips in voice/ (made by tools/make_voices.py). If a clip is missing,
// the browser's own speech is used instead.
(function () {
  let ctx = null, master, musicBus, sfxBus, voiceBus;
  const prefs = { music: true, sfx: true, voice: true };
  try { Object.assign(prefs, JSON.parse(localStorage.getItem('endingEaters.audio') || '{}')); } catch (e) {}
  const savePrefs = () => { try { localStorage.setItem('endingEaters.audio', JSON.stringify(prefs)); } catch (e) {} };

  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
    musicBus = ctx.createGain(); musicBus.gain.value = prefs.music ? 0.32 : 0; musicBus.connect(master);
    sfxBus = ctx.createGain(); sfxBus.gain.value = prefs.sfx ? 0.7 : 0; sfxBus.connect(master);
    if (pendingTrack) music(pendingTrack);
  }

  // ---------- small synth helpers ----------
  function tone(freq, t, dur, type = 'square', vol = 0.2, bus = sfxBus, slideTo) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(bus); o.start(t); o.stop(t + dur + 0.02);
    return o;
  }
  let noiseBuf = null;
  function noise(t, dur, vol = 0.3, filt = 2000, type = 'lowpass', bus = sfxBus, sweepTo) {
    if (!noiseBuf) {
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; f.type = type; f.frequency.setValueAtTime(filt, t);
    if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(bus); s.start(t); s.stop(t + dur + 0.02);
  }
  const N = (n) => 440 * Math.pow(2, (n - 69) / 12); // midi note to Hz

  const SFX = {
    click(t) { tone(900, t, 0.04, 'square', 0.08); },
    pop(t) { tone(700, t, 0.12, 'sine', 0.3, sfxBus, 180); },
    correct(t) { [72, 76, 79, 84].forEach((n, i) => tone(N(n), t + i * 0.07, 0.16, 'square', 0.12)); },
    wrong(t) { tone(220, t, 0.18, 'sawtooth', 0.12, sfxBus, 150); tone(160, t + 0.16, 0.26, 'sawtooth', 0.12, sfxBus, 100); },
    chomp(t) { for (let i = 0; i < 3; i++) { noise(t + i * 0.13, 0.08, 0.5, 900); tone(140, t + i * 0.13, 0.08, 'square', 0.2, sfxBus, 60); } },
    burp(t) {
      const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(110, t); o.frequency.linearRampToValueAtTime(70, t + 0.6);
      lfo.frequency.value = 28; lg.gain.value = 25; lfo.connect(lg); lg.connect(o.frequency);
      f.type = 'lowpass'; f.frequency.value = 700; f.Q.value = 6;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.5, t + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);
      o.connect(f); f.connect(g); g.connect(sfxBus); o.start(t); lfo.start(t); o.stop(t + 0.7); lfo.stop(t + 0.7);
    },
    roar(t) { noise(t, 0.6, 0.5, 600, 'lowpass', sfxBus, 200); tone(90, t, 0.6, 'sawtooth', 0.2, sfxBus, 55); },
    beep(t) { tone(1200, t, 0.08, 'square', 0.1); tone(1600, t + 0.1, 0.08, 'square', 0.1); tone(900, t + 0.2, 0.1, 'square', 0.1); },
    giggle(t) { for (let i = 0; i < 6; i++) tone(N(84 + (i % 2) * 4), t + i * 0.06, 0.05, 'triangle', 0.15); },
    chill(t) { tone(N(55), t, 0.4, 'triangle', 0.25, sfxBus, N(52)); tone(N(62), t + 0.05, 0.4, 'sine', 0.1); },
    star(t) { [88, 91, 96].forEach((n, i) => tone(N(n), t + i * 0.09, 0.3, 'sine', 0.15)); },
    whoosh(t) { noise(t, 0.35, 0.25, 400, 'bandpass', sfxBus, 3000); },
    splat(t) { noise(t, 0.3, 0.5, 500, 'lowpass', sfxBus, 100); tone(120, t, 0.2, 'sine', 0.3, sfxBus, 40); },
    zap(t) { tone(1400, t, 0.15, 'sawtooth', 0.12, sfxBus, 200); },
    snap(t) { noise(t, 0.05, 0.6, 3000, 'highpass'); tone(500, t, 0.06, 'square', 0.12); },
    combo(t) { [76, 79, 83, 88].forEach((n, i) => tone(N(n), t + i * 0.05, 0.1, 'square', 0.08)); },
    fanfare(t) {
      [[67, 0, .15], [72, .15, .15], [76, .3, .15], [79, .45, .3], [76, .78, .15], [79, .93, .6]].forEach(([n, d, l]) => {
        tone(N(n), t + d, l + 0.05, 'square', 0.12); tone(N(n - 12), t + d, l + 0.05, 'triangle', 0.15);
      });
    },
    sad(t) { [67, 64, 60].forEach((n, i) => tone(N(n), t + i * 0.2, 0.25, 'triangle', 0.2)); },
  };
  function sfx(name) {
    if (!ctx || !prefs.sfx || !SFX[name]) return;
    SFX[name](ctx.currentTime + 0.01);
  }

  // ---------- music: a tiny step sequencer ----------
  // Each track is a chord loop (root notes), an arpeggio shape, a melody (16 steps per bar,
  // 0 = rest) and a drum pattern. Songs are short loops in the spirit of old console games.
  const TRACKS = {
    title: { bpm: 112, chords: [60, 55, 57, 53], arp: [0, 4, 7, 12, 7, 4, 0, 4], mel: [
      [72, 0, 76, 0, 79, 0, 76, 0, 77, 0, 76, 0, 74, 0, 0, 0], [71, 0, 74, 0, 79, 0, 74, 0, 76, 0, 74, 0, 71, 0, 0, 0],
      [72, 0, 76, 0, 81, 0, 79, 0, 76, 0, 72, 0, 74, 0, 76, 0], [77, 0, 76, 0, 74, 0, 72, 0, 74, 0, 0, 0, 72, 0, 0, 0]], drums: 'k.h.s.h.k.k.s.h.' },
    map: { bpm: 96, chords: [60, 57, 53, 55], arp: [0, 7, 12, 7], mel: [
      [79, 0, 0, 76, 0, 0, 72, 0, 74, 0, 76, 0, 0, 0, 0, 0], [76, 0, 0, 72, 0, 0, 69, 0, 72, 0, 74, 0, 0, 0, 0, 0],
      [77, 0, 0, 76, 0, 0, 74, 0, 72, 0, 69, 0, 0, 0, 0, 0], [74, 0, 0, 76, 0, 0, 79, 0, 0, 0, 0, 0, 0, 0, 0, 0]], drums: 'k...h...s...h...' },
    play: { bpm: 104, chords: [57, 53, 60, 55], arp: [0, 3, 7, 3], mel: null, drums: 'k...s...k.k.s...', minor: true },
    arcade: { bpm: 148, chords: [57, 57, 53, 55], arp: [0, 12, 7, 12, 3, 12, 7, 12], mel: [
      [81, 0, 79, 0, 76, 0, 74, 0, 76, 0, 0, 72, 0, 74, 0, 0], [81, 0, 79, 0, 76, 0, 79, 0, 81, 0, 0, 84, 0, 83, 0, 0],
      [77, 0, 76, 0, 74, 0, 72, 0, 74, 0, 0, 72, 0, 69, 0, 0], [71, 0, 72, 0, 74, 0, 76, 0, 79, 0, 0, 76, 0, 0, 0, 0]], drums: 'k.hsk.hsk.hsk.ss', minor: true },
    boss: { bpm: 120, chords: [57, 57, 58, 56], arp: [0, 3, 7, 10, 7, 3], mel: null, drums: 'k..hs.h.k.khs.h.', minor: true },
  };
  let current = null, pendingTrack = null, timer = null, step = 0, nextT = 0;
  function music(name) {
    pendingTrack = name;
    if (!ctx) return;
    if (current === name) return;
    current = name; step = 0; nextT = ctx.currentTime + 0.1;
    if (!timer) timer = setInterval(schedule, 40);
  }
  function stopMusic() { current = null; pendingTrack = null; }
  function schedule() {
    if (!current || !ctx) return;
    const tr = TRACKS[current], spb = 60 / tr.bpm / 4; // 16th notes
    while (nextT < ctx.currentTime + 0.15) {
      const bar = Math.floor(step / 16) % tr.chords.length, s = step % 16, root = tr.chords[bar];
      const third = tr.minor && (bar === 0 || bar === 1) ? 3 : 4;
      if (s % 4 === 0) tone(N(root - 24), nextT, spb * 3.5, 'triangle', 0.35, musicBus);
      if (s % 2 === 0) {
        let iv = tr.arp[(s / 2) % tr.arp.length]; if (iv === 4 || iv === 3) iv = third;
        tone(N(root + iv), nextT, spb * 1.6, 'square', 0.05, musicBus);
      }
      if (tr.mel) { const m = tr.mel[bar % tr.mel.length][s]; if (m) tone(N(m), nextT, spb * 1.8, 'square', 0.07, musicBus); }
      const d = tr.drums[s];
      if (d === 'k') tone(150, nextT, 0.12, 'sine', 0.5, musicBus, 45);
      if (d === 's') noise(nextT, 0.1, 0.2, 1800, 'bandpass', musicBus);
      if (d === 'h') noise(nextT, 0.03, 0.08, 7000, 'highpass', musicBus);
      nextT += spb; step++;
    }
  }

  // ---------- voice ----------
  // Same FNV-1a hash of "who|text" (UTF-16 code units) as tools/make_voices.py.
  function clipKey(who, text) {
    let h = 0x811c9dc5;
    const s = who + '|' + text;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }
  const clips = new Set(window.VOICE_CLIPS || []);
  let curAudio = null, onVoiceEnd = null;
  function say(who, text, spokenText) {
    stopVoice();
    if (!prefs.voice || !text) return Promise.resolve();
    duck(true);
    return new Promise((resolve) => {
      const done = () => { duck(false); resolve(); };
      onVoiceEnd = done;
      const key = clipKey(who, text);
      if (clips.has(key)) {
        const a = new Audio('voice/' + key + '.mp3');
        curAudio = a; a.onended = done; a.onerror = () => { curAudio = null; speak(spokenText || text, who, done); };
        a.play().catch(() => speak(spokenText || text, who, done));
      } else speak(spokenText || text, who, done);
    });
  }
  function speak(text, who, done) {
    if (!('speechSynthesis' in window)) return done();
    const u = new SpeechSynthesisUtterance(text);
    const pitch = { nar: 1.05, marcus: 1.4, normus: 0.8, accusative: 0.5, ablato: 1.6, pluri: 1.9 }[who];
    u.pitch = pitch || 1; u.rate = who === 'normus' ? 0.85 : 0.95;
    const v = speechSynthesis.getVoices().find(v => /^en(-|_|$)/i.test(v.lang));
    if (v) u.voice = v;
    u.onend = done; u.onerror = done;
    speechSynthesis.speak(u);
  }
  function stopVoice() {
    if (curAudio) { curAudio.onended = null; curAudio.pause(); curAudio = null; }
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (onVoiceEnd) { const f = onVoiceEnd; onVoiceEnd = null; f(); }
  }
  function duck(on) { if (ctx && prefs.music) musicBus.gain.setTargetAtTime(on ? 0.12 : 0.32, ctx.currentTime, 0.15); }

  function toggle(kind) {
    prefs[kind] = !prefs[kind]; savePrefs();
    if (ctx && kind === 'music') musicBus.gain.setTargetAtTime(prefs.music ? 0.32 : 0, ctx.currentTime, 0.05);
    if (ctx && kind === 'sfx') sfxBus.gain.setTargetAtTime(prefs.sfx ? 0.7 : 0, ctx.currentTime, 0.05);
    if (kind === 'voice' && !prefs.voice) stopVoice();
    return prefs[kind];
  }

  window.SOUND = { init, sfx, music, stopMusic, say, stopVoice, toggle, prefs, clipKey };
})();
