import { speakPhoneme } from "../lib/audio";
import { phonemeSoundForGlyph } from "../lib/phonemes";
import type { ItemCard } from "../lib/topicContent/types";

type Props = {
  cards: ItemCard[];
  columns?: 2 | 3 | 4;
};

function GlyphTile({ card }: { card: ItemCard }) {
  const sound = card.glyph ? phonemeSoundForGlyph(card.glyph) : null;
  const label = card.glyph
    ? `Play sound for ${card.name}`
    : card.name;

  const tileClass =
    "flex aspect-square w-full items-center justify-center rounded-t-xl bg-gradient-to-br from-rose-50 to-amber-50 font-serif text-[clamp(3.75rem,48cqw,10rem)] font-bold leading-none text-rose-700";

  if (!sound) {
    return <span className={tileClass}>{card.glyph}</span>;
  }

  return (
    <button
      type="button"
      onClick={() => speakPhoneme(sound)}
      className={`${tileClass} cursor-pointer transition hover:from-rose-100 hover:to-amber-100 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600`}
      aria-label={label}
      title="Tap to hear the letter sound"
    >
      {card.glyph}
    </button>
  );
}

function Visual({ card }: { card: ItemCard }) {
  if (card.photo) {
    return (
      <img
        src={card.photo}
        alt={card.name}
        loading="lazy"
        className="aspect-square w-full rounded-t-xl bg-stone-100 object-cover"
      />
    );
  }
  if (card.glyph) {
    return <GlyphTile card={card} />;
  }
  if (card.swatch) {
    return (
      <span
        className="block aspect-square w-full rounded-t-xl"
        style={{ backgroundColor: card.swatch }}
        aria-hidden
      />
    );
  }
  return null;
}

export function ItemCardGrid({ cards, columns = 3 }: Props) {
  if (!cards.length) return null;

  const colClass =
    columns === 4
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      : columns === 2
        ? "grid-cols-2"
        : "grid-cols-2 sm:grid-cols-3";

  return (
    <ul className={`grid gap-3 ${colClass}`}>
      {cards.map((card) => (
        <li
          key={card.name}
          className="@container flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"
        >
          <Visual card={card} />
          <div className="min-w-0 p-2.5">
            <p className="font-semibold leading-tight text-stone-900">{card.name}</p>
            <p className="mt-0.5 text-xs leading-snug text-stone-600">{card.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
