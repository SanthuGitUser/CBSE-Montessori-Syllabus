import { exactBundles } from "../../data/topicContent/bundles";
import { findEplActivity } from "../../data/topicContent/eplActivities";
import { findLessonActivity, speakingActivity } from "../../data/topicContent/lessonActivities";
import { classroomRhymes } from "../../data/topicContent/rhymes";
import {
  familyItems,
  farmAnimalItems,
  flowerItems,
  fruitItems,
  globeItems,
  henLifeCycleItems,
  montessoriMaterialItems,
  nationalLeaderItems,
  nationalSymbolItems,
  oppositeItems,
  phonicsObjectItems,
  plantItems,
  rainbowColourItems,
  sensorialMaterialMap,
  shapeItems,
  vegetableItems,
  waterSkyItems,
  wildAnimalItems,
} from "../../data/topicContent/catalog";
import type { ItemCard, TopicRichContent } from "./types";
import { normalizeTopic } from "./normalize";
import { phonemeLine } from "../phonemes";

function extractLetters(topic: string): string[] {
  const paren = topic.match(/\(([a-z,\s-]+)\)/i);
  if (!paren) return [];
  return [
    ...new Set(
      paren[1]
        .split(/[,\s]+/)
        .map((c) => c.trim().toLowerCase())
        .filter((c) => c.length === 1 && c >= "a" && c <= "z"),
    ),
  ];
}

function extractNumberRange(topic: string): number[] {
  const range = topic.match(/\((\d+)\s*-\s*(\d+)\)/);
  if (range) {
    const a = parseInt(range[1], 10);
    const b = parseInt(range[2], 10);
    if (b >= a && b - a <= 40) {
      return Array.from({ length: b - a + 1 }, (_, i) => a + i);
    }
  }
  const singles = topic.match(/\(([\d,\s]+)\)/);
  if (singles && !/[a-z]/i.test(singles[1])) {
    return [...new Set(singles[1].match(/\d/g)?.map(Number) ?? [])];
  }
  return [];
}

function clone(content: TopicRichContent): TopicRichContent {
  return {
    ...content,
    itemCards: [...content.itemCards],
    images: [...content.images],
    audios: [...content.audios],
    rhymes: [...content.rhymes],
  };
}

function pack(
  title: string,
  itemCards: ItemCard[],
  extras?: Partial<TopicRichContent>,
): TopicRichContent {
  return {
    title,
    itemCards,
    images: extras?.images ?? [],
    audios: extras?.audios ?? [],
    rhymes: extras?.rhymes ?? [],
    intro: extras?.intro,
  };
}

function sensorialCards(topic: string): ItemCard[] {
  const key = normalizeTopic(topic);
  for (const [needle, card] of Object.entries(sensorialMaterialMap)) {
    if (key.includes(needle)) return [card];
  }
  if (/dimensional/i.test(topic)) return montessoriMaterialItems.slice(0, 3);
  return [];
}

function lettersInRange(topic: string): string[] {
  const m = topic.match(/\(([a-z])\s*-\s*([a-z])\)/i);
  if (!m) return [];
  const a = m[1].toLowerCase().charCodeAt(0);
  const b = m[2].toLowerCase().charCodeAt(0);
  if (b < a) return [];
  return Array.from({ length: b - a + 1 }, (_, i) => String.fromCharCode(a + i));
}

function withLetters(topic: string): TopicRichContent {
  const range = lettersInRange(topic);
  const letters = range.length ? range : extractLetters(topic);
  const cards: ItemCard[] = letters.map((l) => ({
    glyph: l,
    name: `Letter ${l.toUpperCase()}`,
    detail: phonemeLine[l] ?? `Sound for ${l}`,
  }));
  return pack(topic, cards, {
    intro: "At home use a rice tray or air writing — same sound as school.",
    audios: letters.map((l) => ({
      label: l.toUpperCase(),
      speakText: phonemeLine[l] ?? `Letter ${l}`,
    })),
  });
}

function withNumbers(topic: string): TopicRichContent {
  const nums = extractNumberRange(topic);
  const cards: ItemCard[] = nums.map((n) => ({
    glyph: String(n),
    name: `Number ${n}`,
    detail: `Say “${n}” while tracing the sandpaper numeral.`,
  }));
  return pack(topic, cards, {
    audios: cards.slice(0, 10).map((c) => ({
      label: c.glyph ?? c.name,
      speakText: `${c.name}.`,
    })),
  });
}

function withCounting(topic: string): TopicRichContent {
  const found = extractNumberRange(topic);
  const nums = found.length ? found : [1, 2, 3, 4, 5];
  const first = nums[0];
  const last = nums[nums.length - 1];
  const cards: ItemCard[] = nums.map((n) => ({
    glyph: String(n),
    name: `Number ${n}`,
    detail: "Touch one object per count.",
  }));
  return pack(topic, cards, {
    intro: "Use buttons or spoons — one touch for each number.",
    audios: [
      {
        label: `Count ${first} to ${last}`,
        speakText: `Let's count. ${nums.join(", ")}.`,
      },
    ],
  });
}

const isSpeaking = (s: string) => s.toLowerCase().includes("speaking");
const isSensorial = (s: string) => s.toLowerCase().includes("sensorial");

function speakingCards(t: string): ItemCard[] {
  if (/animal/i.test(t)) return [...farmAnimalItems.slice(0, 4), ...wildAnimalItems.slice(0, 2)];
  if (/family/i.test(t)) return familyItems;
  if (/colou?r/i.test(t)) return rainbowColourItems;
  if (/flag/i.test(t)) return nationalSymbolItems.slice(0, 1);
  if (/flower/i.test(t)) return flowerItems;
  if (/fruit/i.test(t)) return fruitItems;
  if (/vegetable/i.test(t)) return vegetableItems;
  return [];
}

const rules: {
  test: (t: string, s: string) => boolean;
  build: (t: string, s: string) => TopicRichContent;
}[] = [
  {
    test: (_t, s) => isSpeaking(s),
    build: (t) => ({
      ...pack(t, speakingCards(t), {
        intro: "Your child practises speaking 2–3 sentences about this in circle time. Rehearse at home.",
      }),
      photo: { src: speakingActivity.photo, caption: speakingActivity.caption },
      steps: speakingActivity.steps,
    }),
  },
  { test: (t) => /sandpaper letter|sandpaper tracing \([a-z]/i.test(t), build: withLetters },
  {
    test: (t) => /sandpaper figure|sandpaper tracing \(/i.test(t) && /\d/.test(t),
    build: withNumbers,
  },
  { test: (t) => /oral counting/i.test(t), build: withCounting },
  {
    test: (t) => /my home|my school|montessori environment|things found|name the things/i.test(t),
    build: (t) => {
      const b = clone(exactBundles["things found in the montessori environment"]);
      b.title = t;
      return b;
    },
  },
  {
    test: (t, s) => !isSensorial(s) && /colour|color/i.test(t),
    build: (t) => ({ ...clone(exactBundles["rainbow colours"]), title: t }),
  },
  { test: (t) => /life cycle of a hen/i.test(t), build: (t) => pack(t, henLifeCycleItems) },
  {
    test: (t, s) => s.toLowerCase().includes("evs") && /animal|bird|insect|pet|farm|wild|aquatic/i.test(t),
    build: (t) => {
      const b = clone(exactBundles["animals (names, sounds, homes and young ones)"]);
      b.title = t;
      return b;
    },
  },
  { test: (t) => /rhymes and stories/i.test(t), build: () => clone(exactBundles["rhymes and stories"]) },
  {
    test: (t) => /globe|continent|world map|land and water/i.test(t),
    build: (t) => pack(t, globeItems, { intro: "Blue = water, green/brown = land." }),
  },
  { test: (t) => /national leader/i.test(t), build: (t) => pack(t, nationalLeaderItems) },
  {
    test: (t) => /national symbol|national flag/i.test(t),
    build: (t) => ({ ...clone(exactBundles["our national flag"]), title: t }),
  },
  { test: (t) => /flower/i.test(t), build: (t) => pack(t, flowerItems) },
  {
    test: (t) => /germination|parts of a tree|fruit|vegetable|plant/i.test(t),
    build: (t) => {
      if (/vegetable/i.test(t)) return clone(exactBundles.vegetables);
      if (/fruit/i.test(t)) return clone(exactBundles.fruits);
      return pack(t, plantItems);
    },
  },
  { test: (t) => /opposite/i.test(t), build: (t) => pack(t, oppositeItems) },
  {
    test: (t) => /classification/i.test(t),
    build: (t) => pack(t, [fruitItems[0], fruitItems[1], farmAnimalItems[0], farmAnimalItems[2], waterSkyItems[0], waterSkyItems[2]], {
      intro: "Children sort pictures into groups — fruits, animals, birds — and say why they belong together.",
    }),
  },
  {
    test: (t) => /object box|phonetic|association.*sound|association.*picture.*sound|phonic/i.test(t),
    build: (t) => pack(t, phonicsObjectItems),
  },
  {
    test: (t) => /basic shapes|shape/i.test(t),
    build: (t) => pack(t, shapeItems),
  },
  {
    test: (t) => /parts of the body|myself/i.test(t),
    build: (t) => {
      if (normalizeTopic(t) === "myself") return clone(exactBundles.myself);
      return clone(exactBundles["parts of the body"]);
    },
  },
  {
    test: (t) => /family/i.test(t),
    build: (t) => {
      const k = normalizeTopic(t);
      if (exactBundles[k]) return clone(exactBundles[k]);
      return clone(exactBundles["my family"]);
    },
  },
  { test: (_t, s) => isSensorial(s), build: (t) => pack(t, sensorialCards(t)) },
];

function withLessonPhoto(content: TopicRichContent, topic: string): TopicRichContent {
  if (content.photo) return content;
  const lesson = findLessonActivity(topic);
  if (!lesson) return content;
  return {
    ...content,
    itemCards: content.itemCards.filter((c) => c.photo !== lesson.photo),
    photo: { src: lesson.photo, caption: lesson.caption },
    steps: lesson.steps,
    audios: [],
  };
}

function resolveBase(topic: string, subject: string): TopicRichContent {
  const key = normalizeTopic(topic);
  if (exactBundles[key]) return clone(exactBundles[key]);

  for (const rule of rules) {
    if (rule.test(topic, subject)) return rule.build(topic, subject);
  }

  if (/story|rhyme/i.test(topic)) {
    return {
      title: topic,
      itemCards: [],
      images: [],
      rhymes: classroomRhymes,
      audios: [],
    };
  }

  return pack(topic, [], { intro: "Your school uses this heading on the monthly plan. Ask your child to show you this lesson." });
}

export function resolveTopicContent(topic: string, subject: string): TopicRichContent {
  const activity = findEplActivity(topic);
  if (activity) {
    return {
      title: topic,
      photo: { src: activity.photo, caption: activity.caption },
      steps: activity.steps,
      itemCards: [],
      images: [],
      rhymes: [],
      audios: [],
    };
  }
  return withLessonPhoto(resolveBase(topic, subject), topic);
}
