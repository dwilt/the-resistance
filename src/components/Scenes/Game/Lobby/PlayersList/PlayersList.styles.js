import { StyleSheet } from 'react-native';

import { gutter, windowWidth } from 'styles';

const playerWidth = (windowWidth - gutter * 3) / 2;

export default StyleSheet.create({
    container: {
        flexDirection: `row`,
        flexWrap: `wrap`,
        paddingLeft: gutter / 2,
        paddingRight: gutter / 2,
    },
    player: {
        width: playerWidth,
        marginBottom: gutter / 2,
        marginLeft: gutter / 2,
        marginRight: gutter / 2,
    },
});
