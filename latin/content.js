// Lessons, levels and every line the characters say. No DOM code here, so
// tools/make_voices.py can load this file (with words.js) and record each line.
(function (root) {
  const W = () => root.LATIN_WORDS;

  // The four Ending Eaters. Each one's name ends in the tail it eats.
  const M = {
    normal: { name: 'Normus', who: 'normus', tail: '-us', label: 'normal', sfx: 'chill', job: 'just being itself',
      yum: ['Mmm. A normal snack. Nice.', 'Chill. That one was tasty.'], bleh: 'Bleh. Not my tail, dude.' },
    accusative: { name: 'Accusaurum', who: 'accu', tail: '-um', label: 'accusative', sfx: 'roar', job: 'the TARGET',
      yum: ['ROAR! Target chomped!', 'CHOMP! Got it!'], bleh: 'GRR! That is not an -um tail!' },
    ablative: { name: 'Ablatō', who: 'ablato', tail: '-ō', label: 'ablative', sfx: 'beep', job: 'BY, WITH, IN or ON',
      yum: ['Beep boop. Delicious.', 'Tool tail accepted. Yum.'], bleh: 'Error! Error! Wrong tail.' },
    plural: { name: 'the Plurī', who: 'pluri', tail: '-ī', label: 'plural', sfx: 'giggle', job: 'MORE THAN ONE',
      yum: ['Yay! Lots and lots!', 'More for all of us!'], bleh: 'Ew! There is only one of those!' },
  };
  const FORMS = ['normal', 'accusative', 'ablative', 'plural'];

  // ---------- lessons (slides) ----------
  // show: { marcus: pose } | { monster: form } | { monsters: [forms] } | { scene: [lemma, sceneIndex] }
  //       | { split: form-of-word } | { row: lemma } | { pair: [[lemma, i], [lemma, i]] }
  const LESSONS = {
    l1: [
      { who: 'marcus', text: 'Salvē! That means hi! I\'m Marcus. I live in ancient Rome, and we all speak Latin.', show: { marcus: 'wave' } },
      { who: 'nar', text: 'Latin words have tails! The tail is the end of the word. Look: lupus means wolf. Its tail is -us.', show: { split: ['lupus', 'normal'] } },
      { who: 'nar', text: 'When the wolf does something different, its tail changes. The tail tells you what the word is doing!', show: { row: 'lupus' } },
      { who: 'nar', text: 'Meet the Ending Eaters! Four hungry monsters. Each one only eats ONE kind of tail.', show: { monsters: FORMS } },
      { who: 'normus', text: 'Hey. I\'m Normus. I eat -us tails. My name ends in -us too, see? Normus.', show: { monster: 'normal' } },
      { who: 'nar', text: '-us is the NORMAL tail. The thing is just being itself: the wolf runs, the wolf sits. In the test, this button says normal.', show: { scene: ['lupus', 0] } },
      { who: 'pluri', text: 'We are the Plurī! We eat -ī tails! There are lots of us!', show: { monster: 'plural' } },
      { who: 'nar', text: '-ī means MORE THAN ONE. One wolf is lupus. Three wolves are lupī. In the test, this button says plural.', show: { pair: [['lupus', 1], ['lupus', 6]] } },
      { who: 'marcus', text: 'Your turn! Read the tail, then feed the right monster. -us goes to Normus. -ī goes to the Plurī!', show: { monsters: ['normal', 'plural'] } },
    ],
    l2: [
      { who: 'accu', text: 'ROAR! I am Accusaurum! I eat -um tails! Look at my name. Accusaur-UM!', show: { monster: 'accusative' } },
      { who: 'nar', text: '-um is the TARGET tail. Use it when Marcus does something TO the thing: looks at it, pets it, kicks it, climbs it.', show: { scene: ['lupus', 2] } },
      { who: 'nar', text: 'It\'s also for going TO or INTO something. Marcus walks to the wall: murum.', show: { scene: ['murus', 2] } },
      { who: 'nar', text: 'Same wolf, new tail! The wolf just running is lupus. Marcus looking at the wolf makes it lupum.', show: { pair: [['lupus', 0], ['lupus', 2]] } },
      { who: 'marcus', text: 'It works on my name too! If the wolf looks at ME, I turn into Marcum!', show: { marcus: 'point' } },
      { who: 'nar', text: 'In the test, the -um button says accusative. Accusaurum, accusative. They sound alike!', show: { monster: 'accusative' } },
      { who: 'marcus', text: 'Now there are three hungry monsters. Read the tail and feed them!', show: { monsters: ['normal', 'accusative', 'plural'] } },
    ],
    l3: [
      { who: 'ablato', text: 'Beep boop. I am Ablatō. I eat -ō tails. My name ends in -ō. Ablat-Ō.', show: { monster: 'ablative' } },
      { who: 'nar', text: '-ō is the HELPER tail. It means BY or WITH. Marcus rides on the horse: equō.', show: { scene: ['equus', 4] } },
      { who: 'nar', text: 'His hair is blown BY the wind: ventō. Marcus walks WITH the wolf: lupō.', show: { pair: [['ventus', 4], ['lupus', 4]] } },
      { who: 'nar', text: 'It also means IN or ON, when Marcus is staying put. He sits ON the wall: murō.', show: { scene: ['murus', 4] } },
      { who: 'nar', text: 'In the test, the -ō button says ablative. Ablatō, ablative. Sounds the same!', show: { monster: 'ablative' } },
      { who: 'nar', text: 'Here\'s the whole wolf family: lupus, lupum, lupō, lupī. Four tails, four jobs!', show: { row: 'lupus' } },
      { who: 'marcus', text: 'All four monsters are hungry now. Let\'s go!', show: { monsters: FORMS } },
    ],
    build: [
      { who: 'nar', text: 'Now YOU make the word! Look at the picture, then snap on the right tail.', show: { split: ['equus', 'ablative'] } },
      { who: 'nar', text: 'Ask the monster questions. More than one? -ī. Marcus doing something TO it? -um. BY, WITH, IN or ON? -ō. Just being itself? -us.', show: { monsters: FORMS } },
    ],
    sneaky: [
      { who: 'nar', text: 'Uh oh. This is the Sneaky Hole. In Latin, a hole is cavum.', show: { scene: ['cavum', 0], eyes: true } },
      { who: 'nar', text: 'Cavum is a different kind of word. It ends in -um even when it\'s just a normal hole! Its tail is wearing a disguise.', show: { split: ['cavum', 'normal'] } },
      { who: 'nar', text: 'So when you see cavum, the tail can\'t help you. Look at the picture instead!', show: { pair: [['cavum', 0], ['cavum', 3]] } },
      { who: 'nar', text: 'Is the hole just being a hole? Then it\'s normal. Is Marcus doing something to it, like looking at it or jumping in? Then it\'s accusative!', show: { pair: [['cavum', 1], ['cavum', 2]] } },
      { who: 'nar', text: 'Two more sneaky things. Marcus IN the hole is still cavō: ablative. And lots of holes is NOT cavī. It\'s cava, with an -a tail!', show: { pair: [['cavum', 5], ['cavum', 7]] } },
      { who: 'marcus', text: 'Watch out for that sneaky hole! Read the tail, and if it says cavum, check the picture.', show: { marcus: 'point' } },
    ],
    detective: [
      { who: 'nar', text: 'Detective time! The colors and arrows are gone. Read the tail yourself, and look at the picture.', show: { scene: ['lupus', 4], nohints: true } },
      { who: 'nar', text: 'The buttons have the real test names now: normal, accusative, ablative, plural. The little monsters are still there to help you remember.', show: { monsters: FORMS, labels: true } },
    ],
    test: [
      { who: 'nar', text: 'This is it: the Big Test, just like the real one. No helpers! Read the tail. If it\'s cavum, check the picture. You\'ve got this!', show: { marcus: 'happy' } },
    ],
    blast: [
      { who: 'marcus', text: 'Words are falling on Rome! Feed each one to the right monster before it lands. Tap the monster, or press 1, 2, 3, 4.', show: { monsters: FORMS } },
    ],
    blast2: [
      { who: 'marcus', text: 'Turbo mode! Faster words and no colors. Read those tails!', show: { monsters: FORMS } },
    ],
  };

  // ---------- levels ----------
  // buttons: 'monster' (monster + name + label), 'label+icon', 'label' (the real test)
  const LEVELS = [
    { id: 'l1', title: 'One or Many?', blurb: 'Meet Normus and the Plurī', type: 'quiz', forms: ['normal', 'plural'], n: 8, colors: true, hints: true, buttons: 'monster', retry: true, music: 'play' },
    { id: 'l2', title: 'Accusaurum Attacks!', blurb: 'The -um target tail', type: 'quiz', forms: ['normal', 'accusative', 'plural'], n: 9, colors: true, hints: true, buttons: 'monster', retry: true, music: 'play' },
    { id: 'l3', title: 'Ablatō\'s Toolbox', blurb: 'The -ō helper tail', type: 'quiz', forms: FORMS, n: 10, colors: true, hints: true, buttons: 'monster', retry: true, music: 'play' },
    { id: 'blast', title: 'Tail Blaster', blurb: 'Words fall from the sky!', type: 'arcade', colors: true, speed: 1, music: 'arcade' },
    { id: 'build', title: 'Build-a-Word', blurb: 'Snap on the right tail', type: 'build', n: 8, music: 'play' },
    { id: 'sneaky', title: 'The Sneaky Hole', blurb: 'cavum wears a disguise', type: 'quiz', forms: FORMS, n: 8, colors: true, hints: true, buttons: 'monster', retry: true, neuter: 'focus', music: 'play' },
    { id: 'detective', title: 'Picture Detective', blurb: 'No colors, no arrows', type: 'quiz', forms: FORMS, n: 10, colors: false, hints: false, buttons: 'label+icon', retry: false, neuter: true, music: 'play' },
    { id: 'test', title: 'The Big Test', blurb: 'Just like the real one', type: 'quiz', forms: FORMS, n: 10, colors: false, hints: false, buttons: 'label', retry: false, neuter: true, test: true, maxStars: 4, music: 'boss' },
    { id: 'blast2', title: 'Turbo Blaster', blurb: 'Fast, and no colors', type: 'arcade', colors: false, speed: 1.45, music: 'arcade' },
  ];

  // ---------- helpers ----------
  const tailOf = (word, form) => word.forms[form].slice(word.stem.length);
  const sneaky = (word, form) => word.gender === 'n' && (form === 'normal' || form === 'accusative');

  // after an answer: why is it this one?
  function explain(word, form) {
    const f = word.forms[form], m = M[form], t = tailOf(word, form);
    if (word.gender === 'n') {
      if (form === 'normal') return `Sneaky! ${f} ends in -${t}, but the hole is just being a hole. That's normal.`;
      if (form === 'accusative') return `${f} ends in -${t}, and Marcus is doing something to the hole. That's accusative!`;
      if (form === 'plural') return `${f} ends in -${t}. That's the sneaky plural: more than one hole!`;
    }
    if (form === 'normal') return `${f} ends in -${t}. ${m.name} eats it. The ${word.meaning} is just being itself: normal!`;
    if (form === 'accusative') return `${f} ends in -${t}. ${m.name} eats it. Something happens TO the ${word.meaning}: accusative!`;
    if (form === 'ablative') return `${f} ends in -${t}. ${m.name} eats it. BY, WITH, IN or ON the ${word.meaning}: ablative!`;
    return `${f} ends in -${t}. The Plurī eat it. More than one ${word.meaning}: plural!`;
  }
  // first wrong try in learning levels: point at the tail, don't give the answer
  function tailHint(word, form) {
    if (sneaky(word, form)) return form === 'normal'
      ? 'Sneaky hole! The -um tail won\'t help. Is Marcus doing anything to the hole, or is it just a hole?'
      : 'Sneaky hole! The -um tail won\'t help. Look: is Marcus doing something to the hole?';
    if (word.gender === 'n' && form === 'plural') return 'Look at the tail: -a. That\'s the sneaky hole\'s plural. How many holes are there?';
    return `Look at the tail! It ends in ${M[form].tail}. Who eats ${M[form].tail}?`;
  }
  // build-a-word: a question that leads to the right tail
  const THINK = {
    normal: 'Is the thing just being itself? That\'s the normal tail, -us.',
    accusative: 'Is Marcus doing something TO it, or going TO it? That\'s -um.',
    ablative: 'Is it BY, WITH, IN or ON? That\'s -ō.',
    plural: 'Count them! More than one gets -ī.',
  };
  const PRAISE = ['Awesome!', 'You nailed it!', 'Super!', 'Yes!', 'Great reading!', 'Correct!'];
  const END = {
    4: 'Excellent! A perfect score! You are a Latin legend!',
    3: 'Three stars! Fantastic work!',
    2: 'Two stars! Great job. Play again to get even more!',
    1: 'You did it! Keep practicing and you\'ll get more stars.',
  };
  const ARCADE = {
    start: 'Here they come!', over: 'The words landed! Good try!', win: 'You saved Rome!', speed: 'Faster!',
  };
  const UNLOCK = 'You unlocked a new hat for Marcus!';

  // ---------- what the voice should actually say ----------
  // Latin words are swapped for easy respellings so the English voice says them nicely.
  const TAILSAY = { us: 'oos', um: 'oom', 'ō': 'oh', 'ī': 'ee', a: 'ah' };
  const NAMES = { 'Accusaurum': 'ah-koo-sore-oom', 'Accusaur-UM': 'ah-koo-sore OOM', 'Ablatō': 'ab-lah-toe', 'Ablat-Ō': 'ab-lah TOE',
    'Plurī': 'ploo-ree', 'Normus': 'nor-muss', 'Marcum': 'mar-koom', 'Salvē': 'sal-way', 'cavum': 'kah-woom', 'Cavum': 'Kah-woom', 'cavī': 'kah-wee' };
  let SAYMAP = null;
  function spoken(text) {
    if (!SAYMAP) {
      SAYMAP = Object.assign({}, NAMES);
      for (const w of W()) for (const f of FORMS) SAYMAP[w.forms[f]] = w.say + TAILSAY[tailOf(w, f)];
    }
    const keys = Object.keys(SAYMAP).sort((a, b) => b.length - a.length).map(k => k.replace(/[-]/g, '\\-'));
    const re = new RegExp(`(^|[^A-Za-zāēīōū-])(${keys.join('|')})(?=$|[^A-Za-zāēīōū])`, 'g');
    let s = text.replace(re, (_, pre, k) => pre + SAYMAP[k]);
    s = s.replace(/(^|\s)-(us|um|ō|ī|a)\b/g, (_, pre, t) => `${pre}${TAILSAY[t]}`).replace(/(^|\s)-(ō|ī)/g, (_, pre, t) => `${pre}${TAILSAY[t]}`);
    s = s.replace(/\b([A-Z]{2,})\b/g, (w) => w.toLowerCase());
    return s.replace(/[āēīōū]/g, (c) => ({ 'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u' }[c]));
  }

  // every line, for the recording tool
  function allLines() {
    const out = [];
    const add = (who, text) => out.push({ who, text, spoken: spoken(text) });
    for (const k in LESSONS) for (const s of LESSONS[k]) add(s.who, s.text);
    for (const f of FORMS) { M[f].yum.forEach(t => add(M[f].who, t)); add(M[f].who, M[f].bleh); add('nar', THINK[f]); }
    for (const w of W()) {
      for (const f of FORMS) { add('nar', explain(w, f)); add('nar', tailHint(w, f)); }
      for (const s of w.scenes) add('nar', s.en);
    }
    PRAISE.forEach(t => add('nar', t));
    Object.values(END).forEach(t => add('nar', t));
    Object.values(ARCADE).forEach(t => add('marcus', t));
    add('marcus', UNLOCK);
    const seen = new Set();
    return out.filter(l => { const k = l.who + '|' + l.text; if (seen.has(k)) return false; seen.add(k); return true; });
  }

  root.CONTENT = { M, FORMS, LESSONS, LEVELS, explain, tailHint, THINK, PRAISE, END, ARCADE, UNLOCK, spoken, tailOf, sneaky, allLines };
})(typeof window !== 'undefined' ? window : globalThis);
