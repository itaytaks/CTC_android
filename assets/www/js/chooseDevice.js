
$(document).ready(function () {
    //initAppSize();
    initBrowser();
    loadRelevantCss();
    //checkOrientation();
});

//check if tha app run on small screen or big. According to result load appropriate sized image
function initAppSize() {
    //set the isBigSize parameter by the device
    if ($(window).width() > 700) {
        generalParameters.isBigSize = true;
    }
}

var browser;
function initBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    console.log("user agent: " + ua);
    var androidSmall = false;
    var androidSmall2 = false;
    var androidNormal = false;
    if (ua.search("android") > -1 && !(ua.search("mobile") > -1)) {
        androidNormal = true;
    }
    if (androidNormal) {
        //for galaxy tab 2
        browser = "androidNormal";
    }
    if (ua.search("android") > -1 && ua.search("mobile") > -1 && (ua.search("i9300") > -1 || ua.search("i9500") > -1)) {
        androidSmall = true;
    }
    if(ua.search("htc one" > -1)){ //for htc one
         androidSmall = true;
    }
    if (androidSmall) {
        //for galaxy s4 -s3
        browser = "isGt3";
    }
    if (ua.search("android") > -1 && ua.search("mobile") > -1 && ua.search("i9100") > -1) {
        androidSmall2 = true;
    }
    if (androidSmall2) {
        browser = "isGt2";
    }
   // alert(browser);
}

function loadRelevantCss() {
    switch (browser) {

        case "isGt2":
            loadcssfile("css/andrd_small_2.css");

            break;

        case "androidNormal":
            loadcssfile("css/andrd_normal.css");

            break;

        case "isGt3":
            //for galaxy s4 -s3
            loadcssfile("css/andrd_small.css");

            break;
    }
}

function loadcssfile(filename) {

    //if filename is an external CSS file
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
    $("head").append(fileref);

}

function checkPCScreen() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    }
    else {
        $("#pc-screen").show();
    }
}


//check orientation
function checkOrientation() {
    var isPortrait = (window.innerHeight / window.innerWidth) > 1;
    switch (isPortrait) {
        case true:

            //   $("#horizonal-screen").hide();
            break;

        case false:
            //    $("#horizonal-screen").show();
            break;
    }
}