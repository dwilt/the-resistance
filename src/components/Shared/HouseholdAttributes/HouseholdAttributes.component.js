import React, {
    PureComponent,
} from 'react';

import {
    BathroomsInput,
    BedroomsInput,
    BorderedList,
    DishwasherSwitch,
    DripIrrigationSwitch,
    EvaporativeCoolerSwitch,
    HouseholdSizeInput,
    LawnSwitch,
    PoolSwitch,
    SprinklerSwitch,
    SprinklerWeatherStationSwitch,
    WashingMachineSwitch,
} from '/components';

export default class HouseholdAttributes extends PureComponent {

    render() {
        return (
            <BorderedList>
                <HouseholdSizeInput/>
                <BathroomsInput/>
                <BedroomsInput/>
                <DishwasherSwitch/>
                <EvaporativeCoolerSwitch/>
                <LawnSwitch/>
                <PoolSwitch/>
                <WashingMachineSwitch/>
                <SprinklerSwitch/>
                <SprinklerWeatherStationSwitch/>
                <DripIrrigationSwitch/>
            </BorderedList>
        );
    }
}
