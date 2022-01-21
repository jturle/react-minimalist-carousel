export type ImageAsset = {
  url: string;
  alt?: string;
  mimetype?: string;
  width?: number;
  height?: number;
  filesize?: number;
};

export type ButtonLink = {
  label: string;
  uri: string;
};

export type Slide = {
  title?: string;
  subtitle?: string;
  background?: ImageAsset;
  body?: string | React.ReactNode;
  image?: ImageAsset;
  caption?: string;
  button?: ButtonLink;
  duration?: number;
};

export type Carousel = {
  slides: Slide[];
};
