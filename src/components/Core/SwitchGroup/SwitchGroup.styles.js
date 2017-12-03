import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    getUniversalFont,
    black,
    darkGray,
    white,
} from '/styles';

export default StyleSheet.create({
    container: {
        backgroundColor: white,
        padding: gutter,
        paddingRight: 0,
        paddingTop: 0,
        flexDirection: `row`,
        alignItems: `flex-start`,
    },
    titlesContainer: {
        paddingTop: gutter,
        marginRight: gutter,
        width: 0,
        flex: 1,
    },
    title: {
        ...getUniversalFont(1.1),
        color: black,
        marginBottom: gutter / 2,
    },
    subtitle: {
        ...getUniversalFont(1, 1.1),
        color: darkGray,
    },
    group: {
        justifyContent: `flex-start`,
        alignItems: `flex-end`,
    },
});
