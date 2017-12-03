import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    lato,
    teal,
} from '/styles';

import {
    goalColor,
} from '/components/Scenes/MyWater/MyWaterChart/MyWaterChart.styles';

export default StyleSheet.create({
    goal: {
        color: goalColor,
        marginTop: gutter / 2,
    },
    goalValue: {
        fontFamily: lato.bold,
        color: goalColor,
    },
    aboveGoalText: {
        marginLeft: 4,
        fontFamily: lato.bold,
        color: goalColor,
    },
    belowGoalText: {
        marginLeft: 4,
        fontFamily: lato.bold,
        color: teal,
    },
});
