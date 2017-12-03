import React, {
    Component,
} from 'react';

import {
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import {
    round,
} from 'lodash';

import LinearGradient from 'react-native-linear-gradient';

import PropTypes from 'prop-types';

import {
    Text,
} from '/components';

import styles,{

} from './BarChart.styles';

export default class BarChart extends Component {
    static propTypes = {
        height: PropTypes.number.isRequired,
        numberOfLines: PropTypes.number.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
        })).isRequired,
        xAxisFormatter: PropTypes.func,
        steps: PropTypes.arrayOf(PropTypes.shape({
            start: PropTypes.number.isRequired,
            end: PropTypes.number.isRequired,
            backgroundColor: PropTypes.string.isRequired,
        })).isRequired,
        onBarPress: PropTypes.func.isRequired,
        maxLineColor: PropTypes.string.isRequired,
        line: PropTypes.arrayOf(PropTypes.number).isRequired,
        lineLabel: PropTypes.string.isRequired,
    };

    static defaultProps = {
        height: 400,
        numberOfLines: 6,
        loading: false,
        steps: [],
        line: [],
        maxLineColor: `black`,
        lineLabel: `Line`,
    };

    getHighestDataValue = () => {
        const { data, line } = this.props;

        return Math.max(...data.map(({ value, max = 0 }) => Math.max(value, max)), ...line.map(val => val));
    };

    getMaxValue = () => {
        const maxDataValue = this.getHighestDataValue();

        let roundTo = `1`;

        for (let i = 1; i < maxDataValue.toString().length; i++) {
            roundTo = roundTo.concat(`0`);
        }

        roundTo = parseInt(roundTo, 10);

        let maxValue = Math.ceil(maxDataValue / roundTo) * roundTo;

        if ((maxDataValue / maxValue) > 0.84) {
            maxValue *= 1.2;
        }

        return maxValue;
    };

    render() {
        const {
            data,
            height,
            numberOfLines,
            xAxisFormatter,
            steps,
            onBarPress,
            maxLineColor,
            line,
            lineLabel,
        } = this.props;

        const xAxisHeight = height / numberOfLines;
        const maxValue = this.getMaxValue();

        const bars = (
            <View
                style={styles.barsContainer}
            >
                {data.map(({ value, label }, dataIndex) => {
                    const barHeight = (value / maxValue) * height;
                    const barStyles = [styles.bar, { height: barHeight }];
                    const max = line[dataIndex];

                    let bar = (
                        <View style={[barStyles, styles.plainBar]}/>
                    );

                    if (steps.length) {
                        const locations = [];
                        const colors = [];

                        let stepPercentageComplete = 0;
                        steps.forEach(({ start, end, backgroundColor }) => {
                            if (value > start) {
                                locations.push(stepPercentageComplete);
                                stepPercentageComplete += value > end ? round((end - start) / value, 2) : round((value - start) / value, 2);
                                locations.push(stepPercentageComplete);
                                colors.push(backgroundColor, backgroundColor);
                            }
                        });

                        bar = (
                            <View style={styles.barWrapper}>
                                <LinearGradient
                                    start={{ x: 0.0, y: 1 }}
                                    end={{ x: 0, y: 0 }}
                                    style={barStyles}
                                    colors={colors}
                                    locations={locations}
                                />
                            </View>
                        );
                    }

                    let maxEl = !!max && (
                        <View
                            style={[styles.maxLineContainer, {
                                bottom: Math.round((max / maxValue) * height),
                            }]}
                        >
                            <View
                                style={[styles.maxLine, {
                                    backgroundColor: maxLineColor,
                                }]}
                            />
                        </View>
                    );

                    return (
                        <TouchableOpacity
                            key={dataIndex}
                            style={styles.outerBarContainer}
                            onPress={() => onBarPress(dataIndex)}
                        >
                            <View
                                style={[styles.barContainer, { height }]}
                            >
                                {bar}
                                {maxEl}
                            </View>
                            <View style={styles.barLabelContainer}>
                                <View style={styles.tick}/>
                                <Text style={styles.barLabel}>{label}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );

        const legend = !!line.length && !!lineLabel && (
            <View style={styles.legend}>
                <View style={[styles.lineKey, {
                    backgroundColor: maxLineColor,
                }]}/>
                <Text style={styles.lineText}>{lineLabel}</Text>
            </View>
        );

        return (
            <View style={{ minHeight: height }}>
                <View style={styles.container}>
                    {legend}
                    <View style={styles.chartContent}>
                        <View style={[styles.yAxis]}>
                            {Array.from(new Array(numberOfLines).keys()).reverse().map((index) => {
                                const baseIndex = index + 1;
                                const axisValue = Math.round(maxValue * (baseIndex / numberOfLines));

                                return (
                                    <View
                                        key={index}
                                        style={{
                                            height: xAxisHeight,
                                        }}
                                    >
                                        <Text style={styles.yAxisLabel}>{xAxisFormatter(axisValue)}</Text>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={[styles.linesContainer, { height }]}>
                            {Array.from(new Array(numberOfLines + 1).keys()).map((index) => {
                                const bottom = index ? (Math.round(xAxisHeight * index)) - 1 : 0;

                                return (
                                    <View
                                        key={index}
                                        style={[styles.line, {
                                            bottom,
                                        }]}
                                    />
                                );
                            })}
                        </View>
                        <View
                            style={styles.plotView}
                        >
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={[`white`, `rgba(255, 255, 255, 0)`]}
                                style={[styles.leftBarFade, { height }]}
                            />
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={[`rgba(255, 255, 255, 0)`, `white`]}
                                style={[styles.rightBarFade, { height }]}
                            />
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={[`white`, `rgba(255, 255, 255, 0)`]}
                                style={[styles.leftXAxisFade, { top: height + 1 }]}
                            />
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={[`rgba(255, 255, 255, 0)`, `white`]}
                                style={[styles.rightXAxisFade, { top: height + 1 }]}
                            />
                            <ScrollView
                                horizontal={true}
                                style={styles.scrollContainer}
                                contentContainerStyle={styles.scrollContentContainer}
                            >

                                {bars}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
