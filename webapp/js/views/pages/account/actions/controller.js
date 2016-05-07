/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 05/06/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var AccountActionsController = function(ins, view){
    var _render = function(){
        _handlers()
    };
    var _handlers = function(){
        ins.on({
            openMenuCreate:function(event){
                var node = $(event.node);
                var toggle = $(event.node).prop("data-toggle");

                if(toggle){
                    node.siblings().slideUp(200, function(){
                        node.prop("data-toggle", false);
                    });
                }else{
                    node.siblings().slideDown(200, function(){
                        node.prop("data-toggle", true);
                    });
                }
            },
            newFolder:function(){
                new ModalView({
                    template:"newFolder",
                    controller:NewFolderController,
                    data:{
                        currentFolder:ins.get("currentFolder"),
                        gallery:ins.get("gallery"),
                        folder:new PictureModel(),
                        parent:ins.get("config.params.parent")
                    }
                })
            },
            newPicture:function(){
                new ModalView({
                    template:"loadPicture",
                    controller:LoadPictureController,
                    data:{
                        currentFolder:ins.get("currentFolder"),
                        gallery:ins.get("gallery"),
                        picture:new PictureModel(),
                        parent:ins.get("config.params.parent")
                    }
                });
            },

            backFolder:function(event){
                var gallery = ins.get("gallery");
                var parent = ins.get("config.params.parent");
                var el = foldersModule.parentId(gallery, parent);
                ins.set("currentFolder", new PicturesCollection(foldersModule.prevFolder(gallery, parent)));
                if(el.parent){
                    ins.set("config.params.parent", el.parent);
                }else{
                    ins.set("config.params.show", false);
                    ins.set("config.params.parent", null);
                }
            },

            openFolder:function(event){
                console.log(event);
                var gallery = ins.get("gallery");
                ins.set("currentFolder", new PicturesCollection(foldersModule.currentFolder(gallery, event.context.id)))
                ins.set("config.params.parent", event.context.id);
                ins.set("config.params.show", true);
            },

            showPicture:function(event, item){
                new ModalView({
                    template:"showPicture",
                    controller:ShowPictureController,
                    data:item
                });
            },

            editFolder:function(event){
                console.log(event);
            },

            removeFolder:function(event){
                console.log(event);
            },

            editPicture:function(event){
                console.log(event);
            },

            removePicture:function(event){
                var gallery = ins.get("gallery");
                var currentFolder = ins.get("currentFolder");
                var removeModel = currentFolder.where({id:event.context.id});
                var removeIndex;

                currentFolder.remove(removeModel)
                _.each(gallery, function(elem, index){
                    if(elem.id === removeModel[0].attributes.id){
                        removeIndex = index;
                    }
                });

                gallery.splice(removeIndex, 1);

            },

            selectItem:function(event){
                console.log(event);
                var node = $(event.node);

                node.addClass("selected");

                node.siblings().removeClass("selected");
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