import {
    connect,
} from 'react-redux';

import {
    rebatesListSelector,
} from '/selectors';

import {
    getRebatesAction as componentDidMount,
    getResetRebatesAction as componentWillUnmount,
} from '/store/rebates/rebates.actions';

import RebatesList from './RebatesList.component';

export default connect(state => {
    const rebates = rebatesListSelector(state);

    return {
        rebates,
    };
}, {
    componentDidMount,
    componentWillUnmount,
})(RebatesList);
