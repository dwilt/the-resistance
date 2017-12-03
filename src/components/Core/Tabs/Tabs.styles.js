import {
    StyleSheet,
} from 'react-native';

import {
    shadow,
} from '/styles';

export default StyleSheet.create({
    container: {
        ...shadow,
        backgroundColor: `white`,
        flexDirection: `row`,
        flexGrow: 1,
    },
    tab: {
        flexGrow: 1,
    },
});
