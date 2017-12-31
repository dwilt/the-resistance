import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ImageButton } from 'components';

const rejectCard = require(`assets/images/reject-mission-team-card.png`);

export default class RejectTeamButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ImageButton {...this.props} source={rejectCard}>
                {`Reject`}
            </ImageButton>
        );
    }
}
