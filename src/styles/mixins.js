import { Platform } from "react-native";

import { gutter, viewSizes, viewSize } from "./structure";

export const minTouchSize = gutter * 4;

import {
    openSans
} from './fonts';

export const centerChildren = (vertically = false) => ({
    flexDirection: vertically ? `column` : `row`,
    alignItems: `center`,
    justifyContent: `center`,
});

export const fullscreen = {
    position: `absolute`,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
};

export const isAndroid = () => {
    return Platform.OS === `android`;
};

export const isIOS = () => {
    return Platform.OS === `ios`;
};

const { largeTablet, largePhone, tablet } = viewSizes;
let initFontSize;

switch (viewSize) {
    case largePhone:
        initFontSize = 20;
        break;

    case tablet:
        initFontSize = 22;
        break;

    case largeTablet:
        initFontSize = 24;
        break;

    default:
        initFontSize = 18;
}

export const baseFontSize = initFontSize;

export const getUniversalFont = (fontSizeRatio = 1, lineHeightRatio = 1) => {
    const fontSize = Math.round(baseFontSize * fontSizeRatio);
    let lineHeight = Math.round(fontSize * lineHeightRatio);

    if (isAndroid()) {
        lineHeight = Math.round(lineHeight * 1.2);
    }

    return {
        fontFamily: openSans.regular,
        fontSize,
        lineHeight,
    };
};
