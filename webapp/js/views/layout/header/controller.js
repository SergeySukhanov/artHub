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
                new ModalView({
                    template:"loadPicture",
                    controller:LoadPictureController
                });

                new NotificationView({
                    template:"successLoadPicture",
                    controller:SuccessController
                })
            }
        });
    };

    var _initialize = function(){
        _render();
    };

    _initialize();
};