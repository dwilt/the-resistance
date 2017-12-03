import React, {
    PureComponent,
} from 'react';

import {
    TouchableOpacity,
    View,
    ViewPropTypes,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    BackButton,
    Text,
} from '/components';

import styles from './CompactSceneHeader.styles';

export default class CompactSceneHeader extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        rightButtonText: PropTypes.string,
        onRightButtonPress: PropTypes.func,
        rightButtonDisabled: PropTypes.bool.isRequired,
        style: ViewPropTypes.style,
        whiteBg: PropTypes.bool.isRequired,
        showCloseButton: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        style: {},
        whiteBg: false,
        rightButtonDisabled: false,
        showCloseButton: true,
    };

    constructor(props) {
        super(props);

        this.state = {
            rightButtonWidth: 0,
        };
    }

    setRightButtonWidth = (rightButtonWidth) => {
        this.setState({
            rightButtonWidth,
        });
    };

    onRightButtonLayout = ({ nativeEvent: { layout: { width } } }) => {
        this.setRightButtonWidth(width);
    };

    render() {
        const {
            title,
            rightButtonText,
            onRightButtonPress,
            style,
            whiteBg,
            rightButtonDisabled,
            showCloseButton,
        } = this.props;

        const { rightButtonWidth } = this.state;
        const backButtonContainerStyles = [styles.backButtonContainer];
        const containerStyles = [styles.container];
        const rightButtonContainerStyles = [styles.rightButtonContainer];
        const backIcon = showCloseButton ? `x` : `chevron`;

        if (rightButtonWidth) {
            backButtonContainerStyles.push({
                width: rightButtonWidth,
            });
        }

        if (whiteBg) {
            containerStyles.push(styles.whiteContainer);
        }

        if (rightButtonDisabled) {
            rightButtonContainerStyles.push(styles.rightButtonContainerDisabled);
        }

        containerStyles.push(style);

        const rightButton = rightButtonText && onRightButtonPress && (
            <TouchableOpacity
                style={styles.rightButton}
                onPress={onRightButtonPress}
                onLayout={this.onRightButtonLayout}
                disabled={rightButtonDisabled}
            >
                <Text style={styles.rightButtonText}>{rightButtonText}</Text>
            </TouchableOpacity>
        );

        return (
            <View style={containerStyles}>
                <View style={backButtonContainerStyles}>
                    <BackButton
                        icon={backIcon}
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text
                        numberOfLines={1}
                        style={styles.title}
                    >{title}</Text>
                </View>
                <View style={rightButtonContainerStyles}>
                    {rightButton}
                </View>
            </View>
        );
    }
}
