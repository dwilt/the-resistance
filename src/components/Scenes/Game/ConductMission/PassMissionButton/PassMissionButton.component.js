import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ImageButton } from 'components';

const passCard = require(`assets/images/pass-mission-card.png`);

export default class PassMissionButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ImageButton
                {...this.props}
                source={passCard}
            >{`Pass`}</ImageButton>
        );
    }
}
