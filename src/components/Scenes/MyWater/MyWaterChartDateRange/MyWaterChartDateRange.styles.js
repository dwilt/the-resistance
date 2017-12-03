import {
    StyleSheet,
} from 'react-native';

import {
    centerChildren,
    getUniversalFont,
} from '/styles';

export default StyleSheet.create({
    container: {
        ...centerChildren(),
        flex: 1,
    },
    text: {
        ...getUniversalFont(1.1),
    },
});
