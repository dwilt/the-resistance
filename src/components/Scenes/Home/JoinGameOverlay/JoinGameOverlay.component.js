import React, { PureComponent } from 'react';

import { TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';

import { JoinGameInput, JoinGameButton } from 'components';

import styles from './JoinGameOverlay.styles';

export default class JoinGameOverlay extends PureComponent {
    static propTypes = {
        onHide: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired,
    };

    render() {
        const { onHide, show } = this.props;

        return show ? (
            <TouchableOpacity onPress={onHide} style={styles.container}>
                <View style={styles.joinCodeInput}>
                    <JoinGameInput />
                </View>
                <JoinGameButton />
            </TouchableOpacity>
        ) : null;
    }
}
