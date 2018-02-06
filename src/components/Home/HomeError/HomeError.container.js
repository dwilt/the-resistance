import { connect } from "react-redux";

import { homeErrorSelector } from "selectors";

import HomeError from "./HomeError.component";

export default connect(state => {
    const error = homeErrorSelector(state);

    return {
        error,
    };
})(HomeError);
