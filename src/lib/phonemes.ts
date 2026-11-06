/** Montessori-style letter sounds for speech (not letter names). */
export const phonemeLine: Record<string, string> = {
  a: "a says ah as in apple",
  b: "b says buh as in bat",
  c: "c says kuh as in cat",
  d: "d says duh as in dog",
  e: "e says eh as in egg",
  f: "f says fff as in fan",
  g: "g says guh as in go",
  h: "h says huh as in hat",
  i: "i says ih as in igloo",
  j: "j says juh as in jam",
  k: "k says kuh as in kite",
  l: "l says lll as in lamp",
  m: "m says mmm as in map",
  n: "n says nnn as in net",
  o: "o says oh as in octopus",
  p: "p says puh as in pan",
  q: "q says kwuh as in queen",
  r: "r says rrr as in run",
  s: "s says sss as in sun",
  t: "t says tuh as in top",
  u: "u says uh as in umbrella",
  v: "v says vvv as in van",
  w: "w says wuh as in web",
  x: "x says ks as in box",
  y: "y says yuh as in yes",
  z: "z says zzz as in zip",
};

const NUMBER_WORDS: Record<string, string> = {
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
};

/** Short sound to speak when a letter card is tapped (e.g. "ah", "sss"). */
export function phonemeSoundForGlyph(glyph: string): string | null {
  const g = glyph.trim().toLowerCase();
  if (g.length === 1 && g >= "a" && g <= "z") {
    const line = phonemeLine[g];
    if (!line) return null;
    const match = line.match(/ says (.+?) as in /);
    return match ? match[1] : line;
  }
  if (/^\d$/.test(g)) {
    return NUMBER_WORDS[g] ?? g;
  }
  return null;
}
