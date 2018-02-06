import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ImageButton, PassedMissionCard } from 'components';

export default class PassMissionButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ImageButton {...this.props} text={`Pass`}>
                <PassedMissionCard />
            </ImageButton>
        );
    }
}
