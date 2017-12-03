import {
    StyleSheet,
    Platform,
} from 'react-native';

import {
    gutter,
    darkGray,
    getUniversalFont,
    lightGray,
    blue,
    white,
} from '/styles';

const barSpacing = gutter * 1;
export const barWidth = gutter * 1.25;
const maxBarWidth = barWidth + (gutter / 2);
const maxBarHeight = 4;

const fadeWidth = gutter * 2;
const fade = {
    position: `absolute`,
    top: 0,
    width: gutter * 2,
    zIndex: 3,
};

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    legend: {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        paddingBottom: gutter / 2,
    },
    chartContent: {
        position: `relative`,
        flexDirection: `row`,
        flex: 1,
    },
    yAxis: {
        zIndex: 2,
        paddingLeft: gutter,
        backgroundColor: white,
        paddingTop: 8,
        top: -8,
    },
    yAxisLabel: {
        ...getUniversalFont(0.8, 1),
        color: darkGray,
        top: -8,
    },
    plotView: {
        position: `relative`,
        flex: 1,
        zIndex: 2,
    },
    linesContainer: {
        position: `absolute`,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    line: {
        position: `absolute`,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: lightGray,
    },
    leftBarFade: {
        ...fade,
        left: 0,
    },
    rightBarFade: {
        ...fade,
        right: 0,
    },
    leftXAxisFade: {
        ...fade,
        left: 0,
        bottom: 0,
    },
    rightXAxisFade: {
        ...fade,
        right: 0,
        bottom: 0,
    },
    scrollContainer: {
        flex: 1,
        ...Platform.select({
            android: {
                paddingBottom: gutter,
            },
            ios: {
                paddingBottom: gutter / 2,
            },
        }),
    },
    scrollContentContainer: {
        paddingLeft: fadeWidth - barSpacing / 2,
        paddingRight: fadeWidth - barSpacing / 2,
    },
    lineChart: {
        position: `absolute`,
        left: gutter * 1.5,
        zIndex: 2,
        backgroundColor: `blue`,
    },
    barsContainer: {
        zIndex: 3,
        flex: 1,
        flexDirection: `row`,
        alignItems: `flex-end`,
        justifyContent: `center`,
    },
    outerBarContainer: {
        paddingLeft: barSpacing / 2,
        paddingRight: barSpacing / 2,
    },
    barContainer: {
        paddingLeft: 4,
        paddingRight: 4,
        position: `relative`,
        justifyContent: `flex-end`,
        alignItems: `center`,
    },
    barWrapper: {
        overflow: `hidden`,
        borderTopRightRadius: gutter,
        borderTopLeftRadius: gutter,
    },
    bar: {
        width: barWidth,
        borderTopLeftRadius: gutter,
        borderTopRightRadius: gutter,
    },
    plainBar: {
        backgroundColor: blue,
    },
    barLabelContainer: {
        alignItems: `center`,
    },
    maxLineContainer: {
        alignItems: `center`,
        position: `absolute`,
        left: 0,
        right: 0,
    },
    maxLine: {
        width: maxBarWidth,
        height: maxBarHeight,
        flexGrow: 0,
    },
    tick: {
        width: 1,
        height: gutter / 2,
        marginBottom: gutter / 2,
        backgroundColor: lightGray,
    },
    barLabel: {
        ...getUniversalFont(0.8, 1.2),
        textAlign: `center`,
        color: darkGray,
    },
    lineText: {
        ...getUniversalFont(0.8),
    },
    lineKey: {
        width: maxBarWidth,
        height: maxBarHeight,
        marginRight: gutter / 2,
        flexGrow: 0,
    },
});
