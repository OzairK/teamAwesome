
        var config = {
            apiKey: "AIzaSyAn3KaitMECF3eoP-jwVBPKxM2u1_MOWQM",
            authDomain: "teamawesome-c4e37.firebaseapp.com",
            databaseURL: "https://teamawesome-c4e37.firebaseio.com",
            projectId: "teamawesome-c4e37",
            storageBucket: "teamawesome-c4e37.appspot.com",
            messagingSenderId: "426168129967"
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

    //Store data
    var fName = childSnapshot.val().firstName;
    var lName = childSnapshot.val().lastName;
    var userPassword = childSnapshot.val().password;
    var userEmail = childSnapshot.val().email;
});

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });