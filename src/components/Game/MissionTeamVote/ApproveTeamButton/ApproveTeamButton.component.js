import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ImageButton, ApproveMissionTeamCard } from 'components';

export default class ApproveTeamButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ImageButton {...this.props} text={`Approve`}>
                <ApproveMissionTeamCard />
            </ImageButton>
        );
    }
}
