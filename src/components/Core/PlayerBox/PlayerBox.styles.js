import { StyleSheet } from 'react-native';
import { getUniversalFont, gutter, white } from '../../../styles';

export default StyleSheet.create({
    container: {
        flexDirection: `row`,
        alignItems: `center`,
        borderWidth: 1,
        borderColor: white,
        borderRadius: 2,
        padding: gutter / 2,
    },
    userIcon: {
        width: gutter * 1.75,
        height: gutter * 1.75,
        marginRight: gutter,
    },
    name: {
        ...getUniversalFont(1.2),
        color: white,
    },
});
