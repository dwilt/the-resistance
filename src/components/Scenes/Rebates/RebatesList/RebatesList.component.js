import React, {
    PureComponent,
} from 'react';

import {
    Linking,
} from 'react-native';

import {
    CardList,
    Loader,
} from '/components';

import PropTypes from 'prop-types';

export default class RebatesList extends PureComponent {
    static propTypes = {
        componentDidMount: PropTypes.func.isRequired,
        componentWillUnmount: PropTypes.func.isRequired,
        rebates: PropTypes.arrayOf(PropTypes.shape({
            utility: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }),
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })),
    };

    componentDidMount() {
        const { componentDidMount } = this.props;

        componentDidMount();
    }

    componentWillUnmount() {
        const { componentWillUnmount } = this.props;

        componentWillUnmount();
    }

    onPress = (url) => {
        Linking.openURL(url);
    };

    render() {
        const { rebates } = this.props;

        if (rebates) {
            return (
                <CardList
                    cards={rebates.map(({ utility: { name }, text, url }, i) => ({
                        id: i,
                        title: name,
                        subtitle: text,
                        onPress: () => this.onPress(url),
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
