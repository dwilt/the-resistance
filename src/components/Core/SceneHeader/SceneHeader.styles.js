import {
    Platform,
    StyleSheet,
} from 'react-native';

import {
    statusBarHeight,
    gutter,
    getUniversalFont,
    shadow,
    white,
} from '/styles';

export default StyleSheet.create({
    container: {
        ...shadow,
        ...Platform.select({
            ios: {
                paddingTop: statusBarHeight,
            },
            android: {
                elevation: 3,
            },
        }),
        backgroundColor: white,
        position: `relative`,
        zIndex: 2,
    },
    innerContainer: {
        paddingRight: gutter,
        paddingBottom: gutter,
        paddingLeft: gutter,
        height: gutter * 4,
        flexDirection: `row`,
    },
    titleContainer: {
        justifyContent: `flex-end`,
    },
    title: {
        ...getUniversalFont(1.5, 1.1),
    },
    rightContainer: {
        flexGrow: 1,
    },
});
