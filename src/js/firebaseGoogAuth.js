import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

 const firebaseConfig = {
    apiKey: "AIzaSyD1x3_R3WF-GvGQJFIxkseHeV15qsZ1TJ0",
    authDomain: "authentication-filmoteka.firebaseapp.com",
    databaseURL: "https://authentication-filmoteka-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "authentication-filmoteka",
    storageBucket: "authentication-filmoteka.appspot.com",
    messagingSenderId: "400557211713",
    appId: "1:400557211713:web:1072bc64037f0acf0fc6c0"
  };

  firebase.initializeApp(firebaseConfig);

  const login = document.getElementById('signin').addEventListener('click', signinUser);
  const logout = document.getEleventNyId('signout').addEventListener('click', signoutUser);

  const provider = new GoogleAuthProvider();

  function signinUser() {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider;
      firebase.auth().signInWithPopup(googleAuthProvider)
      .then(function (data){
          console.log(data)
          document.getElementById('signin').classList.add('signOut');
          document.getElementById('signout').classList.add('signIn');
          document.getElementById('googleUser').style.display = "block";

          renderGoogleUser(data);
      })

      .catch(function(error) {
          console.log(error) 
          })

  }
