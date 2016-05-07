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
    };

    var _initialize = function(){
        tools.calculateLayoutHeight();
        _render();
    };

    _initialize();
};