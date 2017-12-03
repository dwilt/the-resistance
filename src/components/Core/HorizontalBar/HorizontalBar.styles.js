import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    darkGray,
    windowWidth,
    getUniversalFont,
    lightGray,
    lato,
} from '/styles';

import {
    barWidth,
} from '/components/Core/Chart/BarChart/BarChart.styles';

export const barColor = darkGray;
export const maxBarWidth = windowWidth - (gutter * 2);

export default StyleSheet.create({
    container: {
        marginBottom: gutter,
    },
    title: {
        ...getUniversalFont(0.8),
        fontFamily: lato.bold,
        marginBottom: gutter / 4,
    },
    value: {
        ...getUniversalFont(0.8),
        color: lightGray,
    },
    barContainer: {
        width: maxBarWidth,
    },
    bar: {
        height: barWidth,
        borderBottomRightRadius: gutter,
        borderTopRightRadius: gutter,
    },
});
