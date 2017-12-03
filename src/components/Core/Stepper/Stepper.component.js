import {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

export default class Stepper extends PureComponent {
    static propTypes = {
        index: PropTypes.number,
        children: PropTypes.arrayOf(PropTypes.node).isRequired,
    };

    static defaultProps = {
        index: 0,
    };

    render() {
        const { index, children } = this.props;

        return children[index];
    }
}
