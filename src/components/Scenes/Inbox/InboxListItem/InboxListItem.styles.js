import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    getUniversalFont,
    lightGray,
} from '/styles';

export const arrowSize = gutter / 2;

export default StyleSheet.create({
    content: {
        padding: gutter,
        flexGrow: 1,
        flexDirection: `row`,
        alignItems: `center`,
    },
    subjectContainer: {
        width: 0,
        flexGrow: 1,
    },
    subject: {
        ...getUniversalFont(1, 1.2),
        flex: 1,
    },
    timestampContainer: {
        flexShrink: 0,
    },
    timestamp: {
        ...getUniversalFont(0.8),
        color: lightGray,
    },
    arrowContainer: {
        paddingLeft: gutter / 2,
    },
});
