import { Platform } from 'react-native';

import {
    gutter,
    viewSizes,
    viewSize,
    windowWidth,
    windowHeight,
} from './structure';
import { openSans, yellow } from './index';

export const minTouchSize = gutter * 3.5;

export const centerChildren = (vertically = false) => ({
    flexDirection: vertically ? `column` : `row`,
    alignItems: `center`,
    justifyContent: `center`,
});

export const fullscreen = {
    position: `absolute`,
    left: 0,
    top: 0,
    width: windowWidth,
    height: windowHeight,
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

    return {
        fontSize,
        lineHeight,
    };
};

export const blackOverlay = {
    ...fullscreen,
    alignItems: `center`,
    paddingTop: gutter * 3,
    backgroundColor: `rgba(0, 0, 0, .9)`,
};

export const yellowTitle = {
    ...getUniversalFont(1.5, 1.2),
    color: yellow,
    fontFamily: openSans.bold,
    textAlign: `center`,
    paddingLeft: gutter,
    paddingRight: gutter,
};

export const subtitle = {
    ...getUniversalFont(1.2, 1.4),
    fontFamily: openSans.bold,
    textAlign: `center`,
    marginBottom: gutter / 2,
    paddingLeft: gutter,
    paddingRight: gutter,
};

export const voteButtons = {
    ...centerChildren(),
    paddingLeft: gutter,
    paddingRight: gutter,
    marginTop: gutter,
    marginBottom: gutter,
};

export const voteButtonsApprove = {
    marginRight: gutter,
};
