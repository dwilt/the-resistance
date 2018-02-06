import { StyleSheet } from 'react-native';

import {
    windowHeight,
    windowWidth,
    statusBarHeight,
    centerChildren,
} from 'styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        position: `relative`,
    },
    menu: {
        flexDirection: `row`,
        justifyContent: `flex-end`,
    },
    bgContainer: {
        ...centerChildren(),
        position: `absolute`,
        left: 0,
        top: 0,
        width: windowWidth,
        height: windowHeight,
    },
    bg: {
        height: 500,
        width: windowWidth,
        resizeMode: `stretch`,
    },
    innerContainer: {
        flex: 1,
    },
});
