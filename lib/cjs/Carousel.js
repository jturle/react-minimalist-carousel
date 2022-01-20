"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_1 = __importDefault(require("@emotion/styled"));
var Container = styled_1.default.div(function () { return ({
    display: "flex",
    backgroundColor: "orange",
}); });
var CarouselComponent = function (_a) {
    var data = _a.data;
    return react_1.default.createElement(Container, null, JSON.stringify(data, null, 2));
};
exports.default = CarouselComponent;
