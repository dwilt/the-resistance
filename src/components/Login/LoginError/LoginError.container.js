import { connect } from "react-redux";

import { loginErrorSelector } from "selectors";

import LoginError from "./LoginError.component";

export default connect(state => {
    const error = loginErrorSelector(state);

    return {
        error,
    };
})(LoginError);
