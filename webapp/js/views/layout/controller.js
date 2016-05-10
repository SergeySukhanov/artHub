/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var LayoutViewController = function(ins){
    var _render = function(){
        _handlers()
    };
    var _handlers = function(){
        ins.on({

        });
        $(window).resize(function(){
            tools.calculateLayoutHeight();
            tools.calculateDashboardfeed();
        });

        $(document).on("click", function(event){
            $(".ah_create-menu > a").prop("data-toggle", false);
            $(".ah_create-menu-inner").slideUp(100);

            $(".ah_item-gallery").removeClass("selected");
        });
    };

    var _initialize = function(){
        tools.calculateLayoutHeight();
        _render();
    };

    _initialize();
};