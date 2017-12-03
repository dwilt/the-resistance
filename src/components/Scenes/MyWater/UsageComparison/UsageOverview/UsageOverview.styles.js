import {
    StyleSheet,
} from 'react-native';

import {
    getUniversalFont,
    lightGray,
} from '/styles';

export default StyleSheet.create({
    hiddenContainer: {
        opacity: 0,
    },
    text: {
        ...getUniversalFont(0.8, 1.2),
        color: lightGray,
    },
});
