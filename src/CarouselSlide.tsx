import React from "react";
import styled from "@emotion/styled";
import { Slide, SlideOptions } from "./Carousel";

const SlideContainer = styled.div(() => ({
  scrollSnapAlign: "start",
  scrollSnapStop: "always",
  userSelect: "none",
  touchAction: "none",
  pointerEvents: "none",
  position: "relative",
}));

const CarouselSlide: React.FC<{
  slide: Slide;
  options: SlideOptions;
}> = ({
  slide,
  options = {
    cover: false,
  },
}) => {
  return (
    <SlideContainer>
      {slide.background?.url && (
        <img
          width="100%"
          height="100%"
          alt={slide.background.alt || ""}
          src={slide.background.url}
          loading="lazy"
          style={{
            display: "block",
            objectFit: options.cover ? "cover" : "contain",
            objectPosition: "center center",
            userSelect: "none",
            touchAction: "none",
            pointerEvents: "none",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          color: "white",
        }}
      >
        {slide.title && <h1>{slide.title}</h1>}
        {slide.subtitle && <h2>{slide.subtitle}</h2>}
        {slide.body && <div>{slide.body}</div>}
        {slide.caption && <h3>{slide.caption}</h3>}
        {slide.button && <a href={slide.button.uri}>{slide.button.label}</a>}
      </div>
    </SlideContainer>
  );
};

export default CarouselSlide;
