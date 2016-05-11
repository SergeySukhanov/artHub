/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 05/10/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var NotificationsController = function(ins, notification){
    var _handlers = function(){
        switch(notification){
            case "addedItemBasket":(function(){
                ins.on({
                    openBasket:function(){

                    }
                });
            })();
                break;
        }
    };

    var _initialize = function(){
        _handlers();
    };

    _initialize();
};