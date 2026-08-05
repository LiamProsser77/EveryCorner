// EveryCorner App.js
// Clean Custom Profile URL Version


// ==========================
// CREATE ACCOUNT
// ==========================

async function createAccount(event){

    event.preventDefault();


    const username =
    document.getElementById("username").value.trim();


    const email =
    document.getElementById("email").value.trim();


    const password =
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

        alert("Check your email confirmation.");

        return;

    }



    const { error: profileError } =
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
    "profile.html?user=" + username;

}





// ==========================
// SIGN IN
// ==========================

async function signIn(event){

    event.preventDefault();


    const email =
    document.getElementById("email").value;


    const password =
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



    const user =
    await getCurrentUser();



    const { data } =
    await supabaseClient
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();



    window.location.href =
    "profile.html?user=" + data.username;

}





// ==========================
// GET CURRENT USER
// ==========================

async function getCurrentUser(){

    const { data } =
    await supabaseClient.auth.getUser();


    return data.user;

}





// ==========================
// LOAD PROFILE
// ==========================

async function loadProfile(){


    const params =
    new URLSearchParams(
        window.location.search
    );


    const username =
    params.get("user");



    if(!username){

        document.getElementById("cornerName").innerHTML =
        "No profile selected";

        return;

    }



    const { data, error } =
    await supabaseClient
    .from("profiles")
    .select("*")
    .eq(
        "username",
        username
    )
    .single();



    if(error){

        console.log(error);


        document.getElementById("cornerName").innerHTML =
        "Profile not found";


        return;

    }



    document.getElementById("cornerName").innerHTML =
    data.username;



    document.getElementById("followers").innerHTML =
    data.followers + " Followers";



    document.getElementById("profilePic").src =
    data.picture || "everycorner.png";



    if(data.banner){

        document.getElementById("banner").style.backgroundImage =
        "url('" + data.banner + "')";

    }


}

// ==========================
// UPLOAD PROFILE PICTURE
// ==========================

async function uploadProfile(event){

    const file =
    event.target.files[0];


    if(!file){

        return;

    }



    const user =
    await getCurrentUser();



    if(!user){

        alert("Sign in first");

        return;

    }



    const filePath =
    user.id + "/profile.png";



    const { error } =
    await supabaseClient
    .storage
    .from("profiles")
    .upload(
        filePath,
        file,
        {
            upsert:true
        }
    );



    if(error){

        alert(error.message);

        return;

    }



    const { data } =
    supabaseClient
    .storage
    .from("profiles")
    .getPublicUrl(filePath);



    await supabaseClient
    .from("profiles")
    .update({

        picture:data.publicUrl

    })
    .eq(
        "id",
        user.id
    );



    alert("Profile picture saved!");

    location.reload();

}





// ==========================
// UPLOAD BANNER
// ==========================

async function uploadBanner(event){

    const file =
    event.target.files[0];


    if(!file){

        return;

    }



    const user =
    await getCurrentUser();



    if(!user){

        alert("Sign in first");

        return;

    }



    const filePath =
    user.id + "/banner.png";



    const { error } =
    await supabaseClient
    .storage
    .from("profiles")
    .upload(
        filePath,
        file,
        {
            upsert:true
        }
    );



    if(error){

        alert(error.message);

        return;

    }



    const { data } =
    supabaseClient
    .storage
    .from("profiles")
    .getPublicUrl(filePath);



    await supabaseClient
    .from("profiles")
    .update({

        banner:data.publicUrl

    })
    .eq(
        "id",
        user.id
    );



    alert("Banner saved!");

    location.reload();

}





// ==========================
// SAVE USERNAME
// ==========================

async function saveProfile(){


    const user =
    await getCurrentUser();



    if(!user){

        alert("Sign in first");

        return;

    }



    const username =
    document.getElementById("nameInput").value.trim();



    const { error } =
    await supabaseClient
    .from("profiles")
    .update({

        username:username

    })
    .eq(
        "id",
        user.id
    );



    if(error){

        alert(error.message);

        return;

    }



    alert("Profile updated!");



    window.location.href =
    "profile.html?user=" + username;

}





// ==========================
// LOGOUT
// ==========================

async function logout(){

    await supabaseClient.auth.signOut();


    window.location.href =
    "signin.html";

}





// ==========================
// PAGE START
// ==========================

window.onload = function(){

    if(document.getElementById("cornerName")){

        loadProfile();

    }

    loadFriendCount();

};

    if(
        document.getElementById("cornerName")
    ){

        loadProfile();

    }


};
