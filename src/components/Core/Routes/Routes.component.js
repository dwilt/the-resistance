import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    Scene,
    Router,
    Tabs,
} from 'react-native-router-flux';

import {
    CompletedSetUp,
    EnableNotifications,
    ForgotPassword,
    HouseholdSetUp,
    Inbox,
    InboxMessage,
    Login,
    MyAccount,
    MyWater,
    NotificationSettings,
    PokeUtility,
    Profile,
    Rebates,
    Register,
    Support,
    TabbarTab,
    Tips,
    UtilityNotFound,
    UtilityPicker,
} from '/components';

import {
    COMPLETED_SET_UP_KEY,
    ENABLE_NOTIFICATIONS_KEY,
    FORGOT_PASSWORD_KEY,
    HOUSEHOLD_ATTRIBUTES_SET_UP_KEY,
    INBOX_KEY,
    INBOX_MESSAGE_KEY,
    LOGIN_SCENE_KEY,
    MY_ACCOUNT_KEY,
    MY_WATER_KEY,
    NOTIFICATION_SETTINGS_KEY,
    POKE_UTILITY_SCENE_KEY,
    PROFILE_KEY,
    REBATES_KEY,
    REGISTER_SCENE_KEY,
    SUPPORT_KEY,
    TIPS_KEY,
    UTILITY_NOT_FOUND_SCENE_KEY,
    UTILITY_PICKER_SCENE_KEY,
} from '/store/routes/routes.actions';

import styles from './Routes.styles';

import {
   getLocalizedString,
} from '/services/locale.service';

export default class Routes extends PureComponent {
    static defaultProps = {
        onEnter: PropTypes.func.isRequired,
    };

    render() {
        const { onEnter } = this.props;

        return (
            <Router
                sceneStyle={{
                    backgroundColor: `white`,
                }}
            >
                <Scene
                    hideNavBar
                    panHandlers={null}
                    key={`modal`}
                    modal
                >
                    <Scene
                        key={`root`}
                        panHandlers={null}
                        hideNavBar
                    >
                        <Tabs
                            showLabel={false}
                            lazy={true}
                            tabBarStyle={styles.tabs}
                            tabBarPosition={`bottom`}
                            labelStyle={styles.label}
                            swipeEnabled={false}
                        >
                            <Scene
                                hideNavBar
                                key={MY_WATER_KEY}
                                onEnter={() => onEnter(MY_WATER_KEY)}
                                component={MyWater}
                                icon={({ focused }) => (
                                    <TabbarTab
                                        active={focused}
                                        icon={`drop2`}
                                        label={getLocalizedString(`myWater.title`)}
                                    />
                                )}
                            />
                            <Scene
                                hideNavBar
                                key={INBOX_KEY}
                                onEnter={() => onEnter(INBOX_KEY)}
                                component={Inbox}
                                icon={({ focused }) => (
                                    <TabbarTab
                                        active={focused}
                                        icon={`envelope`}
                                        label={getLocalizedString(`inbox.title`)}
                                    />
                                )}
                            />
                            <Scene
                                hideNavBar
                                key={MY_ACCOUNT_KEY}
                                onEnter={() => onEnter(MY_ACCOUNT_KEY)}
                                component={MyAccount}
                                icon={({ focused }) => (
                                    <TabbarTab
                                        active={focused}
                                        icon={`home3`}
                                        label={getLocalizedString(`myAccount.title`)}
                                    />
                                )}
                            />
                        </Tabs>
                        <Scene
                            initial
                            key={LOGIN_SCENE_KEY}
                            onEnter={() => onEnter(LOGIN_SCENE_KEY)}
                            component={Login}
                        />
                        <Scene
                            key={FORGOT_PASSWORD_KEY}
                            onEnter={() => onEnter(FORGOT_PASSWORD_KEY)}
                            component={ForgotPassword}
                        />
                        <Scene
                            hideNavBar
                            key={HOUSEHOLD_ATTRIBUTES_SET_UP_KEY}
                            onEnter={() => onEnter(HOUSEHOLD_ATTRIBUTES_SET_UP_KEY)}
                            component={HouseholdSetUp}
                        />
                        <Scene
                            hideNavBar
                            key={ENABLE_NOTIFICATIONS_KEY}
                            onEnter={() => onEnter(ENABLE_NOTIFICATIONS_KEY)}
                            component={EnableNotifications}
                        />
                        <Scene
                            hideNavBar
                            key={COMPLETED_SET_UP_KEY}
                            onEnter={() => onEnter(COMPLETED_SET_UP_KEY)}
                            component={CompletedSetUp}
                        />
                        <Scene
                            hideNavBar
                            key={UTILITY_PICKER_SCENE_KEY}
                            onEnter={() => onEnter(UTILITY_PICKER_SCENE_KEY)}
                            component={UtilityPicker}
                        />
                        <Scene
                            hideNavBar
                            key={POKE_UTILITY_SCENE_KEY}
                            onEnter={() => onEnter(POKE_UTILITY_SCENE_KEY)}
                            component={PokeUtility}
                        />
                        <Scene
                            hideNavBar
                            key={REGISTER_SCENE_KEY}
                            onEnter={() => onEnter(REGISTER_SCENE_KEY)}
                            component={Register}
                        />
                        <Scene
                            hideNavBar
                            key={UTILITY_NOT_FOUND_SCENE_KEY}
                            onEnter={() => onEnter(UTILITY_NOT_FOUND_SCENE_KEY)}
                            component={UtilityNotFound}
                        />
                    </Scene>
                    <Scene
                        key={PROFILE_KEY}
                        onEnter={() => onEnter(PROFILE_KEY)}
                        component={Profile}
                    />
                    <Scene
                        key={TIPS_KEY}
                        onEnter={() => onEnter(TIPS_KEY)}
                        component={Tips}
                    />
                    <Scene
                        key={REBATES_KEY}
                        onEnter={() => onEnter(REBATES_KEY)}
                        component={Rebates}
                    />
                    <Scene
                        key={NOTIFICATION_SETTINGS_KEY}
                        onEnter={() => onEnter(NOTIFICATION_SETTINGS_KEY)}
                        component={NotificationSettings}
                    />
                    <Scene
                        key={INBOX_MESSAGE_KEY}
                        onEnter={() => onEnter(INBOX_MESSAGE_KEY)}
                        component={InboxMessage}
                    />
                    <Scene
                        key={SUPPORT_KEY}
                        onEnter={() => onEnter(SUPPORT_KEY)}
                        component={Support}
                    />
                </Scene>
            </Router>
        );
    }
}
