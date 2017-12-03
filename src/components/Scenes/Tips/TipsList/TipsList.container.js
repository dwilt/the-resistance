import {
    connect,
} from 'react-redux';

import {
    tipsListSelector,
} from '/selectors';

import {
    getTipsAction as getTips,
} from '/store/tips/tips.actions';

import TipsList from './TipsList.component';

export default connect(state => {
    const tips = tipsListSelector(state);

    return {
        tips,
    };
}, {
    getTips,
})(TipsList);
