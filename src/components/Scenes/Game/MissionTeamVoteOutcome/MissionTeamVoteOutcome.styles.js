import { StyleSheet } from 'react-native';

import { getUniversalFont, white } from 'styles';

export default StyleSheet.create({
    container: {
        paddingTop: 60,
    },
    title: {
        ...getUniversalFont(1.5),
    },
});
