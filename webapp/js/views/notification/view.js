/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 *
 * © 2016 All Rights Reserved
 */

var NotificationView = Backbone.View.extend({
    template:null,
    partial:null,
    controller:null,
    name:null,

    render:function(){
        var self = this;
        var modal = new NotificationTemplate({
            template: self.template,
            partials:{
                inner:self.partial
            },
            data:function(){
                return {
                    config:config
                }
            }
        });

        modal.on("complete", function(){
            new NotificationsController(this, self.name);
        })
    },
    initialize:function(options){
        var self = this;
        self.name = options.template;
        templateManager.load(["notifications/base", "notifications/" + self.name]).then(function(base, partial){
            self.template = base;
            self.partial = partial;
            self.render();
        });
    }
});