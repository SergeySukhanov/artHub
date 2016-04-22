/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */


var DashboardController = function(ins){
    var _render = function(){
        _handlers()
    };
    var _handlers = function(){

        ins.on({
            editAccount:function(){
                templateManager.load("modal/editAccount").then(function(tmpl){
                    new ModalView({
                        template:tmpl,
                        controller:EditAccountController
                    });
                })
            }
        });
    };

    var _initialize = function(){
        _render();
    };

    _initialize();
};