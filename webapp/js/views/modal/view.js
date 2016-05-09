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
    type:"large",

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

        config.modal = modal;
        self.calculateSize(modal, self.size);

        modal.on("complete", function(){
            new self.controller(this);
        })
    },

    calculateSize:function(modal, type){
        var container = $(modal.el).find(".ah_base-modal-container");
        switch(type){
            case "small":(function(){
                container.css({
                    width:"30%"
                });
            })();
                break;
            case "medium":(function(){
                container.css({
                    width:"50%"
                });
            })();
                break;
            case "large":(function(){
                container.css({
                    width:"70%"
                });
            })();
                break;
        }
    },

    initialize:function(options){
        var self = this;
        self.controller = options.controller;
        self.data = options.data;
        self.size = options.size;
        templateManager.load(["modal/base", "modal/" + options.template]).then(function(base, partial){
            self.template = base;
            self.partial = partial;
            self.render();
        });
    }
});