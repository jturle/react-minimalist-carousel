"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
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
        slide.backgroundImage ? slide.backgroundImage : null,
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
exports.default = CarouselSlide;
