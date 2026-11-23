# Rebuild the Animal Blossom copy of Make Mars Blue from mars_game/index.html, carrying over the
# arcade's own additions (ab.js + cloud save script, markDone, Games link, leaderboard block, submitScore).
src = open('/home/user/mars_game/index.html').read()
old = open('/home/user/animalblossom-site/public/games/mars/index.html').read()
def once(s, a, b):
    assert s.count(a) == 1, (s.count(a), a[:70]); return s.replace(a, b)
TAG = '<script src="/shared/ab.js"></script>'
i = old.index(TAG); j = old.index('</script>', old.index('<script>', i)) + len('</script>')
head_block = old[i:j]; assert 'AB.cloudSave' in head_block
lines = src.split('\n'); assert lines[5] == old.split('\n')[5]
lines.insert(6, head_block); s = '\n'.join(lines)
s = once(s, "    if (LEVEL_WORLD[S.level]) { WORLDS_DONE[LEVEL_WORLD[S.level]] = true; store.set('mmb-worlds', WORLDS_DONE); }",
             "    markDone(S.level);\n    if (LEVEL_WORLD[S.level]) { WORLDS_DONE[LEVEL_WORLD[S.level]] = true; store.set('mmb-worlds', WORLDS_DONE); }")
s = once(s, "`<p class=\"small-note\" style=\"text-align:right\">Build ${BUILD}</p>`",
             "`<p class=\"small-note\" style=\"text-align:right\">${window.AB ? '<a href=\"/\" style=\"float:left;color:inherit\">🏠 Games</a>' : ''}Build ${BUILD}</p>`")
PH = "addEventListener('pagehide', saveGame);"
k = old.index('// ---------------------------------------------------------------- site leaderboard (Animal Blossom)')
s = once(s, PH, old[k:old.index(PH)] + PH)
s = once(s, "  requestAnimationFrame(frame);\n}\nwindow.claude?.hot", "  submitScore();\n  requestAnimationFrame(frame);\n}\nwindow.claude?.hot")
open('/home/user/animalblossom-site/public/games/mars/index.html', 'w').write(s)
print('arcade copy rebuilt')
