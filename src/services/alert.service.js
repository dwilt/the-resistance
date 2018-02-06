import { Alert } from 'react-native';

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
