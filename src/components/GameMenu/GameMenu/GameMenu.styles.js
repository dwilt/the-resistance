import { StyleSheet } from 'react-native';

import { gutter, centerChildren } from 'styles';

export default StyleSheet.create({
    container: {
        ...centerChildren(true),
        flex: 1,
    },
    gameCode: {
        marginBottom: gutter,
    },
});
