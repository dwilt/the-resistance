import {
    StyleSheet,
} from 'react-native';

import {
    minTouchSize,
    centerChildren,
} from '/styles';

export default StyleSheet.create({
    container: {
        ...centerChildren(true),
        width: minTouchSize,
        height: minTouchSize,
    },
});
