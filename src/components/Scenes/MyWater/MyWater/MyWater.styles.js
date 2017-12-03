import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    white,
} from '/styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    chartContainer: {
        position:`relative`,
    },
    timeFilter: {
        flexDirection: `row`,
        alignItems: `center`,
        marginBottom: gutter / 2,
        marginTop: gutter / 2,
    },
    chart: {
        flex: 1,
        marginBottom: gutter,
    },
    comparison: {
        paddingRight: gutter,
        paddingLeft: gutter,
        marginBottom: gutter * 2,
    },
    comparisonInner: {
        flexDirection: `row`,
        justifyContent: `space-around`,
        marginBottom: gutter,
    },
});
