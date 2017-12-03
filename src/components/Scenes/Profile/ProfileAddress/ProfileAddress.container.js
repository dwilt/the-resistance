import {
    connect,
} from 'react-redux';

import {
    userProfileStreetAddressSelector,
    userProfileStreetAddress2Selector,
    userProfileAddressCitySelector,
    userProfileAddressStateSelector,
    userProfileAddressZipCodeSelector,
} from '/selectors';

import ProfileAddress from './ProfileAddress.component';

export default connect(st => {
    const street = userProfileStreetAddressSelector(st);
    const street2 = userProfileStreetAddress2Selector(st);
    const city = userProfileAddressCitySelector(st);
    const state = userProfileAddressStateSelector(st);
    const zipCode = userProfileAddressZipCodeSelector(st);

    return {
        street,
        street2,
        city,
        state,
        zipCode,
    };
})(ProfileAddress);
