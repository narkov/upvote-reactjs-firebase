import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebaseConfig = {
  apiKey: "AIzaSyARY2CHq9MTbg1bCTdFOwvEdLQLHtHyybk",
  authDomain: "newagent-htxadf.firebaseapp.com",
  databaseURL: "https://newagent-htxadf.firebaseio.com",
  projectId: "newagent-htxadf",
  storageBucket: "newagent-htxadf.appspot.com",
  messagingSenderId: "368426727921",
  appId: "1:368426727921:web:c70f3928dedbd4148a2c50"
};
firebase.initializeApp(firebaseConfig);

class SignInScreen extends React.Component {

  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <SignInScreen />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
