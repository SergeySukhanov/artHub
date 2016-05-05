/**
 * Created by developer on 04.05.16.
 */

var ArticleModel = Backbone.Model.extend({

    dateArticle:function(){
        var date = new Date(this.get("datePublication"));

        date = config.monthsShort[date.getMonth()] + " " + date.getFullYear();

        return date;
    },
    initialize:function(){
    }
});