// EveryCorner Friend Count
// Handles only friends and followers numbers


// ==========================
// LOAD FRIEND COUNT
// ==========================

async function loadFriendCount(){

    const user =
    await getCurrentUser();


    if(!user){

        return;

    }



    const { data, error } =
    await supabaseClient
    .from("friends")
    .select("*")
    .or(
        "user1.eq." + user.id +
        ",user2.eq." + user.id
    );



    if(error){

        console.log(error);

        return;

    }



    const friends =
    document.getElementById("friends");



    if(friends){

        friends.innerHTML =
        data.length + " Friends";

    }

}





// ==========================
// LOAD FOLLOWER COUNT
// ==========================

async function loadFollowerCount(){


    const user =
    await getCurrentUser();



    if(!user){

        return;

    }



    const { data, error } =
    await supabaseClient
    .from("followers")
    .select("*")
    .eq(
        "following",
        user.id
    );



    if(error){

        console.log(error);

        return;

    }



    const followers =
    document.getElementById("followers");



    if(followers){

        followers.innerHTML =
        data.length + " Followers";

    }

}





// ==========================
// START
// ==========================

window.addEventListener(
"load",
function(){

    loadFriendCount();

    loadFollowerCount();

});
