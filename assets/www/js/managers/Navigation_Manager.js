var subMenu = "menu";

function NavigationMan() {
    this.navigationArray = [];
    this.navigationArray[0] = "main";
    this.navigationArrayIndex = 0;
    this.pagePosition = "main";
    this.backPosition = "main";
    this.navigate = function(from, to) {
        gestureMan_.gestureStop();
        if(from != "back") {
            if((from != "timersList") || (to != "timerEdit")) {
                ++this.navigationArrayIndex;
                this.navigationArray[this.navigationArrayIndex] = to;
            }

        }

        if(from == "back") {
            --this.navigationArrayIndex;
        }

        //stop the video when we exit recipe page
        
        try{
            recipeMan_.pauseVideo();
            }

            catch(e){}

        switch(to) {
            case "recipesList": this.showRecipeListPage();
                break;
            case "categories": this.showCategoriesPage();
                break;
            case "recipe": this.showRecipePage();
                break;
            case "showFavoritePage": this.showFavoritePage();
                break;
            case "foodgerator": this.showFoodgeratorPage();
                break;
            case "main": this.showMainPage();
                break;
            case "shopping": this.showShoppingPage();
                break;
            case "tools": this.showToolsPage();
                break;
            case "favorite": this.showFavoritePage();
                break;
            case "timer": this.showTimerPage();
                break;
            case "terms": this.showTermsPage();
                break;
            case "share": this.showSharePage();
                break;
            case "gesture": this.showGesturePage();
                break;
            case "browse": this.showBrowsePage();
                break;
            case "foodgeratorList": this.showFoodgeratorListPage();
                break;
            case "termSingle": this.showTermSinglePage();
                break;
            case "timersList": this.showtimersListPage();
                break;
            case "timerEdit": this.showTimerEditPage();
                break;
            case "search": this.showSearchPage();
                break;
                case "about" : this.showAboutPage();
        }


    }
    this.setSubMenu = function(sub) {
        this.subMenu = sub;
    }

    this.showMainPage = function() {
        $(".page").hide();
        gestureMan_.gestureStart("LR");
        $('.main_text_background').show();
       $('.main_menu_icon_hover').removeClass('main_menu_icon_hover');
       $(".text_main_icon_position").addClass('main_menu_icon_hover');

        $('#search').show();
        $('#backFromSearch').hide();
        $('.home_page').show();
        $('.search_text_background').hide();
        $('.search_text').hide();
       
        $(".gesture_list ul  li").hide();
        $(".gesture_list #gestureRight").show();
        $(".gesture_list #gestureLeft").show();
        $(".gesture_list #gestureSelect").show();

        this.backPosition = this.pagePosition;
        this.pagePosition = "main";

        this.subMenu = "main";
    }

    this.showCategoriesPage = function() {
        $(".page").hide();
        gestureMan_.gestureStart("UD");
       
       var pageHeight = $(document).height() - $(".Up_banner_background").height() - $(".down_menu_background").height() - 16;
       $(".recipes_middel_window_recipres_page").css("height", pageHeight+'px');

        $('.main_menu_icon_hover').removeClass('main_menu_icon_hover');
        $('#recipes_icon').addClass('main_menu_icon_hover');
        $('.main_text_background').hide();
        
        switch(browser){
            case "isGt2": 
               // $('#recipes_icon_hover').css({ "margin-left": "2px" });//- android      //SARA
            break;
            case "isGt3": 
               // $('#recipes_icon_hover').css({ "margin-left": "2px" });//- android  
            break;
            case "ipad": 
               // $('#recipes_icon_hover').css({ "margin-left": "112px" }); //-ipad 
            break;
            case "iphone": 
               // $('#recipes_icon_hover').css({ "margin-left": "9px" });//- iphone    
            break;
        }
        $('.search_text_background').hide();
        $('.search_text').hide();

        $('.categories_page').show();
        $('.recipes_background_main').show();
        $('.recipes_background_what_u_need').hide();
        $('.recipes_background_what_to_do').hide();
        $('.Gesture_btn').css({ "background-position": "0" });

        //set the gesture page divs
        $(".gesture_list ul  li").hide();
        $(".gesture_list #gestureUp").show();
        $(".gesture_list #gestureDown").show();
        $(".gesture_list #gestureSelect").show();


        this.backPosition = this.pagePosition;
        this.pagePosition = "categories";
        this.subMenu = "categories";

    }

    this.showRecipeListPage = function() {
        $(".page").hide();
        gestureMan_.gestureStart("UD");
        var pageHeight = $(document).height() - $(".Up_banner_background").height() - $(".down_menu_background").height() - 16 ;
        $(".all_categories").css("height", pageHeight+'px');
        $("#recipes_list li").each(function() {
            var $this = $(this);
            if($this.hasClass("recipes_hover")) {
                var height = $("#recipes_list li").height();
                $(".recipes_middel_window_recipres_page").animate({ scrollTop: ($this.index() * height) });
            }
        });
        $('.main_text_background').hide();

        switch(browser) {
            case "isGt2":
                //$('#recipes_icon_hover').css({ "margin-left": "2px" }); //- android      
                break;
            case "isGt3":
                //$('#recipes_icon_hover').css({ "margin-left": "2px" }); //- android  
                break;
            case "ipad":
                //$('#recipes_icon_hover').css({ "margin-left": "112px" }); //-ipad 
                break;
            case "iphone":
                //$('#recipes_icon_hover').css({ "margin-left": "9px" }); //- iphone    
                break;
        }


        $('.recipres_page').show();

        $('.search_text_background').hide();
        $('.search_text').hide();
        $('.search_btn').hide();

        $('.Gesture_btn').css({ "background-position": "0px " });


        //set the gesture page divs
        $(".gesture_list ul  li").hide();
        $(".gesture_list #gestureUp").show();
        $(".gesture_list #gestureDown").show();
        $(".gesture_list #gestureSelect").show();

        this.backPosition = this.pagePosition;
        this.pagePosition = "recipesList";

    }


    this.showRecipePage = function() {
        $(".page").hide();
        gestureMan_.gestureStart("LR");
        $('.one_recipe_page').show();
        $('.one_recipe_page .one_recipe_back_btn').show();
        
        //$('.text_main_icon_position').css({ "color": "#ffffff" });
        //$('#recipes_icon').hide();
        $('.main_text_background').hide();
        //$('#recipes_icon_hover').show();
        //$('#favorite_icon').show();
        //$('#favorite_icon_hover').hide();
        
        switch(browser){
            case "isGt2": 
                //$('#recipes_icon_hover').css({ "margin-left": "2px" });//- android      
            break;
            case "isGt3": 
                //$('#recipes_icon_hover').css({ "margin-left": "2px" });//- android  
            break;
            case "ipad": 
                //$('#recipes_icon_hover').css({ "margin-left": "112px" }); //-ipad 
            break;
            case "iphone": 
                //$('#recipes_icon_hover').css({ "margin-left": "9px" });//- iphone    
            break;
        }
        
        
        /*if(isIpad()) {
            $('#recipes_icon_hover').css({ "margin-left": "112px" }); //-ipad
        }
        else{
            $('#recipes_icon_hover').css({ "margin-left": "9px" });//- iphone
        }
        if(isAndroid)
        {
             $('#recipes_icon_hover').css({ "margin-left": "2px" });//- android
        } */
        //$('#foodgrator_icon_hover').hide();
        //$('#foodgrator_icon').show();
        //$('#tools_icon_hover').hide();
        //$('#tools_icon').show();
        
        $('.search_text_background').hide();
        $('.search_text').hide();
        $('.favorite_page').hide();
        
        $('.recipes_background_main').show();
        $('.recipes_background_what_u_need').hide();
        $('.recipes_background_what_to_do').hide();
        
        
        recipeMan_.description_recipe();
      
        //set the gesture page divs
        $(".gesture_list ul  li").hide();
        $(".gesture_list #gestureUp").show();
        $(".gesture_list #gestureDown").show();
        $(".gesture_list #gestureRight").show();
        $(".gesture_list #gestureLeft").show();
       

        
        
        this.backPosition = this.pagePosition;
        this.pagePosition = "recipe";

    }

    this.showShoppingPage = function() {
        $(".page").hide();
        var pageHeight = $(document).height() - $(".Up_banner_background").height() - $(".down_menu_background").height()- $(".second_nav_background_papers").height() - $(".tree_btn_shopping_position").height() -$(".shopping_text_background").height()-$(".shopping_text_background").css("margin-bottom") - 16;
       $(".recipes_background_shopping").css("height", pageHeight+'px');
        $('.shopping_page').show();
        //$('.tools_page').hide();
        $('.foodgrator_text_background').hide();
        $('.Gesture_page').hide();
        $('.mail_pop').hide();
        $('.delete_pop').hide();
        // $('.share_page').hide();
        $("#counterShopping").text(toolsMan_.numOfShopItems);
        this.backPosition = this.pagePosition;
        this.pagePosition = "shopping";

    }

    this.showToolsPage = function() {
        //$('.tools_text').css({"color":"#CFCFCF"});
        $(".page").hide();
        //$('.text_main_icon_position').css({ "color": "#ffffff" });
        $('.main_text_background').hide();
        
        switch(browser){
            case "isGt2": 
                //$('#tools_icon_hover').css({ "margin-left": "2px" });//- android      
            break;
            case "isGt3": 
                //$('#tools_icon_hover').css({ "margin-left": "2px" });//- android  
            break;
            case "ipad": 
                //$('#tools_icon_hover').css({ "margin-left": "112px" }); //-ipad 
            break;
            case "iphone": 
                //$('#tools_icon_hover').css({ "margin-left": "9px" });//- iphone    
            break;
        }
        
        /*if(isIpad()) {
            $('#tools_icon_hover').css({ "margin-left": "112px" }); //ipad
        }
        else {
            $('#tools_icon_hover').css({ "margin-left": "9px" }); //-iphone
        }
        if(isAndroid){
            $('#tools_icon_hover').css({ "margin-left": "2px" }); //android
        }
        //
*/

        $('.main_menu_icon_hover').removeClass('main_menu_icon_hover');
        $('#tools_icon').addClass('main_menu_icon_hover');
        $('#tools_icon').show();
        var pageHeight = $(document).height() - $(".Up_banner_background").height() - $(".down_menu_background").height() - 16;
       $(".tools_page").css("height", pageHeight+'px');
        $('.tools_page').show();
        if(isIpad()) {
            $('.Gesture_btn').css({ "background-position": "-59px 50%" }); //ipad
        }
        else{
            $('.Gesture_btn').css({"background-position":"-59px 50%"}); //iphone
        }
        
        

        //update timers and cart counters
        toolsMan_.updateCounters();

        this.backPosition = this.pagePosition;
        this.pagePosition = "tools";
        this.subMenu = "tools";
    }

    this.showFavoritePage = function () {
        $(".page").hide();
        gestureMan_.gestureStart("UD");
        var pageHeight = $(document).height() - $(".Up_banner_background").height() - $(".down_menu_background").height() - 16;
        $(".recipes_middel_window_favorite").css("height", pageHeight + 'px');
        $("#recipes_list_favorite li").each(function () {
            var $this = $(this);
            if ($this.hasClass("recipes_hover")) {
                var height = $("#recipes_list_favorite li").height() + $("#recipes_list_favorite li").css("margin-bottom").substring(0, 2) / 2;
                $(".recipes_middel_window_favorite").animate({ scrollTop: ($this.index() * height) });
            }
        });

        $('.main_menu_icon_hover').removeClass('main_menu_icon_hover');
        $('#favorite_icon').addClass('main_menu_icon_hover');
        $('#favorite_icon').show();

        switch (browser) {
            case "isGt2":
                //$('#favorite_icon_hover').css({ "margin-left": "2px" });//- android      
                break;
            case "isGt3":
                //$('#favorite_icon_hover').css({ "margin-left": "2px" });//- android  
                break;
            case "ipad":
                //$('#favorite_icon_hover').css({ "margin-left": "112px" }); //-ipad 
                break;
            case "iphone":
                //$('#favorite_icon_hover').css({ "margin-left": "9px" });//- iphone    
                break;
        }


        /*if(isIpad()) {
        $('#favorite_icon_hover').css({ "margin-left": "112px" });//ipad
        }
        else{
        $('#favorite_icon_hover').css({ "margin-left": "9px" });//-iphone
        }
        if (isAndroid)
        {
        $('#favorite_icon_hover').css({ "margin-left": "2px" });//-android
        }
        */
        //$('.text_main_icon_position').css({ "color": "#ffffff" });
        //$('#foodgrator_icon_hover').hide();
        //$('#foodgrator_icon').show();
        //$('#tools_icon_hover').hide();
        //$('#tools_icon').show();
        $('.favorite_page').show();

        $('.search_text_background').hide();
        // $('.recipes_list ul li').css({ "margin-bottom": "60px" });

        $('.Gesture_btn').css({ "background-position": "0" });


        //set the gesture page divs
        $(".gesture_list ul  li").hide();
        $(".gesture_list #gestureUp").show();
        $(".gesture_list #gestureDown").show();
        $(".gesture_list #gestureSelect").show();



        this.backPosition = this.pagePosition;
        this.pagePosition = "favorite";
        this.subMenu = "favorite";

    }

    this.showFoodgeratorPage = function () {
        $(".page").hide();
       // alert("pageHeightFood "+pageHeightFood);
        $(".recipes_middel_pic_foodgrator").css("height", pageHeightFood + 'px');
        $('.main_menu_icon_hover').removeClass('main_menu_icon_hover');
        $('#foodgrator_icon').addClass('main_menu_icon_hover');
        $('#foodgrator_icon').show();
        $('.main_text_background').hide();

        switch (browser) {
            case "isGt2":
                //$('#foodgrator_icon_hover').css({ "margin-left": "2px" });//- android      
                break;
            case "isGt3":
                //$('#foodgrator_icon_hover').css({ "margin-left": "2px" });//- android  
                break;
            case "ipad":
                //$('#foodgrator_icon_hover').css({ "margin-left": "112px" }); //-ipad 
                break;
            case "iphone":
                //$('#foodgrator_icon_hover').css({ "margin-left": "9px" });//- iphone    
                break;
        }


        $('.foodgrator_page').show();
        $('.foodgrator_page .one_recipe_back_btn').show();
        $('.foodgrator_text_background').hide();
        $('.recipes_list_Results').hide();
        $('.food_list').show();
        if (isIpad()) {
            $('.Gesture_btn').css({ "background-position": "-59px 50%" }); //ipad//SARA
        }
        else {
            $('.Gesture_btn').css({ "background-position": "-59px 50%" }); //iphone
        }
        this.backPosition = this.pagePosition;
        this.pagePosition = "foodgerator";
        this.subMenu = "foodgerator";

    }
    this.showFoodgeratorListPage = function() {
       // var topStr = $(".foodgrator_text_background").css("top");
        ///var pageHeight = $(document).height() - $(".Up_banner_background").height() - $(".down_menu_background").height() - $(".second_nav_background_papers").height() - 16;
         
      
        $(".page").hide();

        $('.foodgrator_page').show();
        $('.recipes_list_Results').show();
        $(".foodgrator_instructions").hide();
        $(".recipes_middel_pic_foodgrator").css("height", pageHeightFoodList + 'px');
        $('.food_list').hide();
        $('.foodgrator_text_background').hide();
        if(isIpad()) {
            $('.Gesture_btn').css({ "background-position": "-59px 50%" }); //ipad
        }
        else {
            $('.Gesture_btn').css({ "background-position": "-59px 50%" }); //iphone
        }
        $('.Terminology_singel_page').hide();

        this.backPosition = this.pagePosition;
        this.pagePosition = "foodgeratorList";
        //this.subMenu = "foodgerator";
    }
this.showTimerPage = function() {
    $(".page").hide();
    
    $('.timer_page').show();
    $('.tools_page').hide();
    $('.favorite_page').hide();
    $('.one_recipe_page').hide();
    $('.recipres_page').hide();
    $('.home_page').hide();
    $('.foodgrator_page').hide();
    //$('.timer_finish').hide();  test!!!!!!Sara
    $('.timer_middel').hide();
    // $('.categories_page').hide();
    if(isIpad()) {
        $('.Gesture_btn').css({ "background-position": "-59px 50%" }); //ipad
    }
    else{
        $('.Gesture_btn').css({"background-position":"-59px 50%"}); //iphone
    }
    $(".timer_list").show();
    this.backPosition = this.pagePosition;
    this.pagePosition = "timer";
}

    this.showTermsPage = function() {
        $(".page").hide();
        var pageHeight = $(document).height() - $(".Up_banner_background").height() - $(".down_menu_background").height() - 16;
       $(".term_middel_window").css("height", pageHeight+'px');
       pageHeight = pageHeight - $(".second_nav_background_papers").height() +35 ;
       $(".term_middel_pic").css("height", pageHeight+'px');
        $('.Terminology_page').show();
        this.backPosition = this.pagePosition;
        this.pagePosition = "terms";
        
    }

    this.showSharePage = function() {
        $(".page").hide();
        $(".facebookDialog").hide();

        $('.share_page').show();
          $('.share_page .one_recipe_back_btn').show();

        $('.share_specific_pic').hide();
        // $('.about_us_page').hide();
        $(".share_position").show();
        
        this.backPosition = this.pagePosition;
        this.pagePosition = "share";
    }


    this.showBrowsePage = function()
    {
        $(".page").hide();
        $(".facebookDialog").hide();

        $('.share_page').show();
        $('.share_specific_pic').show();
        // $('.about_us_page').hide();
        $(".share_position").hide();
        this.backPosition = this.pagePosition;
        this.pagePosition = "browse";

    }
    this.showGesturePage = function () {
        $(".page").hide();

        $('.Gesture_page').show();
        //alert("width" + $(".middel_pic_gesture").width()); //sara test
        //alert("height" + $(".middel_pic_gesture").height()); //sara test
        // $('.home_page').hide();
        $(".Gesture_page .one_recipe_back_btn").show();

        this.backPosition = this.pagePosition;
        this.pagePosition = "gesture";
    }

    this.showtimersListPage=function()
    {
        $(".timer_middel").hide();
        var pageHeight = $(document).height() - $(".Up_banner_background").height() - $(".down_menu_background").height() - 16;
       $(".timer_list").css("height", pageHeight+'px');
        $(".timer_list").show();
        this.backPosition = this.pagePosition;
        this.pagePosition = "timersList";
        //$("#timeEdit").text("00:00");
       
    }

    this.showTimerEditPage = function() {
        $(".timer_list").hide();
       // alert("blur");
        //$("#timerName").blur();
        $("#timeEdit").text("00:00");
        $(".timer_middel").show();
        this.backPosition = this.pagePosition;
        this.pagePosition = "timerEdit";
        //$("#timeEdit").text("00:00");

    }

    this.showTermSinglePage = function()
    {
         $(".page").hide();
         var pageHeight = $(document).height() - $(".Up_banner_background").height() - $(".down_menu_background").height() - 16;
         $(".Terminology_singel_page").css("height", pageHeight+'px');
         $('.Terminology_singel_page').show();
         $('.Terminology_page').hide();
         $('.Gesture_page').hide();
         $('.share_page').hide();
         $('.about_us_page').hide();

        this.backPosition = this.pagePosition;
        this.pagePosition = "termSingle";
    }

    this.showSearchPage = function () {
        $(".page").hide();
        $(".recipes_middel_window_search").css("height", pageHeightFood + 'px');
        $("#recipes_icon_hover").hide();
        $("#recipes_icon").show();
        $('.search_page').show();
        $(".search_text_background").show();


        this.backPosition = this.pagePosition;
        this.pagePosition = "search";

    }
    this.showAboutPage = function() {
        $('.about_us_page').show();
        $('.home_page').hide();
        $(".about_us_page .one_recipe_back_btn").show();
        this.backPosition = this.pagePosition;
        this.pagePosition = "about";

        if(isIpad()) {
            $('.Gesture_btn').css({ "background-position": "-59px 50%" }); //ipad
        }
        else {
            $('.Gesture_btn').css({ "background-position": "-59px 50%" }); //iphone
        }
    }

    this.goBack = function(backTo) {
        /*if(!e) var e = window.event;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();*/
        //alert(0);
		
        this.navigate("back", this.navigationArray[this.navigationArrayIndex - 1]);



    }

    this.setPositioning = function(current, back) {
        this.pagePosition = current;
        this.backPosition = back;

    }
}

