import * as React from "react";
import CarouselSlide from "./CarouselSlide";
// const Container = styled.div(() => ({
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
var CarouselComponent = function (_a) {
    var data = _a.data, _b = _a.cover, cover = _b === void 0 ? false : _b, _c = _a.autoScroll, autoScroll = _c === void 0 ? true : _c, _d = _a.pauseOnHover, pauseOnHover = _d === void 0 ? true : _d, _e = _a.defaultDuration, defaultDuration = _e === void 0 ? 2000 : _e;
    var _f = React.useState(false), paused = _f[0], setPaused = _f[1];
    var ref = React.useRef(null);
    // Calculate the total duration of the carousel/slide show
    var totalTime = data.slides.reduce(function (prev, current) {
        return prev + ((current === null || current === void 0 ? void 0 : current.duration) || defaultDuration);
    }, 0);
    // Calculate an offset in ms assuming the carousel has been looping since 1970
    var currentOffset = new Date().getTime() % totalTime;
    // Calculate startup slide index
    var initialSlideIndex = calculateSlideIndexFromOffset(data.slides, currentOffset, defaultDuration);
    var _g = React.useState(initialSlideIndex), slideIndex = _g[0], setSlideIndex = _g[1];
    // Auto-play effect - w/ clock sync
    React.useEffect(function () {
        var _a;
        if (autoScroll && !paused && data.slides.length > 1) {
            var slides = data.slides;
            var nextSlideIndex_1 = slideIndex >= slides.length - 1 ? 0 : slideIndex + 1;
            if (nextSlideIndex_1) {
                // Calculate when the next slide should switch
                var timeout_1 = setTimeout(function () { return setSlideIndex(nextSlideIndex_1); }, ((_a = slides[slideIndex]) === null || _a === void 0 ? void 0 : _a.duration) || defaultDuration);
                return function () { return clearTimeout(timeout_1); };
            }
            else {
                // The next slide is the first slide...
                // Lets creating an exact timeout to keep things perfectly syncronised
                // Will also re-sync after any manual selection etc.
                var totalTime_1 = slides.reduce(function (prev, current) {
                    return prev + ((current === null || current === void 0 ? void 0 : current.duration) || defaultDuration);
                }, 0);
                var resetTimeout = totalTime_1 - (new Date().getTime() % totalTime_1);
                var timeout_2 = setTimeout(function () { return setSlideIndex(0); }, resetTimeout);
                return function () { return clearTimeout(timeout_2); };
            }
        }
        return;
    }, [paused, autoScroll, slideIndex, setSlideIndex, data, defaultDuration]);
    // Slide update effect
    React.useEffect(function () {
        if (ref.current) {
            var slide = ref.current.children[slideIndex];
            ref.current.scrollTo({ left: slide.offsetLeft });
        }
    }, [slideIndex, ref]);
    // Pause effect
    React.useEffect(function () {
        if (ref.current && pauseOnHover) {
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
    }, [ref, pauseOnHover]);
    // Drag effect
    React.useEffect(function () {
        if (ref.current) {
            var container_1 = ref.current;
            var panning_1 = false;
            var initialScrollLeft_1 = 0;
            var initialOffsetX_1 = 0;
            var cleanupTimeout_1;
            var mouseDownListener_1 = function (ev) {
                panning_1 = true;
                initialScrollLeft_1 = container_1.scrollLeft;
                initialOffsetX_1 = ev.clientX;
                // Disable default scroll features...
                container_1.style.scrollSnapType = "initial";
                container_1.style.scrollBehavior = "initial";
                if (pauseOnHover)
                    setPaused(true);
            };
            var mouseMoveListener_1 = function (ev) {
                if (panning_1) {
                    var movementX = initialOffsetX_1 - ev.clientX;
                    container_1.scrollTo({ left: initialScrollLeft_1 + movementX });
                }
            };
            var mouseUpListener_1 = function () {
                if (panning_1) {
                    panning_1 = false;
                    // Calculate the current index - TODO: Add acceleration?
                    var bestSlideIndex = Math.round(container_1.scrollLeft / container_1.offsetWidth);
                    // Get ideal slide...
                    var slide = container_1.children[bestSlideIndex];
                    // Scroll to it - smoooooth...
                    container_1.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
                    // Clear any pending timeouts...
                    if (cleanupTimeout_1)
                        clearTimeout(cleanupTimeout_1);
                    // Return to standard behaviour
                    cleanupTimeout_1 = setTimeout(function () {
                        // Re-enable default scroll behaviours
                        container_1.style.scrollBehavior = "smooth";
                        container_1.style.scrollSnapType = "x mandatory";
                        if (pauseOnHover)
                            setPaused(false);
                    }, defaultDuration);
                }
            };
            container_1.addEventListener("mousedown", mouseDownListener_1);
            window.addEventListener("mousemove", mouseMoveListener_1); // track the whole window for better
            window.addEventListener("mouseup", mouseUpListener_1);
            return function () {
                container_1.removeEventListener("mousedown", mouseDownListener_1);
                window.removeEventListener("mousemove", mouseMoveListener_1);
                window.removeEventListener("mouseup", mouseUpListener_1);
                if (cleanupTimeout_1)
                    clearTimeout(cleanupTimeout_1);
            };
        }
        return;
    }, [ref, defaultDuration]);
    return (React.createElement("div", { ref: ref, style: {
            display: "grid",
            grid: "1fr / auto-flow 100%",
            overflowX: "auto",
            overflowY: "hidden",
            cursor: "pointer",
            // touchAction: "pan-x", // if you do this - vertical scroll becomes a pain on touch/mobile
            overscrollBehaviorX: "contain",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            // "&::-webkit-scrollbar": {
            //   display: "none",
            // },
        } }, data.slides.map(function (slide, idx) {
        return React.createElement(CarouselSlide, { key: idx, slide: slide, options: { cover: cover } });
    })));
};
/**
 * Calculates the current slide index from a millisecond offset
 *
 * @param slides - all of the currently visible slides
 * @param timeOffset - time into the entire "show", in ms
 * @param defaultDuration - a default duration for each slide
 * @returns
 */
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
