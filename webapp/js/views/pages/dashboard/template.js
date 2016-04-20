/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var DashboardTemplate = Ractive.extend({
    el:"#workspace-inner-container",
    adapt:["Backbone"],
    magic:true,
    oncomplete:function(){
        var ins = this;
    }
});