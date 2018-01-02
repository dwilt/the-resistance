import React, { PureComponent } from 'react';

import { View } from 'react-native';

import PropTypes from 'prop-types';

import { JoinGameInput, JoinGameButton, CancelJoinGame } from 'components';

import styles from './JoinGameOverlay.styles';

export default class JoinGameOverlay extends PureComponent {
    static propTypes = {
        show: PropTypes.bool.isRequired,
    };

    render() {
        const { show } = this.props;

        return show ? (
            <View style={styles.container}>
                <View style={styles.joinCodeInput}>
                    <JoinGameInput />
                </View>
                <JoinGameButton />
                <CancelJoinGame/>
            </View>
        ) : null;
    }
}
