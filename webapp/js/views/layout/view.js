/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var LayoutView = Backbone.View.extend({
    template:null,

    render:function(){
        var self = this;
        new LayoutTemplate({
            template: self.template,
            data:function(){
                return {
                    config:config
                }
            }
        });
    },
    initialize:function(options){
        this.template = options.template;
        this.render();
    }
});