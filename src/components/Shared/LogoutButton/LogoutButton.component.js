import React, { PureComponent } from "react";

import { ActionButton } from "/components/index";

import { firebase } from "/services/index";

export default class LogoutButton extends PureComponent {
    logout = async () => {
        firebase.auth().signOut();
    };

    render() {
        return <ActionButton onPress={this.logout}>{`Logout`}</ActionButton>;
    }
}
