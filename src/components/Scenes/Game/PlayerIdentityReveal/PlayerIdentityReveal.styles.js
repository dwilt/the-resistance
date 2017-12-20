import { StyleSheet } from 'react-native';

import { getUniversalFont, centerChildren, gutter, yellow } from 'styles';

const cardWidth = 100;

export default StyleSheet.create({
    container: {
        ...centerChildren(true),
        flex: 1,
        padding: gutter,
    },
    innerContainer: {
        ...centerChildren(true),
    },
    title: {
        ...getUniversalFont(1.5),
        color: yellow,
        marginBottom: gutter,
    },
    subtitle: {
        ...getUniversalFont(1, 1.2),
        marginBottom: gutter * 2,
        textAlign: `center`,
    },
    identityCard: {
        width: 100,
        height: cardWidth * 1.404544657,
        marginBottom: gutter * 2,
    },
});
