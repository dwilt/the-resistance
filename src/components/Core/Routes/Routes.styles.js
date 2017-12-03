import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    white,
    lightBlue,
} from '/styles';

export default StyleSheet.create({
    router: {
        backgroundColor: lightBlue,
    },
    tabs: {
        height: gutter * 4,
        backgroundColor: white,
        borderTopWidth: 1,
        borderTopColor: lightBlue,
    },
});
