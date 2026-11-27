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

**Tutorial: Training Camp** (first in level select; offered the first time someone starts Level 1):
a small practice level where Bebop the robot walks you through 22 steps in order. A bouncing
yellow arrow points at what to tap next: a building button, a tile on the map, a part of the
screen or a critter. The steps cover:
- **The basics**: picking and placing buildings, power, metal, water and food, habitats, reading
  the supplies, the goal list and the colonist meters, recycling, and pausing.
- **Defending**: tapping critters, zappers, a castle and its knights, and a wizard hut.
- **Space travel**: a fuel plant, a launch pad, and the star map.

It doesn't mention the mission to free Earth, which starts with the invasion on Venus. It ends by
offering to start Level 1. Earth (on the star map, and Levels 41–44 in level select) stays hidden
until that invasion has happened.

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
Phobos (120 fuel), Deimos (160 fuel, needs **Big Engines**) or Europa (260 fuel, needs Big
Engines and a **Radiation Shield**). Upgrades cost metal and crystals and stay on the rocket
for good. Farther trips mean a longer, tougher escape battle; Europa adds the Radiation Ray
boss in Jupiter's radiation belts. After finishing a moon, build a pad and fuel plant there
and fly on to any other world. The Shell King (Level 10) opens once Europa is done.
Fuel for a trip to another planet depends on how far apart the two planets are from the Sun:
next-door planets (Earth and Mars, Uranus and Neptune) cost about 170, while crossing the
whole solar system (Mercury to Uranus or Neptune) costs 500. Trips between moons of the same
planet stay cheap (120 to 160).
Every planet and moon is on the star map from the start, so you can fly anywhere once the
rocket has the fuel and its upgrades; inside one world the levels still go in order (Venus 1
before Venus 2). Only the black hole has to be unlocked, by beating the Rock Giant on Titan.
The "(on the star map after ...)" notes below give the suggested story order.

6½. **Under Mars** (a side trip from Exodus): finishing Level 6 offers *Go underground*. A city in
   the lava tubes with the same buildings and research as Level 6, tunnel critters that take 2 to
   5 hits, and no Zorp (his saucer can't fit). Win it to go back up to your Level 6 game with 300
   metal and 20 crystals.
7. **Phobos Outpost**: the first world beyond Mars. No air, tiny gravity and falling meteors.
8. **Deimos Watch**: Mars's outer moon, and the first **shell-beasts**: armoured aliens that
   zappers, drones and taps bounce off. Build **castles**, which train up to 3 **knights** each
   (one every 12 seconds, 5 food apiece). Knights guard everything within 4 tiles of their castle
   and are the only thing that can hurt a shell-beast. Aliens hit back hard: each hit takes 2 of a knight's 4 hearts, so a knocked-out knight (who walks
   home to heal) can happen fast. Chewing aliens also steal supplies quickly, so bonk them early.
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
25. **Saturn: Golden Clouds**, 26. **Golden Winds**, 27. **The Hexagon**, 28. **Ring Shadow**
    (on the star map after the Great Red Spot): floating platforms in Saturn's golden clouds.
    **Tree aliens** take 14 hits and only knights and police can chop them down. **Zorp visits
    far more often**, and a **crystal crafter** (built from crystals) makes every defeated alien
    drop one extra crystal for each crafter, up to three. A power core in each level.
29. **Saturn's Rings**: the colony sits on chunks of ring ice (ice drills work). The **Elder
    Tree** grows up out of the ice; only knights and police can hurt it. Beating it wins a power
    core and the tree folk as allies.
30. **Titan: Methane Shores** (on the star map after Saturn's Rings): Saturn's biggest moon,
    with thick orange air and methane rain. Its rocks are water ice, so ice drills work.
    **Rock monsters** take 15 hits; zappers, wizards and taps hurt them, knights can't. A hurt
    one (5 hits or fewer left) sometimes runs to a **hole** to hide for a few seconds, and may
    come back with a hit healed. A **dig site** on a hole fills it in for good. A **tunnel** on a
    hole opens an underground layer to build in; a rock monster hiding in a tunnelled hole shows
    up underground, where zappers and taps can still hit it (and it can't heal if hit). A power
    core is buried here.
31. **Titan: The Rock Giant**: build tunnels and underground zappers, then the **Rock Giant**
    climbs out. Zappers, wizards and taps hurt it. Each time its health drops past ¾, ½ and ¼,
    it digs into the nearest open hole to heal (+60). Filled-in holes stop that, and a tunnelled
    hole chases it out with no healing. Beating it wins a power core and the Rock Folk as allies.
**Bonus level: The Unknown Planet** (the **black hole** appears on the star map after the Rock
    Giant): the black hole spits the rocket out next to a dark planet nobody has seen. **Black
    aliens** take 5 hits and vanish for good when beaten. The **escape crystal** glows inside the
    **Shadow King**, a giant black alien that marches on your buildings and melts into the dark
    to reappear at half health. Beat it, tap the crystal it drops (a power core), then jump
    through the portal to any unlocked world on the star map, with no fuel needed. It's a hard
    level: black aliens come fast and often (up to 11 at once), you need 6 knights and police and
    20 black aliens beaten, and the Shadow King has 500 health and calls for help twice as often.
32. **Uranus: The Big Chill**, 33. **Sideways World**, 34. **Diamond Rain** (on the star map after
    the Rock Giant): the coldest planet. Surface buildings **freeze** and work at 40% speed unless
    they sit on or next to a **giant oven**, which warms its own tile and the 8 around it. There is
    hardly any ore on the surface: a **mine shaft** opens warm caves full of ore underground, where
    mines and ore drills work (and nothing freezes). **Water aliens** take 17 hits; taps, knights
    and drones splash through them, only zappers and wizards work, and each one beaten leaves 5
    water. In Diamond Rain, diamonds fall now and then for 3 crystals. A power core in each level.
35. **Uranus: The Great Wave**: a giant water alien rises out of the slush. Only zappers and
    wizards hurt it, and every 40 damage splashes off a new water alien. Beating it wins a power
    core and the Water Folk as allies.
36. **Neptune: Blue Ice**, 37. **Supersonic Winds**, 38. **Triton's Shadow** (on the star map
    after the Great Wave): the farthest planet. Giant ovens and mine shafts work as on Uranus.
    The **ice digger** digs into any flat ground or ice, pumps water while it digs, and after
    about 30 seconds leaves a **pond** that keeps giving water (ice drills and fish farms work on
    ponds). **Ice aliens** take 18 hits; zappers and drones bounce off, but taps, knights and
    wizards crack them, and each one beaten leaves 3 water. A power core in each level.
39. **Neptune: The Ice Giant**: the boss climbs out of a frozen crater and marches on the
    castles. Taps, knights and wizards hurt it; zaps bounce off. Beating it wins a power core
    and the Ice Folk as allies.
40. **Pluto: The Hidden Core** (on the star map from the start, like every world): the Sun is so
    faint that solar arrays barely work, so **fusion reactors** (+12 energy, 80 metal and 4
    crystals) and storm turbines power the colony; nothing freezes. **Spider aliens** take 19 hits;
    zaps, drones and wizard magic bounce off, but knights, police and taps work. A power core is
    buried on a random tile: build a **metal detector** and **drag it** around the map. It beeps
    faster and says Cold / Cool / Warm / Hot! / HERE! as it gets closer, and when it's right on
    top an **X marks the spot**: drag the detector away and build a dig site there. Then the
    **Spider Queen** comes out (knights, police and taps only); beating her wins a second core and
    the Spider Folk as allies.
41. **Earth: Homecoming**, 42. **The Flooded City**, 43. **The Last Stand**, 44. **The Red Dragon**
    (Earth on the star map; unlocks after Pluto): the mission comes home. Earth is held by
    **black octopus aliens**:
    - They take 30 hits, move very fast and can dodge an attack once or twice.
    - Every time one knocks out a knight, police officer or ally, or smashes a building, it gets
      stronger: +5 health and harder hits.

    You can build almost anything from the whole game here. There are also **spawners**, one for
    each ally you freed (Lizard, Blob, Rhino, Tree, Rock, Water, Ice and Spider):
    - A spawner only works with a **Power Core** right next to it, and each core powers one
      spawner.
    - The cores you won on the mission are your supply, and recycling a core gives it back.
    - A powered spawner makes up to 3 allies, one every 10 seconds.
    - Lizards, blobs, rhinos, trees and rocks fight up close.
    - Water squirters, ice throwers and web spitters shoot from a distance. Webs slow octopuses
      down.

    Level 44's boss is the **Red Dragon** (620 health):
    - On the ground, knights and allies can fight it.
    - When it flies, only zappers, wizards, taps and shooting allies can reach it.
    - It spits fireballs: three hits burn a building down, and anyone standing where one lands
      gets hurt.
    - It brings more octopuses, and at half health it flies into the clouds and comes back
      angrier.
    - Beating it frees Earth and plays the ending.

    **Research works on Earth too.** Build **research labs** for science (each level starts with
    30) and open the tech tree. On Earth you already own all the usual research, except the
    colony rocket and the three techs that reshape the map (Land Reclamation, Deep Tunnels and
    Sky Islands). So the tree shows only the **Free Earth** branch, and what you research there
    carries on to the next Earth level:
    - **Harpoon Towers** (new building): 3-damage harpoons with a long range. They can hit the
      dragon even when it flies.
    - **Net Launchers** (new building): net an alien for 3 seconds, so it can't move or dodge.
    - **Fireproof Roofs**: dragon fireballs only switch buildings off, never burn them down.
    - **Mech Suits**: knights and police get 6 hearts.
    - **Ally Armour**: spawned allies get +3 hearts, and spawners work twice as fast.
    - **Core Forge** (new building): makes a new power core every 75 seconds, up to 3 per level.

    The Earth levels sit after the bonus levels in the game's level list, so old saves keep their
    numbers.

**Bonus level: Random Mix-Up** (🎲 in level select, always open): a brand new random level every
time. It mixes the look of one world (ground colours, sky, sunlight, temperature) with the land of
another, two or three alien kinds from anywhere, the basic buildings plus every kind of defence and
four random extras, and a random boss (the Shell-beast King, Elder Tree, Rock Giant, Great Wave, Ice
Giant, Spider Queen, Lizard King or Five-Head Chief). The difficulty is random too: Easy, Medium or
Hard changes how many aliens come, how fast, the boss's health and the reward. Sometimes meteors or
diamond rain join in, and an ice-giant look means giant ovens. Beating it gives 25, 40 or 60
crystals and a golden crystal for Zorp; it never gives mission power cores or allies. A saved
Mix-Up comes back exactly the same (the save keeps its random seed).

Every Mix-Up also brings things no other level has:
- **Combo aliens** (2–3 per mix): two alien kinds fused into one, like a *Rhino-crawler* or an
  *Ice-monster*. They have a rainbow ring and both parents' powers mixed together (ice, water,
  regrowing, hiding and so on), but taps always work on them.
- **Brand-new aliens** (3–4 per mix, from eight kinds):
  - **Splitters** split into two little splitlings when beaten.
  - **Phantoms** fade away every few seconds, and nothing can hit them while they're faded.
  - **Medic bugs** heal the aliens next to them.
  - **Bubble bugs** have a bubble that soaks up the first 3 hits.
  - **Blinkers** teleport from one building to another.
  - **Boom beetles** blow up when they reach a building, switching off everything around it for
    8 seconds.
  - **Gobblers** grow bigger and tougher every 7 seconds (up to 3 times).
  - **Magpie bugs** are very fast and steal lots of supplies.
- **Combo buildings** (2–3 per mix): two buildings in one, like a *Mining Greenhouse* or a *Dew
  Zapper*. Each does both jobs at half strength and costs half of each. The level's special goal
  is usually to build one.
- **Brand-new buildings** (2 per mix), found nowhere else in the game:
  - **Goo Pool**: aliens within 2 tiles get stuck and move at half speed.
  - **Bounce Pad**: every 5 seconds it flings the nearest alien back home, and the alien drops
    everything it stole.
  - **Crystal Tree**: grows 1 crystal every 20 seconds (up to 2 trees).
  - **Knight Medic Tent**: knights and police within 3 tiles get a heart back every 30 seconds.
  - **Rainbow Fountain**: +10 happiness for 12 colonists and a little water.
  Half the time, the special goal is to build one of them.

**Secret bonus level, Planet Glorp.** Zorp the alien trader visits every level. Each trade
earns a friendship heart, and rare Golden Crystals (from bonks, digs, nests and meteors) are
worth 3 hearts as a gift. At 20 hearts Zorp flies you home to meet Mrs. Zorp, the twins Zib
and Zab, and Baby Zuzu. Build super-powered Zorp-tech for the Glorp Festival, survive the
meteor storms and chase off a random party crasher (the Grumble Worm, Blorg the rival trader
or Queen Skyla). Finishing it lets you keep one Zorp-tech upgrade for the rest of the game, then
fly back to the game you left. The upgrade works on every level, and every level's intro reminds
you which one you have:
- **Solar Flower seeds**: every power building makes 50% more power.
- **Tesla coils**: every zapper zaps two more critters at once.
- **Gloop drills**: everything that digs metal digs 50% more.
- **Hover homes**: habitats hold 6 colonists and hover habitats hold 12.

Research from Levels 4 and 5 carries into the next level when you finish them.

## The Christmas update (all of December)

Every December (by the player's own clock) the game turns Christmassy by itself, and goes back to
normal on January 1:
- **Snow** falls on every world and dusts the ground (not in the lava-tube city of Under Mars).
- **It's cold everywhere.** Buildings that aren't on or next to a **giant oven** freeze and work at
  half speed (Uranus and Neptune stay at 40%). Every level can build giant ovens. Training Camp and
  Level 1 get the snow but no freezing.
- **Christmas buildings** on every level except Training Camp:
  - **Christmas Tree**: +2.4 food/s, three times a greenhouse.
  - **Gingerbread House**: a home for 6 colonists.
  - **Snowman**: +8 happiness for 10 colonists, and costs only water.
  - **Snowball Launcher**: throws a snowball every 2 seconds at an alien within 3 tiles (1 damage, and
    it slows down for 2 seconds). It can hit aliens that fly.
  - **Santa's Sleigh** (one per level): every 45 seconds it flies over the colony and drops 3
    presents. Tap a present to open it (metal, water, food or crystals); unopened ones open by
    themselves after a while.
- **Every alien and boss wears a Santa hat**, even in the Alien Book. The five-headed aliens get one
  on every head.

A note on the title screen says the Christmas update is on. Christmas buildings built in December
keep working afterwards, but can't be built again until next December.

## Alien Book

The **📖 Alien Book** button in level select (under the list of levels) opens the Alien Book.
It has four sections: **Aliens** (28 kinds), **Bosses** (16), **Buildings** (72) and **Helpers** (11). Each alien and boss page has a moving picture of
the alien, drawn the same way as in the game, plus:
- its health
- what hurts it
- where it lives (worked out from the levels themselves)
- what it does
- how many times you've beaten it

Beating an alien adds it to the book and pops up a message; the book is kept for the whole game.
Aliens you haven't beaten yet show as a dark mystery shape with "???" and where to find them.
Every different combo alien you beat in Random Mix-Up gets its own page under the aliens. The
first time the book opens, games that already have progress get credit for the aliens on worlds
they've finished and the bosses whose allies they've freed.

**Buildings** works the same way, but a building is added the first time you place one. Each page
has a moving picture of the building and:
- what it's called and what it does
- **how many** to build in a level (like "1 for every 8 colonists", or "Just 1" for buildings
  you can only have one of)
- what it costs and where you can build it
- how many you've built

Buildings you haven't placed yet are dark shapes. Every different combo building you place in
Random Mix-Up gets its own page under the buildings. The first time the Buildings section opens,
older games get credit for the buildings their finished levels asked for and the ones on their
saved map.

**Helpers** are the ones who fight on your side: the **knight**, the **police officer**, the
**wizard**, and the eight allies from Earth's spawners (lizard warrior, blob buddy, rhino, tree
guard, rock buddy, water squirter, ice thrower and web spitter). A helper is added the first time
one is trained or comes out of a spawner. Each page has a moving picture of them fighting and:
- their hearts and how much damage they do
- which aliens they can hurt
- which building they come from, and how many each one makes
- where you can find them, and how many you've trained

Older games get credit for helpers from finished worlds that had castles, police stations or
wizard huts, and for the ones in their saved game.

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
