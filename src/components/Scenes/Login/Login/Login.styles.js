import {
    StyleSheet,
} from 'react-native';

import {
    centerChildren,
    gutter,
    white,
    windowWidth,
} from '/styles';

const logoWidth = windowWidth * 0.6;

export default StyleSheet.create({
    container: {
        backgroundColor: white,
    },
    wrapper: {
        ...centerChildren(true),
    },
    innerContainer: {
        width: windowWidth,
    },
    logoContainer: {
        ...centerChildren(),
    },
    logo: {
        width: logoWidth,
        height: logoWidth * 0.174966353,
        resizeMode: `cover`,
        marginBottom: gutter * 3,
    },
});
