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
                API.user.gallery().then(function(data){
                    new ModalView({
                        template:"loadPicture",
                        size:"medium",
                        controller:LoadPictureController,
                        data:{
                            picture:new PictureModel(),
                            gallery:data.gallery
                        }
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