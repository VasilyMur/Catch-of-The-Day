import Rebase from 're-base';
import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC3CF3pVsuNzaPTsAKgwV01IT0JFaOvaF0",
    authDomain: "catch-of-the-day-react-16.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-react-16.firebaseio.com",
});


const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;