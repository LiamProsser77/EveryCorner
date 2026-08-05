// EveryCorner Friend Requests


console.log("requests.js loaded");


// ==========================
// CHECK INCOMING REQUESTS
// ==========================

async function checkFriendRequests(){


    const user = await getCurrentUser();


    if(!user){

        console.log("No user logged in");

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

        console.log("Request error:", error);

        return;

    }



    console.log(
        "Incoming requests:",
        data
    );



    if(!data || data.length === 0){

        console.log(
            "No friend requests"
        );

        return;

    }



    const popup =
    document.getElementById(
        "friendRequestPopup"
    );



    if(!popup){

        console.log(
            "friendRequestPopup HTML missing"
        );

        return;

    }



    popup.style.display = "block";



    popup.innerHTML = `

    <h3>Friend Request</h3>

    <p>
    You have a friend request!
    </p>


    <button>
    Accept
    </button>


    <button>
    Decline
    </button>

    `;


}





// ==========================
// START
// ==========================

window.addEventListener(
"load",
function(){

    checkFriendRequests();

});
