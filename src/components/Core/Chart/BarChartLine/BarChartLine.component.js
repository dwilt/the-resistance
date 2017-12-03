import React, {
    PureComponent,
} from 'react';

import {
    line,
    curveCatmullRom,
} from 'd3-shape';

import {
    Path,
} from 'react-native-svg';

import {
    blue,
} from '/styles';

import PropTypes from 'prop-types';

export default class BarChartLine extends PureComponent {
    static propTypes = {
        coordinates: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        })).isRequired,
        width: PropTypes.number.isRequired,
    };

    render() {
        const { coordinates, width } = this.props;
        const finalCoords = [...coordinates];

        finalCoords.unshift({
            x: 0,
            y: coordinates[0].y,
        });

        finalCoords.push({
            x: width,
            y: coordinates[coordinates.length - 1].y,
        });

        const lineFunction = line()
            .x(({ x }) => x)
            .y(({ y }) => y)
            .curve(curveCatmullRom.alpha(1));


        let d = lineFunction(finalCoords);

        return (
            <Path
                d={d}
                fill={`none`}
                stroke={blue}
                strokeWidth={2}
            />
        );
    }
}
