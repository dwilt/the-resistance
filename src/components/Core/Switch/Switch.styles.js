import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    darkGray,
    white,
} from '/styles';

export default StyleSheet.create({
    container: {
        backgroundColor: white,
        padding: gutter,
        flexDirection: `row`,
        alignItems: `center`,
    },
    label: {
        flexGrow: 1,
        marginRight: gutter,
        color: darkGray,
    },
});
