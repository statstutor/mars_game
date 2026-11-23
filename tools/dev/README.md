# Developer helpers

Test harness and website sync used while building the game. Run them from a scratch folder
(they write `kt.html` into the current directory), not from the repo root.

- `mkt.py`: builds `kt.html`, a copy of `index.html` with a `window.__game` hook exposing game
  internals for tests.
- `all.js`: starts every level and ticks it, checks the old Planet Glorp save migration, and
  reports any crew line without a voice clip. Expect `errors 0 []` and `lines without voice: 0`.
- `mx.js`: generates 40 Random Mix-Ups and checks each reloads the same and can be finished.
- `leak.js`: checks every alien's drawing restores the canvas state.
- `arcade_sync.py`: rebuilds the Animal Blossom copy
  (`animalblossom-site/public/games/mars/index.html`) from this repo's `index.html`. It keeps
  the arcade's own additions: cloud save, `markDone`, the Games link, the leaderboard block and
  `submitScore`.

Usage:

    mkdir -p /tmp/mmb && cd /tmp/mmb
    python3 /home/user/mars_game/tools/dev/mkt.py
    cp /home/user/mars_game/tools/dev/*.js .
    node all.js && node mx.js && node leak.js

Playwright and Chromium are pre-installed in the cloud container.
