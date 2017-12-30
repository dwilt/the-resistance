import { StyleSheet } from 'react-native';

import { getUniversalFont } from 'styles/index';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    title: {
        ...getUniversalFont(1.5),
    },
});
