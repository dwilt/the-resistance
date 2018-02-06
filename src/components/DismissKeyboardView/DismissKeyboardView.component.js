import React, { PureComponent } from 'react';

import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';

export default class DismissKeyboardView extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        const { children } = this.props;

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        );
    }
}
