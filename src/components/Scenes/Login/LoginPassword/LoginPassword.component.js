import React, {
    Component,
} from 'react';

import PropTypes from 'prop-types';

import {
    getLocalizedString,
} from '/services/locale.service';


import {
    TextInput,
} from '/components';

import styles from './LoginPassword.styles';

export default class LoginPassword extends Component {
    static propTypes = {
        onChangeText: PropTypes.func.isRequired,
        value: PropTypes.string,
    };

    render() {
        return (
            <TextInput
                {...this.props}
                placeholder={getLocalizedString(`login.password`)}
                secureTextEntry={true}
                style={styles.container}
            />
        );
    }
}
