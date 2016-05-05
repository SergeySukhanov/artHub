/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var PictureModel = Backbone.Model.extend({

    datePicture:function(){
        var date = new Date(this.get("datePublication"));

        date = (date.getMonth() + 1) + " " + date.getFullYear();

        return date;
    },

    costPicture:function(){
        return this.get("cost") + "$";
    },

    initialize:function(){

    }
});