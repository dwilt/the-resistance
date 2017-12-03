import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
   getLocalizedString,
} from '/services/locale.service';

import {
    BorderedList,
    ContentSection,
    Loader,
    SwitchGroup,
} from '/components';

export default class NotificationSettingsSwitches extends PureComponent {
    static propTypes = {
        componentDidMount: PropTypes.func.isRequired,
        componentWillUnmount: PropTypes.func.isRequired,
        onValueChange: PropTypes.func.isRequired,
        notifications: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            emailEnabled: PropTypes.bool.isRequired,
            mobileEnabled: PropTypes.bool,
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

    render() {
        const { notifications, onValueChange } = this.props;

        return notifications.length ? (
            <ContentSection>
                <BorderedList>
                    {notifications.map(({ value, title, description, emailEnabled, mobileEnabled }, i) => {
                        const switches = [
                            {
                                label: getLocalizedString(`notificationSettings.email`),
                                value: emailEnabled,
                                onValueChange: (newValue) => {


                                    onValueChange({
                                        value,
                                        emailEnabled: newValue,
                                    });
                                },
                            },
                        ];

                        if (typeof mobileEnabled !== `undefined`) {
                            switches.push({
                                label: getLocalizedString(`notificationSettings.mobile`),
                                value: mobileEnabled,
                                onValueChange: (newValue) => onValueChange({
                                    value,
                                    mobileEnabled: newValue,
                                }),
                            });
                        }

                        return (
                            <View
                                key={i}
                            >
                                <SwitchGroup
                                    title={title}
                                    subtitle={description}
                                    switches={switches}
                                />
                            </View>
                        );
                    })}
                </BorderedList>
            </ContentSection>
        ) : (
            <Loader/>
        );
    }
}
