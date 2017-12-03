import {
    Platform,
    StyleSheet,
} from 'react-native';

import {
    lightBlue,
    gutter,
} from '/styles';

export default StyleSheet.create({
    container: {
        backgroundColor: lightBlue,
    },
    unStretchedContainer: {
        flexGrow: 0,
    },
    card: {
        margin: gutter,
        marginBottom: 0,
        shadowColor: `black`,
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        ...Platform.select({
            android: {
                elevation: 5,
            },
        }),
    },
    lastCard: {
        marginBottom: gutter,
    },
});
