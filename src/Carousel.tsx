import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import CarouselSlide from "./CarouselSlide";

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

export interface SlideOptions {
  cover?: boolean;
}

export interface CarouselProps {
  data: Carousel;
  cover?: boolean;
  defaultDuration?: number;
}

const Container = styled.div(() => ({
  display: "grid",
  grid: "1fr / auto-flow 100%",
  overflowX: "auto",
  overflowY: "hidden",
  cursor: "pointer",
  // touchAction: "pan-x", // if you do this - vertical scroll becomes a pain on touch/mobile
  scrollSnapType: "x mandatory",
  overscrollBehaviorX: "contain",
}));

const CarouselComponent: React.FC<CarouselProps> = ({
  data,
  cover = false,
  defaultDuration = 2000,
}) => {
  const [paused, setPaused] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  // Calculate the total duration of the carousel/slide show
  const totalTime = data.slides.reduce((prev, current) => {
    return prev + (current?.duration || defaultDuration);
  }, 0);

  // Calculate an offset in ms
  const currentOffset = new Date().getTime() % totalTime;

  // Calculate current slideIdx
  const initialSlideIndex = calculateSlideIndexFromOffset(
    data.slides,
    currentOffset,
    defaultDuration
  );
  const [slideIndex, setSlideIndex] = useState<number>(initialSlideIndex);

  useEffect(() => {
    if (!paused && data.slides.length > 1) {
      // const currentOffset = new Date().getTime() % totalTime;
      const nextSlideIndex =
        slideIndex + 1 >= data.slides.length ? 0 : slideIndex + 1;
      if (nextSlideIndex) {
        // Calculate when the next slide should switch
        const timeout = setTimeout(
          () => setSlideIndex(nextSlideIndex),
          data.slides[slideIndex]?.duration || defaultDuration
        );
        return () => clearTimeout(timeout);
      } else {
        // The next slide is the first slide...
        // Creating an exact timeout to ensure everything stays in sync
        const totalTime = data.slides.reduce((prev, current) => {
          return prev + (current?.duration || defaultDuration);
        }, 0);
        const resetTimeout = totalTime - (new Date().getTime() % totalTime);
        const timeout = setTimeout(() => setSlideIndex(0), resetTimeout);
        return () => clearTimeout(timeout);
      }
    }
    return;
  }, [paused, slideIndex, setSlideIndex, data, defaultDuration]);

  useEffect(() => {
    // Auto scroll to current slide
    if (ref.current) {
      const slide = ref.current.children[slideIndex] as HTMLDivElement;
      // ref.current.scrollLeft = slide.offsetLeft;
      ref.current.scrollTo({
        // top: 100,
        left: slide.offsetLeft,
        // behavior: "smooth",
      });
    }
  }, [slideIndex, ref]);

  // Listen for mouse over so we can pause the auto play
  useEffect(() => {
    if (ref.current) {
      const mouseEnterListener = () => setPaused(true);
      ref.current.addEventListener("mouseenter", mouseEnterListener);
      const mouseLeaveListener = () => setPaused(false);
      ref.current.addEventListener("mouseleave", mouseLeaveListener);
      return () => {
        if (ref.current) {
          ref.current.removeEventListener("mouseenter", mouseEnterListener);
          ref.current.removeEventListener("mouseleave", mouseLeaveListener);
        }
      };
    }
    return;
  }, [ref]);

  return (
    <Container ref={ref}>
      {data.slides.map((slide, idx) => {
        return <CarouselSlide key={idx} slide={slide} options={{ cover }} />;
      })}
    </Container>
  );
};

const calculateSlideIndexFromOffset = (
  slides: Slide[],
  timeOffset: number,
  defaultDuration: number
) => {
  let durationSpent = 0;
  let idx = -1;
  for (let slide of slides) {
    idx++;
    durationSpent += slide?.duration || defaultDuration;
    if (durationSpent > timeOffset) return idx;
  }
  return 0;
};

export default CarouselComponent;
