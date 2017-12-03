import {
    StyleSheet,
} from 'react-native';

import {
   getUniversalFont,
} from '/styles';

export default StyleSheet.create({
    subject: {
        ...getUniversalFont(1.3, 1.2),
        textAlign: `center`,
    },
});
