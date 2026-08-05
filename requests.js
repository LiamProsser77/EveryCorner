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



   const popup =
document.getElementById(
"friendRequestPopup"
);


popup.style.display="block";


popup.innerHTML = `

<h3>Friend Request</h3>

<p>
You have a friend request
</p>

<button onclick="acceptRequest('${data[0].id}')">
Accept
</button>

<button onclick="declineRequest('${data[0].id}')">
Decline
</button>

`;

    }


}





window.addEventListener(
"load",
function(){

    checkFriendRequests();

});
