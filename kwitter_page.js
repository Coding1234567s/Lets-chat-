
const firebaseConfig = {
    apiKey: "AIzaSyCanlF6frI99nG5KitC3k23T8zve6YWOUo",
    authDomain: "kwitter-e1941.firebaseapp.com",
    databaseURL: "https://kwitter-e1941-default-rtdb.firebaseio.com",
    projectId: "kwitter-e1941",
    storageBucket: "kwitter-e1941.appspot.com",
    messagingSenderId: "462207763275",
    appId: "1:462207763275:web:22b0e2d57390086d2fdece",
    measurementId: "G-K3RC0KXRV0"
  };
  
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send()
{
    msg = document.getElementById("msg").value;

    firebase.database().ref(room_name).push({
          name:user_name,
          message:msg,
          like:0     
    });

    document.getElementById("msg").value = "";
}

function getData() 
{ firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//Start code
          console.log(firebase_message_id);
          Name = message_data['name'];
          message = message_data['message'];
          like = message_data['like'];
name_with_tag = "<h4> "+ Name +"<img class='user_tick' src='tick.png'></h4>";
message_with_tag = "<h4 class='message_h4'> "+ message + "</h4>";
like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button> <hr>";

row = name_with_tag + message_with_tag +like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
    } });  }); }
getData();

function updateLike(message_id)
{
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    update_likes = Number(likes) + 1;
    console.log(update_likes);

    firebase.database().ref(room_name).child(message_id).update({
          like : update_likes
    });
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}