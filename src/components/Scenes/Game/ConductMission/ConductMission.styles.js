import { StyleSheet } from 'react-native';

import { yellowTitle, subtitle } from 'styles';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    title: {
        ...yellowTitle,
    },
    subtitle: {
        ...subtitle,
    },
    player: {
        marginBottom: 20,
        flexDirection: `row`,
        alignItems: `center`,
    },
    failButton: {
        backgroundColor: `red`,
    },
});
