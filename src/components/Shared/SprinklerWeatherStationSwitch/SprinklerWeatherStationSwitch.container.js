import {
    connect,
} from 'react-redux';

import {
    getSprinklerWeatherStationAction as onValueChange,
} from '/store/user/user.actions';

import {
    userProfileSprinklerWeatherStationSelector,
} from '/selectors';

import SprinklerWeatherStationSwitch from './SprinklerWeatherStationSwitch.component';

export default connect(state => {
    const value = userProfileSprinklerWeatherStationSelector(state);

    return {
        value,
    };
}, {
    onValueChange,
})(SprinklerWeatherStationSwitch);
