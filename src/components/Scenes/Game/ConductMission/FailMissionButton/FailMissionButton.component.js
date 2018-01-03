import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ImageButton, FailedMissionCard } from 'components';

export default class FailMissionButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ImageButton {...this.props} text={`Fail`}>
                <FailedMissionCard />
            </ImageButton>
        );
    }
}
