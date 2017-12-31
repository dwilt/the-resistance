import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ImageButton } from 'components';

const approveCard = require(`assets/images/approve-mission-team-card.png`);

export default class ApproveTeamButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ImageButton {...this.props} source={approveCard}>
                {`Approve`}
            </ImageButton>
        );
    }
}
