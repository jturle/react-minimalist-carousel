import React from "react";
import styled from "@emotion/styled";
var Container = styled.div(function () { return ({
    display: "flex",
    backgroundColor: "red",
}); });
var CarouselComponent = function (_a) {
    var data = _a.data;
    return React.createElement(Container, null, JSON.stringify(data, null, 2));
};
export default CarouselComponent;
