const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = []; p.on('pageerror', e => errs.push(e.stack || e.message));
  await p.route('http://game.test/', r => r.fulfill({ path: 'kt.html', contentType: 'text/html' }));
  await p.goto('http://game.test/'); await p.waitForTimeout(300);
  console.log(await p.evaluate(() => {
    const g = window.__game, out = [];
    for (let li = 0; li < g.LEVELS.length; li++) { g.startLevel(li, false); for (let i = 0; i < 60 * 40; i++) { g.tick(1 / 60); if (i % 90 === 0) g.render(); } }
    out.push(g.LEVELS.length + ' levels ran; GLORP=' + g.GLORP + ' UNDER=' + g.UNDER());
    g.startLevel(g.GLORP, false);
    const raw = JSON.parse(localStorage.getItem('mmb-save-v2')); raw.S.level = 41; delete raw.S.v14;
    localStorage.setItem('mmb-save-v2', JSON.stringify(raw));
    out.push('old Glorp save migrated to ' + g.readSave().S.level);
    const miss = [], has = (w, t) => g.VOICE_CLIPS.has(g.clipKey(w, t));
    for (const L of g.LEVELS) { for (const goal of L.goals) if (!has(goal.who, goal.hint)) miss.push(goal.hint.slice(0, 40)); for (const [w, t] of [...L.intro, ...L.outro]) if (!has(w, t)) miss.push(t.slice(0, 40)); }
    out.push('lines without voice: ' + miss.length);
    return out.join('\n');
  }));
  console.log('errors', errs.length, errs.slice(0, 2)); await b.close();
})();
