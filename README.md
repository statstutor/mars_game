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
Dr. Sato (botanist) and Bebop (a survey robot). Every line is pre-recorded with the
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
**Leaving Mars is your choice.** At the launch pad, open the star map and set a course for
Phobos (120 fuel), Deimos (160 fuel, needs **Big Engines**) or Europa (300 fuel, needs Big
Engines and a **Radiation Shield**). Upgrades cost metal and crystals and stay on the rocket
for good. Farther trips mean a longer, tougher escape battle; Europa adds the Radiation Ray
boss in Jupiter's radiation belts. After finishing a moon, build a pad and fuel plant there
and fly on to any other world. The Shell King (Level 10) opens once Europa is done.

7. **Phobos Outpost**: the first world beyond Mars. No air, tiny gravity and falling meteors.
8. **Deimos Watch**: Mars's outer moon, and the first **shell-beasts**: armoured aliens that
   zappers, drones and taps bounce off. Build **castles**, which train up to 3 **knights** each
   (one every 12 seconds, 5 food apiece). Knights guard everything within 4 tiles of their castle
   and are the only thing that can hurt a shell-beast. A knocked-out knight walks home to heal.
9. **Europa: The Ice Shell**: Jupiter's ice moon. Solar arrays make half as much power, so use
   geothermal plants on the warm cracks. Giant shell-beasts smash buildings if left alone.
10. **Europa: The Shell King**: three castles and nine knights, then the **Shell-beast King**
    breaks through the ice. Only knights can hurt him; he marches on the castles, stomps nearby
    knights and calls more shell-beasts.
11. **Moonbase Lemonade**: Earth's Moon, with Earth in the sky (on the star map once the Shell
    King is beaten). **Lemonade stands** make +4 water/s next to a **water tower** and a
    **lemon grove** (about +1 with only one, a trickle with neither). **Five-headed aliens**
    take five hits; each hit knocks off a head, and heads grow back if you leave them alone.
12. **The Five-Head Chief**: build up the moonbase, then the Chief lands and goes after the
    lemonade stands. Tap his glowing head to knock it off; if nobody hits him for a while, a
    head grows back.

**The mission to free Earth.** Level 13 opens with a cutscene: Earth has been invaded and
occupied by an alien fleet. You can't stop them alone, so the game's long story begins:
gather **allies** and **power cores** from all over the solar system (tracked on the title
screen, saved on the device), and one day come home to free Earth.

13. **Venus: The Invasion** (on the star map after the Five-Head Chief). The scorching surface:
    weak sun, lava vents for geothermal power. **Lizard people** take six hits; on the ground
    zaps bounce off them (knights work), and every few seconds they fly for two seconds (then
    zappers work and knights can't). A **church** doubles all your damage. Dig up the first
    power core.
14. **Venus: Lava Fields**: build a **crafter** to melt golden crystals into 150 metal each
    (lizards drop them sometimes). Second power core.
15. **Venus: Lizard Caves**: three castles, nine knights, the third power core.
16. **Venus: The Lizard King**: taps always hurt him, knights fight him on the ground, zappers
    only when he flies. Beat him for the fourth power core and your first allies, the lizard
    people of Venus.
17. **Mercury: Sunside** (on the star map after the Lizard King). A huge Sun: solar arrays make
    double power. **Green blobs** take ten hits, often come out in pairs, and knights can't hurt
    them. A **force field** over a crater traps anything that climbs out until it breaks the dome.
    A **wizard hut** trains up to 3 wizards, and each wizard zaps two aliens at once.
18. **Mercury: Crater Maze**: blobs in every crater; the sixth power core.
19. **Mercury: The Blob Maker**: a surprise boss (the Mega-Blobber 3000, a robot that brews the
    blobs). Knock off its four armour plates, then hit its core. Beating it wins a power core and
    the blobs of Mercury as allies.
20. **Jupiter: Cloud Platforms** (on the star map after Mercury). No ground, so the colony lives on
    floating platforms. **Storm turbines** for power, **water condensers** for water, and the **ore
    drill** (+5 metal/s on purple ore, more than twice a mine). **Alien rhinos** take 13 hits and
    only **knights** and **police** (from **police stations**) can hurt them. **Tornadoes** sweep
    across along a flashing red line and may blow buildings away. A **graveyard** gives every new
    alien one less health (bonkers stay at one) and makes bosses 10% easier.
21. **Jupiter: Storm Belt**, 22. **Ammonia Snow**, 23. **Lightning Fields**: more rhinos, more
    tornadoes, a power core in each.
24. **Jupiter: The Great Red Spot**: the giant storm wakes up, floats over the platforms, throws
    tornadoes and blows in rhinos. Taps, zappers, drones and wizards hurt it; knights can't reach
    it. Calming it wins a power core and the rhinos as allies.

**Secret bonus level, Planet Glorp.** Zorp the alien trader visits every level. Each trade
earns a friendship heart, and rare Golden Crystals (from bonks, digs, nests and meteors) are
worth 3 hearts as a gift. At 20 hearts Zorp flies you home to meet Mrs. Zorp, the twins Zib
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

## Publishing

The artifact host limits how many files one page can carry, so the published copy bundles
the voice clips into a few packs: `python tools/pack_voices.py --out <dir>` writes the page
and `audio/voice-pack-N.mp3` files. The repo itself keeps one file per clip, which the game
loads directly when it is served from this folder.
