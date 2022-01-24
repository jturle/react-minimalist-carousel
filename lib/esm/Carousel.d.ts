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
}
declare const CarouselComponent: React.FC<CarouselProps>;
export default CarouselComponent;
