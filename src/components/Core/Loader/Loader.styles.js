import {
    StyleSheet,
} from 'react-native';

import {
    centerChildren,
    gutter,
} from '/styles';

export default StyleSheet.create({
    container: {
        paddingTop: gutter * 3,
    },
    stretchContainer: {
        ...centerChildren(true),
        padding: 0,
        flex: 1,
    },
});
