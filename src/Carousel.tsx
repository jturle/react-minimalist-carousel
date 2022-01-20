import React from "react";
import styled from "@emotion/styled";

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
const Container = styled.div(() => ({
  display: "flex",
  backgroundColor: "red",
}));

const CarouselComponent: React.FC<CarouselProps> = ({ data }) => {
  return <Container>{JSON.stringify(data, null, 2)}</Container>;
};

export default CarouselComponent;
