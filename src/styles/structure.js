import { Dimensions, Platform, StatusBar } from "react-native";

export const windowHeight = Dimensions.get(`window`).height;
export const windowWidth = Dimensions.get(`window`).width;

export const gutter = 16;

export const statusBarHeight =
    Platform.OS === `ios` ? 20 : StatusBar.currentHeight;
export const viewSizes = {
    phone: `Phone`,
    largePhone: `Large Phone`,
    tablet: `Tablet`,
    largeTablet: `Large Tablet`,
};

export let viewSize = viewSizes.phone;

if (windowWidth > 450) {
    viewSize = viewSizes.largePhone;
}

if (windowWidth >= 768) {
    viewSize = viewSizes.tablet;
}

if (windowWidth >= 1024) {
    viewSize = viewSizes.largeTablet;
}
