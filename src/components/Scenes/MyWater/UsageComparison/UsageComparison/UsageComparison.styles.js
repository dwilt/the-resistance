import {
    StyleSheet,
} from 'react-native';

import {
   gutter,
    getUniversalFont,
} from '/styles';

export default StyleSheet.create({
    title: {
        ...getUniversalFont(1.1),
        marginBottom: gutter * 1.5,
    },
});
