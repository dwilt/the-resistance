import React, { PureComponent } from 'react';

import { Text } from 'react-native';

import styles from './Text.styles';

export default class GJSText extends PureComponent {
    static propTypes = {
        style: Text.propTypes.style,
    };

    static defaultProps = {
        style: {},
    };

    render() {
        const { style } = this.props;
        const textStyles = [styles.text];

        textStyles.push(style);

        return <Text {...this.props} style={textStyles} />;
    }
}
