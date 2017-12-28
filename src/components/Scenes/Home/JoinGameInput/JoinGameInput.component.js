import React, { PureComponent } from 'react';

import {
    CodeInput,
} from 'components/index';

export default class JoinGameInput extends PureComponent {

    render() {
        return (
            <CodeInput
                {...this.props}
                label={`Enter game code`}
            />
        );
    }
}