/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var HeaderTemplate = Ractive.extend({
    el:"#header-container",
    adapt:["Backbone"],
    magic:true,
    oncomplete:function(){
        var ins = this;

        ins.on({
            logout:function(){
                tools.logout();
            },
            loadPicture:function(){
                templateManager.load("modal/loadPicture").then(function(tmpl){
                    new ModalView({
                        template:tmpl,
                        controller:"loadPicture"
                    })
                })
            }
        });
    }
});