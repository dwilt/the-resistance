import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    TextInput,
} from '/components';

import styles from './PokeUtilityMessage.styles';

export default class PokeUtilityMessage extends PureComponent {
    static propTypes = {
        componentDidMount: PropTypes.func.isRequired,
        onChangeText: PropTypes.func.isRequired,
        value: PropTypes.string,
    };


    componentDidMount() {
        const { componentDidMount } = this.props;

        componentDidMount();
    }

    render() {
        return (
            <TextInput
                {...this.props}
                multiline={true}
                autoCapitalize={`sentences`}
                autoCorrect={true}
                inputStyle={styles.input}
            />
        );
    }
}
