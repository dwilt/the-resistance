import { Platform } from 'react-native';

import { gutter, viewSizes, viewSize } from './structure';

export const minTouchSize = gutter * 4;

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

export const isAndroid = () => Platform.OS === `android`;

const { largeTablet, largePhone, tablet } = viewSizes;
let initFontSize;

switch (viewSize) {
    case largePhone:
        initFontSize = 16;
        break;

    case tablet:
        initFontSize = 18;
        break;

    case largeTablet:
        initFontSize = 20;
        break;

    default:
        initFontSize = 14;
}

export const baseFontSize = initFontSize;

export const getUniversalFont = (fontSizeRatio = 1, lineHeightRatio = 1) => {
    const fontSize = Math.round(baseFontSize * fontSizeRatio);
    let lineHeight = Math.round(fontSize * lineHeightRatio);

    if (isAndroid()) {
        lineHeight = Math.round(lineHeight * 1.2);
    }

    return {
        fontSize,
        lineHeight,
    };
};
