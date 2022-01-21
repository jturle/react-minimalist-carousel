import React from "react";
import { Carousel } from "./types";
export interface CarouselProps {
    data: Carousel;
    cover?: boolean;
    pauseOnHover?: boolean;
    autoScroll?: boolean;
    defaultDuration?: number;
}
declare const CarouselComponent: React.FC<CarouselProps>;
export default CarouselComponent;
