/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var tools = {
    toggleToken:function(){
        var statement;

        if(token.getItem()){
            statement = config.startProperties.token = true;
        }else{
            statement = config.startProperties.token = false;
        }

        return statement;
    },

    toggleButtons:function(elem, val){
        $(elem).val(val);
    },

    loadLayout:function(prop){
        var statement = false;

        if(prop.header || prop.footer || prop.workspace){
            statement = true;
        }

        return statement
    },

    logout:function(){
        token.removeItem();
        config.routers.mainRouter.navigate("auth", {trigger:true});
    },

    toggleLoadLayout:function(prop, flag){
        prop.header = flag;
        prop.footer = flag;
        prop.workspace = flag;
    },

    layoutComponents:function(){
        return templateManager.load(["layout/header", "layout/workspace", "layout/footer"]).then(function(header, workspace, footer){
            new BaseView({
                id:"header",
                el:"#header-container",
                template:header,
                params:{
                    controller:HeaderViewController
                },
                data:function(){
                    return {
                        config:config,
                        currentUser:config.models.currentUser
                    }
                }
            });
            new BaseView({
                id:"footer",
                el:"#footer-container",
                template:footer,
                params:{
                    controller:FooterViewController
                }
            });
            new BaseView({
                id:"workspace",
                el:"#workspace-container",
                template:workspace,
                params:{
                    controller:WorkspaceViewController
                }
            });
        })
    },

    calculateLayoutHeight:function(){
        var body = $("body");
        var header = $("#header-container");
        var workspace = $("#workspace-container");
        var footer = $("#footer-container");

        var heightWrapper = body.outerHeight();
        var heightHeader = header.outerHeight();
        var heightFooter = footer.outerHeight();

        workspace.css({
            height:heightWrapper - (heightHeader + heightFooter)
        });
    },

    restrictions:function(id, callback){
        var data = null;
        callback(data);
    },

    preloader:{
        open:function(el){
            new Ractive({
                el:el,
                template:"<div class='preloader'><img src='images/preloaders/puff.svg'/></div>",
                append:true
            })
        },
        close:function(el){
            $(el).find(".preloader").remove();
        }
    }
};