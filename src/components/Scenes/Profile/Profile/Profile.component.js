import React, {
    PureComponent,
} from 'react';

import {
    ScrollView,
} from 'react-native';

import {
    ContentSection,
    HouseholdAttributes,
    ProfileAddress,
    ProfileEmailInput,
    Scene,
    Text,
} from '/components';

import {
   getLocalizedString,
} from '/services/locale.service';

import styles from './Profile.styles';

export default class Profile extends PureComponent {
    render() {
        return (
            <Scene
                title={getLocalizedString(`profile.title`)}
                isModal={true}
            >

                <ScrollView>
                    <ProfileAddress/>
                    <ProfileEmailInput/>
                    <ContentSection>
                        <Text style={styles.householdInstructions}>
                            {getLocalizedString(`profile.householdInstructions`)}
                        </Text>
                        <HouseholdAttributes/>
                    </ContentSection>
                </ScrollView>
            </Scene>
        );
    }
}
