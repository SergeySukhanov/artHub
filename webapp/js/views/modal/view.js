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
    horizontal:0,
    vertical:0,
    size:0,
    name:null,
    params:null,

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
        self.calculateSize(modal, self.horizontal, self.vertical, self.size);

        modal.on("complete", function(){
            $("body").css("overflow", "hidden");
            new ModalController(this, self.name);
        })
    },

    calculateSize:function(modal, horizontal, vertical, size){
        var container = $(modal.el).find(".ah_base-modal-container");
        container.css({
            "width": horizontal + "%",
            "min-height":vertical + "%",
            "margin-top":size + "%"
        });

    },

    initialize:function(options){
        var self = this;
        self.data = options.data;
        self.size = options.size;
        self.horizontal = options.horizontal;
        self.vertical = options.vertical;
        self.name = options.template;
        templateManager.load(["modal/base", "modal/" + self.name]).then(function(base, partial){
            self.template = base;
            self.partial = partial;
            self.render();
        });
    }
});