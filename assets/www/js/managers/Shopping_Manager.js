function shoppingMan() {

    this.stringToMail = "mailto:?Subject=Список%20покупок&body=%0D%0A";
    this.start = function() {

        //show page

        /*$(".food_name_shopping").each(function() {
        var $this = $(this);
        if($this.css("display") == "block") {
        shoppingMan_.stringToMail += $this.text() + "%0D%0A";
        }
        });
        $(".tree_btn_shopping_position a").attr("href", shoppingMan_.stringToMail);*/
        NavigationMan_.navigate(NavigationMan_.pagePosition, "shopping");




    }
    this.attachEvents = function() {
        var deleteImage = "images/delete_btn_foodgator.png";
        if(isIpad()) {
            deleteImage = "images_ipad/delete_btn_foodgator.png";
        }
        //enter clicked in search text box
        $("#Text_search_shopping").keypress(function(e) {
            if(e.keyCode == 13) {
                if($("#Text_search_shopping").val() != "") {
                    $("#shopping_list").prepend("<li>" +
                                        "<span class=\"food_name_shopping\">" + $("#Text_search_shopping").val() + "</span>" +
                                        "<span class=\"delete_btn_foodgator\">Удалить</span>" +
                                    "</li>");

                    shoppingMan_.stringToMail += $("#Text_search_shopping").val() + "%0D%0A";
                    $(".tree_btn_shopping_position a").attr("href", shoppingMan_.stringToMail + "%0D%0A" + "Отправлено с помощью приложения «Домашний. Рецепты»");
                    $("#Text_search_shopping").val("");
                }

            }
        });


        //NO to delete list clicked
        $("#noDeleteShoppingList").click(function() { $(".delete_pop").hide(); });
        $("#yesDeleteShoppingList").click(function() {
            $(".delete_pop").hide();
            $("#shopping_list").html("");
            //delete from mail
            shoppingMan_.stringToMail = "mailto:?Subject=Список%20покупок&body=%0D%0A";
            $(".tree_btn_shopping_position a").attr("href", shoppingMan_.stringToMail + "%0D%0A" + "Отправлено с помощью приложения \"Домашний. Рецепты\"");
        });

        $("#shopping_list").delegate("li", "swipeleft swiperight", function() {
            $(this).children(".delete_btn_foodgator").animate({ width: 'toggle' }, { duration: "fast" });
            $(".cover_delete").show();
        });
    }
    this.pop_mail_page = function() {
        //the list is empty
        if(shoppingMan_.stringToMail.substr(shoppingMan_.stringToMail.length - 11, 5) == "body=") {
            return false;
        }
        //$('.mail_pop').show();
    }

    this.pop_delete_page = function() {
        //shoppingMan_
         //$('body').focus();
        //$("#Text_search_shopping").blur();
        $('.delete_pop').show();
        $('.mail_text_delete').css({"font-family":"georgia"});
       

    }

    this.text_open = function() {
        $('.foodgrator_text_background').show();
        $("#Text_search_shopping").focus();
    }


    this.deleteLine = function(btnClicked) {
        if(!e) var e = window.event;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();
        $(".cover_delete").hide();

        var str = $(btnClicked).parents("li").slideToggle("fast").children(".food_name_shopping").text();
        str = "%0D%0A" + str + "%0D%0A";
        shoppingMan_.stringToMail = shoppingMan_.stringToMail.replace(str, "%0D%0A");
        $(".tree_btn_shopping_position a").attr("href", shoppingMan_.stringToMail + "%0D%0A" + "Отправлено с помощью приложения «Домашний. Рецепты»");
        // var filedToDeleteFromLine = $(btnClicked).parents("li").children(".food_name").text();


    }
    this.addFromRecipePage = function(listToAdd) {
        var deleteImage = "images/delete_btn_foodgator.png";
        if(isIpad()) {
            deleteImage = "images_ipad/delete_btn_foodgator.png";
        }
        $(listToAdd).each(function() {
            $("#shopping_list").append("<li>" +
                                        "<span class=\"food_name_shopping\">" + $(this)[0].toString() + "</span>" +
                                        "<span class=\"delete_btn_foodgator\" onclick=\"shoppingMan_.deleteLine(this)\" /></span>" +
                                    "</li>");

            shoppingMan_.stringToMail += $(this)[0].toString() + "%0D%0A";
            $(".tree_btn_shopping_position a").attr("href", shoppingMan_.stringToMail + "%0D%0A" + "Отправлено с помощью приложения «Домашний. Рецепты»");


        });

        if(listToAdd.length != 0) {
            //alert("Add to Sopping-List");
            //$(".addToShopping").show();

            $(".main_background").append("<div class=\"addToShopping\"><span class=\"timer_all_background_black\"></span>" + timerMan_.image_finish +   //<span class=\"timer_all_background_black\"></span>
                                                        "<div id=\"timer_finish_recipe_name\" class=\"addToShoppingText\">Этот список был отправлен в корзину</div>" +
                                                        "<span class=\"shopping_ok_border\" ontouchend=\"shoppingMan_.closeWindow()\"><span class=\"timer_finish_OK\">OK</span></span></div>");
            $(".timer_all_background_black").css("background-color", "Black");
        }
    }

    this.deleteCover = function() {
        $(".delete_btn_foodgator").each(function() {
            if($(this).css("display") == "block") {
                $(this).animate({ width: 'toggle' }, { duration: "fast" });
            }
        });
        $(".cover_delete").hide();
    }

    this.closeWindow = function() {
        $('.Gesture_btn').css("background-position", "0 50%");
        $(".addToShopping").remove();
    }

    this.RemoveFocus = function() {
        //alert("remove focus");
        //removeTextBoxFocus
        //$("#Text_search_shopping").blur();

    }
}  