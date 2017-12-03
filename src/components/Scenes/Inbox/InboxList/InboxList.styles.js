import {
    StyleSheet,
} from 'react-native';

import {
    windowWidth,
    veryLightGray,
    white,
} from '/styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    message: {
        flexGrow: 1,
        borderBottomWidth: 1,
        borderBottomColor: veryLightGray,
        width: windowWidth,
    },
});
