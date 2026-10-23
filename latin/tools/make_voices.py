"""Record every line in the Ending Eaters game with the Kokoro neural TTS model.

Usage (from the repo root):
    pip install kokoro-onnx soundfile
    # download kokoro-v1.0.onnx and voices-v1.0.bin from
    # https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
    python latin/tools/make_voices.py --models path/to/model/dir

The lines come from latin/content.js (allLines(), run with node), which also gives an
easy-to-say respelling of each Latin word. Clips go to latin/voice/<key>.mp3 and the list
of clips to latin/voice/clips.js. Only new or changed lines are recorded.
Voice effects are shared with the Mars game's tools/make_voices.py.
"""
import argparse, json, os, subprocess, sys
import soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
GAME = os.path.dirname(HERE)
sys.path.insert(0, os.path.join(os.path.dirname(GAME), 'tools'))
from make_voices import Kokoro, clip_key, robotize, shift, alienize, finish  # noqa: E402

OUT = os.path.join(GAME, 'voice')

# voice, language, speed, effect
VOICES = {
    'nar': ('af_heart', 'en-us', 0.95, None),        # the storyteller owl
    'marcus': ('am_puck', 'en-us', 1.05, ('pitch', 3)),  # Marcus, a little younger
    'normus': ('am_michael', 'en-us', 0.85, ('pitch', -2)),  # laid-back Normus
    'accu': ('am_fenrir', 'en-us', 0.95, ('pitch', -4)),  # growly Accusaurum
    'ablato': ('am_puck', 'en-us', 1.0, ('robot',)),   # Ablatō the robot
    'pluri': ('af_nicole', 'en-us', 1.1, ('alien', 7, 0.15)),  # the squeaky Plurī
}

LIST_JS = r"""
const fs = require('fs'), vm = require('vm');
const ctx = { window: {} }; ctx.globalThis = ctx.window; vm.createContext(ctx);
for (const f of ['words.js', 'content.js']) vm.runInContext(fs.readFileSync(process.argv[1] + '/' + f, 'utf8'), ctx);
process.stdout.write(JSON.stringify(ctx.window.CONTENT.allLines()));
"""

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--models', required=True, help='folder with kokoro-v1.0.onnx and voices-v1.0.bin')
    args = ap.parse_args()
    lines = json.loads(subprocess.check_output(['node', '-e', LIST_JS, GAME]))
    kokoro = Kokoro(os.path.join(args.models, 'kokoro-v1.0.onnx'), os.path.join(args.models, 'voices-v1.0.bin'))
    os.makedirs(OUT, exist_ok=True)
    keep = set()
    for line in lines:
        who, text, spoken = line['who'], line['text'], line['spoken']
        key = clip_key(who, text)
        keep.add(key)
        path = os.path.join(OUT, key + '.mp3')
        if os.path.exists(path):
            continue
        voice, lang, speed, fx = VOICES[who]
        y, sr = kokoro.create(spoken.replace('’', "'"), voice=voice, speed=speed, lang=lang)
        if fx and fx[0] == 'pitch':
            y = shift(y, fx[1])
        elif fx and fx[0] == 'robot':
            y = robotize(y, sr)
        elif fx and fx[0] == 'alien':
            y = alienize(y, sr, fx[1], fx[2])
        sf.write(path, finish(y, sr), sr, format='MP3')
        print(f'{key}  {who:7} {spoken[:70]}')
    for f in os.listdir(OUT):
        if f.endswith('.mp3') and f[:-4] not in keep:
            os.remove(os.path.join(OUT, f))
    with open(os.path.join(OUT, 'clips.js'), 'w') as fh:
        fh.write('// made by tools/make_voices.py\nwindow.VOICE_CLIPS = ' + json.dumps(sorted(keep)) + ';\n')
    print(f'{len(keep)} clips')

if __name__ == '__main__':
    main()
