// EveryCorner Friend Requests


// ==========================
// CHECK INCOMING REQUESTS
// ==========================

async function checkFriendRequests(){


    const user =
    await getCurrentUser();



    if(!user){

        return;

    }



    const { data, error } =
    await supabaseClient
    .from("join_requests")
    .select("*")
    .eq(
        "recver",
        user.id
    )
    .eq(
        "stsaus",
        "pending"
    );



    if(error){

        console.log(error);

        return;

    }



    if(data.length > 0){

        alert(
            "You have a new friend request!"
        );

    }


}





window.addEventListener(
"load",
function(){

    checkFriendRequests();

});
