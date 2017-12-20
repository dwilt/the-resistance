import { StyleSheet } from 'react-native';

import { centerChildren, gutter } from 'styles';

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
