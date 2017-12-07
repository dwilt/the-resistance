import firebase from "react-native-firebase";

import toQueryString from "obj-to-query-string";

export const db = firebase.firestore();

export async function fireFetch(
    url,
    config = {
        queryParams: {}
    }
) {
    let baseUrl = `https://us-central1-the-resistance-6d42d.cloudfunctions.net/${url}`;

    if (Object.keys(config.queryParams).length) {
        baseUrl += `?${toQueryString(config.queryParams)}`;
    }

    const res = await fetch(baseUrl, {
        method: `GET`,
        mode: `cors`
    });

    const data = await res.json();

    if (!res.ok) {
        return Promise.reject(data);
    } else {
        return data;
    }
}

export default firebase.initializeApp({
    apiKey: "AIzaSyB2lvG8eGKIEbRaDTeRKixX925Lnn-tm38",
    databaseURL: "https://the-resistance-6d42d.firebaseio.com/",
    projectId: `the-resistance-6d42d`
});
