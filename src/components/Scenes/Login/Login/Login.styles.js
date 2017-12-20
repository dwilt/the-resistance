import { StyleSheet } from 'react-native';

import { centerChildren, gutter } from 'styles';

export default StyleSheet.create({
    container: {
        paddingTop: 60,
        padding: gutter * 2,
    },
    wrapper: {
        ...centerChildren(true),
    },
});
