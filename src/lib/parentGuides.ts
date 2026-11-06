import type { TopicGuide } from "../types";

type Rule = {
  test: (topic: string, subject: string) => boolean;
  guide: TopicGuide | ((topic: string) => TopicGuide);
};

const rules: Rule[] = [
  {
    test: (t) => /sandpaper (letter|tracing|figure)/i.test(t),
    guide: (topic) => ({
      summary:
        "Sandpaper letters and numerals let children feel the shape with their fingertips before they write. Muscle memory starts in the hand, not on paper.",
      atSchool:
        "The guide shows how to trace using two fingers, says the sound (for letters) or name (for numbers), and repeats slowly. Your child works at their own pace on a small mat.",
      atHome: [
        "Draw a large letter or number in the air together while saying its sound.",
        "Use rice or sand in a tray for finger tracing—no pencil required.",
        "Notice which shapes your child traces confidently versus which need more practice.",
      ],
      watchFor:
        topic.match(/\(([^)]+)\)/)?.[1] ??
        "Correct stroke direction matters more than speed.",
    }),
  },
  {
    test: (t) => /object box/i.test(t),
    guide: {
      summary:
        "The object box connects real objects to the first or last sound in a word—the foundation of reading without memorizing whole words.",
      atSchool:
        "Children pick miniature objects, hear a word, and isolate the beginning or ending sound. It is always spoken first; writing comes much later.",
      atHome: [
        'Play “I spy something that starts with /s/” during daily routines.',
        "Group small toys by starting sound in three piles—make it a sorting game.",
        "Say the word slowly and clap the first or last sound together.",
      ],
      watchFor: "Praise listening and speaking; avoid pushing spelling at this stage.",
    },
  },
  {
    test: (t) => /phonic|a-z with sounds|alphabet.*sounds/i.test(t),
    guide: {
      summary:
        "Phonics here means pure letter sounds (/a/ as in apple), not letter names (ay). That difference unlocks blending later.",
      atSchool:
        "Songs, flash cards, and games reinforce one sound per letter. The guide models short, clear sounds.",
      atHome: [
        "Sing the school phonic song together—consistency helps.",
        "When reading picture books, ask “What sound does that word start with?”",
        "Use letter sounds when labeling things at home (“this is a /b/ /a/ /t/”).",
      ],
      watchFor: "Letter names (bee, dee) are fine for songs, but reading drills use sounds.",
    },
  },
  {
    test: (t) => /rhymes and stories/i.test(t),
    guide: {
      summary:
        "Rhymes train ears for rhythm and similar sounds—skills that predict reading success. Stories build vocabulary and attention.",
      atSchool:
        "Circle time includes action rhymes, repeated lines, and short stories with pictures. Children may retell, act, or draw—not write yet.",
      atHome: [
        "Read the same favourite book several nights; repetition is intentional.",
        "Leave pauses in rhymes so your child fills in the last word.",
        "Ask “What happened first?” to build sequencing.",
      ],
      watchFor: "Enjoyment matters; forced recitation can reduce love of books.",
    },
  },
  {
    test: (t) => /oral counting/i.test(t),
    guide: (topic) => ({
      summary:
        "Counting aloud builds number order before symbols. “Linear” is 1-2-3 in order; “random” is answering “What comes after 7?”",
      atSchool:
        "Children count objects, clap, or walk steps while saying numbers. Sandpaper numerals connect the spoken word to the written shape.",
      atHome: [
        "Count snacks, stairs, or toys during daily life.",
        "Ask “How many?” and let your child touch each item once while counting.",
        "Play “What number comes before 5?” with numbers in the school range.",
      ],
      watchFor: topic.match(/\(([^)]+)\)/)?.[1] ?? "One-to-one touch while counting is the key habit.",
    }),
  },
  {
    test: (t) => /number rods|spindle box|shell counting|zero activity|chit game/i.test(t),
    guide: (topic) => ({
      summary:
        "Montessori math materials make quantity visible and touchable so numbers are not abstract symbols alone.",
      atSchool: `Lessons with ${topic.split("(")[0].trim()} link length or groups of objects to numerals and introduce zero as “nothing yet.”`,
      atHome: [
        "Line up blocks from shortest to longest and label 1, 2, 3…",
        "Use bowls and spoons to show “zero spoons in this empty bowl.”",
        "Match numeral cards to piles of buttons (up to the month’s range).",
      ],
      watchFor: "Let your child correct their own count by recounting—not by you fixing it quickly.",
    }),
  },
  {
    test: (t) => /pink tower|cylinder block|brown stairs|red rods|colour (tablet|box|cylinder)/i.test(t),
    guide: (topic) => ({
      summary:
        "Sensorial materials refine the senses and prepare the mind for math and language through size, colour, and texture discrimination.",
      atSchool: `With ${topic}, children grade, stack, or match from thickest to thinnest or darkest to lightest, often in silence to focus attention.`,
      atHome: [
        "Sort spoons by size or cups by colour at home.",
        "Use words like thicker, thinner, lighter, darker when playing.",
        "Build towers from blocks and compare heights without rushing.",
      ],
      watchFor: "Knocking down a tower is part of learning—patience is part of the lesson.",
    }),
  },
  {
    test: (t) => /geometrical|constructive triangles|binomial|trinomial|drawing insets/i.test(t),
    guide: (topic) => ({
      summary:
        "Geometry in M1 is hands-on: shapes are felt, combined, and named long before formal definitions.",
      atSchool: `${topic} activities train visual discrimination, fine motor control, and vocabulary for shapes.`,
      atHome: [
        "Hunt for circles, squares, and triangles around the house.",
        "Cut sandwiches into shapes and name them while eating.",
        "Trace shapes in cookie cutters or stencils.",
      ],
      watchFor: "Naming shapes in everyday language reinforces school work.",
    }),
  },
  {
    test: (t, s) => s.includes("EPL") || /mat activities|napkin|tong|peg|threading|lock and key|scissors|folding|transferring|walking on the line|table manners/i.test(t),
    guide: (topic) => ({
      summary:
        "EPL (Exercises of Practical Life) builds independence, focus, and respect for the environment—core Montessori work, not “extra activities.”",
      atSchool: `For “${topic}”, the guide demonstrates each step slowly: carry, use, clean up, and restore the material for the next person.`,
      atHome: [
        "Give one real task: pour water, wipe a table, or fold a small cloth.",
        "Model slow movements; avoid doing it faster for them.",
        "Use phrases like “May I help you?” mirroring classroom courtesy.",
      ],
      watchFor: "Spills and mistakes are expected—cleanup is part of the activity.",
    }),
  },
  {
    test: (t) => /good touch and bad touch/i.test(t),
    guide: {
      summary:
        "Body-safety vocabulary helps children name uncomfortable situations and tell a trusted adult—taught calmly, without fear.",
      atSchool:
        "Teachers use age-appropriate language, role-play saying no, and list safe adults. It aligns with personal safety, not alarm.",
      atHome: [
        "Use proper body-part names in bath or doctor contexts.",
        "Practice “No, stop—I don’t like that” in a playful voice.",
        "Rehearse who they can tell (you, teacher, grandparent).",
      ],
      watchFor: "Follow your school’s wording so messages stay consistent.",
    },
  },
  {
    test: (t) => /animals|hen|globe|continent|national|flowers|germination|tree|fruit|vegetable/i.test(t),
    guide: (topic) => ({
      summary:
        "EVS in M1 connects the child to living things, places, and their own body—always through observation and language.",
      atSchool: `Topics like “${topic}” use models, pictures, stories, and sometimes planting or sorting real objects.`,
      atHome: [
        "Visit a park or market and name what you see.",
        "Draw or photograph one plant or animal and label parts together.",
        "Link speaking topics (e.g. favourite fruit) to dinner conversations.",
      ],
      watchFor: "Curiosity questions (“Why do birds have wings?”) are success signs.",
    }),
  },
  {
    test: (t) => /myself|family|home|school|body/i.test(t),
    guide: (topic) => ({
      summary:
        "Self and family topics build identity, vocabulary, and emotional security—the base for all later learning.",
      atSchool: `Children share photos, name roles in the family, and label body parts with correct, respectful terms.`,
      atHome: [
        "Look at family photos and name relationships.",
        "Play “Point to your elbow / knee” during dress-up.",
        "Let your child “give a tour” of your home like they do at school.",
      ],
      watchFor: topic.includes("family") ? "Include who picks them up in “my people” talks." : "Keep answers short and cheerful.",
    }),
  },
  {
    test: (_t, s) => s.includes("Speaking"),
    guide: (topic) => ({
      summary:
        "Speaking skills are short show-and-tell style topics: one idea, simple sentences, and listening to friends.",
      atSchool: `Your child may bring a photo or object related to “${topic}” and speak a few practiced lines in front of the class.`,
      atHome: [
        "Practice three sentences at the dinner table—not a long speech.",
        "Ask one question after another child’s topic to build listening.",
        "Record a short video for fun—not for perfection.",
      ],
      watchFor: "Applause and patience from you reduce stage fear more than drilling words.",
    }),
  },
  {
    test: (t) => /montessori environment|montessori material|things found|name the things/i.test(t),
    guide: {
      summary:
        "Learning classroom names and routines helps your child feel safe and independent from day one.",
      atSchool:
        "Children walk the room, name materials, and learn where to work, eat, and wash hands—always returning things to their place.",
      atHome: [
        "Ask “What did you use on the shelf today?” after school.",
        "Create a small shelf at home with a few items always in the same spot.",
        "Use “work mat” language for play space on the floor.",
      ],
      watchFor: "Knowing names builds confidence to choose work without waiting to be told.",
    },
  },
  {
    test: (t) => /opposites|classification|association|patterns|writing: pattern/i.test(t),
    guide: (topic) => ({
      summary:
        "These language activities sort ideas into groups—big/small, hot/cold—preparing the logical mind for reading and writing.",
      atSchool: `With “${topic}”, children match cards, objects, or sounds and explain their choice in one sentence.`,
      atHome: [
        "Sort laundry by colour or size.",
        "Play opposite gestures (arms wide vs narrow).",
        "Draw patterns with crayons—zigzag, circle, line—without worrying about letters yet.",
      ],
      watchFor: "Ask “Why does this go here?” to hear their reasoning.",
    }),
  },
  {
    test: (t) => /five magical words|greet|sneeze|cough|silence activity/i.test(t),
    guide: {
      summary:
        "Grace and courtesy lessons teach social skills as deliberately as math—through practice, not lectures.",
      atSchool:
        "Children role-play greetings, thank you / please / sorry, and covering a cough. Silence games train listening.",
      atHome: [
        "Greet visitors together; let your child say hello first when comfortable.",
        "Notice when they use please/thank you without prompting.",
        "Play a 30-second “quiet listening” game for sounds in the room.",
      ],
      watchFor: "Model the behaviour; correcting in front of others can embarrass.",
    },
  },
];

function revisionGuide(topic: string, subject: string): TopicGuide {
  return {
    summary:
      "Revision months spiral back to earlier work so skills become automatic—not forgotten after one lesson.",
    atSchool: `Teachers re-present “${topic}” so your child can show mastery, fix small gaps, and move to the next step in ${subject}.`,
    atHome: [
      "Ask your child to teach you the activity—they learn deeply when explaining.",
      "Keep sessions short (5–10 minutes); daily beats long cramming.",
      "Celebrate what they remember before adding anything new.",
    ],
    watchFor: "Struggling on revision may mean they need more sensorial play, not more worksheets.",
  };
}

function introductionGuide(topic: string, subject: string): TopicGuide {
  return {
    summary:
      "This is new work for the month. Montessori introduces one manageable piece at a time before combining skills.",
    atSchool: `The guide gives a first lesson on “${topic}” with minimal talking and maximum demonstration. Your child may repeat it many days in a row.`,
    atHome: [
      "Ask what material they used—not what grade they got.",
      "Offer related real-life experiences (counting, sorting, naming) without duplicating the exact lesson.",
      "Protect concentration: one interruption-free stretch when they choose to “work.”",
    ],
    watchFor: `New ${subject} topics need rest and repetition; weekend drilling is less helpful than calm routine.`,
  };
}

export function getTopicGuide(
  topic: string,
  subject: string,
  phase: string,
): TopicGuide {
  const cleaned = topic.replace(/^Mat activities$/i, "").trim();
  if (!cleaned) {
    return {
      summary: "Section header in the school plan—see the specific activities listed below.",
      atSchool: "Your class works through these practical life routines in order.",
      atHome: ["Ask which of these your child practiced today."],
      watchFor: "",
    };
  }

  for (const rule of rules) {
    if (rule.test(cleaned, subject)) {
      const g = rule.guide;
      return typeof g === "function" ? g(cleaned) : g;
    }
  }

  if (phase === "revision") return revisionGuide(cleaned, subject);
  return introductionGuide(cleaned, subject);
}

import { normalizeTopic } from "./topicContent/normalize";

export function topicKey(subject: string, topic: string): string {
  return `${subject.toLowerCase()}|${normalizeTopic(topic)}`;
}
