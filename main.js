"use strict";

///Service Tabs

$(function() {
    $("ul.tabs").on("click", "li:not(.active)", function() {
        $(this).addClass("active").siblings().removeClass("active");
        $("div.tabs-content")
            .find("div.tab-content")
            .removeClass("active")
            .eq($(this).index())
            .addClass("active");
    });
});

//AMAZING WORK SECTION//
let imageArray = document.getElementsByClassName("work-image-item");
let clicked = 0;
console.log(imageArray);

$(function loadMore() {
    $("#loader").hide();
    for (let index = 0; index < 12; index++) {
        $(imageArray[index]).show();
    }
    $("#loadMore").on("click", function(event) {
        clicked++;
        $("#loader").show();
        $("#loadMore").hide();
        if (clicked == 1) {
            setTimeout(function() {
                $("#loader").hide();
                for (let index = 12; index < 24; index++) {
                    $(imageArray[index]).fadeIn("slow");
                }
                $("#loadMore").show();
            }, 1000);
        }
        if (clicked == 2) {
            setTimeout(function() {
                $("#loader").hide();
                for (let index = 24; index < imageArray.length; index++) {
                    $(imageArray[index]).fadeIn("slow");
                }
                $("#loadMore").hide();
            }, 1000);
        }
    });
});

$(function filter() {
    $(".work-tab-item").on("click", function() {
        $(".work-image-item").hide();
        $(".work-tab-item").removeClass("work-tab-item-active");
        $(this).addClass("work-tab-item-active");
        imageArray = document.getElementsByClassName($(this).attr("data-type"));
        console.log(imageArray);
        for (let index = 0; index < 12; index++) {
            $(imageArray[index]).show();
        }
        if ($(imageArray).length <= 12) {
            $("#loadMore").hide();
        } else {
            $("#loadMore").show();
        }
    });
});

//////////  CAROUSEL////////////

let hero = 0;
$(function carousel() {
    $("#sliderList li:first-child")
        .addClass("active")
        .animate({ bottom: +12 + "px" }, 300);

    function moveTo(hero) {
        $("#sliderList li").removeClass("active").eq(hero).addClass("active");
        $("#sliderList li.active").animate({ bottom: +12 + "px" }, 300);
        $(".hero-list").animate({ opacity: 1 }, 3000);

        $(`#${$("#sliderList").find(".active").attr("data-id")}`)
            .addClass("active")
            .siblings()
            .removeClass("active");
    }

    $("#leftButton").click(function() {
        hero = $("#sliderList li.active").index();
        if (hero == 0) {
            hero = 4;
        }
        hero -= 1;
        moveTo(hero);
    });

    $("#rightButton").click(function() {
        hero = $("#sliderList li.active").index();
        if (hero == 3) {
            hero = -1;
        }
        hero += 1;
        moveTo(hero);
    });

    $("#sliderList li").click(function() {
        hero = $(this).index();
        moveTo(hero);
    });
});

/*MASONRY */

let $grid = $(".grid").masonry({
    itemSelector: ".grid-item",
    percentPosition: true,
    columnWidth: ".grid-sizer",
});
// layout Masonry after each image loads
$grid.imagesLoaded().progress(function() {
    $grid.masonry();
});

let elements = $(".grid-item");
let $nextElements = $(elements);
let $items = [];
$(function masonryLoadmore() {
    $("#masonryLoader").hide();
    for (let i = 1; i < 8; i++) {
        $(elements[i]).show();
    }
    $("#masonryLoadMore").on("click", function() {
        $("#masonryLoadMore").hide();
        $("#masonryLoader").show();
        setTimeout(function() {
            $(".grid").css("height", "3000px");
            $("#masonryLoader").hide();
            for (let i = 8; i < 14; i++) {
                $(elements[i]).show();
            }
        }, 1000);
    });
});

$(".grid-item").hover(
    function() {
        $(this).find(".cover-item-gallery").fadeIn();
    },
    function() {
        $(this).find(".cover-item-gallery").fadeOut();
    }
);
