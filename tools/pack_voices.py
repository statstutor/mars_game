"""Build the published copy of the game with the voice clips bundled into a few packs.

An artifact can hold only so many files, and there are hundreds of clips. This writes
<out>/make-mars-blue.html (the page body, with the VOICE_PACK index filled in) and
<out>/audio/voice-pack-N.mp3, each a run of clips stuck end to end. The game fetches a
pack once and slices each clip out of it by offset and length.

Usage (from the repo root):  python tools/pack_voices.py --out path/to/publish
"""
import argparse, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PACK_BYTES = 4 * 1024 * 1024

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', required=True)
    out = ap.parse_args().out
    os.makedirs(os.path.join(out, 'audio'), exist_ok=True)
    src = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    keys = re.search(r"/\*VOICE_CLIPS\*/'([^']*)'/\*END\*/", src).group(1).split()
    index, pack, buf = {}, 0, bytearray()
    def flush():
        nonlocal pack, buf
        if buf:
            open(os.path.join(out, 'audio', f'voice-pack-{pack}.mp3'), 'wb').write(buf)
            pack, buf = pack + 1, bytearray()
    for k in sorted(keys):
        data = open(os.path.join(ROOT, 'audio', 'voice', k + '.mp3'), 'rb').read()
        if len(buf) + len(data) > PACK_BYTES: flush()
        index[k] = [pack, len(buf), len(data)]
        buf += data
    flush()
    page = src.replace('/*VOICE_PACK*/null/*END*/', '/*VOICE_PACK*/' + json.dumps(index, separators=(',', ':')) + '/*END*/')
    # the artifact host adds its own document skeleton, so publish only what sits inside it
    page = page[page.index('<title>'):]
    page = page.replace('</head>\n', '', 1)
    page = re.sub(r'<body[^>]*>\n', '', page, count=1)
    page = page[:page.rindex('</body>')].rstrip() + '\n'
    open(os.path.join(out, 'make-mars-blue.html'), 'w', encoding='utf-8').write(page)
    print(f'{len(index)} clips in {pack} packs')

if __name__ == '__main__':
    main()
