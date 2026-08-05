// EveryCorner App.js
// Clean Supabase Version


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

        alert("Check your email to confirm your account.");

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
    "profile.html";

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



    window.location.href =
    "profile.html";

}





// ==========================
// GET CURRENT USER
// ==========================

async function getCurrentUser(){

    const {data} =
    await supabaseClient.auth.getUser();


    return data.user;

}

// ==========================
// LOAD PROFILE
// ==========================

async function loadProfile(){


    const user =
    await getCurrentUser();



    if(!user){

        const name =
        document.getElementById("cornerName");

        if(name){

            name.innerHTML =
            "Sign in first";

        }

        return;

    }



    const { data, error } =
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



    if(document.getElementById("followers")){

        document.getElementById("followers").innerHTML =
        data.followers + " Followers";

    }



    if(document.getElementById("profilePic")){

        document.getElementById("profilePic").src =
        data.picture || "everycorner.png";

    }



    if(document.getElementById("banner")){

        if(data.banner){

            document.getElementById("banner").style.backgroundImage =
            "url('" + data.banner + "')";

        }

    }


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
// TEST UPLOAD BUTTON
// ==========================

async function uploadProfile(event){

    const file = event.target.files[0];

    if(!file){
        return;
    }


    const user = await getCurrentUser();


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
// PAGE START
// ==========================

window.onload = function(){


    if(document.getElementById("cornerName")){

        loadProfile();

    }


};
