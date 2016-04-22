/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var tools = {
    toggleToken:function(prop){
        if(token.getItem()){
            prop.token = true;
        }else{
            prop.token = false;
        }

        return prop;
    },

    toggleButtons:function(elem, val){
        $(elem).val(val);
    },

    loadLayout:function(prop){
        if(prop.header || prop.footer || prop.workspace){
            return true;
        }else{
            return false;
        }
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
        return templateManager.load(["layout/header", "layout/workspace", "layout/footer"]).then(function(){
            new BaseView({
                id:"header",
                el:"#header-container",
                template:config.templates["layout/header"],
                params:{
                    controller:HeaderViewController
                },
                data:function(){
                    return {
                        currentUser:config.models.currentUser
                    }
                }
            });
            new BaseView({
                id:"footer",
                el:"#footer-container",
                template:config.templates["layout/footer"],
                params:{
                    controller:FooterViewController
                }
            });
            new BaseView({
                id:"workspace",
                el:"#workspace-container",
                template:config.templates["layout/workspace"],
                params:{
                    controller:WorkspaceViewController
                }
            });
        })
    },

    restrictions:function(id, callback){
        var data = null;
        callback(data);
    }
};