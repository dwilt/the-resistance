import { StyleSheet } from 'react-native';

import {
    centerChildren,
    gutter,
    getUniversalFont,
    openSans,
    yellow,
} from 'styles';

const imageWidth = 100;

export default StyleSheet.create({
    container: {
        ...centerChildren(true),
    },
    imageContainer: {
        marginBottom: gutter,
        borderWidth: 3,
        borderColor: `transparent`,
    },
    selectedImageContainer: {
        borderColor: yellow,
    },
    image: {
        width: imageWidth,
        height: imageWidth * 1.4,
    },
    label: {
        ...getUniversalFont(1.4),
        fontFamily: openSans.bold,
        textAlign: `center`,
    },
    selectedLabel: {
        color: yellow,
    },
});
