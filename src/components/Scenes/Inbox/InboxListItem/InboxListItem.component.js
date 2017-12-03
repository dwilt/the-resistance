import React, {
    PureComponent,
} from 'react';

import {
    TouchableOpacity,
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import moment from 'moment';

import {
    ChevronIcon,
    Text,
} from '/components';

import styles, {
    arrowSize,
} from './InboxListItem.styles';

export default class InboxListItem extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        subject: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    };

    render() {
        const { onPress, subject, id, date } = this.props;

        return (
            <TouchableOpacity
                onPress={() => onPress({
                    id,
                    subject,
                    date,
                })}
            >
                <View style={styles.content}>
                    <View style={styles.subjectContainer}>
                        <Text style={styles.subject}>{subject}</Text>
                    </View>
                    <View style={styles.timestampContainer}>
                        <Text style={styles.timestamp}>{moment.utc(date).format(`MMM DD`)}</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        <ChevronIcon
                            size={arrowSize}
                            direction={`right`}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
