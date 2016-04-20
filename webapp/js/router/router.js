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
        "dashboard/:action":"dashboard",
        "account":"account",
        "account/:action":"account"
    },

    before:{
        "*any":function(frag, args, next){
            tools.toggleToken(config.startProperties);
            if(token.getItem()){
                if(frag === "" || frag === "auth"){
                    config.routers.mainRouter.navigate("dashboard", {trigger:true});
                }

                if(!tools.loadLayout(config.startProperties)){
                    this.layoutComponents().then(function(){
                        tools.toggleLoadLayout(config.startProperties, true);
                        next();
                    });
                }else{
                    next();
                }
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
                template:config.templates["layout/header"]
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

    dashboard:function(action){
        var template;
        if(!action){
            template = "dashboard/dashboard";
        }else{
            template = "dashboard/" + action;
        }

        templateManager.load(template).then(function(tmpl){
            new DashboardView({
                template:tmpl,
                action:action
            });
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
            new AccountView({
                template:tmpl,
                action:action
            });
        });
    }
});