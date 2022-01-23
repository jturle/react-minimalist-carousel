import React from "react";
export declare type ImageAsset = {
    url: string;
    alt?: string;
    mimetype?: string;
    width?: number;
    height?: number;
    filesize?: number;
};
export declare type ButtonLink = {
    label: string;
    uri: string;
};
export declare type Slide = {
    title?: string;
    subtitle?: string;
    background?: ImageAsset;
    backgroundImage?: React.ReactNode;
    body?: string | React.ReactNode;
    image?: ImageAsset;
    caption?: string;
    button?: ButtonLink;
    duration?: number;
};
export declare type Carousel = {
    slides: Slide[];
};
