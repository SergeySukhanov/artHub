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
            ins.set("news", new ArticlesCollection(data.articlesShortList));
            tools.preloader.close("#articlesShortList");
        });
        _loadPictures().then(function(data){
            var pictures = foldersModule.onlyPhoto(data.gallery);
            ins.set("pictures", new PicturesCollection(pictures));
            tools.preloader.close("#picturesShortList");
        });
        _loadPeople().then(function(data){
            ins.set("people", new UsersCollection(data.users));
            tools.preloader.close("#peopleShortList");
        });
    };

    var _handlers = function(){
        ins.on({
            showPicture:function(event, item){
                new ModalView({
                    template:"showPicture",
                    controller:ShowPictureController,
                    data:item
                });
            },
            userPage:function(event){
                config.routers.mainRouter.navigate(event.context.id, {trigger:true});
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
        tools.preloader.open("#articlesShortList");
        tools.preloader.open("#picturesShortList");
        tools.preloader.open("#peopleShortList");
        tools.preloader.open("#eventsShortList");
        tools.preloader.open("#lotsShortList");
        tools.preloader.open("#groupsShortList");
        templateManager.load(["dashboard/news", "dashboard/pictures", "dashboard/people", "dashboard/lots", "dashboard/events"]).then(function(news, pictures, people, lots, events){
            ins.partials.news = news;
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