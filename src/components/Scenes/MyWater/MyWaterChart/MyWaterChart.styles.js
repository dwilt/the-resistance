import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    windowWidth,
    blue,
    teal,
} from '/styles';

import tinycolor from 'tinycolor2';

export const width = windowWidth - ( gutter * 2);
export const height = width * 0.7;
export const goalColor = teal;

export function getTierBackgroundColor(stepIndex) {
    return tinycolor(blue).darken(stepIndex * 10).toString();
}

export default StyleSheet.create({
    container: {
        width,
        height,
    },
});
