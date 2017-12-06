import React, { PureComponent } from "react";

import { ActionButton } from "/components";

import { firebase } from "/services";

export default class LogoutButton extends PureComponent {
    logout = async () => {
        firebase.auth().signOut();
    };

    render() {
        return <ActionButton onPress={this.logout}>{`Logout`}</ActionButton>;
    }
}
