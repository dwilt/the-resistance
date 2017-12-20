import { StyleSheet } from 'react-native';

import {
    getUniversalFont,
    centerChildren,
    gutter,
    white,
    windowWidth,
    darkGray,
} from 'styles';

export default StyleSheet.create({
    container: {
        ...centerChildren(true),
        padding: gutter,
    },
    join: {
        paddingBottom: gutter * 2,
        marginBottom: gutter * 2,
    },
    joinCodeInput: {
        ...centerChildren(),
        marginBottom: gutter,
    },
});
