import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    Switch,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

export default class EvaporativeCoolerSwitch extends PureComponent {
    static propTypes = {
        onValueChange: PropTypes.func.isRequired,
        value: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <Switch
                {...this.props}
            >
                {getLocalizedString(`misc.evaporativeCoolerSwitch`)}
            </Switch>
        );
    }
}
