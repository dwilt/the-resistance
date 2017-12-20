import { StyleSheet } from 'react-native';

import {
    getUniversalFont,
    centerChildren,
    gutter,
    white,
    windowWidth,
} from 'styles';

export default StyleSheet.create({
    container: {
        paddingTop: 60,
        backgroundColor: white,
    },
    title: {
        ...getUniversalFont(1.5),
    },
});
