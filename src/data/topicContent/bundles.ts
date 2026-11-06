import type { TopicRichContent } from "../../lib/topicContent/types";
import {
  bodyPartItems,
  farmAnimalItems,
  familyItems,
  fruitItems,
  montessoriEnvironmentItems,
  montessoriMaterialItems,
  nationalSymbolItems,
  phonicsObjectItems,
  rainbowColourItems,
  roomItems,
  vegetableItems,
  waterSkyItems,
  wildAnimalItems,
} from "./catalog";
import { classroomRhymes } from "./rhymes";

function pack(
  partial: Omit<TopicRichContent, "images" | "audios" | "rhymes" | "itemCards"> & {
    itemCards?: TopicRichContent["itemCards"];
    images?: TopicRichContent["images"];
    audios?: TopicRichContent["audios"];
    rhymes?: TopicRichContent["rhymes"];
  },
): TopicRichContent {
  return {
    itemCards: partial.itemCards ?? [],
    images: partial.images ?? [],
    audios: partial.audios ?? [],
    rhymes: partial.rhymes ?? [],
    title: partial.title,
    intro: partial.intro,
  };
}

export const exactBundles: Record<string, TopicRichContent> = {
  "things found in the montessori environment": pack({
    title: "Things in the Montessori environment",
    intro: "These are real places and materials in the classroom—not toys on a shelf at home. Ask your child to find each one on your next visit.",
    itemCards: montessoriEnvironmentItems,
    audios: [
      {
        label: "Name each area aloud",
        speakText:
          "Work mat. Shelves. Table and chair. Hand washing. Pink tower. Number rods. Sandpaper letters. Pouring work. Books. Peace corner. Shoe area.",
      },
    ],
  }),
  "name the things around us": pack({
    title: "Name the things around us",
    intro: "Same as classroom environment vocabulary.",
    itemCards: montessoriEnvironmentItems,
    audios: [
      { label: "Quick naming practice", speakText: "What do you see on the shelf? What is on the mat?" },
    ],
  }),
  "names of montessori material": pack({
    title: "Names of Montessori materials",
    intro: "Use the exact names below—children hear them in lessons every day.",
    itemCards: montessoriMaterialItems,
    audios: [
      {
        label: "Material names",
        speakText:
          "Pink tower. Brown stairs. Red rods. Cylinder blocks. Colour tablets. Sandpaper letters. Sandpaper numerals. Number rods. Spindle box. Geometric cabinet.",
      },
    ],
  }),
  "rhymes and stories": pack({
    title: "Rhymes and stories",
    intro: "Read the words below aloud together. Pause so your child can say the last word of each line.",
    itemCards: [],
    rhymes: classroomRhymes,
    audios: [],
  }),
  "rainbow colours": pack({
    title: "Rainbow colours",
    intro: "Point to each colour name and find something at home in that colour.",
    itemCards: rainbowColourItems,
    audios: [
      { label: "Colours in order", speakText: "Red. Orange. Yellow. Green. Blue. Indigo. Violet." },
    ],
  }),
  "parts of the body": pack({
    title: "Parts of the body",
    intro: "Name parts during bath time or while getting dressed.",
    itemCards: bodyPartItems,
    audios: [
      {
        label: "Head to toe",
        speakText: "Head, eyes, ears, nose, mouth, chest, hands, legs, feet.",
      },
    ],
  }),
  "myself": pack({
    title: "Myself",
    itemCards: [
      { photo: "/content/items/family-me.webp", name: "My name", detail: "Say your full name clearly." },
      { photo: "/content/items/my-age.webp", name: "My age", detail: "How old am I?" },
      { photo: "/content/items/my-feelings.webp", name: "My feelings", detail: "Happy, sad, angry, excited." },
      ...bodyPartItems.slice(0, 4),
    ],
    audios: [{ label: "About me", speakText: "I am special. This is my body. I can say my name and age." }],
  }),
  "my family": pack({
    title: "My family",
    itemCards: familyItems,
    audios: [{ label: "Family talk", speakText: "This is my family. We love and help each other." }],
  }),
  "myself and my family": pack({
    title: "Myself and my family",
    itemCards: [...familyItems, { photo: "/content/items/env-shelves.webp", name: "My school", detail: "Teachers and friends there." }],
    audios: [{ label: "Family + school", speakText: "My family at home. My teachers and friends at school." }],
  }),
  "my happy family": pack({
    title: "My happy family",
    itemCards: familyItems,
    audios: [{ label: "Speaking practice", speakText: "My happy family. We eat together. We play together." }],
  }),
  "my home": pack({
    title: "My home",
    itemCards: roomItems,
    audios: [{ label: "Rooms at home", speakText: "This is my home. Bedroom, kitchen, living room, bathroom." }],
  }),
  "my school": pack({
    title: "My school",
    itemCards: montessoriEnvironmentItems.slice(0, 8),
    audios: [{ label: "At school", speakText: "My school has shelves, mats, and kind teachers." }],
  }),
  "animals (names, sounds, homes and young ones)": pack({
    title: "Animals",
    intro: "For each animal: name → sound → home → baby name.",
    itemCards: [...farmAnimalItems, ...wildAnimalItems, ...waterSkyItems],
    audios: farmAnimalItems.slice(0, 4).map((a) => ({
      label: a.name,
      speakText: `${a.name}. ${a.detail}`,
    })),
  }),
  "domestic animals (pet and farm animals)": pack({
    title: "Domestic animals",
    itemCards: farmAnimalItems,
    audios: farmAnimalItems.map((a) => ({ label: a.name, speakText: a.detail })),
  }),
  "wild animals": pack({
    title: "Wild animals",
    itemCards: wildAnimalItems,
    audios: wildAnimalItems.map((a) => ({ label: a.name, speakText: a.detail })),
  }),
  "aquatic animals": pack({
    title: "Aquatic animals",
    itemCards: waterSkyItems.filter((i) => /fish|frog|turtle/i.test(i.name)),
    audios: [{ label: "Fish", speakText: "Fish live in water. They use gills to breathe." }],
  }),
  "insects and birds": pack({
    title: "Insects and birds",
    itemCards: waterSkyItems.filter((i) => /bird|butterfly/i.test(i.name)),
    audios: [{ label: "Bird", speakText: "Birds have wings and feathers. Many build nests." }],
  }),
  "animals, birds and insects": pack({
    title: "Animals, birds and insects",
    itemCards: [...farmAnimalItems.slice(0, 4), ...wildAnimalItems.slice(0, 3), ...waterSkyItems],
    audios: [{ label: "Sounds walk", speakText: "Cow moo. Bird tweet. Lion roar." }],
  }),
  "fruits": pack({ title: "Fruits", itemCards: fruitItems, audios: [{ label: "Fruit names", speakText: fruitItems.map((f) => f.name).join(". ") }] }),
  "vegetables": pack({ title: "Vegetables", itemCards: vegetableItems, audios: [{ label: "Vegetable names", speakText: vegetableItems.map((v) => v.name).join(". ") }] }),
  "our national flag": pack({
    title: "National flag",
    itemCards: nationalSymbolItems,
    audios: [
      {
        label: "About the flag",
        speakText: "Saffron on top, white in the middle, green at the bottom. Blue wheel in the centre.",
      },
    ],
  }),
  "good touch and bad touch": pack({
    title: "Good touch and bad touch",
    itemCards: [],
    audios: [
      {
        label: "Safety words",
        speakText: "Your body belongs to you. Say no. Go tell a trusted adult. No secrets about touch.",
      },
    ],
  }),
  "pink tower": pack({
    title: "Pink tower",
    itemCards: [montessoriMaterialItems[0]],
    audios: [{ label: "How to build", speakText: "Carry one cube at a time. Largest on the bottom." }],
  }),
  "cylinder block": pack({
    title: "Cylinder block",
    itemCards: [montessoriMaterialItems[3]],
    audios: [{ label: "Knob grip", speakText: "Hold the knob with three fingers. Lift straight up." }],
  }),
  "brown stairs": pack({
    title: "Brown stairs",
    itemCards: [montessoriMaterialItems[1]],
    audios: [{ label: "Thick to thin", speakText: "Thickest prism first. Each one is a little thinner." }],
  }),
  "phonic song (a-z)": pack({
    title: "Phonic song A to Z",
    itemCards: "abcdefghijklmnopqrstuvwxyz".split("").map((l) => ({
      glyph: l,
      name: `Letter ${l.toUpperCase()}`,
      detail: `Letter ${l} — say its sound, not its name in isolation.`,
    })),
    audios: [
      {
        label: "A–Z sounds (slow)",
        speakText:
          "a ah, b buh, c kuh, d duh, e eh, f fff, g guh, h huh, i ih, j juh, k kuh, l lll, m mmm, n nnn, o oh, p puh, q kwuh, r rrr, s sss, t tuh, u uh, v vvv, w wuh, x ks, y yuh, z zzz.",
      },
    ],
  }),
  "a-z with sounds": pack({
    title: "A–Z with sounds",
    itemCards: phonicsObjectItems,
    audios: [{ label: "Object sounds", speakText: "Sun starts with sss. Cat starts with kuh." }],
  }),
  "a-z with sounds and flash cards": pack({
    title: "A–Z with sounds and flash cards",
    itemCards: phonicsObjectItems,
    audios: [{ label: "Flash card game", speakText: "Show a card. Say the picture name. Say the first sound." }],
  }),
  "alphabet a-z sounds": pack({
    title: "Alphabet sounds",
    itemCards: phonicsObjectItems,
    audios: [{ label: "First sounds", speakText: "Mmm map. Sss sun. Dduh dog." }],
  }),
};
