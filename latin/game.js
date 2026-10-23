// Screens and game logic for "Marcus and the Ending Eaters".
(function () {
  const { M, FORMS, LESSONS, LEVELS, explain, tailHint, THINK, PRAISE, END, ARCADE, UNLOCK, spoken, tailOf, sneaky } = window.CONTENT;
  const WORDS = window.LATIN_WORDS;
  const app = document.getElementById('app');
  const $ = (sel, el = app) => el.querySelector(sel);
  const $$ = (sel, el = app) => [...el.querySelectorAll(sel)];
  const rnd = (n) => Math.floor(Math.random() * n);
  const pick = (a) => a[rnd(a.length)];
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const wordBy = (lemma) => WORDS.find(w => w.lemma === lemma);
  const say = (who, text) => SOUND.say(who, text, spoken(text));
  const sfx = (n) => SOUND.sfx(n);

  // ---------- saved progress ----------
  const KEY = 'endingEaters.v1';
  const S = Object.assign({ stars: {}, best: {}, missed: {}, flagged: {}, hat: null, seen: {} }, (() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; }
  })());
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const totalStars = () => Object.values(S.stars).reduce((a, b) => a + b, 0);
  const HATS = [
    { id: 'laurel', need: 3, name: 'Laurel wreath' }, { id: 'helmet', need: 8, name: 'Legion helmet' },
    { id: 'crown', need: 14, name: 'Emperor\'s crown' }, { id: 'wizard', need: 20, name: 'Wizard hat' },
  ];
  const unlockedHats = () => HATS.filter(h => totalStars() >= h.need);
  const missKey = (w, f) => w.lemma + ':' + f;
  function noteMiss(w, f) { S.missed[missKey(w, f)] = (S.missed[missKey(w, f)] || 0) + 1; save(); }
  function noteRight(w, f) { const k = missKey(w, f); if (S.missed[k]) { S.missed[k]--; if (S.missed[k] <= 0) delete S.missed[k]; save(); } }
  const reviewKeys = () => [...new Set([...Object.keys(S.missed), ...Object.keys(S.flagged)])];

  // ---------- word display ----------
  // the word split into body and tail; the tail is coloured when helpers are on
  function wordHTML(w, form, colors, blankTail) {
    const tail = tailOf(w, form);
    const c = colors ? `style="color:${ART.COLORS[form]}"` : '';
    return `<span class="stem">${w.stem}</span><span class="tail ${blankTail ? 'blank' : ''} ${colors ? 'colored' : ''}" ${c}>${blankTail ? '?' : tail}</span>`;
  }

  // ---------- shell ----------
  let keyHandler = null, cleanup = null;
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && current !== 'title') return goMap();
    if (keyHandler) keyHandler(e);
  });
  let current = 'title';
  function screen(name, html, music) {
    if (cleanup) { cleanup(); cleanup = null; }
    keyHandler = null; current = name;
    SOUND.stopVoice();
    app.className = 'screen-' + name;
    app.innerHTML = topbar(name) + `<main>${html}</main>`;
    wireTopbar();
    if (music) SOUND.music(music);
    window.scrollTo(0, 0);
  }
  function topbar(name) {
    const p = SOUND.prefs;
    return `<header class="topbar">
      ${name !== 'title' && name !== 'map' ? '<button class="tb home" data-act="home" aria-label="Back to map">🗺️</button>' : '<span></span>'}
      <div class="tb-title">${name === 'title' ? '' : 'Marcus &amp; the Ending Eaters'}</div>
      <div class="tb-right">
        ${name !== 'test' ? '<button class="tb" data-act="help" aria-label="Cheat sheet" title="Cheat sheet">❓</button>' : ''}
        <button class="tb ${p.music ? '' : 'off'}" data-act="music" title="Music">🎵</button>
        <button class="tb ${p.sfx ? '' : 'off'}" data-act="sfx" title="Sound effects">🔊</button>
        <button class="tb ${p.voice ? '' : 'off'}" data-act="voice" title="Voices">🗣️</button>
      </div></header>`;
  }
  function wireTopbar() {
    $$('.topbar [data-act]').forEach(b => b.onclick = () => {
      SOUND.init(); const a = b.dataset.act;
      if (a === 'home') return goMap();
      if (a === 'help') return cheatSheet();
      b.classList.toggle('off', !SOUND.toggle(a)); sfx('click');
    });
  }

  function cheatSheet() {
    sfx('pop');
    const ov = document.createElement('div');
    ov.className = 'overlay';
    ov.innerHTML = `<div class="sheet"><h2>Who eats which tail?</h2>
      ${FORMS.map(f => `<div class="sheet-row" style="--c:${ART.COLORS[f]}">${ART.monster(f)}
        <div><div class="sheet-tail">${M[f].tail}</div><div class="sheet-name">${M[f].name} · <b>${M[f].label}</b></div>
        <div class="sheet-job">${M[f].job}</div><div class="sheet-ex">${wordHTML(wordBy('lupus'), f, true)}</div></div></div>`).join('')}
      <div class="sheet-sneaky">🕳️ <b>Sneaky hole:</b> <i>cavum</i> ends in -um for normal AND accusative. Check the picture! Lots of holes = <i>cava</i>.</div>
      <button class="big" data-close>Got it!</button></div>`;
    document.body.appendChild(ov);
    const close = () => { ov.remove(); document.removeEventListener('keydown', esc, true); };
    const esc = (e) => { if (e.key === 'Escape' || e.key === 'Enter') { e.stopPropagation(); close(); } };
    document.addEventListener('keydown', esc, true);
    ov.onclick = (e) => { if (e.target === ov || e.target.dataset.close !== undefined) close(); };
  }

  // ---------- title ----------
  function goTitle() {
    screen('title', `<div class="title-wrap">
      <h1><span class="t1">Marcus</span><span class="t2">&amp; the</span><span class="t3">Ending Eaters</span></h1>
      <div class="title-art">${ART.marcus('wave', { hat: S.hat })}
        <div class="title-monsters">${FORMS.map((f, i) => `<div class="tm" style="animation-delay:${i * 0.2}s">${ART.monster(f)}</div>`).join('')}</div></div>
      <button class="big play" id="play">▶ Play</button>
      <p class="small">A Latin endings game · -us · -um · -ō · -ī</p></div>`);
    $('#play').onclick = () => { SOUND.init(); sfx('fanfare'); goMap(); };
    keyHandler = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $('#play').click(); } };
  }

  // ---------- map ----------
  function unlocked(i) { return i === 0 || (S.stars[LEVELS[i - 1].id] || 0) > 0; }
  function levelIcon(lv) {
    if (lv.type === 'arcade') return '<div class="lv-emoji">☄️</div>';
    if (lv.type === 'build') return '<div class="lv-emoji">🧩</div>';
    if (lv.id === 'sneaky') return '<div class="lv-emoji">🕳️</div>';
    if (lv.id === 'detective') return '<div class="lv-emoji">🔍</div>';
    if (lv.id === 'test') return '<div class="lv-emoji">🏆</div>';
    return `<div class="lv-mon">${lv.forms.map(f => ART.monster(f)).join('')}</div>`;
  }
  function goMap() {
    const total = totalStars(), hats = unlockedHats();
    const rk = reviewKeys();
    screen('map', `<div class="map-head">
        <button class="avatar" id="avatar" title="Change hat">${ART.marcus('wave', { hat: S.hat })}</button>
        <div><div class="map-stars">⭐ ${total}</div>
        <div class="small">${hats.length < HATS.length ? `Next hat at ${HATS[hats.length].need} ⭐` : 'All hats unlocked!'}${hats.length ? ' · tap Marcus to change hats' : ''}</div></div>
      </div>
      <div class="road">${LEVELS.map((lv, i) => {
        const st = S.stars[lv.id] || 0, max = lv.maxStars || 3, open = unlocked(i);
        return `<button class="lv ${open ? '' : 'locked'} ${st ? 'done' : ''}" data-i="${i}" ${open ? '' : 'disabled'}>
          <div class="lv-num">${i + 1}</div>${levelIcon(lv)}
          <div class="lv-text"><div class="lv-title">${lv.title}</div><div class="lv-blurb">${open ? lv.blurb : '🔒 Get a star on the level before'}</div></div>
          <div class="lv-stars">${Array.from({ length: max }, (_, k) => `<span class="${k < st ? 'on' : ''}">★</span>`).join('')}</div>
          ${lv.type === 'arcade' && S.best[lv.id] ? `<div class="lv-best">Best ${S.best[lv.id]}</div>` : ''}</button>`;
      }).join('')}
      ${rk.length ? `<button class="lv review" id="review"><div class="lv-num">↺</div><div class="lv-emoji">🏕️</div>
        <div class="lv-text"><div class="lv-title">Review Camp</div><div class="lv-blurb">${rk.length} tricky word${rk.length > 1 ? 's' : ''} to practise</div></div></button>` : ''}
      </div>`, 'map');
    $$('.lv[data-i]').forEach(b => b.onclick = () => { SOUND.init(); sfx('click'); startLevel(+b.dataset.i); });
    if ($('#review')) $('#review').onclick = () => { SOUND.init(); sfx('click'); startReview(); };
    $('#avatar').onclick = () => {
      SOUND.init();
      const opts = [null, ...hats.map(h => h.id)];
      S.hat = opts[(opts.indexOf(S.hat) + 1) % opts.length]; save(); sfx('pop');
      $('#avatar').innerHTML = ART.marcus('wave', { hat: S.hat });
    };
  }

  function startLevel(i) {
    const lv = LEVELS[i];
    const go = () => lv.type === 'arcade' ? arcade(lv) : lv.type === 'build' ? build(lv) : quiz(lv);
    const lesson = LESSONS[lv.id];
    if (lesson) lessonPlayer(lv, lesson, go); else go();
  }

  // ---------- lesson slides ----------
  function slideVisual(show) {
    if (show.marcus) return `<div class="vis-marcus">${ART.marcus(show.marcus, { hat: S.hat })}</div>`;
    if (show.monster) return `<div class="vis-monster bounce">${ART.monster(show.monster)}<div class="vm-name" style="color:${ART.COLORS[show.monster]}">${M[show.monster].name}<br><span>eats ${M[show.monster].tail}</span></div></div>`;
    if (show.monsters) return `<div class="vis-monsters">${show.monsters.map((f, i) => `<div class="vm bounce" style="animation-delay:${i * 0.15}s">${ART.monster(f)}
      <div class="vm-name" style="color:${ART.COLORS[f]}">${show.labels ? M[f].label : M[f].name}<br><span>${M[f].tail}</span></div></div>`).join('')}</div>`;
    if (show.scene) {
      const w = wordBy(show.scene[0]), sc = w.scenes[show.scene[1]];
      let svg = ART.scene(w, sc, { hints: !show.nohints, hat: S.hat });
      if (show.eyes) svg = svg.replace('</svg>', `<g transform="translate(200 202)"><g class="a-blink"><ellipse cx="-16" cy="0" rx="7" ry="8" fill="#fff"/><ellipse cx="16" cy="0" rx="7" ry="8" fill="#fff"/><circle cx="-14" cy="1" r="3.5" fill="#111"/><circle cx="18" cy="1" r="3.5" fill="#111"/></g></g></svg>`);
      return `<div class="vis-scene">${svg}<div class="word big-word">${wordHTML(w, sc.form, !show.nohints)}</div></div>`;
    }
    if (show.pair) return `<div class="vis-pair">${show.pair.map(([l, i]) => {
      const w = wordBy(l), sc = w.scenes[i];
      return `<div>${ART.scene(w, sc, { hints: true, hat: S.hat })}<div class="word">${wordHTML(w, sc.form, true)}</div></div>`;
    }).join('<div class="vs">→</div>')}</div>`;
    if (show.split) {
      const w = wordBy(show.split[0]), f = show.split[1];
      return `<div class="vis-split"><div class="split-word"><span class="stem">${w.stem}</span><span class="tail colored wag" style="color:${ART.COLORS[f]}">${tailOf(w, f)}</span></div>
        <div class="split-labels"><span>body</span><span style="color:${ART.COLORS[f]}">tail ↑</span></div></div>`;
    }
    if (show.row) {
      const w = wordBy(show.row);
      return `<div class="vis-row">${FORMS.map(f => {
        const sc = w.scenes.find(s => s.form === f);
        return `<div class="row-card" style="--c:${ART.COLORS[f]}">${ART.scene(w, sc, { hints: true, hat: S.hat })}<div class="word">${wordHTML(w, f, true)}</div><div class="row-label">${M[f].label}</div></div>`;
      }).join('')}</div>`;
    }
    return '';
  }
  const SPEAKER = { nar: '📜', marcus: '👦', normus: 'normal', accu: 'accusative', ablato: 'ablative', pluri: 'plural' };
  function portrait(who) {
    const f = SPEAKER[who];
    if (FORMS.includes(f)) return `<div class="portrait">${ART.monster(f)}</div>`;
    if (who === 'marcus') return `<div class="portrait">${ART.marcus('wave', { hat: S.hat })}</div>`;
    return `<div class="portrait emoji">🦉</div>`;
  }
  function lessonPlayer(lv, slides, done) {
    let i = 0;
    const seen = S.stars[lv.id] > 0;
    screen('lesson', `<div class="lesson"><div class="lesson-vis" id="vis"></div>
      <div class="bubble-row" id="brow"></div>
      <div class="lesson-nav"><button class="ghost" id="back">◀</button><div class="dots" id="dots"></div>
      <button class="ghost" id="again" title="Hear it again">🔊</button><button class="big" id="next">Next ▶</button></div>
      ${seen ? '<button class="skip" id="skip">Skip the lesson ⏭</button>' : ''}</div>`, 'map');
    const show = () => {
      const s = slides[i];
      $('#vis').innerHTML = slideVisual(s.show);
      $('#brow').innerHTML = `${portrait(s.who)}<div class="bubble">${s.text.replace(/(-us|-um|-ō|-ī|-a)\b|(-ō|-ī)/g, (m) => `<b class="tl">${m}</b>`)}</div>`;
      $('#dots').innerHTML = slides.map((_, k) => `<span class="${k === i ? 'on' : ''}"></span>`).join('');
      $('#back').style.visibility = i ? 'visible' : 'hidden';
      $('#next').textContent = i === slides.length - 1 ? 'Let\'s play! ▶' : 'Next ▶';
      if (s.show.monster) sfx(M[s.show.monster].sfx); else sfx('whoosh');
      say(s.who, s.text);
    };
    const next = () => { sfx('click'); if (i < slides.length - 1) { i++; show(); } else { SOUND.stopVoice(); done(); } };
    $('#next').onclick = next;
    $('#back').onclick = () => { if (i) { i--; show(); } };
    $('#again').onclick = () => say(slides[i].who, slides[i].text);
    if ($('#skip')) $('#skip').onclick = () => { SOUND.stopVoice(); done(); };
    keyHandler = (e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); next(); } if (e.key === 'ArrowLeft' && i) { i--; show(); } };
    show();
  }

  // ---------- building a round ----------
  const scenesOf = (w, form) => w.scenes.filter(s => s.form === form);
  function makeRound(lv) {
    const n = lv.n, forms = lv.forms;
    const regular = WORDS.filter(w => w.gender !== 'n');
    const neuters = WORDS.filter(w => w.gender === 'n');
    // spread the forms evenly, then shuffle
    let fs = []; while (fs.length < n) fs.push(...shuffle(forms)); fs = shuffle(fs.slice(0, n));
    const used = new Set(), items = [];
    let lastWord = null;
    for (const f of fs) {
      let cands = regular.filter(w => w !== lastWord && !used.has(missKey(w, f)));
      if (!cands.length) cands = regular.filter(w => w !== lastWord);
      const w = pick(cands); used.add(missKey(w, f)); lastWord = w;
      items.push({ w, form: f, sc: pick(scenesOf(w, f)) });
    }
    if (neuters.length && lv.neuter) {
      const nw = pick(neuters);
      const slots = lv.neuter === 'focus' ? [1, 3, 5, 6] : [2 + rnd(n - 3)];
      const nforms = lv.neuter === 'focus' ? shuffle(['normal', 'accusative', 'accusative', 'plural']) : [Math.random() < 0.6 ? 'accusative' : 'normal'];
      slots.forEach((s, k) => { if (s < n) items[s] = { w: nw, form: nforms[k], sc: pick(scenesOf(nw, nforms[k])) }; });
    }
    return items;
  }
  function reviewRound() {
    const keys = shuffle(reviewKeys()).slice(0, 10);
    const items = keys.map(k => { const [l, f] = k.split(':'); const w = wordBy(l); return w && w.forms[f] ? { w, form: f, sc: pick(scenesOf(w, f)) } : null; }).filter(Boolean);
    return items;
  }
  // a missed word comes back later with a different picture
  function requeue(queue, idx, it) {
    const others = it.w.scenes.filter(s => s !== it.sc);
    const sameForm = others.filter(s => s.form === it.form);
    const sc = pick(sameForm.length ? sameForm : others);
    const pos = Math.min(queue.length, idx + 3);
    queue.splice(pos, 0, { w: it.w, form: sc.form, sc, again: true });
  }

  function startReview() {
    const items = reviewRound();
    if (!items.length) return goMap();
    quiz({ id: 'review', title: 'Review Camp', type: 'quiz', forms: FORMS, colors: true, hints: true, buttons: 'monster', retry: true, music: 'play', items });
  }

  // ---------- the quiz (levels 1-3, sneaky, detective, the test, review) ----------
  function quiz(lv) {
    const queue = lv.items ? lv.items.slice() : makeRound(lv);
    const total = queue.length;
    let qi = 0, firstTry = 0, answered = 0, streak = 0;
    const missedWords = [];
    const forms = lv.forms;
    const order = lv.buttons === 'monster' ? forms : null;
    screen(lv.test ? 'test' : 'quiz', `<div class="quiz ${lv.test ? 'is-test' : ''}">
      <div class="q-head"><div class="q-title">${lv.title}</div><div class="streak" id="streak"></div></div>
      <div class="card" id="card"></div>
      <div class="feedback" id="fb"></div>
      <div class="answers ${lv.buttons}" id="answers"></div>
      <div class="progress"><div class="bar" id="bar"></div><div class="ptext" id="ptext"></div></div></div>`, lv.music);

    let it, tries, locked;
    function show() {
      it = queue[qi]; tries = 0; locked = false;
      const flagged = S.flagged[missKey(it.w, it.form)];
      $('#card').innerHTML = `<div class="pic">${ART.scene(it.w, it.sc, { hints: lv.hints, hat: S.hat })}
        <button class="flag ${flagged ? 'on' : ''}" id="flag" title="Save this word for Review Camp">${flagged ? '★' : '☆'}</button>
        ${it.again ? '<div class="again-tag">Again!</div>' : ''}</div>
        <div class="word big-word" id="word">${wordHTML(it.w, it.form, lv.colors)}<button class="hear" id="hear" title="Hear the word">🔈</button></div>`;
      const fs = order || shuffle(forms);
      $('#answers').innerHTML = fs.map((f, k) => answerBtn(f, k)).join('');
      $$('#answers .ans').forEach(b => b.onclick = () => choose(b.dataset.f, b));
      $('#fb').innerHTML = '';
      $('#flag').onclick = () => {
        const k = missKey(it.w, it.form);
        if (S.flagged[k]) delete S.flagged[k]; else S.flagged[k] = 1; save();
        $('#flag').classList.toggle('on', !!S.flagged[k]); $('#flag').textContent = S.flagged[k] ? '★' : '☆'; sfx('pop');
      };
      $('#hear').onclick = () => say('nar', it.w.forms[it.form]);
      progress();
      sfx('whoosh');
    }
    function answerBtn(f, k) {
      const letter = 'ABCD'[k];
      if (lv.buttons === 'monster') return `<button class="ans mon" data-f="${f}" style="--c:${ART.COLORS[f]}"><span class="key">${k + 1}</span>
        <span class="ans-mon">${ART.monster(f)}</span><span class="ans-name">${M[f].name}</span><span class="ans-label">${M[f].label} · ${M[f].tail}</span></button>`;
      if (lv.buttons === 'label+icon') return `<button class="ans lab" data-f="${f}"><span class="key">${letter}</span><span class="ans-icon">${ART.monster(f)}</span><span class="ans-text">${M[f].label}</span></button>`;
      return `<button class="ans lab plain" data-f="${f}"><span class="key">${letter}</span><span class="ans-text">${M[f].label}</span></button>`;
    }
    function progress() {
      $('#bar').style.width = (100 * answered / total) + '%';
      $('#ptext').textContent = `${Math.min(answered + 1, total)} / ${total}`;
      $('#streak').innerHTML = streak >= 3 ? `🔥 ${streak} in a row!` : '';
    }

    function choose(f, btn) {
      if (locked || btn.disabled) return;
      SOUND.init();
      if (f === it.form) return right(btn);
      wrong(f, btn);
    }
    function right(btn) {
      locked = true;
      if (tries === 0 && !it.again) { firstTry++; }
      if (tries === 0) { streak++; noteRight(it.w, it.form); }
      if (!it.again) answered++;
      btn.classList.add('right');
      $('#word').classList.add('glow');
      feed(btn, it.form);
      const m = M[it.form];
      const msg = tries === 0 ? pick(PRAISE) : 'There you go!';
      $('#fb').innerHTML = `<div class="fb-ok">✔ ${msg}</div>${explainBox()}<button class="big next" id="next">Next ▶</button>`;
      setTimeout(() => {
        if (current !== 'quiz' && current !== 'test') return;
        if (lv.test || tries > 0) say('nar', explain(it.w, it.form));
        else say(m.who, pick(m.yum));
      }, 450);
      $('#next').onclick = next;
      $('#hearSent').onclick = () => say('nar', it.sc.en);
      progress();
    }
    function explainBox() {
      return `<div class="explain"><div class="ex-why">${explain(it.w, it.form).replace(it.w.forms[it.form], `<b>${it.w.forms[it.form]}</b>`)}</div>
        <div class="ex-sent"><i>${it.sc.la}</i> ${it.sc.en} <button class="hear sm" id="hearSent">🔈</button></div></div>`;
    }
    function wrong(f, btn) {
      tries++; streak = 0;
      btn.disabled = true; btn.classList.add('nope');
      sfx('wrong');
      if (tries === 1 && !it.again) noteMiss(it.w, it.form);
      if (tries === 1 && !it.again) { missedWords.push(it); requeue(queue, qi, it); }
      if (lv.retry && tries === 1) {
        const m = M[f];
        if (lv.buttons === 'monster') say(m.who, m.bleh).then(() => { if (!locked && current === 'quiz') say('nar', tailHint(it.w, it.form)); });
        else say('nar', tailHint(it.w, it.form));
        $('#fb').innerHTML = `<div class="fb-hint">🤔 ${tailHint(it.w, it.form)}</div>`;
        $('#word .tail').classList.add('pulse');
        progress();
        return;
      }
      // reveal (test mode: right away, like the original)
      locked = true;
      if (!it.again) answered++;
      const rb = $(`#answers .ans[data-f="${it.form}"]`);
      rb.classList.add('reveal');
      $$('#answers .ans').forEach(b => b.disabled = true);
      $('#fb').innerHTML = `<div class="fb-no">✘ It's <b>${M[it.form].label}</b>. This word will come back later!</div>${explainBox()}<button class="big next" id="next">Next ▶</button>`;
      $('#next').onclick = next;
      if ($('#hearSent')) $('#hearSent').onclick = () => say('nar', it.sc.en);
      say('nar', explain(it.w, it.form));
      progress();
    }
    function next() {
      SOUND.stopVoice(); sfx('click');
      qi++;
      if (qi >= queue.length) return finish();
      show();
    }
    function finish() {
      const pct = firstTry / total;
      const max = lv.maxStars || 3;
      let stars = max === 4 ? (pct >= 1 ? 4 : pct >= 0.8 ? 3 : pct >= 0.6 ? 2 : 1) : (pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1);
      endScreen(lv, stars, max, `${firstTry} of ${total} right on the first try`, missedWords);
    }
    keyHandler = (e) => {
      const k = e.key.toUpperCase();
      const idx = '1234'.indexOf(k) >= 0 ? '1234'.indexOf(k) : 'ABCD'.indexOf(k);
      if (idx >= 0 && !locked) { const b = $$('#answers .ans')[idx]; if (b) choose(b.dataset.f, b); }
      if ((e.key === 'Enter' || e.key === ' ') && locked && $('#next')) { e.preventDefault(); next(); }
    };
    show();
  }

  // the word card flies into the monster's mouth
  function feed(btn, form) {
    const word = $('#word') || $('.target');
    sfx('chomp');
    if (Math.random() < 0.25) setTimeout(() => sfx('burp'), 520);
    const mon = btn.querySelector('.ans-mon, .ans-icon, .bm-mon');
    if (mon) {
      mon.innerHTML = ART.monster(form, true);
      setTimeout(() => { if (mon.isConnected) mon.innerHTML = ART.monster(form, false); }, 600);
    }
    if (!word || !mon) return;
    const a = word.getBoundingClientRect(), b = mon.getBoundingClientRect();
    const ghost = word.cloneNode(true);
    ghost.classList.add('ghost-word');
    Object.assign(ghost.style, { left: a.left + 'px', top: a.top + 'px', width: a.width + 'px' });
    document.body.appendChild(ghost);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    ghost.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${dx}px,${dy}px) scale(.15) rotate(20deg)`, opacity: 0.2 }],
      { duration: 450, easing: 'cubic-bezier(.5,-0.3,.8,.6)' }).onfinish = () => ghost.remove();
  }

  // ---------- end of a level ----------
  function endScreen(lv, stars, max, line, missed) {
    const before = totalStars(), hatsBefore = unlockedHats().length;
    if (lv.id !== 'review') { S.stars[lv.id] = Math.max(S.stars[lv.id] || 0, stars); save(); }
    const newHat = unlockedHats().length > hatsBefore ? unlockedHats()[unlockedHats().length - 1] : null;
    const uniq = [...new Map(missed.map(m => [missKey(m.w, m.form), m])).values()];
    const title = stars === max ? (max === 4 ? 'Excellent!' : 'Amazing!') : stars >= max - 1 ? 'Great job!' : 'Well done!';
    screen('end', `<div class="end">
      <h2>${title}</h2>
      <div class="end-stars">${Array.from({ length: max }, (_, k) => `<span class="${k < stars ? 'on' : ''}" style="animation-delay:${0.3 + k * 0.35}s">★</span>`).join('')}</div>
      <div class="end-line">${line}</div>
      ${uniq.length ? `<div class="end-missed"><div class="small">Words to practise:</div>${uniq.map(m =>
        `<span class="chip" style="--c:${ART.COLORS[m.form]}">${m.w.forms[m.form]} <small>${M[m.form].label}</small></span>`).join('')}</div>` : ''}
      ${newHat ? `<div class="newhat">${ART.marcus('happy', { hat: newHat.id })}<div>🎉 New hat: <b>${newHat.name}</b>!</div></div>` : ''}
      <div class="end-btns"><button class="big ghostish" id="again">↺ Play again</button><button class="big" id="map">Map ▶</button></div></div>`, 'map');
    sfx(stars >= 2 ? 'fanfare' : 'star');
    for (let k = 0; k < stars; k++) setTimeout(() => sfx('star'), 500 + k * 350);
    if (newHat) { S.hat = newHat.id; save(); }
    setTimeout(() => { if (current === 'end') say('nar', END[max === 4 ? stars : Math.min(3, stars)]).then(() => { if (newHat && current === 'end') say('marcus', UNLOCK); }); }, 600);
    $('#again').onclick = () => { sfx('click'); lv.id === 'review' ? startReview() : (lv.type === 'arcade' ? arcade(lv) : lv.type === 'build' ? build(lv) : quiz(lv)); };
    $('#map').onclick = () => { sfx('click'); goMap(); };
    keyHandler = (e) => { if (e.key === 'Enter') goMap(); };
  }

  // ---------- Build-a-Word ----------
  function build(lv) {
    const words = WORDS.filter(w => w.gender !== 'n');
    let fs = []; while (fs.length < lv.n) fs.push(...shuffle(FORMS)); fs = shuffle(fs.slice(0, lv.n));
    let last = null;
    const queue = fs.map(f => { const w = pick(words.filter(x => x !== last)); last = w; return { w, form: f, sc: pick(scenesOf(w, f)) }; });
    const total = queue.length;
    let qi = 0, firstTry = 0, answered = 0, it, tries, locked;
    const missed = [];
    screen('build', `<div class="quiz build">
      <div class="q-head"><div class="q-title">Build-a-Word</div></div>
      <div class="card" id="card"></div><div class="feedback" id="fb"></div>
      <div class="answers tails" id="answers"></div>
      <div class="progress"><div class="bar" id="bar"></div><div class="ptext" id="ptext"></div></div></div>`, lv.music);
    function show() {
      it = queue[qi]; tries = 0; locked = false;
      $('#card').innerHTML = `<div class="pic">${ART.scene(it.w, it.sc, { hints: true, hat: S.hat })}</div>
        <div class="build-en">${it.sc.en} <button class="hear sm" id="hearEn">🔈</button></div>
        <div class="word big-word" id="word"><span class="meaning">${it.w.meaning} =</span> ${wordHTML(it.w, it.form, false, true)}</div>`;
      $('#answers').innerHTML = FORMS.map((f, k) => `<button class="ans tailbtn" data-f="${f}" style="--c:${ART.COLORS[f]}"><span class="key">${k + 1}</span>
        <span class="bm-mon">${ART.monster(f)}</span><span class="tailtxt">${M[f].tail}</span></button>`).join('');
      $$('#answers .ans').forEach(b => b.onclick = () => choose(b.dataset.f, b));
      $('#hearEn').onclick = () => say('nar', it.sc.en);
      $('#fb').innerHTML = '';
      $('#bar').style.width = (100 * answered / total) + '%'; $('#ptext').textContent = `${Math.min(answered + 1, total)} / ${total}`;
      say('nar', it.sc.en);
    }
    function choose(f, btn) {
      if (locked || btn.disabled) return;
      SOUND.init();
      if (f === it.form) {
        locked = true; answered++;
        if (tries === 0) { firstTry++; noteRight(it.w, it.form); }
        sfx('snap'); setTimeout(() => sfx('correct'), 120);
        $('#word').innerHTML = `<span class="meaning">${it.w.meaning} =</span> ${wordHTML(it.w, it.form, true)}`;
        $('#word').classList.add('glow', 'snapped');
        btn.classList.add('right');
        $('#fb').innerHTML = `<div class="fb-ok">✔ ${it.w.forms[it.form]}!</div><div class="explain"><div class="ex-why">${explain(it.w, it.form)}</div>
          <div class="ex-sent"><i>${it.sc.la}</i></div></div><button class="big next" id="next">Next ▶</button>`;
        say('nar', explain(it.w, it.form));
        $('#next').onclick = next;
        return;
      }
      tries++; btn.disabled = true; btn.classList.add('nope'); sfx('wrong');
      if (tries === 1) { missed.push(it); noteMiss(it.w, it.form); }
      $('#fb').innerHTML = `<div class="fb-hint">🤔 ${THINK[it.form]}</div>`;
      say('nar', THINK[it.form]);
    }
    function next() {
      SOUND.stopVoice(); sfx('click'); qi++;
      if (qi >= queue.length) {
        const pct = firstTry / total;
        return endScreen(lv, pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1, 3, `${firstTry} of ${total} built on the first try`, missed);
      }
      show();
    }
    keyHandler = (e) => {
      const idx = '1234'.indexOf(e.key);
      if (idx >= 0 && !locked) { const b = $$('#answers .ans')[idx]; choose(b.dataset.f, b); }
      if ((e.key === 'Enter' || e.key === ' ') && locked && $('#next')) { e.preventDefault(); next(); }
    };
    show();
  }

  // ---------- Tail Blaster (arcade) ----------
  function arcade(lv) {
    const words = WORDS.filter(w => w.gender !== 'n');
    const DURATION = 60;
    screen('arcade', `<div class="arcade">
      <div class="hud"><div id="hearts">❤️❤️❤️</div><div id="score">0</div><div id="timer">⏱ ${DURATION}</div></div>
      <div class="field" id="field"><div class="city">${'<span>🏛️</span>'.repeat(5)}</div>
        <div class="countdown" id="cd">Ready?</div></div>
      <div class="answers blaster" id="answers">${FORMS.map((f, k) => `<button class="ans mon bl" data-f="${f}" style="--c:${ART.COLORS[f]}">
        <span class="key">${k + 1}</span><span class="ans-mon bm-mon">${ART.monster(f)}</span><span class="ans-label">${M[f].tail} ${M[f].label}</span></button>`).join('')}</div></div>`, null);
    SOUND.stopMusic();
    const field = $('#field');
    let falling = [], hearts = 3, score = 0, combo = 1, fed = 0, t = 0, spawnT = 0, running = false, last = 0, raf = 0, ended = false;
    const missed = [];
    const speed = () => (26 + t * 0.9) * lv.speed; // px per second
    const spawnEvery = () => Math.max(1.0, 2.8 - t * 0.03) / lv.speed;
    function spawn() {
      const w = pick(words), form = pick(FORMS);
      const el = document.createElement('div');
      el.className = 'fall';
      el.innerHTML = `<div class="meteor">☄️</div><div class="fword">${wordHTML(w, form, lv.colors)}</div>`;
      const W = field.clientWidth;
      const x = 20 + Math.random() * Math.max(10, W - 160);
      el.style.left = x + 'px';
      field.appendChild(el);
      falling.push({ el, w, form, y: -50 });
    }
    function lowest() { return falling.reduce((a, b) => (!a || b.y > a.y ? b : a), null); }
    function loop(ts) {
      if (!running) return;
      const dt = Math.min(0.05, (ts - last) / 1000); last = ts;
      t += dt; spawnT -= dt;
      if (spawnT <= 0) { spawn(); spawnT = spawnEvery(); }
      const ground = field.clientHeight - 54;
      for (const f of falling.slice()) {
        f.y += speed() * (f.fast ? 1.8 : 1) * dt;
        f.el.style.transform = `translateY(${f.y}px)`;
        if (f.y >= ground) land(f);
      }
      const lo = lowest();
      falling.forEach(f => f.el.classList.toggle('target', f === lo));
      const left = Math.max(0, Math.ceil(DURATION - t));
      $('#timer').textContent = '⏱ ' + left;
      if (t >= DURATION) return finish(true);
      raf = requestAnimationFrame(loop);
    }
    function land(f) {
      falling = falling.filter(x => x !== f);
      f.el.classList.add('splat'); sfx('splat');
      const tip = document.createElement('div');
      tip.className = 'tip'; tip.innerHTML = `${f.w.forms[f.form]} → <b style="color:${ART.COLORS[f.form]}">${M[f.form].name}</b>`;
      tip.style.left = f.el.style.left; field.appendChild(tip);
      setTimeout(() => { f.el.remove(); tip.remove(); }, 1600);
      hearts--; combo = 1; missed.push({ w: f.w, form: f.form }); noteMiss(f.w, f.form);
      $('#hearts').textContent = '❤️'.repeat(Math.max(0, hearts)) + '🖤'.repeat(3 - Math.max(0, hearts));
      field.classList.add('shake'); setTimeout(() => field.classList.remove('shake'), 400);
      if (hearts <= 0) finish(false);
    }
    function fire(form, btn) {
      if (!running) return;
      SOUND.init();
      const f = lowest(); if (!f) return;
      if (f.form === form) {
        falling = falling.filter(x => x !== f);
        score += 10 * combo; fed++; noteRight(f.w, f.form);
        if (fed % 5 === 0) { sfx('combo'); combo = Math.min(5, combo + 1); }
        const a = f.el.getBoundingClientRect(), b = btn.getBoundingClientRect();
        f.el.style.transition = 'transform .35s ease-in, opacity .35s';
        const fr = field.getBoundingClientRect();
        f.el.style.transform = `translate(${b.left + b.width / 2 - a.left - a.width / 2}px, ${b.top - fr.top}px) scale(.2)`;
        f.el.style.opacity = '0';
        setTimeout(() => f.el.remove(), 380);
        const mon = btn.querySelector('.bm-mon'); mon.innerHTML = ART.monster(form, true);
        setTimeout(() => { if (mon.isConnected) mon.innerHTML = ART.monster(form); }, 350);
        sfx('chomp'); if (Math.random() < 0.15) setTimeout(() => sfx('burp'), 400);
        $('#score').textContent = score + (combo > 1 ? `  ×${combo}` : '');
      } else {
        sfx('wrong'); combo = 1; f.fast = true;
        btn.classList.add('nope'); setTimeout(() => btn.classList.remove('nope'), 300);
        f.el.classList.add('wrongflash'); setTimeout(() => f.el.classList.remove('wrongflash'), 300);
        $('#score').textContent = score;
      }
    }
    function finish(survived) {
      if (ended) return; ended = true; running = false; cancelAnimationFrame(raf);
      SOUND.stopMusic();
      S.best[lv.id] = Math.max(S.best[lv.id] || 0, score); save();
      const stars = survived ? (fed >= 22 ? 3 : fed >= 14 ? 2 : 1) : (fed >= 14 ? 2 : 1);
      say('marcus', survived ? ARCADE.win : ARCADE.over);
      setTimeout(() => endScreen(lv, stars, 3, `Score ${score} · ${fed} words fed${survived ? ' · Rome is safe!' : ''}`, missed), 1400);
    }
    $$('#answers .ans').forEach(b => b.onclick = () => fire(b.dataset.f, b));
    keyHandler = (e) => {
      const idx = '1234'.indexOf(e.key); if (idx < 0) return;
      const b = $$('#answers .ans')[idx]; fire(b.dataset.f, b);
    };
    cleanup = () => { running = false; cancelAnimationFrame(raf); };
    // countdown
    let c = 3;
    const tick = () => {
      if (current !== 'arcade') return;
      if (c > 0) { $('#cd').textContent = c; sfx('click'); c--; setTimeout(tick, 700); return; }
      $('#cd').textContent = 'GO!'; sfx('zap'); say('marcus', ARCADE.start);
      setTimeout(() => { if ($('#cd')) $('#cd').remove(); }, 600);
      SOUND.music(lv.music);
      running = true; last = performance.now(); raf = requestAnimationFrame(loop);
    };
    setTimeout(tick, 600);
  }

  // first sound needs a tap on most browsers
  document.addEventListener('pointerdown', () => SOUND.init(), { once: true });
  goTitle();
  window.GAME = { goMap, startLevel, S };
})();
