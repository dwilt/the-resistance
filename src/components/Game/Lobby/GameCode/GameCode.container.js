import { connect } from 'react-redux';

import { gameCodeSelector } from 'selectors';

import GameCode from './GameCode.component';

export default connect((st) => {
    const code = gameCodeSelector(st);

    return {
        code,
    };
})(GameCode);
