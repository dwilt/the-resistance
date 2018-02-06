import React, { PureComponent } from "react";

import PropTypes from "prop-types";

import { TextInput } from "components";

export default class LoginPassword extends PureComponent {
    static propTypes = {
        value: PropTypes.string,
        onChangeText: PropTypes.func.isRequired,
    };

    render() {
        return <TextInput {...this.props} label={`Password`} />;
    }
}
