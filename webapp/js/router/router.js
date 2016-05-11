/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var Router = Backbone.Router.extend({
    routes:{
        "":"dashboard",
        "dashboard":"dashboard",
        "gallery":"gallery",
        "gallery/:id":"itemPicture",
        "articles":"articles",
        "articles/:id":"itemArticle",
        "people":"people",

        "auth":"auth",

        "search":"search",
        "search/:action":"search",
        "settings":"settings",
        ":id":"account",
        ":id/:action":"account"
    },

    before:{
        "*any":function(frag, args, next){
            tools.toggleToken();
            if(config.modal){
                config.modal.fire("closeModal");
            }
            if(!config.basket){
                config.basket = new BasketCollection();
            }
            if(token.getItem()){
                tools.currentUser().then(function(currentUser){
                    if(!config.models.currentUser){
                        config.models.currentUser = new UserModel(currentUser.user);
                    }
                    if(frag === "auth"){
                        config.routers.mainRouter.navigate("dashboard", {trigger:true});
                    }
                    if(!tools.loadLayout(config.startProperties)){
                        tools.layoutComponents().then(function(){
                            tools.toggleLoadLayout(config.startProperties, true);
                            next();
                        });
                    }else{
                        config.views.header.ins.set("currentUser", config.models.currentUser);
                        next();
                    }
                })
            }else{
                if(!tools.loadLayout(config.startProperties)){
                    tools.layoutComponents().then(function(){
                        tools.toggleLoadLayout(config.startProperties, true);
                        next();
                    });
                }else{
                    next();
                }
            }
        }
    },
    auth:function(){
        templateManager.load("auth/auth").then(function(tmpl){
            new BaseView({
                id:"auth",
                el:"#workspace-inner-container",
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
    dashboard:function(){
        templateManager.load(["dashboard/dashboard"]).then(function(dashboard){
            new BaseView({
                id:"dashboard",
                el:"#workspace-inner-container",
                template:dashboard,
                partials:{},
                params:{
                    controller:DashboardController
                },
                data:function(){
                    return {
                        config:config,
                        currentUser:config.models.currentUser,
                        articles:[],
                        people:[],
                        pictures:[]
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
    people:function(){
        templateManager.load("people/people").then(function(tmpl){
            new BaseView({
                id:"people",
                el:"#workspace-inner-container",
                template:tmpl,
                params:{
                    controller:PeopleController
                }
            })
        });
    },
    account:function(id, action){
        templateManager.load("account/account").then(function(tmpl){
            API.user.userInfo(id).then(function(user){
                new BaseView({
                    id:"account",
                    el:"#workspace-inner-container",
                    template:tmpl,
                    params:{
                        id:id,
                        action:action,
                        controller:AccountController
                    },
                    data:function(){
                        return {
                            config:config,
                            currentUser:config.models.currentUser,
                            user:new UserModel(user)
                        }
                    }
                });
            })
        });
    },
    articles:function(){
        templateManager.load("articles/articles").then(function(tmpl){
            new BaseView({
                id:"articles",
                el:"#workspace-inner-container",
                template:tmpl,
                params:{
                    controller:ArticlesController
                }
            })
        });
    },
    gallery:function(){
        templateManager.load("gallery/gallery").then(function(tmpl){
            new BaseView({
                id:"gallery",
                el:"#workspace-inner-container",
                template:tmpl,
                params:{
                    controller:GalleryController
                }
            })
        });
    },
    itemArticle:function(id){
        templateManager.load("articles/item").then(function(tmpl){
            new BaseView({
                id:"articleItem",
                el:"#workspace-inner-container",
                template:tmpl,
                params:{
                    id:id,
                    controller:ArticlesItemController
                }
            })
        });
    },
    itemPicture:function(id){
        templateManager.load("gallery/item").then(function(tmpl){
            new BaseView({
                id:"galleryItem",
                el:"#workspace-inner-container",
                template:tmpl,
                params:{
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