import {
    StyleSheet,
} from 'react-native';

import {
    yellowTitle,
    gutter,
    getUniversalFont,
    openSans,
    teal,
} from 'styles';

export default StyleSheet.create({
    container: {
        alignItems: `center`,
        marginBottom: gutter,
    },
    badge: {
        marginBottom: gutter / 2,
        width: 167,
        height: 80,
        resizeMode: `contain`,
    },
    title: {
        ...yellowTitle,
        ...getUniversalFont(1.2),
        marginBottom: gutter / 2,
    },
    subtitleContainer: {
        flexDirection: `row`,
    },
    toggleFormButton: {
        borderBottomWidth: 1,
        borderBottomColor: teal,
        marginLeft: 4,
        fontFamily: openSans.bold,
        color: teal,
    },
});
