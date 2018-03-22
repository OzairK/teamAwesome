  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCwhOakfPVFjGYSWZ9KwaM8EH9lqw5cY1A",
    authDomain: "teamawesome-f39d7.firebaseapp.com",
    databaseURL: "https://teamawesome-f39d7.firebaseio.com",
    projectId: "teamawesome-f39d7",
    storageBucket: "",
    messagingSenderId: "539466789478"
  };
  firebase.initializeApp(config);

var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var btnLogin = document.getElementById('btnLogin');
var btnSignUp = document.getElementById('btnSignUp');
var btnLogOut = document.getElementById('btnLogOut');

//Add login event
btnLogin.addEventListener('click', e => {
    e.preventDefault();
  //Get email and password
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth();
  console.log(auth);
  var firebaseUser = auth.firebaseUser;
  //Sign in
  var promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
  console.log('test');
});

//Add SignUp event
btnSignUp.addEventListener('click', e => {
  //Get email and pass
  //ToDo: Check 4 REAL email
  e.preventDefault();
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth();
  //Sign in
  var promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

//Realtime user test
firebase.auth().onAuthStateChanged(function(observer) {
        window.observer = observer; // user is undefined if no user signed in
        console.log(observer);
       });

//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
  } else {
    console.log('not logged in');
  }
});