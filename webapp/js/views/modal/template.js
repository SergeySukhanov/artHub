/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 *
 * © 2016 All Rights Reserved
 */

var ModalTemplate = Ractive.extend({
    el:"#modal-container",
    magic:true,
    adapt:["Backbone"],
    oncomplete:function(){
        var ins = this;
        $(ins.el).css("top", $(window).scrollTop()).fadeIn(100);
        ins.on("closeModal", function(){
            $(document).off("keyup");
            $(ins.el).fadeOut(100, function(){
                $("body").css("overflow", "auto");
                ins.teardown();
            });
        });

        $(document).on("keyup", function(){
            if(event.keyCode === 27){
                ins.fire("closeModal");
            }
        });
    }
});