export type EplActivity = {
  match: RegExp;
  photo: string;
  caption: string;
  steps: string[];
};

const photo = (slug: string) => `/content/epl/${slug}.webp`;

/** Order matters: more specific patterns come before general ones. */
export const eplActivities: EplActivity[] = [
  {
    match: /rolling and unrolling a mat|roll.*mat|^mat activities/i,
    photo: photo("rolling-mat"),
    caption: "Rolling up the work mat after finishing work",
    steps: [
      "Carry the rolled mat with both hands to an empty floor space.",
      "Place it down and unroll it slowly, pressing flat with both palms.",
      "When work is done, roll it tightly from one short end to the other.",
      "Carry it back upright and stand it in the mat basket.",
    ],
  },
  {
    match: /sit and get up from a mat/i,
    photo: photo("sit-on-mat"),
    caption: "Sitting on the edge of the mat with work in front",
    steps: [
      "Kneel down at the edge of the mat, not in the middle of someone else's.",
      "Sit cross-legged or kneel with a straight back.",
      "Keep the material on the mat, within reach.",
      "To get up, put hands on knees and rise slowly without stepping on the work.",
    ],
  },
  {
    match: /walk in between the mats/i,
    photo: photo("walk-between-mats"),
    caption: "Walking around other children's mats without stepping on them",
    steps: [
      "Look at the floor to see where the mats are.",
      "Walk slowly in the open spaces between them.",
      "Never step on or over a friend's mat or work.",
      "If the way is blocked, wait or go around.",
    ],
  },
  {
    match: /wash hands/i,
    photo: photo("wash-hands"),
    caption: "Washing hands with soap at a child-height sink",
    steps: [
      "Roll up sleeves and wet both hands.",
      "Take soap and rub palms, backs of hands and between fingers.",
      "Rinse until all the soap is gone and turn off the tap.",
      "Dry with your own towel and hang it back neatly.",
    ],
  },
  {
    match: /spreading of a napkin|spread.*napkin/i,
    photo: photo("spread-napkin"),
    caption: "Spreading a cloth napkin flat before snack time",
    steps: [
      "Hold the folded napkin with both hands.",
      "Open it out on the table in front of your chair.",
      "Smooth it flat with both palms, corners straight.",
      "Place the plate and cup on or beside the napkin.",
    ],
  },
  {
    match: /napkin/i,
    photo: photo("napkin-folding"),
    caption: "Folding a cloth napkin along the line",
    steps: [
      "Lay the napkin flat on the tray.",
      "Bring one edge over to meet the opposite edge.",
      "Press along the fold with the flat of the hand.",
      "Stack folded napkins neatly and return the tray.",
    ],
  },
  {
    match: /sorting beads/i,
    photo: photo("sorting-beads"),
    caption: "Sorting beads by colour into separate bowls",
    steps: [
      "Place the mixed bowl in the middle of the tray.",
      "Pick up one bead at a time with thumb and finger.",
      "Drop it into the bowl of the same colour.",
      "Finish all beads, then pour them back for the next child.",
    ],
  },
  {
    match: /tong/i,
    photo: photo("tongs"),
    caption: "Transferring pom-poms from one bowl to another with tongs",
    steps: [
      "Hold the tongs like a pencil grip and squeeze gently.",
      "Pick up one object from the full bowl.",
      "Move it over and release into the empty bowl.",
      "Repeat until finished; it builds the grip needed for writing.",
    ],
  },
  {
    match: /peg/i,
    photo: photo("pegs"),
    caption: "Clipping clothes pegs around the rim of a bowl",
    steps: [
      "Pinch the peg open with thumb and first finger.",
      "Slide it onto the rim and let it close.",
      "Fill the rim all the way around.",
      "Take them off one by one and return to the basket.",
    ],
  },
  {
    match: /puzzles? *[–-]? *colours and shapes/i,
    photo: photo("colour-shape-puzzle"),
    caption: "Fitting coloured shapes into matching holes",
    steps: [
      "Take out all the pieces and lay them beside the board.",
      "Name each shape and colour as you pick it up.",
      "Turn the piece until it drops into its hole.",
      "Check that every piece sits flat.",
    ],
  },
  {
    match: /puzzle/i,
    photo: photo("puzzles"),
    caption: "Wooden knob puzzle on a small table",
    steps: [
      "Lift out the pieces by their knobs, one at a time.",
      "Look at the shape of each empty hole.",
      "Turn a piece until it fits its hole.",
      "When complete, return the puzzle to the shelf.",
    ],
  },
  {
    match: /hold, lift, carry|carry.*tray|carry.*chair/i,
    photo: photo("carry-tray-chair"),
    caption: "Carrying a tray level with both hands, and a chair upright",
    steps: [
      "Tray: hold both sides, thumbs on top, keep it level at waist height.",
      "Chair: hold the back with both hands, legs pointing down.",
      "Walk slowly and look where you are going.",
      "Put things down gently without a bang.",
    ],
  },
  {
    match: /silence/i,
    photo: photo("silence"),
    caption: "The silence game: sitting still with eyes closed",
    steps: [
      "Everyone sits comfortably and becomes completely still.",
      "Close eyes and listen to small sounds: birds, fan, breathing.",
      "The teacher softly whispers each child's name.",
      "When named, the child gets up quietly and walks over.",
    ],
  },
  {
    match: /thread/i,
    photo: photo("threading"),
    caption: "Threading large wooden beads onto a lace",
    steps: [
      "Hold the stiff tip of the lace in one hand.",
      "Hold a bead in the other hand and push the tip through the hole.",
      "Pull the lace and slide the bead down.",
      "Add beads to make a string, or a colour pattern.",
    ],
  },
  {
    match: /lock and key/i,
    photo: photo("lock-and-key"),
    caption: "Finding the right key for each padlock",
    steps: [
      "Look at each lock and each key.",
      "Try a key in a lock and turn it gently.",
      "If the lock opens, the pair is matched.",
      "Close the locks again and put the keys back on the tray.",
    ],
  },
  {
    match: /opening and closing lids|open and closing lids|lids/i,
    photo: photo("opening-lids"),
    caption: "Twisting lids off and on different jars and boxes",
    steps: [
      "Take one container from the basket.",
      "Hold the jar with one hand and twist the lid with the other.",
      "Put the lid down, then screw it back on.",
      "Try every container: screw lids, flip lids, box lids.",
    ],
  },
  {
    match: /greet/i,
    photo: photo("greeting"),
    caption: "Greeting the teacher with a namaste in the morning",
    steps: [
      "Look at the person's face.",
      "Join palms (namaste) or shake hands.",
      "Say \"Good morning\" or \"Hello\" with their name.",
      "Wait for them to greet you back.",
    ],
  },
  {
    match: /magical words/i,
    photo: photo("magic-words"),
    caption: "Saying \"thank you\" when a friend shares",
    steps: [
      "Please: when asking for something.",
      "Thank you: when you receive something.",
      "Sorry: when you hurt or disturb someone.",
      "Excuse me: when you need to pass or interrupt.",
      "Welcome: when someone thanks you.",
    ],
  },
  {
    match: /sneeze|cough|yawn/i,
    photo: photo("sneeze-cough"),
    caption: "Covering a cough with the elbow, turned away from a friend",
    steps: [
      "Turn your face away from people.",
      "Cough or sneeze into the bend of your elbow, or a tissue.",
      "Cover your mouth with your hand when you yawn.",
      "Throw the tissue away and wash hands.",
    ],
  },
  {
    match: /social behaviou?r(al)? activities/i,
    photo: photo("magic-words"),
    caption: "Being kind and polite with classmates",
    steps: [
      "Greet friends and teachers.",
      "Use please, thank you and sorry.",
      "Wait for your turn and do not interrupt.",
      "Cover coughs and sneezes.",
    ],
  },
  {
    match: /pairing pictures/i,
    photo: photo("pairing-pictures"),
    caption: "Matching each picture card with its identical pair",
    steps: [
      "Lay one set of cards in a column.",
      "Pick a card from the second set and name the picture.",
      "Find its twin and place it beside it.",
      "Continue until every card has a pair.",
    ],
  },
  {
    match: /colou?r sorting/i,
    photo: photo("colour-sorting"),
    caption: "Sorting objects into trays by colour",
    steps: [
      "Name the colour of each tray.",
      "Pick up one object and say its colour.",
      "Place it in the tray of the same colour.",
      "At home, sort socks, blocks or vegetables the same way.",
    ],
  },
  {
    match: /pound/i,
    photo: photo("pounding"),
    caption: "Hammering pegs down into a pounding bench",
    steps: [
      "Hold the mallet near the end of its handle.",
      "Keep the other hand away from the pegs.",
      "Tap each peg until it goes down level.",
      "Turn the bench over and start again.",
    ],
  },
  {
    match: /frames?$/i,
    photo: photo("dressing-frames"),
    caption: "Buttoning on a Montessori dressing frame",
    steps: [
      "Work from the top button to the bottom.",
      "Pinch the button and push it halfway through the hole.",
      "Pull it through from the other side.",
      "Unbutton again the same way; other frames use zips, snaps, bows.",
    ],
  },
  {
    match: /offer a sharp object/i,
    photo: photo("offer-sharp"),
    caption: "Handing over scissors with the handles towards the friend",
    steps: [
      "Close the scissors.",
      "Hold the closed blades inside your fist.",
      "Offer the handles to the other person.",
      "Let go only when they are holding it.",
    ],
  },
  {
    match: /pattern cutting|cut patterns/i,
    photo: photo("pattern-cutting"),
    caption: "Cutting along straight, wavy and zig-zag lines",
    steps: [
      "Start with a straight line, then wavy, then zig-zag.",
      "Hold scissors thumb-up; the other hand turns the paper.",
      "Open and close the blades along the printed line.",
      "Put scraps in the bin and scissors back in the holder.",
    ],
  },
  {
    match: /scissors/i,
    photo: photo("scissors"),
    caption: "Snipping paper strips with child-safe scissors",
    steps: [
      "Put the thumb in the small hole and fingers in the big hole.",
      "Thumb stays on top.",
      "Hold the strip with the other hand and snip across it.",
      "Always walk with scissors closed and pointing down.",
    ],
  },
  {
    match: /folding t-?shirt/i,
    photo: photo("fold-tshirt"),
    caption: "Folding a T-shirt on the rug",
    steps: [
      "Lay the T-shirt flat, front facing down.",
      "Fold one side and its sleeve to the middle, then the other side.",
      "Fold the bottom up to the collar.",
      "Turn it over and add it to the stack.",
    ],
  },
  {
    match: /transferring liquids|pour/i,
    photo: photo("transfer-liquid"),
    caption: "Pouring water from a jug into a glass",
    steps: [
      "Hold the jug handle with one hand and support the spout side with the other.",
      "Pour slowly and stop before the glass is full.",
      "Pour it back into the jug.",
      "Wipe drops with the sponge.",
    ],
  },
  {
    match: /walking on the line/i,
    photo: photo("walk-line"),
    caption: "Walking heel-to-toe on a taped line",
    steps: [
      "Stand on the line and look down at it.",
      "Put one foot in front of the other, heel touching toe.",
      "Arms out a little for balance; walk slowly.",
      "Harder: carry a bell or a cup of water without spilling.",
    ],
  },
  {
    match: /rolling dough/i,
    photo: photo("rolling-dough"),
    caption: "Rolling dough flat with a small rolling pin",
    steps: [
      "Roll the dough into a ball between your palms.",
      "Press it a little flat on the board.",
      "Roll forward and back with both hands on the pin.",
      "At home, let your child roll a chapati with you.",
    ],
  },
  {
    match: /transferring grains|grains/i,
    photo: photo("transfer-grains"),
    caption: "Spooning beans from one bowl to another",
    steps: [
      "Hold the spoon like you do when eating.",
      "Scoop from the full bowl.",
      "Move slowly to the empty bowl and tip it in.",
      "Pick up any spilled beans with your fingers.",
    ],
  },
  {
    match: /table manners/i,
    photo: photo("table-manners"),
    caption: "Eating together politely at snack time",
    steps: [
      "Wash hands and spread the napkin first.",
      "Sit straight and eat with a spoon or clean hand.",
      "Chew with your mouth closed; talk after swallowing.",
      "Ask \"Please pass…\" and say thank you.",
    ],
  },
  {
    match: /sorting fruits and vegetables/i,
    photo: photo("sort-fruit-veg"),
    caption: "Sorting real fruits and vegetables into baskets",
    steps: [
      "Name each item as you pick it up.",
      "Ask: is it a fruit or a vegetable?",
      "Place it in the correct basket.",
      "Do this with your shopping bag at home.",
    ],
  },
  {
    match: /sorting activity/i,
    photo: photo("sorting-beads"),
    caption: "Sorting objects into groups",
    steps: [
      "Look at all the objects first.",
      "Choose one rule: colour, size or type.",
      "Put each object in its group.",
      "Say why each object belongs there.",
    ],
  },
];

export function findEplActivity(topic: string): EplActivity | undefined {
  return eplActivities.find((a) => a.match.test(topic));
}
