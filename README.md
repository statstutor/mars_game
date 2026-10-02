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
so only new or changed lines are recorded. Click the crew card or press `Enter` to skip a line. The sound button (or `V`) turns sound effects and voices off together; music has its own button (`M`).

## Levels

1. **Touchdown**: power, metal, water and food, two habitats, and the first warming. Critters
   and dust storms appear.
2. **Thicken the Sky**: mirror links, comets and gas factories; crater lakes, lichen, two alien
   relics and a restaurant.
3. **Boomtown**: a town of 32, every kind of service, night raids, Zorp the trader and the
   ruins that wake Elder Vell.
4. **Green Frontier**: research labs open the **tech tree**. Chickens, goats, fish farms and
   water towers that double the food of nearby farms (pipes carry water further).
5. **Deep Roots**: smash critter nests, push the map outward with Land Reclamation, then dig
   into the caves underground or raise sky islands above the dust.
6. **Exodus**: two ways to win. Build a **Greater Mars** on every layer, or build the colony
   rocket, beat the **Critter Queen** and fight your way out of orbit past the Swarm Mother.
7. **Phobos Outpost**: the first world beyond Mars. No air, tiny gravity and falling meteors.
   Europa and Titan are teased as coming soon.

**Secret bonus level, Planet Glorp.** Zorp the alien trader visits every level. Each trade
earns a friendship heart, and rare Golden Crystals (from bonks, digs, nests and meteors) are
worth 3 hearts as a gift. At 10 hearts Zorp flies you home to meet Mrs. Zorp, the twins Zib
and Zab, and Baby Zuzu. Build super-powered Zorp-tech for the Glorp Festival, survive the
meteor storms and chase off a random party crasher (the Grumble Worm, Blorg the rival trader
or Queen Skyla). Finishing it lets you keep one Zorp-tech upgrade in every level, then fly
back to the game you left.

Research from Levels 4 and 5 carries into the next level when you finish them.

## Colony life

- **Food and water**: every colonist eats and drinks. The Fed and Water meters drop when
  supplies run out. Restaurants make food go three times further.
- **Happiness** depends on food, water, services and pests. Happy colonists work faster
  and new settlers arrive; very unhappy ones fly home. Nobody gets hurt.
- **Critters** climb out of craters, switch off a building while they nibble it and run off
  with supplies. Tap one to bonk it and get the supplies back, plus a crystal. Later levels
  bring armoured (2 bonks), zippy, sneaky (nearly invisible) and brute (4 bonks) critters.
  Zappers and drone bays bonk them automatically.
- **Dust storms** cut solar power to a third for a while. Sky-island solar ignores them.
- **Ruins** hide relics with permanent boosts. **Zorp's saucer** trades for crystals.

Everything runs on solar power. If you use more energy than you make, every building slows down.

Progress autosaves in your browser every few seconds and whenever you build. Reopen the page and press **Continue** on the title screen to pick up where you left off. Starting a level from the title screen replaces the save.
