import { InteractionManager } from "react-native";

export function runAfterInteractions() {
    return new Promise(resolve => {
        InteractionManager.runAfterInteractions(resolve);
    });
}
