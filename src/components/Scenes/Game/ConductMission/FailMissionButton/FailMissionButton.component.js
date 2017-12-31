import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ImageButton } from 'components';

const failCard = require(`assets/images/fail-mission-card.png`);

export default class FailMissionButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ImageButton
                {...this.props}
                source={failCard}
            >{`Fail`}</ImageButton>
        );
    }
}
