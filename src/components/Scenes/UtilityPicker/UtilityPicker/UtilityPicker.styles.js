import {
    StyleSheet,
} from 'react-native';

import {
    lightBlue,
    gutter,
    windowWidth,
} from '/styles';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    inputAndButtonContainer: {
        marginTop: gutter,
        width: windowWidth,
        flexDirection: `row`,
    },
    input: {
        flex: 1,
    },
    searchButton: {
        marginBottom: 0,
    },
    results: {
        flex: 1,
        backgroundColor: lightBlue,
        paddingBottom: gutter,
    },
});
