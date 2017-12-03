import {
    StyleSheet,
} from 'react-native';

import {
    lighterGray,
    gutter,
} from '/styles';

export default StyleSheet.create({
    container: {
        borderLeftColor: lighterGray,
        borderLeftWidth: 1,
        marginBottom: 0,
        flex: 1,
        marginLeft: gutter,
    },
});
