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
  //   e.preventDefault();
  //Get email and password
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth();
  console.log(auth)
  //Sign in
  var promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
  console.log('test')
});

//Add SignUp event
btnSignUp.addEventListener('click', e => {
  //Get email and pass
  //ToDo: Check 4 REAL email
  // e.preventDefault();
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth();
  //Sign in
  var promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
  } else {
    console.log('not logged in');
  }
});
    storageBucket: "teamawesome-f39d7.appspot.com",
    messagingSenderId: "539466789478"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submitUser").on("click", function(event) {
    event.preventDefault();

    //Grabs user input from the form on the page
    var fName = $("#first_name").val().trim();
    var lName = $("#last_name").val().trim();
    var userPassword = $("#password").val().trim();
    console.log(userPassword);
    var userEmail = $("#email").val().trim();

    //Create local "temporary" object for user data
    var newUser = {
        firstName: fName,
        lastName: lName,
        password: userPassword,
        email: userEmail
    };

    //Upload user information to database
    database.ref().push(newUser);
    console.log(newUser);
    
    //Clears the text boxes
    $("#first_name").val("");
    $("#last_name").val("");
    $("#password").val("");
    $("#email").val("");

});

//Create an event in database when user is added
database.ref().on("child_added", function(childSnapshot, prevChildKey) {   
    var fName = childSnapshot.val().firstName;
    var lName = childSnapshot.val().lastName;
    var userPassword = childSnapshot.val().password;
    var userEmail = childSnapshot.val().email;
});

//commented out below so I can keep using this file...
// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//   });

var key;

$("#addTab").on("click", function(event){
    //if first time to add tab...
    database.ref().once("value", function(snapshot){
        snapshot.forEach(function(childsnap){
            if (childsnap.key!==="tabs"){
                
            }      
        });

    });

    console.log(event);
    //make var to store info from form
    // var tabNum=$('input[type="radio"]:checked').attr("id");
    var tabName=$("#tabName").val().trim();
    var tabStreet=$("#tabStreet").val().trim();
    var tabCity=$("#tabCity").val().trim();
    var tabZip=$("#tabZip").val().trim();
    console.log(tabName,tabStreet,tabCity,tabZip);
    console.log(key);

    // if(tabStreet!=""&&tabStreet!=""&&tabCity!=""&&tabZip!=""){
    // if database.ref("tabs") doesn't exist push
    // if it does, update it 
        database.ref("tabs").push({
            tabName:capUpper(tabName),
            tabStreet:capUpper(tabStreet),
            tabCity:capUpper(tabCity),
            tabZip:tabZip,
        });
    // };
});


database.ref().on("child_added", function(snapShot) {
    snapShot.forEach(function(childSnap){
        console.log(snapShot.key);
        console.log(snapShot.val());
        console.log(childSnap.key);
        var data=childSnap.val();
        console.log(data);

        var newTab=$("<li>").addClass("tab col s3");
        var newA=$("<a id="+data.tabName+">").text(data.tabName);
        newTab.append(newA);
        $(".tabs").append(newTab);

    })
    // console.log(snapShot.key); //= tabs
    // console.log(snapShot.val());//info from tabs
    // if (snapShot.val()){
    //     var data=snapShot.val();
    //     console.log(data, data.tabName);

    //     console.log(snapShot.val());
    //     var newList=$("<li>").addClass("tab col s3");
    //     var newA=$("<a>").addClass("active");
    //     newList.append(newA);

    //     var newTab=$("<li>").text("name"); //add id and name
    //     newTab.addClass("tab col s3");
    //     $(".tabs").append(newTab);
    // };

    key=snapShot.key;     
});

//     switch (tabNum){
//         case "tab1":
//             console.log("tab1");
//             $("#tab1Name").text(tabName).attr("key", key);
//             break;
//         case "tab2":
//             console.log("tab2");
//             $("#tab2Name").text(tabName).attr("key", key);
//             break;
//         case "tab3":
//             console.log("tab3");
//             $("#tab3Name").text(tabName).attr("key", key);
//     };

// });

//when app opens, assign tab ids from firebase
//if tab has info, .update instead of push
//when address pushed, call function to change address to lat and long, then initmap map to that
