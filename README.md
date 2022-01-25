# react-minimalist-carousel

A minimalist carousel / slider.

## please note...

This library is provided _as-is_ - any futher development is pretty unlikely, as it was developed for personal use.

## features

This carousel / slider / marquee library is similar to a thousand others however it does sport **one pretty useful feature** for digital signage usage. When used with the `autoScroll` property enabled the content will automatically syncronise slide updates across all devices within the same timezone - assuming the OS is properly sychronizing the system clock with a NTP server or similar. Good news is - i'd say all operating systems do this out-of-the-box already.

Other than that, the functionality is similar to most other libraries, however content is provided via a data object rather than children.

## Installation

This react module is not currently configured for NPM publishing...

`yarn add https://github.com/jturle/react-minimalist-carousel.git`

or

`npm install https://github.com/jturle/react-minimalist-carousel.git --save`

## Props

| Name            | Value      | Description                                                                |
| --------------- | ---------- | -------------------------------------------------------------------------- |
| data            | `Carousel` | Carousel data - [See Data Types](#data-types)                              |
| className       | `string`   | Provide a class name for the Carousel Container                            |
| slideClassName  | `string`   | Provide a class name for each Slide                                        |
| cover           | `boolean`  | Render slide background images in `cover` or `contain` mode                |
| autoScroll      | `boolean`  | Enable automatic transitioning between slides                              |
| defaultDuration | `number`   | Overide the default duration for playing each slide in milliseconds (5000) |
| pauseOnHover    | `boolean`  | Automatically pause the `autoScroll` during a `:hover` state               |
| draggable       | `boolean`  | Enable _click to drag_ for non-touch devices                               |
| columns         | `1 \| 2`   | Support displaying 1 (default) or 2 slides at a time                       |

## Data Types

```ts
type ImageAsset = {
  url: string;
  alt?: string;
  mimetype?: string;
  width?: number;
  height?: number;
  filesize?: number;
};

type ButtonLink = {
  label: string;
  uri: string;
};

type Slide = {
  title?: string;
  subtitle?: string;
  // NOTE: You can use the background property to throw in any child really...
  background?: ImageAsset | React.ReactNode;
  backgroundImage?: any;
  body?: string | React.ReactNode;
  image?: ImageAsset;
  caption?: string;
  button?: ButtonLink;
  duration?: number; // Duration in milliseconds to display slide in `autoScroll` mode
};

type Carousel = {
  slides: Slide[];
};
```

## Styling

You can provide a carousel class name via the `className` prop, and a slide class name via the `slideClassName` prop. Other than that, each piece of slide content is also rendered with the following class names.

| Component          | Value            |
| ------------------ | ---------------- |
| Carousel Container | `rmc-carousel`   |
| Slide Container    | `rmc-slide`      |
| Slide Title        | `rmc-title`      |
| Slide Subtitle     | `rmc-subtitle`   |
| Slide Background   | `rmc-background` |
| Slide Body         | `rmc-body`       |
| Slide Caption      | `rmc-caption`    |
| Slide Button       | `rmc-button`     |

## Demonsration

You should be able to see it in action at <https://turle.com> shortly...
