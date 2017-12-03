import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    InboxMessageBody,
    Scene,
} from '/components';

export default class InboxMessage extends PureComponent {
    static propTypes = {
        fetchMessage: PropTypes.func.isRequired,
        subject: PropTypes.string.isRequired,
    };

    componentDidMount() {
        const { fetchMessage } = this.props;

        fetchMessage();
    }

    render() {
        const { subject } = this.props;

        return (
            <Scene
                title={subject}
                isModal={true}
                whiteBg={true}
            >
                <InboxMessageBody/>
            </Scene>
        );
    }
}
