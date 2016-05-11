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
            load:function(){
                API.user.gallery().then(function(data){
                    new ModalView({
                        template:"load",
                        horizontal:70,
                        vertical:70,
                        size:5,
                        data:{
                            picture:new PictureModel(),
                            gallery:data.gallery
                        }
                    });
                })
            },
            basket:function(){
                new ModalView({
                    template:"basket",
                    horizontal:80,
                    vertical:70,
                    size:2,
                    data:{
                        basket:{}
                    }

                });
            }
        });
    };

    var _initialize = function(){
        _render();
    };

    _initialize();
};