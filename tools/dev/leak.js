const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.route('http://game.test/', r => r.fulfill({ path: 'kt.html', contentType: 'text/html' }));
  await p.goto('http://game.test/'); await p.waitForTimeout(300);
  console.log(await p.evaluate(() => {
    const g = window.__game; g.startLevel(g.MIX, false); const ctx = g.ctx, out = [];
    const kinds = Object.keys(g.KINDS);
    for (const k of kinds) for (const st of ['walk', 'bonked']) {
      g.crits.length = 0; if (!g.spawnCritter(k)) continue; const c = g.crits[0]; c.state = st; c.t = 0.3; c.hp = Math.max(1, (c.maxhp || 2) - 1);
      ctx.save(); const before = ctx.getTransform().toString(); let depth = 0;
      const os = ctx.save.bind(ctx), or = ctx.restore.bind(ctx); ctx.save = () => { depth++; os(); }; ctx.restore = () => { depth--; or(); };
      try { g.drawCritter(ctx, c); } catch (e) { out.push(k + ' ' + st + ' ERR ' + e.message); }
      ctx.save = os; ctx.restore = or;
      const after = ctx.getTransform().toString(); ctx.restore();
      if (depth !== 0 || before !== after) out.push(`${k} (${st}): save/restore off by ${depth}`);
    }
    return out.length ? out.join('\n') : 'all balanced';
  }));
  await b.close();
})();
