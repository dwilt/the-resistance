import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    CardList,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

export default class InboxCardList extends PureComponent {
    static propTypes = {
        rebatesOnPress: PropTypes.func.isRequired,
        tipsOnPress: PropTypes.func.isRequired,
    };

    render() {
        const { rebatesOnPress, tipsOnPress } = this.props;

        return (
            <CardList
                stretch={false}
                cards={[
                    {
                        id: `rebates`,
                        title: getLocalizedString(`inbox.rebates`),
                        onPress: rebatesOnPress,
                        icon: `cash-dollar`,
                    },
                    {
                        id: `tips`,
                        title: getLocalizedString(`inbox.tips`),
                        onPress: tipsOnPress,
                        icon: `drop2`,
                    },
                ]}
            />
        );
    }
}
