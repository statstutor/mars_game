# Make Mars Blue

A small tile-based terraforming game in the flat, colourful style of science explainer animations.
Turn a frozen, rusty Mars into a world with lakes, clouds and lichen, one isometric tile at a time.

## Play

Open `index.html` in a browser. It's a single file with no build step and no dependencies.

- Pick a building in the bottom bar (or press `1`–`9`), then click a tile.
- Right-click or `Esc` cancels; `Space` pauses; the `1×` button speeds the game up to 4×.
- Hover a tile to learn what it is.
- The music and sound-effect buttons sit next to pause; `M` toggles the music. Sound starts after your first click or key press (browsers require it). On iPhone, the silent switch also mutes the game.

## The crew

Four crew members talk you through each level and nudge you when you're stuck:
Commander Reyes (mission lead), Chief Engineer Haddad (power and construction),
Dr. Sato (botanist) and KIP-7 (a survey robot). Every line is pre-recorded with the
[Kokoro](https://github.com/hexgrad/kokoro) neural text-to-speech model (Apache-2.0) and
stored in `audio/voice/`; lines always appear as subtitles too. If a clip can't be played,
the game falls back to the browser's built-in speech.

To change a line, edit it in `index.html` and re-record with `tools/make_voices.py`
(instructions at the top of that file). Clips are named by a hash of the speaker and text,
so only new or changed lines are recorded. Click the crew card or press `Enter` to skip a line; `V` turns the voices off.

## Levels

1. **Touchdown**: build solar arrays, mines on purple ore, an ice drill, a greenhouse and a
   habitat, then warm Mars from −63 °C to −55 °C. The first critters appear.
2. **Thicken the Sky**: mirror links, comets and gas factories get Mars above 0 °C and
   12 kPa; fill crater lakes, spread lichen, dig up an alien relic and open a restaurant.
3. **Boomtown**: grow the town to 24 colonists, keep them happy with restaurants, cafés,
   clinics, arcades and parks, fend off critter raids at night, trade with Zorp the alien
   and uncover three ruins to wake an ancient Martian.

## Colony life

- **Food and water**: every colonist eats and drinks. The Fed and Water meters drop when
  supplies run out. Restaurants make food go three times further.
- **Happiness** depends on food, water, services and pests. Happy colonists work faster
  and new settlers arrive; very unhappy ones fly home. Nobody gets hurt.
- **Critters** climb out of craters, switch off a building while they nibble it and run off
  with supplies. Tap one to bonk it and get the supplies back, plus a crystal. Zappers
  bonk them automatically.
- **Ruins** hide relics with permanent boosts. **Zorp's saucer** trades for crystals.

Everything runs on solar power. If you use more energy than you make, every building slows down.

Progress autosaves in your browser every few seconds and whenever you build. Reopen the page and press **Continue** on the title screen to pick up where you left off. Starting a level from the title screen replaces the save.
