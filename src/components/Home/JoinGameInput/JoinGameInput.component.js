import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { CodeInput } from 'components/index';

export default class JoinGameInput extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        onChangeText: PropTypes.func.isRequired,
        value: PropTypes.string,
    };

    render() {
        return <CodeInput {...this.props} label={`Enter game code`} />;
    }
}
