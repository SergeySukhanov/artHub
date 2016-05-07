/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var PictureModel = Backbone.Model.extend({
    defaults:{
        "id":null,
        "author":null,
        "title":null,
        "url":"images/folder.png",
        "public":true,
        "parent":null,
        "showType":null,
        "cost":null,
        "datePublication":null
    },

    datePicture:function(){
        var date = new Date(this.get("datePublication"));

        date = config.monthsShort[date.getMonth()] + " " + date.getFullYear();

        return date;
    },

    costPicture:function(){
        return this.get("cost") + "$";
    },

    initialize:function(){

    }
});