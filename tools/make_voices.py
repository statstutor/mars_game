"""Pre-record every crew line in index.html with the Kokoro neural TTS model.

Usage (from the repo root):
    pip install kokoro-onnx soundfile
    # download kokoro-v1.0.onnx and voices-v1.0.bin from
    # https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
    python tools/make_voices.py --models path/to/model/dir

It writes audio/voice/<key>.mp3 for each line and rewrites the VOICE_CLIPS list in
index.html. The key is an FNV-1a hash of "who|text", matching clipKey() in the game,
so changing a line's wording just needs this script to be run again.
"""
import argparse, os, re, sys
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML = os.path.join(ROOT, 'index.html')
OUT = os.path.join(ROOT, 'audio', 'voice')

# voice, language, speed for each crew member
VOICES = {
    'cmd': ('af_heart', 'en-us', 1.0),    # Commander Reyes
    'eng': ('am_michael', 'en-us', 1.0),  # Chief Engineer Haddad
    'bot': ('bf_emma', 'en-gb', 0.97),    # Dr. Sato
    'kip': ('am_puck', 'en-us', 1.05),    # KIP-7, robot effect added below
}

def clip_key(who, text):
    h = 0x811C9DC5
    data = (who + '|' + text).encode('utf-16-le')
    for i in range(0, len(data), 2):
        h ^= data[i] | (data[i + 1] << 8)
        h = (h * 0x01000193) & 0xFFFFFFFF
    return f'{h:08x}'

def collect_lines(src):
    lines = set()
    praise = dict(re.findall(r"(\w+): '([^']*)'", re.search(r'const PRAISE = \{([^}]*)\}', src).group(1)))
    for who, hint in re.findall(r"who: '(\w+)', hint: '([^']*)'", src):
        lines.add((who, hint))
        lines.add((who, praise[who] + ' ' + hint))
        lines.add((who, 'Welcome back! ' + hint))
    lines.update(re.findall(r"\['(cmd|eng|bot|kip)', '([^']*)'\]", src))
    lines.update(re.findall(r"say\('(cmd|eng|bot|kip)', '([^']*)'", src))
    return sorted(lines)

def robotize(y, sr):
    # raise the pitch a little by resampling, then add a light metallic ring and a tiny speaker comb
    factor = 2 ** (2.5 / 12)
    idx = np.arange(0, len(y) - 1, factor)
    y = np.interp(idx, np.arange(len(y)), y)
    t = np.arange(len(y)) / sr
    y = 0.72 * y + 0.28 * y * np.sin(2 * np.pi * 55 * t)
    d = int(sr * 0.004)
    out = y.copy()
    out[d:] += 0.35 * y[:-d]
    return out

def finish(y, sr):
    y = np.concatenate([np.zeros(int(sr * 0.06)), y, np.zeros(int(sr * 0.15))])
    peak = np.max(np.abs(y)) or 1.0
    return (y / peak * 0.89).astype(np.float32)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--models', required=True, help='folder with kokoro-v1.0.onnx and voices-v1.0.bin')
    args = ap.parse_args()
    kokoro = Kokoro(os.path.join(args.models, 'kokoro-v1.0.onnx'), os.path.join(args.models, 'voices-v1.0.bin'))
    src = open(HTML, encoding='utf-8').read()
    lines = collect_lines(src)
    os.makedirs(OUT, exist_ok=True)
    keys = []
    for who, text in lines:
        key = clip_key(who, text)
        keys.append(key)
        path = os.path.join(OUT, key + '.mp3')
        if os.path.exists(path):
            continue
        voice, lang, speed = VOICES[who]
        spoken = text.replace('’', "'").replace('KIP-7', 'Kip seven')
        y, sr = kokoro.create(spoken, voice=voice, speed=speed, lang=lang)
        if who == 'kip':
            y = robotize(y, sr)
        sf.write(path, finish(y, sr), sr, format='MP3')
        print(f'{key}  {who}  {text[:60]}')
    keep = set(keys)
    for f in os.listdir(OUT):
        if f.endswith('.mp3') and f[:-4] not in keep:
            os.remove(os.path.join(OUT, f))
    new = re.sub(r"/\*VOICE_CLIPS\*/.*?/\*END\*/", "/*VOICE_CLIPS*/'" + ' '.join(sorted(keep)) + "'/*END*/", src, flags=re.S)
    if new == src and "/*VOICE_CLIPS*/" not in src:
        sys.exit('VOICE_CLIPS marker not found in index.html')
    open(HTML, 'w', encoding='utf-8').write(new)
    print(f'{len(keep)} clips')

if __name__ == '__main__':
    main()
