import {
    connect,
} from 'react-redux';

import {
    getOnSceneEnterAction as onEnter,
} from '/store/routes/routes.actions';

import Routes from './Routes.component';

export default connect(null, {
    onEnter,
})(Routes);
