# Marcus & the Ending Eaters

A Latin endings game for a grade 3 kid. It teaches the second-declension endings
**-us, -um, -ō, -ī** (and the neuter *cavum* trap) and builds up to a replica of the
picture-and-word exercise where you pick **normal / accusative / ablative / plural**.

## Play

Serve this folder and open it in a browser, e.g. `python3 -m http.server` in `latin/`,
then go to http://localhost:8000. Opening `index.html` straight from disk also works,
but some browsers block the voice clips that way and fall back to the built-in voice.

## How it teaches

The key fact about the real exercise: the word under the picture already has its ending
(*murum*, *nāsō*, *capillī*), so the main skill is **read the tail, name its job**. The
picture explains *why*, and it only decides the answer for the neuter *cavum*.

- **The Ending Eaters.** Four monsters, each eating one tail, and each one's name ends in
  that tail: **Normus** (-us, normal), **Accusaurum** (-um, accusative, a T-rex with a
  target), **Ablatō** (-ō, ablative, a robot with tools), **the Plurī** (-ī, plural).
  "Accusaurum/accusative" and "Ablatō/ablative" sound alike on purpose.
- **One colour per ending** everywhere: tail, monster, picture hints (target arrow for -um,
  helper glow for -ō, counting numbers for -ī).
- **Slow build-up.** Two endings, then three, then four, then the sneaky hole.
- **Helpers fade out level by level.** Coloured tails, picture hints and monster buttons
  first; in Picture Detective only small monster icons are left; the Big Test has none,
  just like the real thing.
- **Hints, not answers.** A first wrong try in the learning levels points at the tail ("It
  ends in -ō. Who eats -ō?") and lets the kid try again. Stars only count first tries.
- **Missed words come back** later in the round with a different picture, so the answer
  can't just be memorised. They also go to **Review Camp** on the map, and the ☆ button
  saves any word there.
- **Build-a-Word** flips it around: picture plus English sentence, then snap on the tail.
- **Tail Blaster** is the arcade drill: words fall on Rome, feed them to the right monster.

Every line is spoken (recorded voices), every Latin word can be heard with 🔈, and each
answer shows a Latin sentence about the picture (*Marcus lupum spectat.*). Progress,
stars, hats and missed words are saved in the browser.

## Levels

1. One or Many? (-us / -ī)
2. Accusaurum Attacks! (adds -um)
3. Ablatō's Toolbox (adds -ō)
4. Tail Blaster (arcade, coloured tails)
5. Build-a-Word
6. The Sneaky Hole (*cavum* is -um in its normal form too; plural *cava*)
7. Picture Detective (test buttons, no colours or arrows)
8. The Big Test (the real format, 4-star rating)
9. Turbo Blaster (faster, no colours)

Stars unlock the next level and hats for Marcus (laurel, helmet, crown, wizard hat).
Keys: 1–4 or A–D to answer, Enter for next, Esc for the map.

## Adding words

Everything about the words is in `words.js`. Copy an entry, change the forms, and give
it scenes using the scene names the art already knows (`alone`, `act`, `look`, `toward`,
`touch`, `with`, `by`, `many2`, `many3`, ... see `SCENES` in `art.js`). A new kind of
object needs a drawing in `art.js`. Then re-record the voices:

    pip install kokoro-onnx soundfile
    python latin/tools/make_voices.py --models path/to/kokoro/models

(Model files: https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0.)
Without new recordings the game uses the browser's voice for new lines.

## Files

- `index.html`: page and styles
- `words.js`: the word bank (forms, scenes, Latin and English sentences)
- `content.js`: lessons, levels, hints and everything the characters say
- `art.js`: Marcus, the objects, the scenes and the monsters, all inline SVG
- `audio.js`: chiptune music and sound effects (Web Audio), voice playback
- `game.js`: screens and game logic
- `voice/`: recorded lines (Kokoro TTS, Apache-2.0)
