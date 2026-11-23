const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = []; p.on('pageerror', e => errs.push(e.stack || e.message));
  await p.route('http://game.test/', r => r.fulfill({ path: 'kt.html', contentType: 'text/html' }));
  await p.goto('http://game.test/'); await p.waitForTimeout(300);
  const out = await p.evaluate(() => {
    const g = window.__game, L = g.LEVELS[g.MIX], o = [], seen = { look: new Set(), boss: new Set(), aliens: new Set(), diff: new Set() };
    let reloadOk = 0, bossOk = 0;
    for (let i = 0; i < 40; i++) {
      g.startLevel(g.MIX, false); const S = g.S, brief = L.brief.body.join(' ');
      seen.diff.add(L.mixDiff); seen.look.add(L.sky || 'mars'); Object.keys(L.critters.mix).forEach(k => seen.aliens.add(k));
      const bossGoal = L.goals.find(x => x.mix === 'boss'); seen.boss.add(bossGoal.text);
      for (let t = 0; t < 60 * 40; t++) g.tick(1 / 60);
      if (i % 8 === 0) g.render();
      // save and load: the same mix comes back
      g.saveGame(); const saved = g.readSave(); g.applyMix(12345); g.loadSave(saved); const S2 = g.S;
      if (L.brief.body.join(' ') === brief) reloadOk++;
      // force the boss out and beat it
      S2.goalsDone = S2.goalsDone.map((d, k) => k < L.goals.length - 1 ? true : d);
      for (let t = 0; t < 60 * 5; t++) g.tick(1 / 60);
      for (let k = 0; k < 200 && S2.boss && S2.boss.state !== 'dead'; k++) { g.hurtBoss(15, true); g.hurtBoss(15); for (let t = 0; t < 30; t++) g.tick(1 / 60); }
      for (let t = 0; t < 60 * 4; t++) g.tick(1 / 60);
      if (S2.goalsDone[S2.goalsDone.length - 1] && S2.won) bossOk++;
      if (i < 3) o.push(`mix ${i + 1}: ${L.brief.body.join(' ').replace(/<[^>]+>/g, '')}`);
    }
    o.push(`reloaded the same mix: ${reloadOk}/40, boss beaten and goal done: ${bossOk}/40`);
    o.push(`looks: ${seen.look.size}, alien kinds: ${seen.aliens.size}, bosses: ${[...seen.boss].join(' / ')}, difficulties: ${[...seen.diff].join(', ')}`);
    o.push('mission after all those bosses: ' + localStorage.getItem('mmb-mission'));
    return o;
  });
  console.log(out.join('\n')); console.log('errors', errs.slice(0, 5));
  await b.close();
})();
