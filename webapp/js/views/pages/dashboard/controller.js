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
                    data:item,
                    size:1,
                    vertical:95,
                    horizontal:95
                });
            },
            userPage:function(event){
                config.routers.mainRouter.navigate(event.context.id, {trigger:true});
            },

            hoverPicture:function(event){
                var photo = $(event.node).find(".ah_img-picture-item");
                if(event.hover){
                    $(event.node).css({
                        "z-index":3
                    });
//                    photo.animate({
//                        width:"120%",
//                        height:"120%",
//                        "margin-left":"-11%",
//                        "margin-top":"-11%"
//                    }, 100);
                }else{
                    $(event.node).css({
                        "z-index":2
                    });
//                    photo.animate({
//                        width:"100%",
//                        height:"100%",
//                        "margin-left":"0",
//                        "margin-top":"0"
//                    }, 100);
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