/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

(function(){
    $.when(templateManager.load("layout/layout"))
        .then(function(tmpl){
            new BaseView({
                id:"layout",
                el:"body",
                template:tmpl,
                params:{
                    controller:LayoutViewController
                }
            })
        })
        .then(function(){
            config.routers.mainRouter = new Router();
            Backbone.history.start({trigger:true});
        })
})();