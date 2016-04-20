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
    }
};