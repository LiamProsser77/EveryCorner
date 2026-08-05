// EveryCorner App.js
// Supabase Version


// ==========================
// ACCOUNT SYSTEM
// ==========================


async function createAccount(event){

    event.preventDefault();


    let username =
    document.getElementById("username").value.trim();


    let email =
    document.getElementById("email").value.trim();


    let password =
    document.getElementById("password").value;



    const { data, error } =
    await supabaseClient.auth.signUp({

        email: email,

        password: password

    });



    if(error){

        alert(error.message);

        return;

    }



    if(!data.user){

        alert("Check your email to confirm your account.");

        return;

    }



    let { error: profileError } =
    await supabaseClient
    .from("profiles")
    .insert({

        id:data.user.id,

        username:username,

        email:email,

        picture:"everycorner.png",

        banner:"",

        followers:0

    });



    if(profileError){

        alert(profileError.message);

        return;

    }



    alert("Account created!");


    window.location.href =
    "profile.html";

}





// ==========================
// SIGN IN
// ==========================


async function signIn(event){

    event.preventDefault();


    let email =
    document.getElementById("email").value;


    let password =
    document.getElementById("password").value;



    const { error } =
    await supabaseClient.auth.signInWithPassword({

        email:email,

        password:password

    });



    if(error){

        alert(error.message);

        return;

    }



    window.location.href =
    "profile.html";

}





// ==========================
// GET CURRENT USER
// ==========================


async function getCurrentUser(){

    const {

        data

    } =
    await supabaseClient.auth.getUser();


    return data.user;

}
// ==========================
// PROFILE LOADING
// ==========================


async function loadProfile(){


    let user =
    await getCurrentUser();



    if(!user){

        document.getElementById("cornerName").innerHTML =
        "Sign in first";

        return;

    }



    let { data, error } =
    await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();



    if(error){

        console.log(error);

        document.getElementById("cornerName").innerHTML =
        "Profile not found";

        return;

    }



    document.getElementById("cornerName").innerHTML =
    data.username;



    if(document.getElementById("profilePic")){

        document.getElementById("profilePic").src =
        data.picture || "everycorner.png";

    }



    if(document.getElementById("banner")){

        document.getElementById("banner").style.backgroundImage =
        "url('" + data.banner + "')";

    }


}





// ==========================
// SEND JOIN REQUEST
// ==========================


async function sendJoinRequest(receiverID){


    let current =
    await getCurrentUser();



    if(!current){

        alert("Sign in first");

        return;

    }



    if(current.id === receiverID){

        alert("You cannot request yourself");

        return;

    }



    const { error } =
    await supabaseClient
    .from("join_requests")
    .insert({

        sender:current.id,

        receiver:receiverID,

        status:"pending"

    });



    if(error){

        alert(error.message);

        return;

    }



    alert("Request sent!");

}





// ==========================
// LOAD PROFILE PAGE
// ==========================


window.onload=function(){


    if(
        document.getElementById("cornerName")
    ){

        loadProfile();

    }


};
