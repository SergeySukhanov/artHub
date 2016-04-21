/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var AuthTemplate = Ractive.extend({
    el:"#auth-container",
    adapt:["Backbone"],
    magic:true,
    oncomplete:function(){
        var ins = this;
        var model = ins.get("user");
        ins.on({
            auth:function(event){
                var exists = model.get("exists");
                if(exists){
                    model.authentification().then(function(){
                        config.routers.mainRouter.navigate("", {trigger:true});
                    });
                }else{
                    model.registration();
                }
            },
            checkField:function(event){
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
    }
});