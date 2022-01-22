import * as React from "react";
import { Slide } from "./types";
interface SlideOptions {
    cover?: boolean;
}
interface CarouselSlideProps {
    slide: Slide;
    options: SlideOptions;
}
declare const CarouselSlide: React.FC<CarouselSlideProps>;
export default CarouselSlide;
