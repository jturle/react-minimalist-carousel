import * as React from "react";
// import styled from "@emotion/styled";
import { Slide } from "./types";

// const SlideContainer = styled.div(() => ({
//   scrollSnapAlign: "start",
//   scrollSnapStop: "always",
//   userSelect: "none",
//   touchAction: "none",
//   pointerEvents: "none",
//   position: "relative",
//   "& img": {
//     width: "100%",
//     height: "100%",
//   },
// }));

interface SlideOptions {
  cover?: boolean;
}

interface CarouselSlideProps {
  slide: Slide;
  className: string;
  options: SlideOptions;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  slide,
  className = "rmc-slide",
  options = {
    cover: false,
  },
}) => {
  return (
    <div
      className={className}
      style={{
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        userSelect: "none",
        touchAction: "none",
        pointerEvents: "none",
        position: "relative",
      }}
    >
      {slide.background?.url && (
        <img
          alt={slide.background.alt || ""}
          src={slide.background.url}
          loading="lazy"
          style={{
            objectFit: options.cover ? "cover" : "contain",
            objectPosition: "center center",
            userSelect: "none",
            touchAction: "none",
            pointerEvents: "none",
            width: "100%",
            height: "100%",
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
    </div>
  );
};

export default CarouselSlide;
