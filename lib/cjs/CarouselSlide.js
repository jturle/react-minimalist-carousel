"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var CarouselSlide = function (_a) {
    var _b;
    var slide = _a.slide, _c = _a.options, options = _c === void 0 ? {
        cover: false,
    } : _c;
    return (react_1.default.createElement("div", { style: {
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            userSelect: "none",
            touchAction: "none",
            pointerEvents: "none",
            position: "relative",
        } },
        ((_b = slide.background) === null || _b === void 0 ? void 0 : _b.url) && (react_1.default.createElement("img", { width: "100%", height: "100%", alt: slide.background.alt || "", src: slide.background.url, loading: "lazy", style: {
                display: "block",
                objectFit: options.cover ? "cover" : "contain",
                objectPosition: "center center",
                userSelect: "none",
                touchAction: "none",
                pointerEvents: "none",
            } })),
        react_1.default.createElement("div", { style: {
                position: "absolute",
                inset: 0,
                color: "white",
            } },
            slide.title && react_1.default.createElement("h1", null, slide.title),
            slide.subtitle && react_1.default.createElement("h2", null, slide.subtitle),
            slide.body && react_1.default.createElement("div", null, slide.body),
            slide.caption && react_1.default.createElement("h3", null, slide.caption),
            slide.button && react_1.default.createElement("a", { href: slide.button.uri }, slide.button.label))));
};
exports.default = CarouselSlide;
