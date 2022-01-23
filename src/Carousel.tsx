import React, { useRef, useState, useEffect } from "react";
// import styled from "@emotion/styled";
import CarouselSlide from "./CarouselSlide";
import { Carousel, Slide } from "./types";

export interface CarouselProps {
  data: Carousel;
  className?: string;
  slideClassName?: string;
  cover?: boolean;
  pauseOnHover?: boolean;
  autoScroll?: boolean;
  defaultDuration?: number;
}

// const CarouselContainer = styled.div(() => ({
//   display: "grid",
//   grid: "1fr / auto-flow 100%",
//   overflowX: "auto",
//   overflowY: "hidden",
//   cursor: "pointer",
//   // touchAction: "pan-x", // if you do this - vertical scroll becomes a pain on touch/mobile
//   overscrollBehaviorX: "contain",
//   scrollSnapType: "x mandatory",
//   scrollBehavior: "smooth",
//   "::-webkit-scrollbar": {
//     display: "none",
//   },
// }));

const CarouselComponent: React.FC<CarouselProps> = ({
  data,
  className = "rmc-carousel",
  slideClassName = "rmc-slide",
  cover = false,
  autoScroll = true,
  pauseOnHover = true,
  defaultDuration = 2000,
}) => {
  const [paused, setPaused] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  // Calculate the total duration of the carousel/slide show
  const totalTime = data.slides.reduce((prev, current) => {
    return prev + (current?.duration || defaultDuration);
  }, 0);

  // Calculate an offset in ms assuming the carousel has been looping since 1970
  const currentOffset = new Date().getTime() % totalTime;

  // Calculate startup slide index
  const initialSlideIndex = calculateSlideIndexFromOffset(
    data.slides,
    currentOffset,
    defaultDuration
  );
  const [slideIndex, setSlideIndex] = useState<number>(
    autoScroll ? initialSlideIndex : 0
  );

  // Auto-play effect - w/ clock sync
  useEffect(() => {
    if (autoScroll && !paused && data.slides.length > 1) {
      const { slides } = data;
      const nextSlideIndex =
        slideIndex >= slides.length - 1 ? 0 : slideIndex + 1;
      if (nextSlideIndex) {
        // Calculate when the next slide should switch
        const timeout = setTimeout(
          () => setSlideIndex(nextSlideIndex),
          slides[slideIndex]?.duration || defaultDuration
        );
        return () => clearTimeout(timeout);
      } else {
        // The next slide is the first slide...
        // Lets creating an exact timeout to keep things perfectly syncronised
        // Will also re-sync after any manual selection etc.
        const totalTime = slides.reduce((prev, current) => {
          return prev + (current?.duration || defaultDuration);
        }, 0);
        const resetTimeout = totalTime - (new Date().getTime() % totalTime);
        const timeout = setTimeout(() => setSlideIndex(0), resetTimeout);
        return () => clearTimeout(timeout);
      }
    }
    return;
  }, [paused, autoScroll, slideIndex, setSlideIndex, data, defaultDuration]);

  // Slide update effect
  useEffect(() => {
    if (ref.current) {
      const slide = ref.current.children[slideIndex] as HTMLDivElement;
      if (slide) ref.current.scrollTo({ left: slide.offsetLeft });
    }
  }, [slideIndex, ref]);

  // Pause effect
  useEffect(() => {
    if (ref.current && pauseOnHover) {
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
  }, [ref, pauseOnHover]);

  // Drag effect
  useEffect(() => {
    if (ref.current) {
      const container = ref.current;
      let panning = false;
      let initialScrollLeft: number = 0;
      let initialOffsetX: number = 0;
      let cleanupTimeout: number;

      const mouseDownListener = (ev: MouseEvent) => {
        panning = true;
        initialScrollLeft = container.scrollLeft;
        initialOffsetX = ev.clientX;
        // Disable default scroll features...
        container.style.scrollSnapType = "initial";
        container.style.scrollBehavior = "initial";
        if (pauseOnHover) setPaused(true);
      };

      const mouseMoveListener = (ev: MouseEvent) => {
        if (panning) {
          const movementX = initialOffsetX - ev.clientX;
          container.scrollTo({ left: initialScrollLeft + movementX });
        }
      };

      const mouseUpListener = () => {
        if (panning) {
          panning = false;

          // Calculate the current index - TODO: Add acceleration?
          const bestSlideIndex = Math.round(
            container.scrollLeft / container.offsetWidth
          );
          // Get ideal slide...
          const slide = container.children[bestSlideIndex] as HTMLDivElement;
          // Scroll to it - smoooooth...
          container.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });

          // Clear any pending timeouts...
          if (cleanupTimeout) clearTimeout(cleanupTimeout);
          // Return to standard behaviour
          cleanupTimeout = setTimeout(() => {
            // Re-enable default scroll behaviours
            container.style.scrollBehavior = "smooth";
            container.style.scrollSnapType = "x mandatory";
            if (pauseOnHover) setPaused(false);
          }, defaultDuration);
        }
      };

      container.addEventListener("mousedown", mouseDownListener);
      window.addEventListener("mousemove", mouseMoveListener); // track the whole window for better
      window.addEventListener("mouseup", mouseUpListener);
      return () => {
        container.removeEventListener("mousedown", mouseDownListener);
        window.removeEventListener("mousemove", mouseMoveListener);
        window.removeEventListener("mouseup", mouseUpListener);
        if (cleanupTimeout) clearTimeout(cleanupTimeout);
      };
    }
    return;
  }, [ref, defaultDuration]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: "grid",
        grid: "1fr / auto-flow 100%",
        overflowX: "auto",
        overflowY: "hidden",
        cursor: "pointer",
        // touchAction: "pan-x", // if you do this - vertical scroll becomes a pain on touch/mobile
        overscrollBehaviorX: "contain",
        scrollSnapType: "x mandatory",
        scrollBehavior: "smooth",
        userSelect: "none",
      }}
    >
      {data.slides.map((slide, idx) => {
        return (
          <CarouselSlide
            key={idx}
            className={slideClassName}
            slide={slide}
            options={{ cover }}
          />
        );
      })}
    </div>
  );
};

/**
 * Calculates the current slide index from a millisecond offset
 *
 * @param slides - all of the currently visible slides
 * @param timeOffset - time into the entire "show", in ms
 * @param defaultDuration - a default duration for each slide
 * @returns
 */
const calculateSlideIndexFromOffset = (
  slides: Slide[],
  timeOffset: number,
  defaultDuration: number
): number => {
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
