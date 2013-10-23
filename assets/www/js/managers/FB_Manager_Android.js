var applicationDownloadLink = "";

function attachEventFacebook() {
    try {
        FB.init({
            appId: "400193263386893",
            nativeInterface: CDV.FB,
            useCachedDialogs: false
        });
    }
    catch (e) {
        console.log(e);
    }


    $('.share_facebook_btn').click(function () {
        var msg = $("#TextArea_share").val();

        var params = {
            method: 'feed',
            message: 'msg',
            name: 'Домашний.Рецепты — приложение без прикосновения к экрану',
            link: applicationDownloadLink,
            picture: $('.share_img').attr("src"),
            caption: 'Привет, Друзья ',
            description: 'Я готовлю с помощью приложения «Домашний.Рецепты» и вот, что у меня получилось'
        };
        console.log(params);
        FB.ui(params, function (obj) { console.log(obj); });

    });

    //get the dynamic link for google play
}