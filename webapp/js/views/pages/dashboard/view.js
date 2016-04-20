/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var DashboardView = Backbone.View.extend({
    template:null,
    action:null,
    enableActions:{

    },

    render:function(){
        var self = this;
        if(!this.action){
            new DashboardTemplate({
                template: self.template,
                data:function(){
                    return {
                        config:config
                    }
                }
            });
        }else{
            new this.enableActions[this.action]({
                template:self.template,
                data:function(){
                    return {
                        config:config
                    }
                }
            })
        }
    },
    initialize:function(options){
        this.template = options.template;
        this.action = options.action;
        if(!config.startProperties.fillAccount){
            config.routers.mainRouter.navigate("account", {trigger:true});
        }else{
            this.render();
        }
    }
});