import { connect } from 'react-redux';

import { menuIsOpenSelector } from 'selectors';

import { getToggleMenuAction as onPress } from 'store/menu/menu.actions';

import MenuToggle from './MenuToggle.component';

export default connect(
    (state) => {
        const isOpen = menuIsOpenSelector(state);
        return { isOpen };
    },
    { onPress },
)(MenuToggle);
