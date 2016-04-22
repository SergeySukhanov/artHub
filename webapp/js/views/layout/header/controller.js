/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var HeaderViewController = function(ins){
    var _render = function(){
        _handlers()
    };
    var _handlers = function(){

        ins.on({
            logout:function(){
                tools.logout();
            },
            loadPicture:function(){
                templateManager.load("modal/loadPicture").then(function(tmpl){
                    new ModalView({
                        template:tmpl,
                        controller:LoadPictureController
                    });
                });
            }
        });
    };

    var _initialize = function(){
        _render();
    };

    _initialize();
};