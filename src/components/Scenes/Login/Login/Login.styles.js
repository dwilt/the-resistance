import {
    StyleSheet,
} from 'react-native';

import {
    centerChildren,
    white,
    windowWidth,
    gutter,
} from '/styles';

export default StyleSheet.create({
    container: {
        paddingTop: 60,
        backgroundColor: white,
    },
    wrapper: {
        ...centerChildren(true),
    },
    innerContainer: {
        width: windowWidth,
    },
    error: {
        textAlign: `center`,
        padding: gutter,
        color: `red`,
    }
});
