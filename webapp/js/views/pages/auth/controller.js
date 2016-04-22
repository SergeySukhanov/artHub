/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var AuthController = function(ins){
    var _render = function(){
        _handlers()
    };
    var _handlers = function(){
        var model = ins.get("user");
        ins.on({
            auth:function(){
                var exists = model.get("exists");
                if(exists){
                    model.authentification().then(function(){
                        config.routers.mainRouter.navigate("", {trigger:true});
                    });
                }else{
                    model.registration();
                }
            },
            checkField:function(){
                model.checkExists().then(function(){
                    var exists = model.get("exists");
                    if(exists){
                        tools.toggleButtons("#authButton", "Sign in");
                    }else{
                        tools.toggleButtons("#authButton", "Sign up");
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