import React from "react";
import { Carousel } from "./types";
export interface CarouselProps {
    data: Carousel;
    className?: string;
    slideClassName?: string;
    cover?: boolean;
    pauseOnHover?: boolean;
    autoScroll?: boolean;
    defaultDuration?: number;
    draggable?: boolean;
    columns?: 1 | 2;
}
declare const CarouselComponent: React.FC<CarouselProps>;
export default CarouselComponent;
