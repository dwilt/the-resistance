import React, { PureComponent } from "react";

import Icon from "react-native-vector-icons/FontAwesome";

import PropTypes from "prop-types";

import { Text } from "components";

import { TouchableWithoutFeedback, View } from "react-native";

import styles, { checkColor, checkSize } from "./Checkbox.styles";

export default class Checkbox extends PureComponent {
    static propTypes = {
        checked: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        onValueChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        checked: true,
    };

    state = {
        checked: true,
    };

    componentDidMount() {
        const { checked } = this.props;

        this.setState({
            checked,
        });
    }

    componentWillReceiveProps({ checked }) {
        const { checked: stateChecked } = this.state;

        if (stateChecked !== checked) {
            this.setState({
                checked,
            });
        }
    }

    onValueChange = () => {
        const { onValueChange } = this.props;

        this.setState(({ checked }) => {
            const newValue = !checked;

            onValueChange(newValue);

            return {
                checked: !checked,
            };
        });
    };

    render() {
        const { label } = this.props;
        const { checked } = this.state;

        const checkIcon = checked && (
            <View style={styles.check}>
                <Icon name={`check`} size={checkSize} color={checkColor} />
            </View>
        );

        return (
            <TouchableWithoutFeedback onPress={this.onValueChange}>
                <View style={styles.container}>
                    <View style={styles.box}>{checkIcon}</View>
                    <Text style={styles.label}>{label}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
