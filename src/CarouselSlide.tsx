import * as React from "react";
import { Slide } from "./types";

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
      {slide.backgroundImage}
      {!slide.backgroundImage && slide.background?.url && (
        <img
          className="rmc-background"
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
        }}
      >
        {slide.title && <h1 className="rmc-title">{slide.title}</h1>}
        {slide.subtitle && <h2 className="rmc-subtitle">{slide.subtitle}</h2>}
        {slide.body && <div className="rmc-body">{slide.body}</div>}
        {slide.caption && <h3 className="rmc-caption">{slide.caption}</h3>}
        {slide.button && (
          <a className="rmc-button" href={slide.button.uri}>
            {slide.button.label}
          </a>
        )}
      </div>
    </div>
  );
};

export default CarouselSlide;
