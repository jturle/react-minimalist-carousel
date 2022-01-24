import * as React from "react";
var CarouselSlide = function (_a) {
    var _b;
    var slide = _a.slide, _c = _a.className, className = _c === void 0 ? "rmc-slide" : _c, _d = _a.options, options = _d === void 0 ? {
        cover: false,
    } : _d;
    return (React.createElement("div", { className: className, style: {
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            userSelect: "none",
            touchAction: "none",
            pointerEvents: "none",
            position: "relative",
        } },
        slide.backgroundImage,
        !slide.backgroundImage && ((_b = slide.background) === null || _b === void 0 ? void 0 : _b.url) && (React.createElement("img", { alt: slide.background.alt || "", src: slide.background.url, loading: "lazy", style: {
                objectFit: options.cover ? "cover" : "contain",
                objectPosition: "center center",
                userSelect: "none",
                touchAction: "none",
                pointerEvents: "none",
                width: "100%",
                height: "100%",
            } })),
        React.createElement("div", { style: {
                position: "absolute",
                inset: 0,
                color: "white",
            } },
            slide.title && React.createElement("h1", null, slide.title),
            slide.subtitle && React.createElement("h2", null, slide.subtitle),
            slide.body && React.createElement("div", null, slide.body),
            slide.caption && React.createElement("h3", null, slide.caption),
            slide.button && React.createElement("a", { href: slide.button.uri }, slide.button.label))));
};
export default CarouselSlide;
