import type { ItemCard } from "../../lib/topicContent/types";
import { publicAsset } from "../../lib/publicAsset";

const item = (slug: string) => publicAsset(`content/items/${slug}.webp`);
const lesson = (slug: string) => publicAsset(`content/lessons/${slug}.webp`);
const epl = (slug: string) => publicAsset(`content/epl/${slug}.webp`);

export const montessoriEnvironmentItems: ItemCard[] = [
  { photo: epl("rolling-mat"), name: "Work mat / rug", detail: "Child rolls it out before any table or floor work." },
  { photo: item("env-shelves"), name: "Low open shelves", detail: "Materials face forward; child chooses work." },
  { photo: item("env-table"), name: "Child-sized table & chair", detail: "Furniture they can move and sit at alone." },
  { photo: epl("wash-hands"), name: "Hand-washing area", detail: "Soap, towel, mirror — care of self." },
  { photo: lesson("pink-tower"), name: "Pink tower", detail: "Ten pink cubes; biggest to smallest." },
  { photo: lesson("number-rods"), name: "Number rods", detail: "Red and blue rods; length shows quantity." },
  { photo: lesson("sandpaper-letters"), name: "Sandpaper letters", detail: "Rough letters; trace with two fingers + sound." },
  { photo: epl("transfer-liquid"), name: "Pouring activity", detail: "Jug, glass, tray — practical life." },
  { photo: item("env-nature"), name: "Plant & nature tray", detail: "A plant or nature objects on a shelf." },
  { photo: item("env-books"), name: "Book corner", detail: "Picture books at child height." },
  { photo: item("env-peace"), name: "Peace / quiet spot", detail: "A calm place to rest or resolve conflicts." },
  { photo: item("env-shoes"), name: "Shoe / bag area", detail: "Where they hang bag and change shoes." },
];

export const montessoriMaterialItems: ItemCard[] = [
  { photo: lesson("pink-tower"), name: "Pink tower", detail: "Visual size grading — 10 cubes." },
  { photo: lesson("brown-stairs"), name: "Brown stairs", detail: "Prisms — thick to thin." },
  { photo: lesson("red-rods"), name: "Red rods", detail: "Long to short; introduces length." },
  { photo: lesson("cylinder-blocks"), name: "Cylinder blocks", detail: "Knobbed cylinders in a wooden block." },
  { photo: lesson("colour-box-2"), name: "Colour tablets", detail: "Match and grade shades of colour." },
  { photo: lesson("sandpaper-letters"), name: "Sandpaper letters", detail: "Lowercase; one sound per letter." },
  { photo: lesson("sandpaper-numerals"), name: "Sandpaper numerals", detail: "Feel the shape of 0–9." },
  { photo: lesson("number-rods"), name: "Number rods", detail: "Count segments; link number to length." },
  { photo: lesson("spindle-box"), name: "Spindle box", detail: "Loose spindles for counting groups." },
  { photo: lesson("geometric-cabinet"), name: "Geometric cabinet", detail: "Inset shapes to trace and name." },
];

export const bodyPartItems: ItemCard[] = [
  { photo: item("body-head"), name: "Head", detail: "Hair, face, brain protected inside." },
  { photo: item("body-eyes"), name: "Eyes", detail: "See; blink; look at books." },
  { photo: item("body-ears"), name: "Ears", detail: "Hear sounds and instructions." },
  { photo: item("body-nose"), name: "Nose", detail: "Smell; breathe." },
  { photo: item("body-mouth"), name: "Mouth", detail: "Talk, eat, smile." },
  { photo: item("body-chest"), name: "Chest", detail: "Heart and lungs inside." },
  { photo: item("body-hands"), name: "Hands & fingers", detail: "Hold, write, touch materials." },
  { photo: item("body-legs"), name: "Legs & feet", detail: "Walk, run, balance." },
];

export const familyItems: ItemCard[] = [
  { photo: item("family-me"), name: "Me", detail: "My name, my age, my likes." },
  { photo: item("family-mother"), name: "Mother / parent", detail: "Cares for me every day." },
  { photo: item("family-father"), name: "Father / parent", detail: "Loves and keeps me safe." },
  { photo: item("family-grandparents"), name: "Grandparents", detail: "Extended family who visit or call." },
  { photo: item("family-siblings"), name: "Siblings", detail: "Brother or sister if you have one." },
  { photo: item("family-home"), name: "My home", detail: "Where I sleep, eat, and play." },
];

export const roomItems: ItemCard[] = [
  { photo: item("room-bedroom"), name: "Bedroom", detail: "Where I sleep." },
  { photo: item("room-kitchen"), name: "Kitchen", detail: "Where food is cooked." },
  { photo: item("room-living"), name: "Living room", detail: "Where family sits together." },
  { photo: item("room-bathroom"), name: "Bathroom", detail: "Bath and toilet." },
];

export const rainbowColourItems: ItemCard[] = [
  { photo: item("colour-red"), name: "Red", detail: "Apple, rose, stop sign." },
  { photo: item("colour-orange"), name: "Orange", detail: "Orange fruit, carrot." },
  { photo: item("colour-yellow"), name: "Yellow", detail: "Sun, banana, lemon." },
  { photo: item("colour-green"), name: "Green", detail: "Leaves, grass, spinach." },
  { photo: item("colour-blue"), name: "Blue", detail: "Sky, water, jeans." },
  { photo: item("colour-violet"), name: "Indigo / violet", detail: "Grapes, brinjal." },
];

export const farmAnimalItems: ItemCard[] = [
  { photo: item("cow"), name: "Cow", detail: "Sound: moo. Baby: calf. Home: farm." },
  { photo: item("hen"), name: "Hen", detail: "Sound: cluck. Baby: chick. From egg." },
  { photo: item("dog"), name: "Dog", detail: "Sound: woof. Pet at home." },
  { photo: item("cat"), name: "Cat", detail: "Sound: meow. Pet at home." },
  { photo: item("sheep"), name: "Sheep", detail: "Sound: baa. Wool on farm." },
  { photo: item("goat"), name: "Goat", detail: "Sound: bleat. Farm animal." },
];

export const wildAnimalItems: ItemCard[] = [
  { photo: item("lion"), name: "Lion", detail: "Roars. Lives in forest / grassland." },
  { photo: item("elephant"), name: "Elephant", detail: "Trumpets. Large ears and trunk." },
  { photo: item("tiger"), name: "Tiger", detail: "Stripes. Wild cat." },
  { photo: item("monkey"), name: "Monkey", detail: "Swings in trees." },
  { photo: item("deer"), name: "Deer", detail: "Runs in forests." },
];

export const waterSkyItems: ItemCard[] = [
  { photo: item("fish"), name: "Fish", detail: "Swims in water. Breathes with gills." },
  { photo: item("frog"), name: "Frog", detail: "Ribbit. Pond and water edge." },
  { photo: item("bird"), name: "Bird", detail: "Tweet. Nest in trees." },
  { photo: item("butterfly"), name: "Butterfly", detail: "Starts as caterpillar." },
  { photo: item("turtle"), name: "Turtle", detail: "Slow; shell; often near water." },
];

export const henLifeCycleItems: ItemCard[] = [
  { photo: item("egg"), name: "1. Egg", detail: "The hen lays an egg." },
  { photo: item("hen-eggs"), name: "2. Hen sits on eggs", detail: "She keeps them warm for about 21 days." },
  { photo: item("hatching"), name: "3. Hatching", detail: "The chick breaks the shell with its beak." },
  { photo: item("chick"), name: "4. Chick", detail: "Small, fluffy and yellow." },
  { photo: item("young-hen"), name: "5. Young hen", detail: "Feathers grow; it gets bigger." },
  { photo: item("hen"), name: "6. Hen", detail: "Fully grown — she will lay eggs too." },
];

export const fruitItems: ItemCard[] = [
  { photo: item("apple"), name: "Apple", detail: "Red or green; crunchy." },
  { photo: item("banana"), name: "Banana", detail: "Yellow; peel before eating." },
  { photo: item("mango"), name: "Mango", detail: "Sweet; king of fruits in India." },
  { photo: item("grapes"), name: "Grapes", detail: "Small bunch; sweet or sour." },
  { photo: item("orange"), name: "Orange", detail: "Round; vitamin C." },
  { photo: item("watermelon"), name: "Watermelon", detail: "Big; red inside; summer fruit." },
];

export const vegetableItems: ItemCard[] = [
  { photo: item("carrot"), name: "Carrot", detail: "Orange root; good for eyes." },
  { photo: item("potato"), name: "Potato", detail: "Grows under soil." },
  { photo: item("tomato"), name: "Tomato", detail: "Red; used in curry and salad." },
  { photo: item("peas"), name: "Beans / peas", detail: "Green pods." },
  { photo: item("spinach"), name: "Spinach / greens", detail: "Leafy vegetables." },
  { photo: item("onion"), name: "Onion", detail: "Layered; used in cooking." },
];

export const plantItems: ItemCard[] = [
  { photo: item("seed"), name: "Seed", detail: "Plant in soil with water." },
  { photo: item("sprout"), name: "Sprout", detail: "Germination — first green shoot." },
  { photo: item("stem"), name: "Stem", detail: "Holds plant up; carries water." },
  { photo: item("leaf"), name: "Leaf", detail: "Makes food from sunlight." },
  { photo: item("rose"), name: "Flower", detail: "Petals; often smells sweet." },
  { photo: item("tree"), name: "Tree", detail: "Trunk, branches, roots deep in soil." },
];

export const flowerItems: ItemCard[] = [
  { photo: item("rose"), name: "Rose", detail: "Red or pink; thorns on the stem." },
  { photo: item("lotus"), name: "Lotus", detail: "National flower; grows in ponds." },
  { photo: item("marigold"), name: "Marigold", detail: "Orange; used in garlands." },
  { photo: item("sunflower"), name: "Sunflower", detail: "Big and yellow; turns to the sun." },
  { photo: item("jasmine"), name: "Jasmine", detail: "Small, white, sweet smell." },
];

export const shapeItems: ItemCard[] = [
  { photo: item("shape-circle"), name: "Circle", detail: "Wheel, coin, plate." },
  { photo: item("shape-square"), name: "Square", detail: "Window tile, napkin." },
  { photo: item("shape-triangle"), name: "Triangle", detail: "Sandwich cut, roof shape." },
  { photo: item("shape-rectangle"), name: "Rectangle", detail: "Door, book, phone." },
];

export const nationalSymbolItems: ItemCard[] = [
  { photo: item("india-flag"), name: "National flag", detail: "Saffron, white, green; Ashoka Chakra." },
  { photo: item("national-emblem"), name: "National emblem", detail: "Lions from the Ashoka pillar (sculpture)." },
  { photo: item("national-anthem"), name: "National anthem", detail: "Jana Gana Mana — stand quietly." },
  { photo: item("tiger"), name: "National animal", detail: "Tiger." },
  { photo: item("peacock"), name: "National bird", detail: "Peacock." },
  { photo: item("lotus"), name: "National flower", detail: "Lotus." },
];

export const nationalLeaderItems: ItemCard[] = [
  { photo: item("leader-gandhi"), name: "Mahatma Gandhi", detail: "Father of the Nation; truth and non-violence." },
  { photo: item("leader-nehru"), name: "Jawaharlal Nehru", detail: "First Prime Minister; Children's Day is his birthday." },
  { photo: item("leader-ambedkar"), name: "Dr. B. R. Ambedkar", detail: "Wrote India's Constitution." },
  { photo: item("leader-bose"), name: "Subhas Chandra Bose", detail: "Netaji; brave freedom fighter." },
];

export const globeItems: ItemCard[] = [
  { photo: item("globe"), name: "Globe", detail: "Model of Earth — round like a ball." },
  { photo: item("ocean"), name: "Water (blue)", detail: "Oceans cover most of Earth." },
  { photo: item("land"), name: "Land (brown/green)", detail: "Continents where we live." },
  { photo: item("world-map"), name: "World map", detail: "Flat picture of the Earth." },
];

export const phonicsObjectItems: ItemCard[] = [
  { photo: item("sun"), name: "sun", detail: "First sound: /s/" },
  { photo: item("cat"), name: "cat", detail: "First /k/, last /t/" },
  { photo: item("map"), name: "map", detail: "First sound: /m/" },
  { photo: item("dog"), name: "dog", detail: "First sound: /d/" },
  { photo: item("egg"), name: "egg", detail: "First sound: /e/" },
];

export const oppositeItems: ItemCard[] = [
  { photo: item("opp-big-small"), name: "Big — small", detail: "A big ball and a small ball." },
  { photo: item("opp-tall-short"), name: "Tall — short", detail: "A tall tower and a short tower." },
  { photo: item("opp-hot-cold"), name: "Hot — cold", detail: "Hot tea and cold ice water." },
  { photo: item("opp-full-empty"), name: "Full — empty", detail: "A full glass and an empty glass." },
];

export const sensorialMaterialMap: Record<string, ItemCard> = {
  "pink tower": montessoriMaterialItems[0],
  "brown stairs": montessoriMaterialItems[1],
  "red rods": montessoriMaterialItems[2],
  "cylinder block": montessoriMaterialItems[3],
  "touch boards": { photo: lesson("touch-boards"), name: "Touch boards", detail: "Rough vs smooth panels." },
  "geometrical cabinet": montessoriMaterialItems[9],
  "constructive triangles": { photo: lesson("constructive-triangles"), name: "Constructive triangles", detail: "Triangles form other shapes." },
  "binomial": { photo: lesson("binomial-cube"), name: "Binomial cube", detail: "Puzzle cube; pattern of blocks." },
  "trinomial": { photo: lesson("trinomial-cube"), name: "Trinomial cube", detail: "More complex pattern cube." },
};
