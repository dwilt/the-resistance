import {
    StyleSheet,
} from 'react-native';

import {
    centerChildren,
    lightGray,
} from '/styles';

export default StyleSheet.create({
    container: {
        ...centerChildren(true),
        flex: 1,
    },
    text: {
        textAlign: `center`,
        color: lightGray,
    },
});
