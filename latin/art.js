// All drawings are inline SVG strings. Objects are drawn standing on y = 0 and centred on x = 0,
// then placed in a 400 x 250 scene whose ground line is GY. Animated parts use CSS classes
// (a-*) defined in index.html; a moving part always sits inside its own <g> so the CSS
// transform doesn't fight the placement transform.
(function () {
  const GY = 190;
  const SKIN = '#f3c29b', HAIR = '#3b2414', TUNIC = '#e0453a', BELT = '#9a6430';
  const COLORS = { normal: '#2f7de1', accusative: '#e23b3b', ablative: '#1fa45a', plural: '#8b4fd8' };

  const at = (x, y, inner, s = 1, flip = false) =>
    `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${inner}</g>`;
  const anim = (cls, inner) => `<g class="${cls}">${inner}</g>`;

  // ---------- Marcus ----------
  function hat(kind) {
    if (kind === 'laurel') return `<g fill="#3fa34d">${[-18, -9, 0, 9, 18].map(x =>
      `<ellipse cx="${x + 2}" cy="${-126 + Math.abs(x) * 0.25}" rx="6" ry="3.4" transform="rotate(${x * 2} ${x + 2} -126)"/>`).join('')}</g>`;
    if (kind === 'helmet') return `<path d="M-20,-112 Q2,-150 24,-112 Z" fill="#c9a227" stroke="#8d6f12" stroke-width="2"/>
      <path d="M-8,-136 Q4,-162 22,-150 Q12,-140 6,-134 Z" fill="#d22"/><rect x="-22" y="-114" width="48" height="6" rx="3" fill="#a8861c"/>`;
    if (kind === 'crown') return `<path d="M-16,-124 L-16,-142 L-6,-132 L2,-146 L10,-132 L20,-142 L20,-124 Z" fill="#ffd23f" stroke="#c99a00" stroke-width="2"/>
      <circle cx="2" cy="-134" r="3" fill="#e23b3b"/>`;
    if (kind === 'wizard') return `<path d="M-22,-118 L4,-176 L28,-118 Z" fill="#4b3bbf"/><circle cx="2" cy="-146" r="3" fill="#ffd23f"/>
      <circle cx="12" cy="-130" r="2.5" fill="#ffd23f"/><rect x="-24" y="-121" width="54" height="6" rx="3" fill="#372a99"/>`;
    return '';
  }

  function head(o = {}) {
    const nose = o.bigNose
      ? `<ellipse cx="27" cy="-104" rx="11" ry="8" fill="#f0a77d" stroke="#d98a5f" stroke-width="1.5"/>`
      : `<circle cx="24" cy="-104" r="3.5" fill="#e9a47c"/>`;
    const hairBlown = o.blown
      ? `<path d="M-14,-126 q-30,-6 -42,4 M-18,-118 q-30,0 -40,12 M-20,-108 q-24,6 -32,18" stroke="${HAIR}" stroke-width="7" fill="none" stroke-linecap="round"/>`
      : '';
    const mouth = o.mouth === 'o' ? `<ellipse cx="17" cy="-95" rx="3.5" ry="4.5" fill="#7a2b2b"/>`
      : o.mouth === 'grin' ? `<path d="M9,-97 Q16,-88 23,-97 Z" fill="#7a2b2b"/>`
      : `<path d="M10,-96 Q16,-91 22,-96" stroke="#7a2b2b" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    const eyes = o.eyesClosed ? `<path d="M10,-110 q4,3 8,0" stroke="#222" stroke-width="2.4" fill="none"/>`
      : `<circle cx="14" cy="-110" r="3.4" fill="#222"/><circle cx="15.2" cy="-111.2" r="1.1" fill="#fff"/>`;
    return `${hairBlown}<circle cx="2" cy="-106" r="22" fill="${SKIN}"/>
      <circle cx="-14" cy="-104" r="5" fill="#e9a47c"/>
      <path d="M-20,-108 C-24,-132 -2,-138 12,-130 C20,-128 26,-122 24,-116 C14,-122 2,-118 -6,-122 C-10,-114 -14,-108 -20,-108 Z" fill="${HAIR}"/>
      <circle cx="-12" cy="-126" r="7" fill="${HAIR}"/><circle cx="0" cy="-130" r="7" fill="${HAIR}"/><circle cx="12" cy="-128" r="6" fill="${HAIR}"/>
      ${eyes}${nose}${mouth}<circle cx="6" cy="-99" r="3.5" fill="#f7a1a1" opacity=".5"/>${hat(o.hat)}`;
  }

  const limb = (x1, y1, x2, y2, c = SKIN, w = 8) =>
    `<path d="M${x1},${y1} L${x2},${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
  const limb3 = (x1, y1, x2, y2, x3, y3, c = SKIN, w = 8) =>
    `<path d="M${x1},${y1} L${x2},${y2} L${x3},${y3}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  const sandal = (x, y) => `<ellipse cx="${x + 3}" cy="${y}" rx="7" ry="3.5" fill="#7a4a20"/>`;
  const tunic = `<path d="M-18,-86 L20,-86 L27,-40 L-25,-40 Z" fill="${TUNIC}"/>
    <rect x="-21" y="-64" width="44" height="6" rx="2" fill="${BELT}"/><path d="M-6,-86 L2,-78 L10,-86" stroke="#b8322a" stroke-width="2" fill="none"/>`;

  // Marcus faces right. Pose names match what the scenes need.
  function boy(pose = 'stand', o = {}) {
    const legsStand = limb(-8, -42, -8, -4) + limb(9, -42, 10, -4) + sandal(-8, -2) + sandal(10, -2);
    const legsWalk = anim('a-step', limb(-8, -42, -8, -4) + sandal(-8, -2)) + anim('a-step a-delay', limb(9, -42, 10, -4) + sandal(10, -2));
    const armDown = (s) => limb(s * 14 + 2, -80, s * 18 + 2, -48);
    let back = '', front = '', legs = legsStand, h = head(o), body = tunic;
    switch (pose) {
      case 'wave': back = armDown(-1); front = anim('a-wave', limb(18, -80, 36, -116)); h = head({ ...o, mouth: 'grin' }); break;
      case 'walk': legs = legsWalk; back = anim('a-swing', limb(-12, -80, -20, -50)); front = anim('a-swing a-delay', limb(16, -80, 26, -52)); break;
      case 'point': back = armDown(-1); front = limb(16, -80, 52, -86) + `<circle cx="54" cy="-86" r="5" fill="${SKIN}"/>`; h = head({ ...o, mouth: 'o' }); break;
      case 'reach': back = armDown(-1); front = limb(16, -80, 54, -78) + `<circle cx="57" cy="-78" r="5.5" fill="${SKIN}"/>`; h = head({ ...o, mouth: 'grin' }); break;
      case 'hold': back = armDown(-1); front = limb3(16, -80, 30, -60, 44, -66); break;
      case 'kick': back = limb(-12, -80, -32, -64); front = limb(16, -80, 34, -96);
        legs = limb(-8, -42, -10, -4) + sandal(-10, -2) + limb3(9, -42, 30, -32, 50, -38) + `<ellipse cx="54" cy="-38" rx="7" ry="4" fill="#7a4a20"/>`; h = head({ ...o, mouth: 'grin' }); break;
      case 'sit': back = limb(-12, -80, -22, -46); front = limb(16, -80, 30, -46);
        legs = limb3(-6, -42, 18, -40, 18, -6) + limb3(8, -42, 32, -40, 32, -6) + sandal(18, -4) + sandal(32, -4); break;
      case 'ride': back = limb3(-10, -80, 10, -64, 34, -70); front = limb3(14, -80, 30, -66, 46, -74);
        legs = limb3(2, -42, 14, -24, 8, 2) + sandal(8, 4); break;
      case 'climb': back = limb(-12, -82, -4, -128); front = limb(16, -82, 22, -126);
        legs = limb3(-8, -42, 10, -30, 10, -8) + limb3(9, -42, 24, -54, 24, -30); h = head({ ...o, mouth: 'grin' }); break;
      case 'jump': back = limb(-12, -82, -30, -122); front = limb(16, -82, 34, -122);
        legs = limb3(-8, -42, -18, -24, -6, -10) + limb3(9, -42, 20, -26, 10, -10); h = head({ ...o, mouth: 'o' }); break;
      case 'dive': back = limb(-6, -82, 28, -134); front = limb(16, -82, 44, -130); h = head({ ...o, mouth: 'o' }); break;
      case 'brush': back = armDown(-1); front = limb(16, -80, 50, -98) + `<path d="M50,-98 L74,-112" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/><circle cx="76" cy="-113" r="4" fill="#ff8a1f"/>`; break;
      case 'blown': back = limb(-12, -80, -6, -116); front = limb(16, -80, 34, -112); h = head({ ...o, blown: true, eyesClosed: true, mouth: 'o' });
        legs = limb(-8, -42, -14, -4) + limb(9, -42, 4, -4) + sandal(-14, -2) + sandal(4, -2);
        return `<g transform="rotate(-10 0 0)">${back}${legs}${body}${front}${h}</g>`;
      case 'happy': back = limb(-12, -80, -26, -112); front = limb(16, -80, 32, -114); h = head({ ...o, mouth: 'grin', eyesClosed: true }); break;
      case 'sniff': back = armDown(-1); front = limb3(16, -80, 34, -62, 46, -70); h = head({ ...o, bigNose: true, eyesClosed: true }); break;
      case 'ouch': back = limb(-12, -80, -30, -100); front = limb(16, -80, 30, -102); h = head({ ...o, bigNose: true, mouth: 'o' }); break;
      case 'hula': back = limb(-12, -80, -34, -110); front = limb(16, -80, 38, -110); h = head({ ...o, mouth: 'grin' }); break;
      default: back = armDown(-1); front = armDown(1);
    }
    return `${back}${legs}${body}${front}${h}`;
  }

  // ---------- objects ----------
  function wolfHead(tongue, happy) {
    return `<path d="M30,-82 L36,-110 L50,-86 Z" fill="#6f7a8c"/><path d="M48,-86 L62,-110 L64,-80 Z" fill="#6f7a8c"/>
      <circle cx="48" cy="-70" r="22" fill="#8a94a6"/>
      <path d="M58,-74 Q86,-72 90,-62 Q82,-52 58,-55 Z" fill="#cdd3dd"/>
      <circle cx="89" cy="-64" r="5" fill="#222"/>
      ${happy ? '<path d="M46,-78 q5,-5 10,0" stroke="#222" stroke-width="3" fill="none"/>' : '<circle cx="52" cy="-77" r="4" fill="#222"/><circle cx="53.5" cy="-78.5" r="1.4" fill="#fff"/>'}
      ${tongue ? '<path d="M74,-56 q6,22 14,4 z" fill="#ff7aa2"/>' : ''}`;
  }
  function wolf(p = {}) {
    const legs = p.run ? 'a-legs' : '';
    let hd = wolfHead(p.tongue, p.happy);
    if (p.howl) hd = `<g transform="rotate(-38 40 -58)">${hd}</g><path d="M96,-128 q10,-8 20,0 M100,-138 q14,-12 28,0" stroke="#7fa0c8" stroke-width="3" fill="none"/>`;
    if (p.sit) return `<path d="M-30,-14 C-70,-10 -76,-40 -64,-56 C-60,-36 -48,-30 -28,-28 Z" fill="#6f7a8c"/>
      <ellipse cx="0" cy="-34" rx="34" ry="34" fill="#8a94a6"/><ellipse cx="10" cy="-30" rx="18" ry="24" fill="#cdd3dd"/>
      <rect x="10" y="-30" width="11" height="30" rx="5" fill="#8a94a6"/><rect x="-16" y="-14" width="30" height="14" rx="7" fill="#6f7a8c"/>
      <g transform="translate(-30 -6)">${hd}</g>`;
    return `<path d="M-46,-50 C-82,-52 -94,-84 -80,-100 C-74,-80 -62,-68 -42,-64 Z" fill="#6f7a8c"/>
      <g class="${legs}"><rect x="-38" y="-36" width="11" height="36" rx="5" fill="#6f7a8c"/><rect x="20" y="-36" width="11" height="36" rx="5" fill="#6f7a8c"/></g>
      <g class="${legs} a-delay"><rect x="-24" y="-36" width="11" height="36" rx="5" fill="#8a94a6"/><rect x="32" y="-36" width="11" height="36" rx="5" fill="#8a94a6"/></g>
      <ellipse cx="0" cy="-50" rx="52" ry="24" fill="#8a94a6"/><ellipse cx="6" cy="-40" rx="34" ry="11" fill="#cdd3dd"/>${hd}`;
  }

  function horse(p = {}) {
    const legs = p.run ? 'a-legs' : '';
    const leg = (x, c) => `<rect x="${x}" y="-78" width="13" height="74" rx="6" fill="${c}"/><rect x="${x - 1}" y="-8" width="15" height="9" rx="3" fill="#3a2a1e"/>`;
    return `<path d="M-62,-96 C-90,-90 -96,-50 -84,-30 C-80,-56 -72,-70 -58,-80 Z" fill="#4a2d1a"/>
      <g class="${legs}">${leg(-52, '#8a5230')}${leg(34, '#8a5230')}</g>
      <g class="${legs} a-delay">${leg(-38, '#a5643c')}${leg(48, '#a5643c')}</g>
      <ellipse cx="0" cy="-88" rx="66" ry="30" fill="#a5643c"/>
      <path d="M28,-104 L50,-150 L76,-146 L66,-92 Z" fill="#a5643c"/>
      <path d="M48,-150 C52,-170 80,-174 92,-158 L120,-128 C126,-116 112,-108 102,-114 L70,-132 Z" fill="#a5643c"/>
      <ellipse cx="112" cy="-120" rx="10" ry="8" fill="#c98a5f"/><circle cx="114" cy="-122" r="2.4" fill="#3a2a1e"/>
      <circle cx="78" cy="-154" r="3.8" fill="#222"/><circle cx="79.3" cy="-155.3" r="1.2" fill="#fff"/>
      <path d="M58,-164 L58,-184 L70,-166 Z" fill="#8a5230"/>
      <path d="M54,-166 C40,-150 40,-126 28,-106 C40,-112 46,-126 52,-136 C50,-122 46,-110 40,-98 C54,-114 58,-140 62,-162 Z" fill="#4a2d1a"/>`;
  }

  function wind(p = {}) {
    const face = p.face === false ? '' : `<circle cx="-6" cy="-6" r="4" fill="#33507a"/><circle cx="14" cy="-6" r="4" fill="#33507a"/>
      <circle cx="-14" cy="6" r="5" fill="#f7b6c8" opacity=".7"/><ellipse cx="30" cy="6" rx="7" ry="6" fill="#33507a"/>`;
    return `<g class="a-puff"><circle cx="-30" cy="0" r="24" fill="#eef7ff" stroke="#9cc7ee" stroke-width="3"/>
      <circle cx="0" cy="-14" r="30" fill="#eef7ff" stroke="#9cc7ee" stroke-width="3"/><circle cx="26" cy="2" r="22" fill="#eef7ff" stroke="#9cc7ee" stroke-width="3"/>
      <rect x="-40" y="0" width="70" height="22" rx="11" fill="#eef7ff"/>${face}</g>
      <g class="a-gust" stroke="#6aa9e3" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M44,-6 q40,-10 70,0 q14,6 4,14"/><path d="M48,10 q50,0 90,6"/><path d="M42,24 q36,10 64,4 q12,-4 4,-12"/></g>`;
  }
  const leaves = () => [0, 1, 2, 3].map(i =>
    `<g class="a-leaf" style="animation-delay:${i * 0.45}s"><ellipse cx="${i * 6}" cy="${(i % 2) * 18}" rx="9" ry="5" fill="${i % 2 ? '#e8a23a' : '#4cae4c'}"/></g>`).join('');

  function wall(p = {}) {
    const w = p.w || 150, h = p.h || 110, x0 = -w / 2;
    let bricks = '';
    for (let y = 0, r = 0; y < h - 10; y += 20, r++) {
      bricks += `<line x1="${x0}" y1="${-y}" x2="${x0 + w}" y2="${-y}" />`;
      for (let x = x0 + (r % 2 ? 18 : 36); x < x0 + w; x += 36) bricks += `<line x1="${x}" y1="${-y}" x2="${x}" y2="${-y - 20}"/>`;
    }
    return `<rect x="${x0}" y="${-h}" width="${w}" height="${h}" fill="#d0814a"/>
      <g stroke="#9b552a" stroke-width="2.5">${bricks}</g>
      <rect x="${x0 - 6}" y="${-h - 10}" width="${w + 12}" height="12" rx="3" fill="#b7b0a4"/>`;
  }

  function nose(p = {}) {
    const lines = p.sniff ? `<g class="a-sniffl" stroke="#9ab" stroke-width="3" fill="none" stroke-linecap="round">
      <path d="M-30,-6 q-10,-8 -20,0 q-10,8 -20,0"/><path d="M-30,8 q-10,-8 -20,0 q-10,8 -20,0"/></g>` : '';
    return `${lines}<g class="${p.sniff ? 'a-sniff' : ''}"><path d="M-6,-98 C14,-98 22,-64 40,-36 C56,-12 38,4 16,-2 C8,6 -12,4 -20,-4 C-44,-6 -44,-30 -24,-40 C-16,-58 -24,-96 -6,-98 Z"
      fill="#f5b38a" stroke="#d98a5f" stroke-width="3"/>
      <ellipse cx="-8" cy="-12" rx="7" ry="4.5" fill="#7a3f2a"/><ellipse cx="22" cy="-10" rx="7" ry="4.5" fill="#7a3f2a"/>
      <path d="M2,-80 C8,-64 10,-52 18,-42" stroke="#fff" stroke-width="5" fill="none" opacity=".5" stroke-linecap="round"/></g>`;
  }

  function hoop(p = {}) {
    return `<circle cx="0" cy="-46" r="42" fill="none" stroke="#ff8a1f" stroke-width="12"/>
      <circle cx="0" cy="-46" r="42" fill="none" stroke="#fff3" stroke-width="12" stroke-dasharray="14 18"/>`;
  }

  function hairLock(p = {}) {
    const c = '#7a4522';
    return `<g class="${p.float ? 'a-float' : ''}" fill="none" stroke-linecap="round">
      <path d="M0,-96 C-28,-76 26,-58 0,-38 C-22,-22 12,-10 2,0" stroke="${c}" stroke-width="11"/>
      <path d="M10,-94 C-14,-74 34,-56 12,-36 C-6,-22 22,-12 16,-2" stroke="#965a2e" stroke-width="7"/>
      <path d="M-6,-90 C-30,-72 16,-60 -10,-40" stroke="#5e3218" stroke-width="5"/>
      <path d="M-8,-96 q8,-8 20,0" stroke="#e05a9a" stroke-width="8"/></g>`;
  }

  // river: a band of water whose top edge sits on the ground line; w is its width
  function river(p = {}) {
    const w = p.w || 400, x0 = -w / 2, d = p.depth || 44;
    return `<rect x="${x0}" y="0" width="${w}" height="${d}" fill="#3b8fe0"/>
      <rect x="${x0}" y="0" width="${w}" height="6" fill="#7cc0f5"/>
      <g class="a-flow" stroke="#bfe3ff" stroke-width="3" fill="none" stroke-linecap="round">
      ${Array.from({ length: Math.ceil(w / 60) + 1 }, (_, i) => `<path d="M${x0 + i * 60 - 30},${d * 0.45} q12,-6 24,0"/><path d="M${x0 + i * 60},${d * 0.75} q12,-6 24,0"/>`).join('')}</g>
      ${p.fish ? `<g class="a-hop"><path d="M10,-6 q14,-14 28,0 q-14,10 -28,0 z M38,-6 l10,-8 l0,16 z" fill="#ff9f43"/><circle cx="18" cy="-8" r="2" fill="#222"/></g>` : ''}`;
  }

  function hole(p = {}) {
    const rx = p.rx || 56, ry = rx * 0.3;
    const eyes = p.eyes ? `<g class="a-blink"><ellipse cx="-14" cy="-2" rx="6" ry="7" fill="#fff"/><ellipse cx="14" cy="-2" rx="6" ry="7" fill="#fff"/>
      <circle cx="-12" cy="-1" r="3" fill="#111"/><circle cx="16" cy="-1" r="3" fill="#111"/></g>` : '';
    const worm = p.worm ? `<g class="a-hop2"><path d="M20,-2 q-4,-26 10,-30 q12,-2 10,12" stroke="#f08ca8" stroke-width="9" fill="none" stroke-linecap="round"/>
      <circle cx="33" cy="-30" r="2" fill="#222"/></g>` : '';
    return `<ellipse cx="0" cy="0" rx="${rx + 10}" ry="${ry + 6}" fill="#8b5a33"/>
      <ellipse cx="0" cy="0" rx="${rx}" ry="${ry}" fill="#2b1a0e"/>${eyes}${worm}
      <circle cx="${-rx - 12}" cy="-2" r="5" fill="#8b5a33"/><circle cx="${rx + 14}" cy="2" r="4" fill="#8b5a33"/>`;
  }
  // the front lip of a hole, drawn after anything that is "in" it
  function holeFront(rx = 56) {
    const ry = rx * 0.3;
    return `<path d="M${-rx},0 A${rx},${ry} 0 0 0 ${rx},0 Z" fill="#2b1a0e"/>
      <path d="M${-rx - 10},0 A${rx + 10},${ry + 6} 0 0 0 ${rx + 10},0 L${rx},0 A${rx},${ry} 0 0 1 ${-rx},0 Z" fill="#8b5a33"/>
      <rect x="${-rx - 10}" y="${ry + 5}" width="${2 * rx + 20}" height="60" fill="#6cc16a"/>`;
  }

  const flower = () => `<path d="M0,0 L0,-30" stroke="#3d9a3d" stroke-width="4"/>
    ${[0, 72, 144, 216, 288].map(a => `<circle cx="${Math.cos(a * Math.PI / 180) * 8}" cy="${-34 + Math.sin(a * Math.PI / 180) * 8}" r="6" fill="#ff6fa8"/>`).join('')}
    <circle cx="0" cy="-34" r="5" fill="#ffd23f"/>`;

  // draw one object of a kind with a pose, standing on 0,0
  function obj(kind, p = {}) {
    switch (kind) {
      case 'wolf': return wolf(p);
      case 'horse': return horse(p);
      case 'wind': return wind(p);
      case 'wall': return wall(p);
      case 'nose': return nose(p);
      case 'circle': return hoop(p);
      case 'hair': return hairLock(p);
      case 'river': return river(p);
      case 'hole': return hole(p);
    }
    return '';
  }
  // rough centre height of each object, for hint rings
  const MID = { wolf: 55, horse: 95, wind: 0, wall: 60, nose: 50, circle: 46, hair: 48, river: -20, hole: -2 };
  const RAD = { wolf: 70, horse: 95, wind: 60, wall: 85, nose: 58, circle: 56, hair: 50, river: 70, hole: 70 };
  const AIR = { wind: 80 }; // drawn up in the sky

  // ---------- scene backdrop ----------
  function backdrop(kind) {
    return `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#dff3ff"/></linearGradient></defs>
      <rect x="0" y="0" width="400" height="250" fill="url(#sky)"/>
      <circle cx="360" cy="38" r="20" fill="#ffe066"/>
      <g fill="#fff" opacity=".9"><ellipse cx="70" cy="40" rx="30" ry="10"/><ellipse cx="90" cy="34" rx="20" ry="10"/></g>
      <path d="M0,${GY} Q100,${GY - 26} 200,${GY - 8} T400,${GY - 14} L400,${GY} Z" fill="#a8dc8c"/>
      <rect x="0" y="${GY}" width="400" height="${250 - GY}" fill="#6cc16a"/>
      ${kind === 'river' ? '' : `<g fill="#58ad58"><circle cx="30" cy="${GY + 22}" r="3"/><circle cx="250" cy="${GY + 40}" r="3"/><circle cx="350" cy="${GY + 18}" r="3"/></g>`}`;
  }

  // ---------- scenes ----------
  // Each returns the picture plus `h` (hint geometry): `to` = the object the word is about,
  // `from` = Marcus (for the accusative arrow), `items` = each copy for plural counting.
  const B = (x, pose, o, flip) => at(x, GY, boy(pose, o), 1, flip);

  function placeObj(kind, x, p = {}, s = 1, flip = false) {
    const y = GY - (AIR[kind] || 0) - (kind === 'wind' ? 30 : 0);
    return at(x, y, obj(kind, p), s, flip);
  }
  const target = (kind, x, s = 1) => ({ x, y: GY - (AIR[kind] || 0) - (kind === 'wind' ? 30 : 0) - MID[kind] * s, r: RAD[kind] * s });

  const SCENES = {
    alone(k, o) {
      if (k === 'river') return { svg: at(200, GY, river({ depth: 50 })), h: { to: { x: 200, y: GY + 24, r: 80 } } };
      if (k === 'hole') return { svg: at(200, GY + 14, hole({ rx: 70 })), h: { to: { x: 200, y: GY + 12, r: 90 } } };
      const s = { horse: 1, wall: 1.1 }[k] || 1.3;
      const p = k === 'wolf' ? { sit: true } : {};
      return { svg: placeObj(k, 200, p, s) + sparkles(), h: { to: target(k, 200, s) } };
    },
    act(k, o) {
      switch (k) {
        case 'wolf': return { svg: anim('a-trot', placeObj('wolf', 200, { run: true }, 1.15)) + dust(120), h: { to: target(k, 200, 1.15) } };
        case 'horse': return { svg: anim('a-trot', placeObj('horse', 190, { run: true })) + dust(110), h: { to: target(k, 190) } };
        case 'wind': return { svg: placeObj('wind', 120, {}, 1.1) + at(260, 120, leaves()) + at(300, 150, leaves()), h: { to: target(k, 120, 1.1) } };
        case 'wall': return { svg: at(200, GY, wall({ h: 160, w: 130 })) + at(220, GY - 170, bird()), h: { to: { x: 200, y: GY - 85, r: 105 } } };
        case 'nose': return { svg: placeObj('nose', 200, { sniff: true }, 1.4), h: { to: target(k, 200, 1.4) } };
        case 'circle': return { svg: at(200, GY, anim('a-roll', hoop())), h: { to: target(k, 200) } };
        case 'hair': return { svg: placeObj('hair', 200, { float: true }, 1.4) + sparkles(), h: { to: target(k, 200, 1.4) } };
        case 'river': return { svg: at(200, GY, river({ depth: 50, fish: true })), h: { to: { x: 200, y: GY + 24, r: 80 } } };
        case 'hole': return { svg: at(200, GY + 14, hole({ rx: 80, worm: true })), h: { to: { x: 200, y: GY + 10, r: 100 } } };
      }
    },
    look(k, o) {
      const x = 285;
      if (k === 'river') return { svg: at(300, GY, river({ w: 200, depth: 50 })) + B(110, 'point', o), h: { to: { x: 300, y: GY + 24, r: 75 }, from: { x: 160, y: GY - 90 } } };
      if (k === 'hole') return { svg: at(x, GY + 12, hole({ rx: 60 })) + B(130, 'point', o), h: { to: { x, y: GY + 10, r: 80 }, from: { x: 180, y: GY - 90 } } };
      const s = k === 'horse' ? 0.9 : 1.05;
      return { svg: placeObj(k, x, k === 'wolf' ? { sit: true } : {}, s, k === 'wolf' || k === 'horse') + B(105, 'point', o),
        h: { to: target(k, x, s), from: { x: 160, y: GY - 90 } } };
    },
    toward(k, o) {
      const walker = anim('a-approach', B(90, 'walk', o)) + `<g stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"><path d="M40,${GY - 80} h-24"/><path d="M44,${GY - 60} h-30"/><path d="M40,${GY - 40} h-22"/></g>`;
      if (k === 'river') return { svg: at(310, GY, river({ w: 180, depth: 50 })) + walker, h: { to: { x: 310, y: GY + 24, r: 75 }, from: { x: 130, y: GY - 70 } } };
      if (k === 'hole') return { svg: at(300, GY + 12, hole({ rx: 60 })) + walker, h: { to: { x: 300, y: GY + 10, r: 80 }, from: { x: 130, y: GY - 70 } } };
      if (k === 'wind') return { svg: placeObj('wind', 320, {}, 1, true) + anim('a-approach', B(110, 'blown', o)), h: { to: target(k, 320), from: { x: 150, y: GY - 70 } } };
      const s = k === 'horse' ? 0.9 : 1;
      return { svg: placeObj(k, 300, {}, s, k === 'horse') + walker, h: { to: target(k, 300, s), from: { x: 130, y: GY - 70 } } };
    },
    touch(k, o) {
      if (k === 'wolf') return { svg: placeObj('wolf', 255, { sit: true, happy: true, tongue: true }, 1, true) + B(150, 'reach', o) + hearts(220, GY - 120),
        h: { to: target(k, 255), from: { x: 160, y: GY - 110 } } };
      return { svg: placeObj('nose', 255, {}, 1.3) + B(150, 'reach', o), h: { to: target('nose', 255, 1.3), from: { x: 150, y: GY - 120 } } };
    },
    kick(k, o) {
      return { svg: anim('a-kicked', at(250, GY, hoop())) + B(150, 'kick', o) + `<g stroke="#fff" stroke-width="4" stroke-linecap="round"><path d="M300,${GY - 70} h30"/><path d="M304,${GY - 46} h40"/></g>`,
        h: { to: { x: 250, y: GY - 46, r: 58 }, from: { x: 150, y: GY - 90 } } };
    },
    draw(k, o) {
      return { svg: `<g transform="translate(260 ${GY})"><path d="M-40,0 L-24,-130 M40,0 L24,-130 M0,-130 L0,0" stroke="#8a5a2b" stroke-width="6"/>
        <rect x="-48" y="-140" width="96" height="96" fill="#fff" stroke="#ccb" stroke-width="3"/>
        <circle cx="0" cy="-92" r="32" fill="none" stroke="#ff8a1f" stroke-width="8" stroke-dasharray="210" class="a-draw"/></g>` + B(140, 'brush', o),
        h: { to: { x: 260, y: GY - 92, r: 50 }, from: { x: 150, y: GY - 110 } } };
    },
    climb(k, o) {
      return { svg: at(240, GY, wall({ h: 140, w: 140 })) + anim('a-climb', at(232, GY - 30, boy('climb', o))), h: { to: { x: 240, y: GY - 70, r: 90 }, from: { x: 120, y: GY - 120 } } };
    },
    sitOn(k, o) {
      return { svg: at(200, GY, wall({ h: 60, w: 200 })) + at(186, GY - 28, boy('sit', o)), h: { to: { x: 200, y: GY - 34, r: 80 } } };
    },
    hide(k, o) {
      return { svg: at(214, GY - 34, boy('stand', o)) + at(200, GY, wall({ h: 92, w: 190 }))
        + `<circle cx="196" cy="${GY - 104}" r="6" fill="${SKIN}"/><circle cx="236" cy="${GY - 104}" r="6" fill="${SKIN}"/>`, h: { to: { x: 200, y: GY - 46, r: 100 } } };
    },
    with(k, o) {
      if (k === 'circle') return { svg: anim('a-roll2', at(250, GY, hoop())) + `<path d="M178,${GY - 60} L236,${GY - 22}" stroke="#8a5a2b" stroke-width="5" stroke-linecap="round"/>` + B(150, 'hold', o),
        h: { to: { x: 250, y: GY - 46, r: 58 } } };
      if (k === 'horse') return { svg: placeObj('horse', 255, {}, 0.9) + `<path d="M182,${GY - 66} Q240,${GY - 70} 336,${GY - 124}" stroke="#5a3a1e" stroke-width="3" fill="none"/>` + B(140, 'hold', o),
        h: { to: target('horse', 255, 0.9) } };
      return { svg: anim('a-bob', placeObj('wolf', 260, { tongue: true })) + `<path d="M182,${GY - 66} Q240,${GY - 40} 300,${GY - 60}" stroke="#d63" stroke-width="3" fill="none"/>` + anim('a-bob', B(150, 'hold', o)),
        h: { to: target('wolf', 260) } };
    },
    by(k, o) {
      return { svg: placeObj('wolf', 265, { tongue: true }, 1.05, true) + B(140, 'happy', o)
        + `<text x="170" y="${GY - 150}" font-size="22" font-weight="800" fill="#e05a9a" font-family="sans-serif" class="a-bob">SLURP!</text>`,
        h: { to: target('wolf', 265, 1.05) } };
    },
    ride(k, o) {
      return { svg: anim('a-bob', `<g transform="translate(200 ${GY}) scale(.78)">${horse()}${at(-8, -80, boy('ride', o))}</g>`), h: { to: { x: 200, y: GY - 76, r: 82 } } };
    },
    blown(k, o) {
      return { svg: placeObj('wind', 320, {}, 1, true) + B(130, 'blown', o), h: { to: target('wind', 320) } };
    },
    kite(k, o) {
      return { svg: placeObj('wind', 340, {}, 0.85, true) + B(80, 'hold', o)
        + `<path d="M124,${GY - 66} Q200,${GY - 90} 230,${GY - 150}" stroke="#555" stroke-width="2" fill="none"/>
        <g class="a-bob"><path d="M230,${GY - 150} L250,${GY - 196} L276,${GY - 160} L252,${GY - 140} Z" fill="#ff5d5d" stroke="#b22" stroke-width="2"/>
        <path d="M230,${GY - 150} q-6,16 6,24 q-10,10 0,20" stroke="#ffd23f" stroke-width="3" fill="none"/></g>`,
        h: { to: target('wind', 340, 0.85) } };
    },
    sniff(k, o) {
      return { svg: at(215, GY, flower()) + `<g class="a-sniffl" stroke="#e7a" stroke-width="2.5" fill="none"><path d="M205,${GY - 44} q-8,-6 -16,0"/><path d="M208,${GY - 54} q-8,-6 -16,0"/></g>`
        + B(150, 'sniff', o), h: { to: { x: 177, y: GY - 104, r: 26 } } };
    },
    held(k, o) {
      return { svg: B(150, 'ouch', o) + `<g class="a-tug"><path d="M400,${GY - 60} C320,${GY - 70} 260,${GY - 90} 196,${GY - 100}" stroke="#e8b48e" stroke-width="22" stroke-linecap="round" fill="none"/>
        <ellipse cx="186" cy="${GY - 100}" rx="12" ry="9" fill="#e8b48e"/><ellipse cx="184" cy="${GY - 112}" rx="9" ry="7" fill="#e8b48e"/></g>
        <text x="80" y="${GY - 150}" font-size="22" font-weight="800" fill="#e23b3b" font-family="sans-serif">HONK!</text>`, h: { to: { x: 177, y: GY - 104, r: 30 } } };
    },
    spin(k, o) {
      return { svg: B(200, 'hula', o) + `<g transform="translate(202 ${GY - 58})"><g class="a-hula"><ellipse cx="0" cy="0" rx="40" ry="12" fill="none" stroke="#ff8a1f" stroke-width="8"/></g></g>`,
        h: { to: { x: 202, y: GY - 58, r: 50 } } };
    },
    comb(k, o) {
      return { svg: `<g transform="translate(270 ${GY})"><rect x="-4" y="-60" width="8" height="60" fill="#8a5a2b"/><ellipse cx="0" cy="0" rx="26" ry="6" fill="#8a5a2b"/></g>`
        + at(270, GY - 60, hairLock({}), 1.1) + B(160, 'reach', o)
        + `<rect x="212" y="${GY - 86}" width="34" height="10" rx="2" fill="#4b8bd8"/><g stroke="#4b8bd8" stroke-width="3">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${215 + i * 5},${GY - 76} v8"/>`).join('')}</g>`,
        h: { to: { x: 270, y: GY - 115, r: 60 }, from: { x: 160, y: GY - 110 } } };
    },
    tickle(k, o) {
      return { svg: B(160, 'hold', o) + `<g transform="translate(204 ${GY - 72}) rotate(-60)"><g class="a-wiggle">${hairLock({})}</g></g>
        <text x="60" y="${GY - 150}" font-size="22" font-weight="800" fill="#e05a9a" font-family="sans-serif" class="a-bob">AH-CHOO!</text>`,
        h: { to: { x: 230, y: GY - 112, r: 46 } } };
    },
    wolfplay(k, o) {
      return { svg: placeObj('wolf', 160, { happy: true }) + anim('a-wiggle', at(290, GY, hairLock({}), 0.9)), h: { to: { x: 290, y: GY - 44, r: 50 } } };
    },
    into(k, o) {
      if (k === 'river') return { svg: at(280, GY, river({ w: 240, depth: 50 })) + at(250, GY - 40, anim('a-dive', `<g transform="rotate(50)">${boy('dive', o)}</g>`))
        + `<g stroke="#fff" stroke-width="3"><path d="M150,${GY - 150} q20,10 40,40"/></g>`, h: { to: { x: 290, y: GY + 24, r: 75 }, from: { x: 140, y: GY - 150 } } };
      return { svg: at(220, GY + 12, hole({ rx: 64 })) + at(220, GY + 70, anim('a-drop', boy('jump', o))) + at(220, GY + 12, holeFront(64))
        + `<g stroke="#fff" stroke-width="4" stroke-linecap="round"><path d="M180,${GY - 150} v30"/><path d="M260,${GY - 150} v30"/></g>`,
        h: { to: { x: 220, y: GY + 10, r: 85 }, from: { x: 90, y: GY - 120 } } };
    },
    swim(k, o) {
      return { svg: at(200, GY, river({ depth: 55 })) + at(200, GY + 96, anim('a-swim', boy('climb', o))) + `<rect x="0" y="${GY + 6}" width="400" height="50" fill="#3b8fe0" opacity=".85"/>
        <g stroke="#bfe3ff" stroke-width="3" fill="none"><path d="M150,${GY + 8} q10,-8 20,0 M230,${GY + 8} q10,-8 20,0"/></g>`, h: { to: { x: 200, y: GY + 20, r: 80 } } };
    },
    boat(k, o) {
      return { svg: at(200, GY, river({ depth: 55 })) + anim('a-bob', at(200, GY + 2, boy('sit', o), 0.9)
        + `<path d="M120,${GY - 10} L280,${GY - 10} L256,${GY + 22} L144,${GY + 22} Z" fill="#b5703a" stroke="#7a4a20" stroke-width="3"/>`), h: { to: { x: 200, y: GY + 24, r: 90 } } };
    },
    inside(k, o) {
      return { svg: at(220, GY + 12, hole({ rx: 64 })) + at(220, GY + 64, boy('happy', o)) + at(220, GY + 12, holeFront(64)), h: { to: { x: 220, y: GY + 10, r: 85 } } };
    },
    peek(k, o) {
      return { svg: at(220, GY + 12, hole({ rx: 64 })) + at(220, GY + 98, boy('stand', o)) + at(220, GY + 12, holeFront(64))
        + `<circle cx="200" cy="${GY + 6}" r="6" fill="${SKIN}"/><circle cx="244" cy="${GY + 6}" r="6" fill="${SKIN}"/>`, h: { to: { x: 220, y: GY + 10, r: 85 } } };
    },
    many2(k, o) { return many(k, 2); },
    many3(k, o) { return many(k, 3); },
  };

  function many(k, n) {
    const xs = n === 2 ? [120, 285] : [75, 200, 325];
    if (k === 'river') {
      const ys = n === 2 ? [GY - 30, GY + 8] : [GY - 40, GY - 8, GY + 22];
      return { svg: ys.map((y, i) => at(200, y, river({ depth: n === 2 ? 26 : 18, w: 400 }))).join(''), h: { items: ys.map((y, i) => ({ x: 60 + i * 140, y: y + 10 })) } };
    }
    const s = { horse: n === 3 ? 0.62 : 0.8, wall: n === 3 ? 0.62 : 0.85, wolf: n === 3 ? 0.72 : 0.95, wind: n === 3 ? 0.62 : 0.85, hole: 1 }[k] || (n === 3 ? 0.85 : 1);
    const parts = xs.map((x, i) => k === 'hole' ? at(x, GY + 16, hole({ rx: n === 3 ? 44 : 56 }))
      : placeObj(k, x - (k === 'horse' ? 20 * s : 0), k === 'wolf' && n === 3 ? { howl: true } : (k === 'wolf' ? { sit: true } : {}), s, k === 'wind' && i % 2 === 1));
    return { svg: parts.join(''), h: { items: xs.map(x => ({ x, y: k === 'hole' ? GY - 18 : target(k, x, s).y - target(k, x, s).r * 0.9 })) } };
  }

  const sparkles = () => `<g fill="#fff" class="a-twinkle">${[[60, 60], [340, 90], [90, 150], [320, 160]].map(([x, y]) =>
    `<path d="M${x},${y - 8} L${x + 2},${y - 2} L${x + 8},${y} L${x + 2},${y + 2} L${x},${y + 8} L${x - 2},${y + 2} L${x - 8},${y} L${x - 2},${y - 2} Z"/>`).join('')}</g>`;
  const dust = (x) => `<g fill="#d8c9a8" class="a-dust"><circle cx="${x}" cy="${GY - 6}" r="8"/><circle cx="${x - 16}" cy="${GY - 10}" r="6"/><circle cx="${x - 30}" cy="${GY - 4}" r="5"/></g>`;
  const bird = () => `<g class="a-bob"><ellipse cx="0" cy="-8" rx="10" ry="8" fill="#5b8def"/><circle cx="8" cy="-16" r="6" fill="#5b8def"/><path d="M13,-16 l6,2 l-6,2 z" fill="#ffb02e"/><circle cx="9" cy="-17" r="1.5" fill="#222"/></g>`;
  const hearts = (x, y) => `<g class="a-rise" fill="#ff5d8f">${[0, 1].map(i => `<path transform="translate(${x + i * 22} ${y - i * 14}) scale(.7)" d="M0,6 C-12,-6 -6,-16 0,-8 C6,-16 12,-6 0,6 Z"/>`).join('')}</g>`;

  // ---------- hint overlay (colour-coded scaffolding, hidden in the test) ----------
  function hintLayer(form, h) {
    const c = COLORS[form];
    if (form === 'plural' && h.items) return `<g class="hint">${h.items.map((p, i) =>
      `<g class="a-pop" style="animation-delay:${0.3 + i * 0.35}s"><circle cx="${p.x}" cy="${p.y - 10}" r="17" fill="${c}"/><text x="${p.x}" y="${p.y - 3}" text-anchor="middle" font-size="20" font-weight="900" fill="#fff" font-family="sans-serif">${i + 1}</text></g>`).join('')}</g>`;
    if (!h.to) return '';
    const { x, y, r } = h.to;
    if (form === 'accusative') {
      const f = h.from || { x: 60, y: y };
      const ang = Math.atan2(y - f.y, x - f.x), ex = x - Math.cos(ang) * (r * 0.75), ey = y - Math.sin(ang) * (r * 0.75);
      const hx = Math.cos(ang), hy = Math.sin(ang);
      return `<g class="hint"><circle cx="${x}" cy="${y}" r="${r * 0.8}" fill="none" stroke="${c}" stroke-width="4" stroke-dasharray="10 8" class="a-spinslow"/>
        <circle cx="${x}" cy="${y}" r="${r * 0.5}" fill="none" stroke="${c}" stroke-width="3" opacity=".6"/>
        <path d="M${f.x},${f.y} L${ex},${ey}" stroke="${c}" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 12" class="a-march"/>
        <path d="M${ex + hx * 12},${ey + hy * 12} L${ex - hx * 10 - hy * 10},${ey - hy * 10 + hx * 10} L${ex - hx * 10 + hy * 10},${ey - hy * 10 - hx * 10} Z" fill="${c}"/></g>`;
    }
    if (form === 'ablative') return `<g class="hint"><circle cx="${x}" cy="${y}" r="${r * 0.85}" fill="${c}" opacity=".07" class="a-glow"/>
      <circle cx="${x}" cy="${y}" r="${r * 0.85}" fill="none" stroke="${c}" stroke-width="4"/>
      <g transform="translate(${Math.min(380, x + r * 0.7)} ${Math.max(22, y - r * 0.7)})"><circle r="15" fill="${c}"/><path d="M-6,6 L4,-4 M2,-8 a5,5 0 1 0 6,6" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></g></g>`;
    return `<g class="hint"><ellipse cx="${x}" cy="${Math.min(GY + 30, y + r * 0.85)}" rx="${r * 0.9}" ry="${r * 0.2}" fill="${c}" opacity=".25"/>
      <circle cx="${x}" cy="${y}" r="${r * 0.85}" fill="none" stroke="${c}" stroke-width="3" opacity=".7"/>
      <g transform="translate(${Math.min(380, x + r * 0.7)} ${Math.max(22, y - r * 0.7)})"><circle r="15" fill="${c}"/><text y="7" text-anchor="middle" font-size="20" font-weight="900" fill="#fff" font-family="sans-serif">1</text></g></g>`;
  }

  // public: a whole picture card for one scene of one word
  function scene(word, sc, opt = {}) {
    const fn = SCENES[sc.scene] || SCENES.alone;
    const r = fn(word.object, { hat: opt.hat }) || SCENES.alone(word.object, {});
    return `<svg viewBox="0 0 400 250" class="scene" role="img" aria-label="${sc.en}">${backdrop(word.object)}${r.svg}${opt.hints ? hintLayer(sc.form, r.h) : ''}</svg>`;
  }

  // ---------- the Ending Eaters ----------
  const MONSTERS = {
    normal: (open) => `<path d="M-46,30 C-56,-20 -30,-52 0,-52 C30,-52 56,-20 46,30 C30,40 -30,40 -46,30 Z" fill="#2f7de1"/>
      <path d="M-46,30 C-40,40 -20,44 0,44 C20,44 40,40 46,30" fill="#2468bd"/>
      <ellipse cx="-30" cy="-48" rx="8" ry="10" fill="#2f7de1"/><ellipse cx="30" cy="-48" rx="8" ry="10" fill="#2f7de1"/>
      <rect x="-34" y="-26" width="28" height="16" rx="6" fill="#111"/><rect x="6" y="-26" width="28" height="16" rx="6" fill="#111"/><rect x="-8" y="-22" width="16" height="4" fill="#111"/>
      <path d="M-28,-22 l8,0" stroke="#fff" stroke-width="2" opacity=".6"/>
      <g class="mouth ${open ? 'open' : ''}"><path d="M-22,6 Q0,${open ? 40 : 20} 22,6 Z" fill="#132f5c"/><path d="M-12,${open ? 20 : 12} q12,8 24,0" fill="#ff6f91"/></g>
      <path d="M-46,8 q-14,8 -10,20" stroke="#2468bd" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M46,8 q14,8 10,20" stroke="#2468bd" stroke-width="8" stroke-linecap="round" fill="none"/>`,
    accusative: (open) => `<path d="M-30,-38 l8,-14 l6,12 l8,-16 l6,14 l8,-14 l6,14" fill="#b42424"/>
      <path d="M-40,40 C-50,0 -40,-40 0,-42 C38,-44 50,-10 46,40 Z" fill="#e23b3b"/>
      <circle cx="0" cy="20" r="18" fill="#fff"/><circle cx="0" cy="20" r="12" fill="#e23b3b"/><circle cx="0" cy="20" r="6" fill="#fff"/><circle cx="0" cy="20" r="2.5" fill="#e23b3b"/>
      <circle cx="-16" cy="-24" r="9" fill="#fff"/><circle cx="16" cy="-24" r="9" fill="#fff"/><circle cx="-14" cy="-24" r="4.5" fill="#111"/><circle cx="18" cy="-24" r="4.5" fill="#111"/>
      <path d="M-26,-36 l14,6 M26,-36 l-14,6" stroke="#7a1414" stroke-width="4" stroke-linecap="round"/>
      <g class="mouth ${open ? 'open' : ''}"><path d="M-26,-6 Q0,${open ? 26 : 6} 26,-6 Z" fill="#5c0f0f"/>
      <path d="M-20,-6 l4,7 l4,-7 l4,7 l4,-7 l4,7 l4,-7 l4,7 l4,-7" fill="#fff"/></g>
      <path d="M-40,8 l-12,6 M40,8 l12,6" stroke="#b42424" stroke-width="7" stroke-linecap="round"/>`,
    ablative: (open) => `<line x1="0" y1="-48" x2="0" y2="-62" stroke="#555" stroke-width="4"/><circle cx="0" cy="-64" r="6" fill="#ffd23f" class="a-blink2"/>
      <rect x="-40" y="-48" width="80" height="88" rx="14" fill="#1fa45a"/><rect x="-30" y="-38" width="60" height="30" rx="8" fill="#0d3b22"/>
      <rect x="-22" y="-30" width="14" height="14" rx="3" fill="#7dffb0"/><rect x="8" y="-30" width="14" height="14" rx="3" fill="#7dffb0"/>
      <g class="mouth ${open ? 'open' : ''}"><rect x="-22" y="${open ? -2 : 4}" width="44" height="${open ? 26 : 12}" rx="4" fill="#0d3b22"/>
      <path d="M-14,${open ? -2 : 4} v${open ? 26 : 12} M-4,${open ? -2 : 4} v${open ? 26 : 12} M6,${open ? -2 : 4} v${open ? 26 : 12} M16,${open ? -2 : 4} v${open ? 26 : 12}" stroke="#1fa45a" stroke-width="2"/></g>
      <rect x="-30" y="28" width="60" height="6" rx="3" fill="#147a41"/>
      <path d="M-40,-4 l-14,6 l0,16" stroke="#147a41" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M-60,22 a8,8 0 1 1 12,0 l-6,-6 z" fill="#bbb"/>
      <path d="M40,-4 l14,6 l0,14" stroke="#147a41" stroke-width="7" stroke-linecap="round" fill="none"/><rect x="46" y="18" width="18" height="10" rx="2" fill="#888"/><rect x="52" y="12" width="6" height="22" fill="#a26b33"/>`,
    plural: (open) => [[-28, 10, 26], [26, 12, 24], [0, -18, 28]].map(([x, y, r], i) => `<g transform="translate(${x} ${y})">
      <circle r="${r}" fill="${['#9d63e6', '#7c3fd0', '#8b4fd8'][i]}"/>${[0, 60, 120, 180, 240, 300].map(a => `<circle cx="${Math.cos(a * Math.PI / 180) * r}" cy="${Math.sin(a * Math.PI / 180) * r}" r="5" fill="${['#9d63e6', '#7c3fd0', '#8b4fd8'][i]}"/>`).join('')}
      <circle cx="-8" cy="-6" r="6" fill="#fff"/><circle cx="8" cy="-6" r="6" fill="#fff"/><circle cx="-7" cy="-5" r="3" fill="#111"/><circle cx="9" cy="-5" r="3" fill="#111"/>
      <g class="mouth ${open ? 'open' : ''}"><ellipse cx="0" cy="${open ? 10 : 8}" rx="${open ? 8 : 6}" ry="${open ? 8 : 3}" fill="#3a1466"/></g></g>`).join(''),
  };
  function monster(form, open = false) {
    return `<svg viewBox="-70 -75 140 125" class="monster">${MONSTERS[form](open)}</svg>`;
  }

  // Marcus alone, for title, map and story cards
  function marcus(pose = 'wave', o = {}) {
    return `<svg viewBox="-50 -180 110 190" class="marcus">${boy(pose, o)}</svg>`;
  }

  window.ART = { scene, monster, marcus, COLORS, boy, SCENES };
})();
