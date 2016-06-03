/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var LayoutViewController = function(ins){
    var _render = function(){
        _handlers();
    };

    var _handlers = function(){
        ins.on({
            topPage:function(event){
                $("body").animate({ scrollTop: 0 });
            }
        });

        $(window).resize(function(){
            tools.calculate.layout();
            tools.calculate.linkTop();
            tools.calculate.dashboardFeed();
        });

        $(window).scroll(function(){
            _scrollTop();
        });

        $(document).on("click", function(){
            $(".ah_create-menu > a").prop("data-toggle", false);
            $(".ah_create-menu-inner").slideUp(100);
            $(".ah_item-gallery").removeClass("selected");
        });
    };

    var _scrollTop = function(){
        var scrollTop = $(window).scrollTop();
        if(scrollTop > 500){
            $(".ah_layout-link-top").fadeIn(200);
        }else{
            $(".ah_layout-link-top").fadeOut(200);
        }
    };


    var _initialize = function(){
        tools.calculate.layout();
        tools.calculate.linkTop();
        _scrollTop();
        _render();
    };

    _initialize();
};