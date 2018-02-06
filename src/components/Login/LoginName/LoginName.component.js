import React, { PureComponent } from "react";

import PropTypes from "prop-types";

import { TextInput } from "components";

export default class LoginName extends PureComponent {
    static propTypes = {
        value: PropTypes.string,
        onChangeText: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired,
    };

    render() {
        const { show, ...rest } = this.props;

        return show ? <TextInput {...rest} label={`Name`} /> : null;
    }
}
