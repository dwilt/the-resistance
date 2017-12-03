import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    CardList,
    Loader,
} from '/components';

export default class TipsList extends PureComponent {
    static propTypes = {
        getTips: PropTypes.func.isRequired,
        tips: PropTypes.array,
    };

    componentDidMount() {
        const { getTips } = this.props;

        getTips();
    }

    render() {
        const { tips } = this.props;

        if (tips) {
            return (
                <CardList
                    cards={tips.map(({ tipId, text, utility: { name } }) => ({
                        id: tipId,
                        title: name,
                        subtitle: text,
                    }))}
                />
            );
        } else {
            return (
                <Loader/>
            );
        }

    }
}
