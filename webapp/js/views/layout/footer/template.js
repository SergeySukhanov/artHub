/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */


var FooterTemplate = Ractive.extend({
    el:"#footer-container",
    adapt:["Backbone"],
    magic:true,
    oncomplete:function(){
        console.log("footer complete");
    }
});