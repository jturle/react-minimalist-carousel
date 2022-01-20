import React from "react";

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
  slides: Array<Slide>;
};

export interface CarouselProps {
  data: Carousel;
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default Carousel;
