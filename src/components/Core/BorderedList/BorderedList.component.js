import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import styles from './BorderedList.styles';

export default class BorderedList extends PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired,
    };

    render() {
        const { children } = this.props;

        return (
            <View style={styles.container}>
                {children.map((child, i) => {
                    const itemStyles = [styles.item];

                    if (i === children.length - 1) {
                        itemStyles.push(styles.lastItem);
                    }
                    return (
                        <View
                            key={i}
                            style={itemStyles}
                        >
                            {child}
                        </View>
                    );
                })}
            </View>
        );
    }
}
