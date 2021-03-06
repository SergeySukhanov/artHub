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
        config.models.currentUser = null;
        if(location.hash === ""){
            config.routers.mainRouter.navigate("dashboard", {trigger:true});
        }else{
            config.routers.mainRouter.navigate("", {trigger:true});
        }
    },

    toggleLoadLayout:function(prop, flag){
        prop.header = flag;
        prop.footer = flag;
        prop.workspace = flag;
    },

    layoutComponents:function(){
        return templateManager.load(["layout/header", "layout/workspace", "layout/footer"]).then(function(header, workspace, footer){
            config.views.header = new BaseView({
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
            config.views.footer = new BaseView({
                id:"footer",
                el:"#footer-container",
                template:footer,
                params:{
                    controller:FooterViewController
                }
            });
            config.views.workspace = new BaseView({
                id:"workspace",
                el:"#workspace-container",
                template:workspace,
                params:{
                    controller:WorkspaceViewController
                }
            });
        })
    },

    calculate:{
        layout:function(){
            var body = $("body");
            var workspace = $("#workspace-container");

            var heightWrapper = body.outerHeight();
            var heightHeader = 50;
            var heightFooter = 50;

            workspace.css({
                "min-height":heightWrapper - (heightFooter)
            });
        },

        dashboardFeed:function(){
            var body = $("body");

            var heightWrapper = body.outerHeight();
            var top = $(".ah_top-dashboard");


            top.css({
                "height":heightWrapper
            });
        },

        linkTop:function(){
            var win = $(window).height();

            $(".ah_layout-link-top").css({
                top:win - 100
            })
        },

        innerDashboardElems:function(){
            var top = $(".ah_top-dashboard");
            var header = top.find('h2');
            var par = top.find('p');
            var loadPic = top.find('.ah_load-pic');
            var search = top.find('.ah_search');
            var actionBlock = top.find(".ah_dashboard-action-block");

            var widthTop = top.outerWidth();
            var heightTop = top.outerHeight();

            par.css({
                "margin-top":(heightTop / 5) + 50,
                "margin-left":(widthTop/4)
            });

            actionBlock.css({
                "margin-top":(heightTop/2) + 50,
                "height":(heightTop/2)
            });        }
    },

    calculateLayoutHeight:function(){
        var body = $("body");
        var workspace = $("#workspace-container");

        var heightWrapper = body.outerHeight();
        var heightHeader = 50;
        var heightFooter = 50;

        workspace.css({
            "min-height":heightWrapper - (heightFooter)
        });
    },

    currentUser:function(){
        if(config.models.currentUser){
            return $.when(config.models.currentUser);
        }else{
            return API.user.currentUser()
        }
    },

    getBasket:function(){

    },

    calculateDashboardfeed:function(){
        var body = $("body");
        
        var heightWrapper = body.outerHeight();
        var top = $(".ah_top-dashboard");

        top.css({
            "height":heightWrapper
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