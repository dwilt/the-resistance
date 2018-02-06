import { connect } from 'react-redux';

import { gameMenuIsOpenSelector } from 'selectors/index';

import { getToggleGameMenuAction as onPress } from 'store/gameMenu/gameMenu.actions';

import GameMenuToggle from './GameMenuToggle.component';

export default connect(
    (state) => {
        const isOpen = gameMenuIsOpenSelector(state);

        return {
            isOpen,
        };
    },
    {
        onPress,
    },
)(GameMenuToggle);
