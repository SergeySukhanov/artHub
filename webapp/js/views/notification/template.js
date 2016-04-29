/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 *
 * © 2016 All Rights Reserved
 */

var NotificationTemplate = Ractive.extend({
    el:"#notifications-container",
    append:true,
    oncomplete:function(){
        var ins = this;
        $(ins.el).fadeIn(100);
        ins.on("closeNotification", function(){
            if(!($(ins.el).children().length > 1)){
                $(ins.el).fadeOut(100, function(){
                    ins.teardown();
                });
            }else{
                ins.teardown();
            }
        });
    }
});