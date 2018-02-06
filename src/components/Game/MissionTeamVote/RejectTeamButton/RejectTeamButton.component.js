import React, { PureComponent } from 'react';

import { ImageButton, RejectMissionTeamCard } from 'components';

import PropTypes from 'prop-types';

export default class RejectTeamButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ImageButton {...this.props} text={`Reject`}>
                <RejectMissionTeamCard />
            </ImageButton>
        );
    }
}
