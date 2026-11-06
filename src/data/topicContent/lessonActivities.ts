import type { EplActivity } from "./eplActivities";

const photo = (slug: string) => `/content/lessons/${slug}.webp`;

/** Classroom lessons outside EPL. Order matters: specific patterns first. */
export const lessonActivities: EplActivity[] = [
  {
    match: /pink tower/i,
    photo: photo("pink-tower"),
    caption: "Building the pink tower, largest cube at the bottom",
    steps: [
      "Carry one cube at a time to the mat, holding it with both hands.",
      "Place the biggest cube first, then the next biggest on top.",
      "Keep going until the smallest cube sits on top.",
      "Take it apart from the top and return each cube to the shelf.",
    ],
  },
  {
    match: /brown stair/i,
    photo: photo("brown-stairs"),
    caption: "Arranging the brown stair from thickest to thinnest",
    steps: [
      "Carry each prism to the mat with both hands.",
      "Find the thickest prism and lay it down first.",
      "Place the next thickest beside it, edges lined up.",
      "Run a hand down the 'steps' to check the order.",
    ],
  },
  {
    match: /red rods/i,
    photo: photo("red-rods"),
    caption: "Laying the red rods from longest to shortest",
    steps: [
      "Carry each rod holding both ends, walking slowly.",
      "Lay the longest rod on the mat first.",
      "Place each next-longest rod below, left ends lined up.",
      "Run a finger along the ends to see the 'staircase'.",
    ],
  },
  {
    match: /cylinder block/i,
    photo: photo("cylinder-blocks"),
    caption: "Lifting a cylinder by its knob with three fingers",
    steps: [
      "Hold the knob with thumb, first and middle finger.",
      "Lift each cylinder straight up and place it in front of its hole.",
      "Mix them, then fit each cylinder back into the hole that matches.",
      "Only one cylinder fits each hole — the material shows the mistake.",
    ],
  },
  {
    match: /colou?red cylinder|colou?r cylinder/i,
    photo: photo("knobless-cylinders"),
    caption: "Knobless coloured cylinders — red, yellow, green and blue sets",
    steps: [
      "Take out one colour box and tip the cylinders gently onto the mat.",
      "Build a tower from biggest to smallest.",
      "Try lining them up from tallest to shortest.",
      "Put them back in the box and return it to the shelf.",
    ],
  },
  {
    match: /colou?r (tablets )?box ?-? ?1|tablets box-1/i,
    photo: photo("colour-box-1"),
    caption: "Colour box 1 — pairs of red, yellow and blue tablets",
    steps: [
      "Hold tablets only by the white edges, never on the colour.",
      "Lay all six tablets out on the table.",
      "Pick one and find its matching partner; place them side by side.",
      "Name each colour: red, yellow, blue.",
    ],
  },
  {
    match: /colou?r (tablets )?box ?-? ?2|tablets box-2/i,
    photo: photo("colour-box-2"),
    caption: "Colour box 2 — eleven pairs of colour tablets matched",
    steps: [
      "Lay out the tablets in a mixed group.",
      "Match each colour with its partner in two rows.",
      "Name each colour as it is matched.",
      "Memory game: look at a colour, walk across the room, and bring back its pair.",
    ],
  },
  {
    match: /touch board/i,
    photo: photo("touch-boards"),
    caption: "Feeling rough and smooth strips with fingertips",
    steps: [
      "Wash and dry hands so fingertips are sensitive.",
      "Stroke the board lightly from top to bottom with two fingers.",
      "Say 'rough' on the sandpaper and 'smooth' on the plain wood.",
      "Try with eyes closed.",
    ],
  },
  {
    match: /gustatory/i,
    photo: photo("gustatory"),
    caption: "Tasting sweet, salty, sour and bitter with a dropper",
    steps: [
      "Teacher puts one drop of a taste on a clean spoon.",
      "Child tastes and names it: sweet, salty, sour or bitter.",
      "Sip water between tastes.",
      "Match two bottles that taste the same.",
    ],
  },
  {
    match: /geometrical cards|geometric cards/i,
    photo: photo("geometric-cards"),
    caption: "Matching wooden shapes to filled, thick-line and thin-line cards",
    steps: [
      "Lay out a few cards from the first (filled) set.",
      "Place each wooden shape on its matching picture.",
      "Next time use the thick outline cards, then thin outlines.",
      "Name each shape: circle, square, triangle.",
    ],
  },
  {
    match: /geometrical cabinet/i,
    photo: photo("geometric-cabinet"),
    caption: "Lifting a blue shape out of the geometric cabinet tray",
    steps: [
      "Lift each shape out by its small knob.",
      "Trace the edge of the shape with two fingers.",
      "Trace the edge of the empty frame too.",
      "Put the shape back and name it.",
    ],
  },
  {
    match: /drawing inset/i,
    photo: photo("drawing-insets"),
    caption: "Tracing around a metal inset with a coloured pencil",
    steps: [
      "Place the pink frame on the paper and hold it still.",
      "Trace inside the frame with a coloured pencil.",
      "Lift the frame; a shape outline is left on the paper.",
      "Fill it with slow, careful lines — this builds pencil control for writing.",
    ],
  },
  {
    match: /constructive triangle/i,
    photo: photo("constructive-triangles"),
    caption: "Joining coloured triangles along the black lines to make new shapes",
    steps: [
      "Take the triangles out of the box.",
      "Find two with black lines on the same edge.",
      "Slide them together so the lines meet.",
      "See which new shape appears: square, rectangle or bigger triangle.",
    ],
  },
  {
    match: /binomial|binominal/i,
    photo: photo("binomial-cube"),
    caption: "Binomial cube — blocks fit back into the box like a 3-D puzzle",
    steps: [
      "Open the box and take out the blocks one layer at a time.",
      "Lay them out in the same pattern as they came out.",
      "Use the painted lid as a guide for colours.",
      "Build the cube again inside the box.",
    ],
  },
  {
    match: /trinomial/i,
    photo: photo("trinomial-cube"),
    caption: "Trinomial cube — 27 blocks built back into a cube",
    steps: [
      "Take out the top layer and lay it out, then the next layer.",
      "Match blocks by colour and size.",
      "Rebuild layer by layer using the lid as a guide.",
      "Close the box when finished.",
    ],
  },
  {
    match: /dimensional material/i,
    photo: photo("pink-tower"),
    caption: "Pink tower — one of the size (dimensional) materials",
    steps: [
      "Dimensional materials show big and small, long and short, thick and thin.",
      "Pink tower: big to small. Brown stair: thick to thin. Red rods: long to short.",
      "Children carry, arrange and compare the pieces.",
      "At home, compare spoons, shoes or books by size.",
    ],
  },
  {
    match: /number rods/i,
    photo: photo("number-rods"),
    caption: "Counting the red and blue segments of the number rods",
    steps: [
      "Lay rods from shortest (1) to longest (10).",
      "Touch each segment and count: one, two, three…",
      "Say the last number — that is the rod's name.",
      "Place the matching number card next to each rod.",
    ],
  },
  {
    match: /spindle box|zero activity/i,
    photo: photo("spindle-box"),
    caption: "Placing spindles into the 0–9 compartments — zero stays empty",
    steps: [
      "Read the number on each compartment.",
      "Count that many spindles and place them in.",
      "Zero gets nothing — it means 'none'.",
      "Count again to check.",
    ],
  },
  {
    match: /shell counting|association pictures with numerals/i,
    photo: photo("shell-counting"),
    caption: "Placing the right number of shells next to each numeral",
    steps: [
      "Lay number cards 1 to 5 in a row.",
      "Read a card and count out that many shells.",
      "Put the shells under the card.",
      "Recount to check.",
    ],
  },
  {
    match: /chit game/i,
    photo: photo("cards-counters"),
    caption: "Numerals with matching counters laid underneath",
    steps: [
      "Child picks a folded chit with a number on it.",
      "Reads the number quietly.",
      "Fetches that many objects from across the room.",
      "Teacher and child count them together.",
    ],
  },
  {
    match: /oral counting/i,
    photo: photo("oral-counting"),
    caption: "Counting aloud on fingers and beads",
    steps: [
      "Say the numbers together in order.",
      "Touch one object for each number.",
      "Try random order: 'Show me 4!'",
      "Count stairs, spoons or toys at home.",
    ],
  },
  {
    match: /object box|phonetic analysis/i,
    photo: photo("object-box"),
    caption: "Small objects in a box, matched to their sounds",
    steps: [
      "Take out one small object and name it.",
      "Say the first (or last) sound slowly: 'c-c-cup'.",
      "Find the sandpaper letter that makes that sound.",
      "Play 'I spy something that starts with…' at home.",
    ],
  },
  {
    match: /classification/i,
    photo: photo("classification"),
    caption: "Sorting picture cards into fruits, animals and vehicles",
    steps: [
      "Lay out mixed picture cards.",
      "Name each picture.",
      "Put cards that belong together in one row.",
      "Say why: 'These are all fruits'.",
    ],
  },
  {
    match: /association of (pictures|sounds)/i,
    photo: photo("object-box"),
    caption: "Matching objects and pictures to the letter sound they start with",
    steps: [
      "Show a sandpaper letter and say its sound.",
      "Find pictures that begin with that sound.",
      "Place them beside the letter.",
      "Add one more from around the room.",
    ],
  },
  {
    match: /pattern book|drawing patterns/i,
    photo: photo("patterns"),
    caption: "Drawing zig-zags, waves, loops and standing lines",
    steps: [
      "Hold the crayon with a tripod grip.",
      "Draw left to right along the dotted line.",
      "Start big and slow, then smaller.",
      "These strokes prepare the hand for letters.",
    ],
  },
  {
    match: /parts of a book/i,
    photo: photo("parts-of-book"),
    caption: "Looking at the cover, spine and pages of a picture book",
    steps: [
      "Front cover: picture and title.",
      "Spine: the back edge that holds pages together.",
      "Pages: turn one at a time, left to right.",
      "Back cover: where the book ends.",
    ],
  },
  {
    match: /care of a book/i,
    photo: photo("book-care"),
    caption: "Turning a page gently from the top corner with clean hands",
    steps: [
      "Wash and dry hands first.",
      "Keep the book flat on a table.",
      "Turn pages from the top corner, slowly.",
      "Use a bookmark — never fold pages — and put it back on the shelf.",
    ],
  },
  {
    match: /good touch/i,
    photo: photo("safe-touch"),
    caption: "A safe, loving hug from a parent",
    steps: [
      "Good touch feels safe — a hug you want from family.",
      "Bad touch feels wrong or scary; private parts are private.",
      "Say 'No!', move away, and tell a trusted adult.",
      "No secrets about touch — the child is never in trouble for telling.",
    ],
  },
  {
    match: /globe|continent|world map/i,
    photo: photo("globe"),
    caption: "Feeling the rough land on the sandpaper globe; puzzle map beside",
    steps: [
      "Touch the rough parts — that is land.",
      "Touch the smooth blue — that is water.",
      "Look at the puzzle map: each continent has its own colour.",
      "Find India on a globe or map together.",
    ],
  },
];

export function findLessonActivity(topic: string): EplActivity | undefined {
  return lessonActivities.find((a) => a.match.test(topic));
}

export const speakingActivity: EplActivity = {
  match: /.*/,
  photo: photo("speaking"),
  caption: "Speaking to friends during circle time",
  steps: [
    "Stand up straight and look at friends.",
    "Say a greeting: 'Good morning, friends.'",
    "Say two or three sentences about the topic.",
    "End with 'Thank you'; friends clap.",
  ],
};
