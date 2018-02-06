import { Alert, InteractionManager } from 'react-native';

export function alert(
    title,
    content,
    buttons = [
        {
            text: `Ok`,
            id: `ok`,
        },
    ],
) {
    return new Promise((resolve) => {
        Alert.alert(
            title,
            content,
            buttons.map(({ text, id }) => ({
                text,
                onPress: () => resolve(id),
            })),
        );
    });
}

export function runAfterInteractions() {
    return new Promise((resolve) => {
        InteractionManager.runAfterInteractions(resolve);
    });
}
