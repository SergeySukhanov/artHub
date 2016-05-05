/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 *
 * © 2016 All Rights Reserved
 */

var ModalView = Backbone.View.extend({
    template:null,
    partial:null,
    controller:null,
    data:{},

    render:function(){
        var self = this;
        var modal = new ModalTemplate({
            template: self.template,
            partials:{
                inner:self.partial
            },
            data:function(){
                return {
                    data:self.data,
                    config:config
                }
            }
        });

        modal.on("complete", function(){
            new self.controller(this);
        })
    },
    initialize:function(options){
        var self = this;
        self.controller = options.controller;
        self.data = options.data;
        templateManager.load(["modal/base", "modal/" + options.template]).then(function(base, partial){
            self.template = base;
            self.partial = partial;
            self.render();
        });
    }
});