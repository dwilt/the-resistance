import React, {
    PureComponent,
} from 'react';

import {
    createIconSetFromIcoMoon,
} from 'react-native-vector-icons';

import {
    Text as RNText,
    View,
} from 'react-native';

import {
    Text,
} from '/components';

import PropTypes from 'prop-types';

import icoMoonConfig from './selection.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

import styles from './Icon.styles';

export default class DropcountrIcon extends PureComponent {
    static propTypes = {
        name: Icon.propTypes.name,
        size: Icon.propTypes.size,
        color: Icon.propTypes.color,
        text: PropTypes.string,
        textStyle: RNText.propTypes.style,
    };

    static defaultProps = {
        name: `home`,
        textStyles: {},
    };

    render() {
        const { text, textStyle, color, size } = this.props;
        const textStyles = [styles.text, {
            color,
            fontSize: size,
        }];

        const textEl = text && (
            <Text style={textStyles}>{text}</Text>
        );

        if (text) {
            textStyles.push(textStyle);
        }

        return (
            <View style={styles.container}>
                <Icon
                    {...this.props}
                />
                {textEl}
            </View>
        );
    }
}
