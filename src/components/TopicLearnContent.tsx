import type { TopicRichContent } from "../lib/topicContent/types";
import { ItemCardGrid } from "./ItemCardGrid";

type Props = {
  content: TopicRichContent;
};

export function TopicLearnContent({ content }: Props) {
  const hasMedia =
    content.photo != null ||
    content.itemCards.length > 0 ||
    content.images.length > 0 ||
    content.rhymes.length > 0;

  if (!hasMedia) return null;

  const cardCols =
    content.itemCards.length > 12 ? 4 : content.itemCards.length > 6 ? 3 : 2;

  return (
    <section className="border-b border-stone-100 bg-gradient-to-b from-teal-50/40 to-white px-5 py-5">
      <h3 className="mb-1 font-display text-lg font-semibold text-stone-900">
        Learn together
      </h3>
      {content.intro && (
        <p className="mb-4 text-sm leading-relaxed text-stone-600">{content.intro}</p>
      )}

      {content.photo && (
        <div className="mb-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
          <figure className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
            <img
              src={content.photo.src}
              alt={content.photo.caption}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <figcaption className="border-t border-stone-100 px-3 py-2 text-xs text-stone-600">
              {content.photo.caption}
            </figcaption>
          </figure>
          {content.steps && content.steps.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                How your child does it
              </p>
              <ol className="space-y-2">
                {content.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm leading-relaxed text-stone-800">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {content.itemCards.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
            What to look for ({content.itemCards.length})
          </p>
          <ItemCardGrid cards={content.itemCards} columns={cardCols as 2 | 3 | 4} />
        </div>
      )}

      {content.images.length > 0 && (
        <div className="mb-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Reference picture
          </p>
          {content.images.map((image) => (
            <figure
              key={image.src}
              className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50"
            >
              <img
                src={image.src}
                alt={image.caption}
                className="mx-auto max-h-72 w-full object-contain p-2"
                loading="lazy"
              />
              <figcaption className="border-t border-stone-100 px-3 py-2 text-xs text-stone-600">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {content.rhymes.length > 0 && (
        <div className="mb-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Rhyme text
          </p>
          {content.rhymes.map((rhyme) => (
            <article
              key={rhyme.title}
              className="rounded-xl border border-teal-200 bg-white px-4 py-3 shadow-sm"
            >
              <h4 className="mb-2 font-semibold text-teal-950">{rhyme.title}</h4>
              <div className="space-y-1 font-serif text-sm leading-relaxed text-stone-800">
                {rhyme.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
