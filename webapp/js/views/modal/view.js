/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var ModalView = Backbone.View.extend({
    template:null,
    partial:null,
    controller:null,

    render:function(){
        var self = this;
        var modal = new ModalTemplate({
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
            new self.controller(this);
        })
    },
    initialize:function(options){
        var self = this;
        self.partial = options.template;
        self.controller = options.controller;
        templateManager.load("modal/base").then(function(tmpl){
            self.template = tmpl;
            self.render();
        });
    }
});