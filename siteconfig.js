// EveryCorner Site Configuration
// Stores global website settings

const everyCornerConfig = {

    favicon: "favicon.png",

    siteName: "EveryCorner"

};


// Apply favicon automatically

function loadSiteFavicon(){

    let icon =
    document.querySelector(
        "link[rel='icon']"
    );


    if(!icon){

        icon =
        document.createElement("link");

        icon.rel = "icon";

        document.head.appendChild(icon);

    }


    icon.type =
    "image/png";


    icon.href =
    everyCornerConfig.favicon;

}


// Start

window.addEventListener(
    "load",
    loadSiteFavicon
);
