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

var uid; //get uid to create new node off root (1st level)
var name; //get user's name
console.log(uid, name);

//Add login event
btnLogin.addEventListener('click', e => {
    e.preventDefault();
  //Get email and password
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth();
  console.log(auth);

  //Sign in
  var promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message)); //need to fix this so below code won't run if the promise.catch returns error message

  //promise.then waits for sign in to happen before getting the uid
  promise.then(function(){
    uid=auth.currentUser.uid;
    name=auth.currentUser.displayName;
    console.log(uid,name); //works
    $("#hiUser").text("Hi" + name);
  });
});

//Add SignUp event
btnSignUp.addEventListener('click', e => {
  //Get email and pass
  //ToDo: Check 4 REAL email
  e.preventDefault();
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var name = txtName.value;//get name from form
  $("#hiUser").text("Hi " + name);
  console.log(name);
  var auth = firebase.auth();
  //Sign in
  var promise = auth.createUserWithEmailAndPassword(email, pass)
  promise.catch(e => console.log(e.message));
  //if error message above, stop code below!!!!
  promise.then(function(){
    var user = firebase.auth().currentUser;
    console.log(user,uid);
    if (user != null){
        console.log(user.uid);
        uid=user.uid;
        database.ref(uid).set({
            name:name, //maybe delete later
            tab1:false,
            tab2:false,
            tab3:false
        });
        user.updateProfile({
            displayName:name
        }).then(function(){
            name=user.displayName;
        }, function(error){
            console.log("error");
        })
        console.log(uid, name);
    }; 
  });
  $("#loginForm")[0].reset();
});

$("#btnSignOut").on("click", function(event){
    firebase.auth().signOut().then(function(){
        console.log("Sign out successful");
        // uid=firebase.auth().currentUser.uid; //uid becomes null
        // name=firebase.auth().currentUser.displayName; //becomes null
        console.log(user.uid);
        $("#hiUser").empty();
    }).catch(function(error){
        console.log("Error in signing out");
    });
    $("#loginForm")[0].reset();
});

//Add a realtime listener -- this works!!
firebase.auth().onAuthStateChanged(function(user) {
  if (user!=null) {
    uid=user.uid;
    name=user.displayName;
    console.log(uid, name);
} else {
    console.log('not logged in');
  }
});

var database = firebase.database();

//do we need this?????
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

//do we need this???????
//Create an event in database when user is added
database.ref().on("child_added", function(childSnapshot, prevChildKey) {   
    var fName = childSnapshot.val().firstName;
    var lName = childSnapshot.val().lastName;
    var userPassword = childSnapshot.val().password;
    var userEmail = childSnapshot.val().email;
});

var key;

$("#addTab").on("click", function(event){
    //to do:when add tab, add delete button to modal
    //to do:if delete btn clicked, delete fb info
    uid=firebase.auth().currentUser.uid; //deleted var here
    var tabName=$("#tabName").val().trim();
    var tabStreet=$("#tabStreet").val().trim();
    var tabCity=$("#tabCity").val().trim();
    var tabZip=$("#tabZip").val().trim();
    console.log(tabName,tabStreet,tabCity,tabZip);
    console.log(uid);//uid

    //make sure all info is included
    if(tabStreet!=""&&tabStreet!=""&&tabCity!=""&&tabZip!=""){
        // cycle through all tabs
        label: for (var i=1; i<4; i++){
            var tabInfo=database.ref(uid).child("tab"+i).key;
            var tabValue;
            database.ref(uid).child("tab"+i).once("value", function(snap){
                tabValue=snap.val();
                console.log(tabValue);
            });
            //if there's an empty (false) tab, push the data
            if (tabValue === false){
                database.ref(uid).child(tabInfo).update({
                    tabName:capUpper(tabName),
                    tabStreet:capUpper(tabStreet),
                    tabCity:capUpper(tabCity),
                    tabZip:tabZip,
                });
                break label;
            } 
            //to do:else modal below with "You've reached the max tabs. Delete one first before adding another."
            // else {console.log("You've reached the max tabs. Delete one first before adding another.")}   
        }
    }
    else {
        console.log("error message - need more info");
    };
});


database.ref(uid).on("child_added", function(snapShot) {
    // console.log(uid);
    if (uid !== undefined){
        $("#hiUser").text("Hi " + name);
        uid=firebase.auth().currentUser.uid;
        console.log(uid);
        for (var i=1; i<4; i++){
            var tabInfo=database.ref(uid).child("tab"+i).key;
            var tabValue;
            database.ref(uid).child("tab"+i).once("value", function(snap){
                tabValue=snap.val();
                console.log(tabValue);
                if (typeof tabValue.tabName !== "undefined"){
                    console.log(tabValue.tabName);
                    var newTab=$("<li>").addClass("tab col s3");
                    var newA=$("<a id="+tabValue.tabName+">").text(tabValue.tabName);
                    newTab.append(newA);
                    $(".tabs").append(newTab);
                }
            });
        }
    }
});

//when app opens, assign tab ids from firebase
//if tab has info, .update instead of push
//when address pushed, call function to change address to lat and long, then initmap map to that