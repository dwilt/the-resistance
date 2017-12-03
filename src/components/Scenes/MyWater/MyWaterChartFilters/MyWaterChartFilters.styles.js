import {
    Platform,
    StyleSheet,
} from 'react-native';

export default StyleSheet.create({
    container: {
        ...Platform.select({
            android: {
                elevation: 3,
            },
        }),
    },
});
