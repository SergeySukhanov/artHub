/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var Router = Backbone.Router.extend({
    routes:{
        "":"auth",
        "auth":"auth",
        "dashboard":"dashboard",
        "dashboard/:id":"dashboard",
        "search":"search",
        "search/:action":"search",
        "gallery":"gallery",
        "gallery/:action":"gallery",
        "gallery/:action/:id":"item",
        "settings":"settings"
    },

    before:{
        "*any":function(frag, args, next){
            tools.toggleToken(config.startProperties);
            if(token.getItem()){
                API.user.currentUser().then(function(currentUser){
                    config.models.currentUser = new UserModel(currentUser.user);
                    if(frag === "" || frag === "auth"){
                        config.routers.mainRouter.navigate("dashboard/" + config.models.currentUser.get("id"), {trigger:true});
                    }

                    if(!tools.loadLayout(config.startProperties)){
                        tools.layoutComponents().then(function(){
                            tools.calculateLayoutHeight();
                            tools.toggleLoadLayout(config.startProperties, true);
                            next();
                        });
                    }else{
                        next();
                    }
                })
            }else{
                tools.toggleLoadLayout(config.startProperties, false);
                if(frag === "" || frag !== "auth"){
                    config.routers.mainRouter.navigate("auth", {trigger:true});
                }
                next();
            }
        }
    },
    auth:function(){
        templateManager.load("auth/auth").then(function(tmpl){
            new BaseView({
                id:"auth",
                el:"#auth-container",
                template:tmpl,
                params:{
                    controller:AuthController
                },
                data:function(){
                    return {
                        config:config,
                        user:new UserModel()
                    }
                }
            });
        });
    },
    dashboard:function(id){
        templateManager.load("dashboard/dashboard").then(function(tmpl){
            new BaseView({
                id:"dashboard",
                el:"#workspace-inner-container",
                template:tmpl,
                params:{
                    id:id,
                    controller:DashboardController
                },
                data:function(){
                    return {
                        config:config,
                        currentUser:config.models.currentUser
                    }
                }
            });
        });
    },
    search:function(action){
        templateManager.load("search/search").then(function(tmpl){
            new BaseView({
                id:"search",
                el:"#workspace-inner-container",
                template:tmpl,
                params:{
                    action:action,
                    controller:SearchController
                }
            })
        });
    },
    account:function(action){
        var template;
        if(!action){
            template = "account/account";
        }else{
            template = "account/" + action;
        }

        templateManager.load(template).then(function(tmpl){
            new BaseView({
                id:"account",
                el:"#workspace-inner-container",
                template:tmpl,
                params:{
                    action:action,
                    controller:AccountController
                }
            });
        });
    },
    gallery:function(action){
        var template;
        if(!action){
            template = "gallery/gallery";
        }else{
            template = "gallery/" + action;
        }
        templateManager.load(template).then(function(tmpl){
            new BaseView({
                id:"gallery",
                el:"#workspace-inner-container",
                template:tmpl,
                params:{
                    action:action,
                    controller:GalleryController
                }
            })
        });
    },
    item:function(action, id){
        templateManager.load("gallery/item").then(function(tmpl){
            new BaseView({
                id:"galleryItem",
                el:"#workspace-inner-container",
                template:tmpl,
                params:{
                    action:action,
                    id:id,
                    controller:GalleryItemController
                }
            })
        });
    },
    settings:function(){
        templateManager.load("settings/settings").then(function(tmpl){
            new BaseView({
                id:"settings",
                el:"#workspace-inner-container",
                template:tmpl,
                params:{
                    controller:SettingsController
                }
            })
        });
    }
});