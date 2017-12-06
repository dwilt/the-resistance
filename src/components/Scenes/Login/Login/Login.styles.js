import {
    StyleSheet,
} from 'react-native';

import {
    centerChildren,
    white,
    windowWidth,
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
});
