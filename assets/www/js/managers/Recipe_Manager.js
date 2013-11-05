var src;
function RecipeMan () {
    
    this.whatUNeedList = new Array();
      
        $('.one_recipe_text_bar_left').css({"color":"#f3f2ee"});
        $('.one_recipe_bar_left').css({"background-color":"#4d555f"});
        this.showRecipePage = function (recipe) {
            this.clearRecipePage();
            if (isIpad()) {
                $('.Gesture_btn').css({ "background-position": "-59px 50%" });
            }
            else {

                $('.Gesture_btn').css({ "background-position": "-59px 50%" });
            }
            //init the current tab
            $('.one_recipe_text_bar_left').css({ "color": "#f3f2ee" });
            $('.one_recipe_bar_left').css({ "background-color": "#4d555f" });
            $('.one_recipe_text_bar_middel').css({ "color": "#4d555f" });
            $('.one_recipe_bar_middel').css({ "background-color": "#f3f2ee" });
            $('.one_recipe_text_bar_right').css({ "color": "#4d555f" });
            $('.one_recipe_bar_right').css({ "background-color": "#f3f2ee" });

            NavigationMan_.navigate("categories", "recipe");

            var id = $(recipe).data("id");
            var category = $(recipe).data("category");
            var result = this.checkIfRecipeExist(id, category);
            //set now the category title, because now i know the current category -  
            // if there are more than one
            this.setCategoryDataTitle(category);
            if (result == false)
            { this.getPostContent(id); }
            else {
                this.setRecipeContent(result);

            }


            //set favorite in cookie
            $("#addFavoiteRecipe").click(function (e) {
               
                //sent the clicked obj with the recipe data
                favoriteMan_.addRecipeToList(this);
                $(this).parent().fadeOut(400, function () { $('#favorited').fadeIn(); });

            });

            $("#addFavoriteRecipeBox").click(function () {

                favoriteMan_.addRecipeToList("#addFavoiteRecipe");
                $(this).parent().fadeOut();
            });

        }
   
    this.checkIfRecipeExist = function(id, category) {
        var list = (recipesArray)[category];
        var exist = false;
        list = $(list).attr("list");
        var indexInList = -1;
        if(list != undefined){
             $.each(list, function(index, record) {
                if(index == id) {
                    indexInList = id;
                    $.each(record, function(index2, sub_record) {
                        //console.log( index2, sub_record );
                        if(index2 == "custom_fields") {

                            if($(this).attr("wpcf-instructions") != undefined)
                            { exist = true; }

                        }
                    });
                }
            });
        }
       
        if(exist == true) {
            exist = list[indexInList];
        }
        return exist;

    }

    this.getPostContent = function(id) {
        showLoading();
        
        setTimeout("jsonMan_.get_post_by_id('" + id + "', 'recipeMan_.getPostContentCB')", 100);

    }

    this.getPostContentCB = function(val) {
        
        jsonToArrayOneRecipe($(val)[0].post);
        var eventObj = val.post;
        recipeMan_.setRecipeContent(eventObj);
        hideLoading();
        
    }

    this.setRecipeContent = function(currentRecipe) {

        recipeMan_.whatUNeedList = [];
        var currentRecipeDetails = $(currentRecipe).attr("custom_fields");
        var currentRecipeData = $(currentRecipe);

        //set what to do tab
        $("#recipePage_what_to_do_title").text(currentRecipeDetails["wpcf-recipe_name"][0]);
        $("#recipePage_what_to_do_text").html(currentRecipeDetails["wpcf-instructions"][0]);

        //set what u need tab
        //var ingraCollect = currentRecipeDetails["wpcf-ingradient"]; //["wpcf-formatted_ingradients"]
        var ingraCollect = currentRecipeDetails["wpcf-formatted_ingradients"][0].split(",");

        $(ingraCollect).each(function(i) {
       
            if(this != "") {
                $("#one_recipe_what_u_need_list").append(" <li>" +
                                            "<div class=\"food_name_what_u_need_list_div\"><span class=\"food_name_what_u_need_list\">" + this + "</span></div>" +
                "<span class=\"amount_need\"></span>" +
                                            "</li>");
                recipeMan_.whatUNeedList[i] = this; 
            }

        });

        //set description tab
        $("#totalTimeRecipePage").text(currentRecipeDetails["wpcf-total_time"][0] + " мин.");
        
        $("#levelRecipPage").text(currentRecipeDetails["wpcf-complexity_level"][0]);

        var small_imag = currentRecipeDetails["wpcf-image"][0];
        if(small_imag == "") { small_imag = "images/default_pic.jpg"; }

        $("#imgRecipePage").attr("src", small_imag);
       
        //if there is video        
        if((currentRecipeDetails["wpcf-video"] != "" && currentRecipeDetails["wpcf-video"][0] != "") || (currentRecipeDetails["wpcf-videomp4"] != undefined && currentRecipeDetails["wpcf-videomp4"][0] != "")) {
            
          
            var video_playbtn = "";
           
            var width = "640";
            var height = "413";
            try {
                src = currentRecipeDetails["wpcf-videomp4"][0];
            }
            catch(ex) {
                src = currentRecipeDetails["wpcf-video"][0];
            }

            video_playbtn = "<div id=\"video_playbtn_andro\" class=\"video_playbtn\" ontouchstart=\"recipeMan_.playVideo()\";></div>";
          //  $("#imgRecipePage").hide();
            $("#playVideoBtn").show();
            $(".one_recipe_pic").prepend(video_playbtn + "<video id=\"videoRecipePage\" width=\"" + width + "\" height=\"" + height + "\" controls=\"controls\" poster=\"" + small_imag + "\"><source src=\"" + src + "\" type=\"video/mp4\"></video></div>");
            //$("#videoRecipePage").show();
           
           

            $("#videoRecipePage").bind("play", function() {
                
                $(".one_recipe_white").hide();
            });

            $("#videoRecipePage").bind("loadedmetadata", function() {
                hideLoading();
            });
            $("#videoRecipePage").bind("seeking", function() {
                showLoading();
                $(".one_recipe_white").hide();
            });
            $("#videoRecipePage").bind("seeked", function() {
                hideLoading();
                $(".one_recipe_white").hide();
            });



        }


        var category = this.getCategoryTitleBySlug($("#second_nav").data("category"), $(currentRecipeData).attr("categories"));
        $("#second_nav").text(category);
        $("#titleRecipePage").text(currentRecipeDetails["wpcf-recipe_name"][0]);
        $("#descRecipePage").text(currentRecipeDetails["wpcf-short_describtion"][0]);

        $("#addFavoiteRecipe").data("recipeObj", currentRecipeData[0]);

        if(favoriteMan_.isInFavorite(currentRecipeData[0].id)) {
            $("#addFavoiteRecipe").parent().hide();
            $('#favorited').show();
        }
        else {
            $("#addFavoiteRecipe").parent().show();
            $('#favorited').hide();
        }

        if(isIpad()) {
            checkHtml($(".one_recipe_text_pic"), 250);
        }
        else {
            checkHtml($(".one_recipe_text_pic"), 88);
        }

        



    }

    this.setCategoryDataTitle = function(category) {
        $("#second_nav").data("category",category);
    }

    this.getCategoryTitleBySlug = function(slug, categories) {
        var res;
        $(categories).each(function() {
            if($(this).attr("slug") == slug) {
                res = $(this).attr("title");
            }
        });

        return res;
    }


    this.addToShoppingList = function() {
        if(isIpad()) {
            $('.Gesture_btn').css("background-position", "-59px 50%");
        } else {
            $('.Gesture_btn').css("background-position", "-59px 50%");
        }
        shoppingMan_.addFromRecipePage(this.whatUNeedList);
    }

    this.clearRecipePage = function() {
        //clear the fields of recipe page
        if($("#videoRecipePage")) { $("#videoRecipePage").remove(); }
        if($("#video_playbtn")) { $("#video_playbtn").remove(); }
        //set what to do tab
        $("#recipePage_what_to_do_title").text("");
        $("#recipePage_what_to_do_text").html("");

        //set what u need tab
        $("#one_recipe_what_u_need_list").html("");

        //set description tab
        $("#totalTimeRecipePage").text("");
        $("#levelRecipPage").text("");
        $("#imgRecipePage").attr("src", "").show();

      
        $("#titleRecipePage").text("");
        $("#descRecipePage").text("");
        $(".one_recipe_white").show();

       if( browser == "isGt3" || browser == "isGt2")
       {
            $("#video_playbtn_andro").remove();
        }
    }
    this.description_recipe = function()
    {
        gestureMan_.gestureStart("LR");
        $('.recipes_background_main').show();
        $('.recipes_background_what_u_need').hide();
        $('.recipes_background_what_to_do').hide();
       $('.one_recipe_text_bar_left').css({"color":"#f3f2ee"});
        $('.one_recipe_bar_left').css({"background-color":"#4d555f"});
        $('.one_recipe_text_bar_middel').css({"color":"#484F57"});
        $('.one_recipe_bar_middel').css({"background-color":"#f3f2ee"});
        $('.one_recipe_text_bar_right').css({"color":"#484F57"});
        $('.one_recipe_bar_right').css({"background-color":"#f3f2ee"});
      
        $('.Gesture_btn').css({"background-position":"-59px 50%"}); 
       
        

    }

    this.what_u_need = function() {
        gestureMan_.gestureStart("UD");
        $('.recipes_background_main').hide();
        $('.recipes_background_what_u_need').show();
        $('.recipes_background_what_to_do').hide();
        $('.one_recipe_text_bar_middel').css({"color":"#f3f2ee"});
        $('.Gesture_btn').css({"background-position":"0px"});
        $('.one_recipe_bar_middel').css({"background-color":"#4d555f"});
        $('.one_recipe_text_bar_left').css({"color":"#4d555f"});
        $('.one_recipe_bar_left').css({"background-color":"#f3f2ee"});
        $('.one_recipe_text_bar_right').css({"color":"#4d555f"});
        $('.one_recipe_bar_right').css({"background-color":"#f3f2ee"});
       
    }
	
	this.what_u_need_start = function(e) {
		e.preventDefault();			
	}


    this.what_to_do = function()
    {
        gestureMan_.gestureStart("UD");
        $('.recipes_background_main').hide();
        $('.recipes_background_what_u_need').hide();
        $('.recipes_background_what_to_do').show();
        $('.one_recipe_text_bar_right').css({"color":"#f3f2ee"});
        $('.one_recipe_bar_right').css({"background-color":"#4d555f"});
        $('.one_recipe_text_bar_left').css({"color":"#4d555f"});
        $('.one_recipe_bar_left').css({"background-color":"#f3f2ee"});
        $('.one_recipe_text_bar_middel').css({"color":"#4d555f"});
        $('.one_recipe_bar_middel').css({"background-color":"#f3f2ee"});
        $('.Gesture_btn').css({"background-position":"0px"});
      
      
    }
    this.playVideo = function() {
        //hide the  preview image, show the video and play it
        $("#imgRecipePage").hide()
        $("#videoRecipePage").show();
       $("#videoRecipePage")[0].play();
        $('.video_playbtn').hide();

    }

    this.pauseVideo = function() {

        document.getElementById("videoRecipePage").pause();
    }

    this.gestureMove = function(side) {
        //the main page
        if($(".recipes_background_main ").css("display") != "none") {
            //if there is video- play/stop
            if($("#videoRecipePage").length != 0) {
                //to stop
                if(side == "left") {
                    recipeMan_.pauseVideo();
                }
                //to play
                else  if(side=="right"){
                    recipeMan_.playVideo();
                }
            }
        }

        //other pages - scrolling up/down
        else {
            var window = "";
            if($(".recipes_background_what_u_need").css("display") != "none") {
                window = $(".recipes_middel_window_what_u_need");
            }
            else {
                window = $(".one_recipe_page_what_to_do");
            }
            var height = window.height() * 2 / 3;
            var pos = window.get(0).scrollTop;
            //scroll up
            if(side == "down") {
                window.stop().animate({scrollTop:(pos - height)},1500);
            }
            //scroll down
            else  if(side=="up"){
                window.stop().animate({scrollTop:(pos + height)},1500);
            }
        }


    }

    

    }

    
     