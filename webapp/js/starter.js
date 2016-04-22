/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

(function(){
    $.when(templateManager.load("layout/layout"))
        .then(function(tmpl){
            tools.toggleToken(config.startProperties);
            new BaseView({
                id:"layout",
                el:"body",
                template:tmpl,
                params:{
                    controller:LayoutViewController
                },
                data:function(){
                    return {
                        config:config
                    }
                }
            })
        })
        .then(function(){
            config.routers.mainRouter = new Router();
            Backbone.history.start({trigger:true});
        })
})();