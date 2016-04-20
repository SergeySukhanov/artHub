/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var AuthView = Backbone.View.extend({
    template:null,
    instance:null,

    render:function(){
        this.instance = new AuthTemplate({
            template:this.template,
            data:function(){
                return {
                    config:config,
                    user:new UserModel()
                }
            }
        });
    },
    initialize:function(options){
        this.template = options.template;
        this.render();
    }
});