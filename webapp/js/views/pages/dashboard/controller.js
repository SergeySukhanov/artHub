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
            ins.set("articles", new ArticlesCollection(data.articlesShortList));
        });
        _loadPictures().then(function(data){
            var pictures = foldersModule.onlyPhoto(data.gallery);
            ins.set("pictures", new PicturesCollection(pictures));
        });
        _loadPeople().then(function(data){
            ins.set("people", new UsersCollection(data.users));
        });
    };

    var _handlers = function(){
        ins.on({
            showPicture:function(event, item){
                new ModalView({
                    template:"showPicture",
                    data:item,
                    size:1,
                    vertical:95,
                    horizontal:95
                });
            },
            userPage:function(event){
                config.routers.mainRouter.navigate(event.context.id, {trigger:true});
            },
            likePhoto:function(event){

            },
            hoverPicture:function(event){
                var photo = $(event.node).find(".ah_img-picture-item");
                if(event.hover){

                }else{

                }
            }
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
        templateManager.load(["dashboard/news", "dashboard/pictures", "dashboard/people", "dashboard/lots", "dashboard/events"]).then(function(news, pictures, people, lots, events){
            ins.partials.articles = news;
            ins.partials.pictures = pictures;
            ins.partials.people = people;
            ins.partials.lots = lots;
            ins.partials.events = events;
            _render();
            tools.calculateDashboardfeed();
        });
    };

    _initialize();
};