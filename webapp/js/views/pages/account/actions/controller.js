/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 05/06/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var DashboardActionsController = function(ins, view){
    var _render = function(){
        _handlers()
    };
    var _handlers = function(){
        ins.on({

        });
    };

    var _parseAction = function(action){
        switch(action){
            case "friends":(function(){

            })();
                break;
            case "gallery":(function(){

            })();
                break;
            case "feedback":(function(){

            })();
                break;
            default : (function(){
                API.user.users().then(function(data){
                    var users = new UsersCollection(data.users);
                    ins.set("friends", users);
                });
                API.user.gallery().then(function(data){
                   var gallery = new PicturesCollection(data.gallery);
                   var folders = new PicturesCollection(foldersModule.currentFolder(data.gallery, null));

                    ins.set("folders", folders);
                    ins.set("gallery", folders);
                });
            })();

        }
    };

    var _initialize = function(){
        console.log(view);
        console.log(ins);
        _parseAction(view.params.action);
        _render();
    };

    _initialize();
};