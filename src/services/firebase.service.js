import firebase from 'react-native-firebase';

export const db = firebase.firestore();

export async function fireFetch(cloudFunctionName, body = {}) {
    const headers = new Headers();

    const fetchParams = {
        method: `POST`,
        headers,
    };

    let baseUrl = `https://us-central1-the-resistance-6d42d.cloudfunctions.net/${cloudFunctionName}`;

    if (Object.keys(body).length) {
        fetchParams.body = JSON.stringify(body);
        headers.append(`Content-Type`, `application/json`);
    }

    const res = await fetch(baseUrl, fetchParams);

    const data = await res.json();

    if (!res.ok) {
        return Promise.reject(data);
    } else {
        return data;
    }
}

export default firebase.initializeApp({
    apiKey: `AIzaSyB2lvG8eGKIEbRaDTeRKixX925Lnn-tm38`,
    databaseURL: `https://the-resistance-6d42d.firebaseio.com/`,
    projectId: `the-resistance-6d42d`,
});
