// EveryCorner Profile View Controls


async function checkProfileOwner(){

    const user =
    await getCurrentUser();


    const params =
    new URLSearchParams(
        window.location.search
    );


    const username =
    params.get("user");



    if(!user){

        hideSettings();

        return;

    }



    const { data, error } =
    await supabaseClient
    .from("profiles")
    .select("username")
    .eq(
        "id",
        user.id
    )
    .single();



    if(error){

        console.log(error);

        hideSettings();

        return;

    }



    if(data.username !== username){

        hideSettings();

    }

}





function hideSettings(){

    const settings =
    document.getElementById("settings");


    const postBox =
    document.getElementById("postBox");



    if(settings){

        settings.style.display = "none";

    }


}





window.addEventListener(
"load",
function(){

    checkProfileOwner();

});
