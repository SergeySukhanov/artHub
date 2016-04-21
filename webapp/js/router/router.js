/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 * @see
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
        "gallery":"gallery",
        "gallery/:action":"gallery",
        "settings":"settings"
    },

    before:{
        "*any":function(frag, args, next){
            var self = this;
            tools.toggleToken(config.startProperties);
            if(token.getItem()){
                API.user.currentUser().then(function(currentUser){
                    config.models.currentUser = new UserModel(currentUser.user);
                    if(frag === "" || frag === "auth"){
                        config.routers.mainRouter.navigate("dashboard/" + config.models.currentUser.get("id"), {trigger:true});
                    }

                    if(!tools.loadLayout(config.startProperties)){
                        self.layoutComponents().then(function(){
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

    layoutComponents:function(){
        return templateManager.load(["layout/header", "layout/workspace", "layout/footer"]).then(function(){
            new HeaderTemplate({
                template:config.templates["layout/header"],
                data:function(){
                    return {
                        currentUser:config.models.currentUser
                    }
                }
            });
            new FooterTemplate({
                template:config.templates["layout/footer"]
            });
            new WorkspaceTemplate({
                template:config.templates["layout/workspace"]
            });
        })
    },

    auth:function(){
        templateManager.load("auth/auth").then(function(tmpl){
            new AuthView({
                template:tmpl
            });
        });
    },

    dashboard:function(id){
        templateManager.load("dashboard/dashboard").then(function(tmpl){
            new DashboardView({
                template:tmpl,
                id:id
            });
        });
    },

    search:function(){

    },
    account:function(action){
        var template;
        if(!action){
            template = "account/account";
        }else{
            template = "account/" + action;
        }

        templateManager.load(template).then(function(tmpl){
            new AccountView({
                template:tmpl,
                action:action
            });
        });
    },
    gallery:function(action){

    },
    settings:function(){

    }
});