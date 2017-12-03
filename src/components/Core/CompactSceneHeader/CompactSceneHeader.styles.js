import {
    Platform,
    StyleSheet,
} from 'react-native';

import {
    centerChildren,
    getUniversalFont,
    lato,
    minTouchSize,
    windowWidth,
    gutter,
    statusBarHeight,
    darkGray,
    white,
    shadow,
} from '/styles';

export default StyleSheet.create({
    container: {
        alignItems: `center`,
        ...Platform.select({
            ios: {
                paddingTop: statusBarHeight,
            },
            android: {
                elevation: 3,
            },
        }),
        width: windowWidth,
        flexDirection: `row`,
        position: `relative`,
        zIndex: 2,
    },
    whiteContainer: {
        ...shadow,
        backgroundColor: white,
    },
    backButtonContainer: {
        width: minTouchSize,
    },
    titleContainer: {
        flex: 1,
        ...centerChildren(),
    },
    title: {
        ...getUniversalFont(),
        color: darkGray,
        fontFamily: lato.black,
    },
    rightButtonContainer: {
        minWidth: minTouchSize,
        flexShrink: 0,
    },
    rightButtonContainerDisabled: {
        opacity: 0.3,
    },
    rightButton: {
        ...centerChildren(true),
        minWidth: minTouchSize,
        minHeight: minTouchSize,
        paddingRight: gutter,
        paddingLeft: gutter,
    },
    rightButtonText: {
        ...getUniversalFont(),
        color: darkGray,
    },
});
