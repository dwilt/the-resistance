import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    darkGray,
    getUniversalFont,
} from '/styles';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    householdInstructions: {
        ...getUniversalFont(1, 1.3),
        margin: gutter,
        color: darkGray,
    },
});
