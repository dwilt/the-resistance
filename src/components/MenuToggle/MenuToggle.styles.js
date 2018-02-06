import { StyleSheet } from 'react-native';

import { gutter, white, minTouchSize, centerChildren } from 'styles';

export const iconSize = gutter * 1.5;
export const iconColor = white;

export default StyleSheet.create({
    container: {
        ...centerChildren(true),
        width: minTouchSize,
        height: minTouchSize,
    },
});
