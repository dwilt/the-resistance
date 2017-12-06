import firebase from 'react-native-firebase';

export const db = firebase.firestore();

export default firebase.initializeApp({
    apiKey: "AIzaSyB2lvG8eGKIEbRaDTeRKixX925Lnn-tm38",
    databaseURL: "https://the-resistance-6d42d.firebaseio.com/",
    projectId: `the-resistance-6d42d`
});