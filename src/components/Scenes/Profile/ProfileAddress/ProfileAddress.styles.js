import {
    StyleSheet,
} from 'react-native';

import {
   gutter,
    darkGray,
} from '/styles';

export const iconSize = gutter * 2.5;
export const iconColor = darkGray;

export default StyleSheet.create({
    container: {
        padding: gutter * 2,
        paddingTop: gutter,
    },
    address: {
        marginTop: gutter,
    },
    street: {
        marginBottom: gutter / 4,
    },
    addressLine: {
        color: darkGray,
        textAlign: `center`,
    },
});
