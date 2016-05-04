/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 *
 * © 2016 All Rights Reserved
 */


var DashboardController = function(ins){
    var _render = function(){
        _handlers();

        _loadNews().then(function(data){
            console.log(data.news);
            ins.set("news", data.news);
        });
        _loadPictures().then(function(data){
            console.log(data.gallery);
            var pictures = tools.onlyPhoto(data.gallery);
            ins.set("pictures", new PicturesCollection(pictures));
        });
        _loadPeople().then(function(data){
            console.log(data.users);
            ins.set("people", new UsersCollection(data.users));
        });
    };

    var _handlers = function(){
        ins.on({

        });
    };

    var _loadNews = function(){
        return API.user.news();
    };
    var _loadPictures = function(){
        return API.user.gallery();
    };
    var _loadPeople = function(){
        return API.user.users();
    };

    var _initialize = function(){
        _render();
    };

    _initialize();
};