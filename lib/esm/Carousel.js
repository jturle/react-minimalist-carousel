import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import CarouselSlide from "./CarouselSlide";
var Container = styled.div(function () { return ({
    display: "grid",
    grid: "1fr / auto-flow 100%",
    overflowX: "auto",
    overflowY: "hidden",
    cursor: "pointer",
    // touchAction: "pan-x", // if you do this - vertical scroll becomes a pain on touch/mobile
    scrollSnapType: "x mandatory",
    overscrollBehaviorX: "contain",
}); });
var CarouselComponent = function (_a) {
    var data = _a.data, _b = _a.cover, cover = _b === void 0 ? false : _b, _c = _a.defaultDuration, defaultDuration = _c === void 0 ? 2000 : _c;
    var _d = useState(false), paused = _d[0], setPaused = _d[1];
    var ref = useRef(null);
    // Calculate the total duration of the carousel/slide show
    var totalTime = data.slides.reduce(function (prev, current) {
        return prev + ((current === null || current === void 0 ? void 0 : current.duration) || defaultDuration);
    }, 0);
    // Calculate an offset in ms
    var currentOffset = new Date().getTime() % totalTime;
    // Calculate current slideIdx
    var initialSlideIndex = calculateSlideIndexFromOffset(data.slides, currentOffset, defaultDuration);
    var _e = useState(initialSlideIndex), slideIndex = _e[0], setSlideIndex = _e[1];
    useEffect(function () {
        var _a;
        if (!paused && data.slides.length > 1) {
            // const currentOffset = new Date().getTime() % totalTime;
            var nextSlideIndex_1 = slideIndex + 1 >= data.slides.length ? 0 : slideIndex + 1;
            if (nextSlideIndex_1) {
                // Calculate when the next slide should switch
                var timeout_1 = setTimeout(function () { return setSlideIndex(nextSlideIndex_1); }, ((_a = data.slides[slideIndex]) === null || _a === void 0 ? void 0 : _a.duration) || defaultDuration);
                return function () { return clearTimeout(timeout_1); };
            }
            else {
                // The next slide is the first slide...
                // Creating an exact timeout to ensure everything stays in sync
                var totalTime_1 = data.slides.reduce(function (prev, current) {
                    return prev + ((current === null || current === void 0 ? void 0 : current.duration) || defaultDuration);
                }, 0);
                var resetTimeout = totalTime_1 - (new Date().getTime() % totalTime_1);
                var timeout_2 = setTimeout(function () { return setSlideIndex(0); }, resetTimeout);
                return function () { return clearTimeout(timeout_2); };
            }
        }
        return;
    }, [paused, slideIndex, setSlideIndex, data, defaultDuration]);
    useEffect(function () {
        // Auto scroll to current slide
        if (ref.current) {
            var slide = ref.current.children[slideIndex];
            // ref.current.scrollLeft = slide.offsetLeft;
            ref.current.scrollTo({
                // top: 100,
                left: slide.offsetLeft,
                // behavior: "smooth",
            });
        }
    }, [slideIndex, ref]);
    // Listen for mouse over so we can pause the auto play
    useEffect(function () {
        if (ref.current) {
            var mouseEnterListener_1 = function () { return setPaused(true); };
            ref.current.addEventListener("mouseenter", mouseEnterListener_1);
            var mouseLeaveListener_1 = function () { return setPaused(false); };
            ref.current.addEventListener("mouseleave", mouseLeaveListener_1);
            return function () {
                if (ref.current) {
                    ref.current.removeEventListener("mouseenter", mouseEnterListener_1);
                    ref.current.removeEventListener("mouseleave", mouseLeaveListener_1);
                }
            };
        }
        return;
    }, [ref]);
    return (React.createElement(Container, { ref: ref }, data.slides.map(function (slide, idx) {
        return React.createElement(CarouselSlide, { key: idx, slide: slide, options: { cover: cover } });
    })));
};
var calculateSlideIndexFromOffset = function (slides, timeOffset, defaultDuration) {
    var durationSpent = 0;
    var idx = -1;
    for (var _i = 0, slides_1 = slides; _i < slides_1.length; _i++) {
        var slide = slides_1[_i];
        idx++;
        durationSpent += (slide === null || slide === void 0 ? void 0 : slide.duration) || defaultDuration;
        if (durationSpent > timeOffset)
            return idx;
    }
    return 0;
};
export default CarouselComponent;
