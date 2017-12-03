import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    lighterGray,
} from '/styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: gutter,
    },
    item: {
        alignItems: `stretch`,
        borderBottomColor: lighterGray,
        borderBottomWidth: 1,
    },
    lastItem: {
        borderBottomWidth: 0,
    },
});
