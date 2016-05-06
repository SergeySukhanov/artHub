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
            newFolder:function(event){
                new ModalView({
                    template:"newFolder",
                    controller:NewFolderController
                })
            },
            newPicture:function(event){
                new ModalView({
                    template:"loadPicture",
                    controller:LoadPictureController
                });
            },
            backFolder:function(event){
                var gallery = ins.get("gallery");
                var parent = ins.get("config.params.parent");
                var el = foldersModule.parentId(gallery, parent);
                ins.set("currentFolder", new PicturesCollection(foldersModule.prevFolder(gallery, parent)));
                if(el){
                    ins.set("config.params.parent", el.parent);
                }else{
                    ins.set("config.params.parent", null);
                }
            },
            openFolder:function(event){
                console.log(event);
                var gallery = ins.get("gallery");
                ins.set("currentFolder", new PicturesCollection(foldersModule.currentFolder(gallery, event.context.id)))
                ins.set("config.params.parent", event.context.id);
            },
            showPicture:function(event, item){
                new ModalView({
                    template:"showPicture",
                    controller:ShowPictureController,
                    data:item
                });
            }
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
                   var gallery = data.gallery;
                   var folders = new PicturesCollection(foldersModule.currentFolder(data.gallery, null));

                    ins.set("currentFolder", folders);
                    ins.set("gallery", gallery);
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