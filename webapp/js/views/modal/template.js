/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var ModalTemplate = Ractive.extend({
    el:"#modal-container",
    oncomplete:function(){
        var ins = this;
        $(ins.el).fadeIn(100);
        ins.on("closeModal", function(){
            $(ins.el).fadeOut(100, function(){
                ins.teardown();
            });
        });
    }
});