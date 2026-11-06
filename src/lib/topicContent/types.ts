export type ContentImage = {
  src: string;
  caption: string;
};

export type ItemCard = {
  name: string;
  detail: string;
  /** Realistic picture of the thing */
  photo?: string;
  /** Large letter or numeral shown instead of a picture */
  glyph?: string;
  /** For colour topics — CSS background */
  swatch?: string;
};

export type ContentAudio = {
  label: string;
  speakText?: string;
  src?: string;
};

export type ContentRhyme = {
  title: string;
  lines: string[];
};

export type TopicRichContent = {
  title: string;
  intro?: string;
  /** Large photo showing the activity being done */
  photo?: ContentImage;
  /** How the child does the activity, in order */
  steps?: string[];
  /** Named things to recognize */
  itemCards: ItemCard[];
  /** Optional reference picture (shown full, not cropped) */
  images: ContentImage[];
  audios: ContentAudio[];
  rhymes: ContentRhyme[];
};
