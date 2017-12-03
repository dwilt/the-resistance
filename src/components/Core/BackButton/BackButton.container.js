import {
    connect,
} from 'react-redux';

import {
    goBackAction as onPress,
} from '/store/routes/routes.actions';

import BackButton from './BackButton.component';

export default connect(null, {
    onPress,
})(BackButton);
