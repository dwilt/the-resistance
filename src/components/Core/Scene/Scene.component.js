import React, {
    PureComponent,
} from 'react';

import {
    ScrollView,
    View,
} from 'react-native';

import {
    CompactSceneHeader,
    SceneHeader,
} from '/components';

import PropTypes from 'prop-types';

import styles from './Scene.styles';

export default class Scene extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        compact: PropTypes.bool.isRequired,
        isModal: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        whiteBg: PropTypes.bool.isRequired,
        rightButtonText: PropTypes.string,
        onRightButtonPress: PropTypes.func,
        rightButtonDisabled: PropTypes.bool,
        hideHeader: PropTypes.bool.isRequired,
        subheader: PropTypes.node,
        scrollContent: PropTypes.bool.isRequired,
        subtext: PropTypes.string,
    };

    static defaultProps = {
        hideHeader: false,
        compact: false,
        isModal: false,
        whiteBg: false,
        scrollContent: true,
        style: {},
    };

    render() {
        const {
            children,
            isModal,
            compact,
            hideHeader,
            scrollContent,
            style,
            ...rest
        } = this.props;

        let header = null;

        if (!hideHeader) {
            if (compact || isModal) {
                header = (
                    <CompactSceneHeader
                        {...rest}
                        showCloseButton={isModal}
                    />
                );
            } else {
                header = (
                    <SceneHeader
                        {...rest}
                    />
                );
            }
        }

        const contentContainer = scrollContent ? (
            <ScrollView
                contentContainerStyle={styles.scrollView}
            >
                {children}
            </ScrollView>
        ) : children;

        return (
            <View style={[styles.container, style]}>
                {header}
                <View style={styles.contentContainer}>
                    {contentContainer}
                </View>
            </View>
        );
    }
}
