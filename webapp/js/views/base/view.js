/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/22/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var BaseView = Backbone.View.extend({
    el:null,
    template:null,
    params:{},
    data:null,

    render:function(){
        var self = this;
        var base = new BaseTemplate({
            el:self.el,
            template:self.template,
            data:self.data
        });
        if(self.params.controller){
            base.on("complete", function(){
                new self.params.controller(this);
            })
        }
    },

    initialize:function(options){
        var self = this;
        self.id = options.id;
        self.el = options.el;
        self.template = options.template;
        self.params = options.params;
        self.data = options.data;
        tools.restrictions(self.id, function(){
            self.render();
        });
    }
});