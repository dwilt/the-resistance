import {
    connect,
} from 'react-redux';

import {
    goToRebates as rebatesOnPress,
    goToTips as tipsOnPress,
} from '/store/routes/routes.actions';

import InboxCardList from './InboxCardList.component';

export default connect(null, {
    rebatesOnPress,
    tipsOnPress,
})(InboxCardList);
