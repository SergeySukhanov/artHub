/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var PicturesCollection = Backbone.Collection.extend({
    model:PictureModel,

    initialize:function(){
        console.log(this);
        this.on("change", function(){
            console.log(this);
        })
    }


});