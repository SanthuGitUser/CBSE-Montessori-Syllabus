import type { TopicEntry } from "./topics";

export type SubgroupRule = {
  id: string;
  label: string;
  test: RegExp;
};

const english: SubgroupRule[] = [
  {
    id: "environment",
    label: "Environment",
    test: /things found|names of montessori|name the things/i,
  },
  { id: "rhymes", label: "Rhymes & stories", test: /rhymes and stories/i },
  {
    id: "sandpaper",
    label: "Sandpaper letters",
    test: /sandpaper (letter|tracing)/i,
  },
  {
    id: "phonics",
    label: "Phonics & reading",
    test: /.*/i,
  },
];

const math: SubgroupRule[] = [
  { id: "counting", label: "Counting", test: /oral counting/i },
  {
    id: "sandpaper",
    label: "Sandpaper numerals",
    test: /sandpaper figure|sandpaper tracing/i,
  },
  {
    id: "materials",
    label: "Montessori math",
    test: /number rod|spindle|shell counting|zero activity|chit game/i,
  },
  {
    id: "shapes",
    label: "Shapes & numbers",
    test: /shape|association.*numeral|association pictures/i,
  },
];

const evs: SubgroupRule[] = [
  {
    id: "me",
    label: "Myself & home",
    test: /myself|parts of the body|my family|my home|my school|good touch|rainbow colou?r/i,
  },
  {
    id: "animals",
    label: "Animals",
    test: /animal|life cycle of a hen|insects and birds/i,
  },
  {
    id: "nature",
    label: "Plants & food",
    test: /flower|germination|parts of a tree|fruit|vegetable/i,
  },
  {
    id: "world",
    label: "World & India",
    test: /globe|continent|world map|national|parts of a book|care of a book/i,
  },
];

const epl: SubgroupRule[] = [
  {
    id: "mat",
    label: "Mat & movement",
    test: /mat|walking on the line|silence activity|hold, lift, carry/i,
  },
  {
    id: "care",
    label: "Care of self",
    test: /wash hand|napkin|greet|magical words|sneeze|cough|yawn|table manner|offer a sharp/i,
  },
  {
    id: "motor",
    label: "Hand activities",
    test: /sort|tong|peg|puzzle|thread|lock|lid|scissor|fold|transfer|dough|pound|frame|rolling dough|pattern cutting|colour sorting|pairing|fruit and vegetable/i,
  },
  {
    id: "social",
    label: "Grace & courtesy",
    test: /social behav/i,
  },
];

const sensorial: SubgroupRule[] = [
  {
    id: "size",
    label: "Size & length",
    test: /pink tower|brown stair|red rods|dimensional|cylinder block/i,
  },
  {
    id: "colour",
    label: "Colour & touch",
    test: /colou?r|touch board|gustatory|knobless|colored cylinders|colour cylinders/i,
  },
  {
    id: "geometry",
    label: "Geometry",
    test: /geometrical|geometric|constructive|binomial|trinomial|drawing inset/i,
  },
];

const speaking: SubgroupRule[] = [
  { id: "family", label: "Family & school", test: /family|national flag/i },
  { id: "nature", label: "Nature topics", test: /colou?r|animal|flower|fruit|vegetable/i },
  { id: "all", label: "Speaking", test: /.*/i },
];

const RULES: Record<string, SubgroupRule[]> = {
  English: english,
  Math: math,
  EVS: evs,
  "EPL Activities": epl,
  Sensorial: sensorial,
  "Speaking Skills": speaking,
};

function matchSubgroup(subject: string, topic: string): string {
  const rules = RULES[subject];
  if (!rules) return "all";
  for (const rule of rules) {
    if (rule.test.test(topic)) return rule.id;
  }
  return rules[rules.length - 1]?.id ?? "all";
}

export type TopicSubgroup = {
  id: string;
  label: string;
  entries: TopicEntry[];
};

export function buildTopicSubgroups(subject: string, entries: TopicEntry[]): TopicSubgroup[] {
  const rules = RULES[subject];
  if (!rules) {
    return [{ id: "all", label: "All topics", entries }];
  }

  const buckets = new Map<string, TopicEntry[]>();
  for (const rule of rules) {
    buckets.set(rule.id, []);
  }

  for (const entry of entries) {
    const id = matchSubgroup(subject, entry.topic);
    const bucket = buckets.get(id) ?? buckets.get(rules[rules.length - 1].id)!;
    bucket.push(entry);
  }

  return rules
    .filter((r) => (buckets.get(r.id)?.length ?? 0) > 0)
    .map((r) => ({
      id: r.id,
      label: r.label,
      entries: buckets.get(r.id)!,
    }));
}

export function labelForSubgroup(subject: string, subgroupId: string): string {
  const rules = RULES[subject];
  return rules?.find((r) => r.id === subgroupId)?.label ?? subgroupId;
}
