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
                    size:"medium",
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
                    size:"medium",
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
                    data:item
                });
            },

            editFolder:function(event, item){
                new ModalView({
                    template:"editFolder",
                    size:"small",
                    data:{
                        item:item
                    }
                });
            },

            removeFolder:function(event){
                var gallery = ins.get("gallery");
                var currentFolder = ins.get("currentFolder");
                var removeModel = currentFolder.where({id:event.context.id});
                var removeIndex;

                var childElems = foldersModule.currentFolder(gallery, event.context.id);

                if(childElems.length){
                    new ModalView({
                        template:"confirmRemove",
                        size:"small",
                        data:{
                            currentFolder:ins.get("currentFolder"),
                            gallery:ins.get("gallery"),
                            id:event.context.id
                        }
                    })
                }else{
                    currentFolder.remove(removeModel);
                    _.each(gallery, function(elem, index){
                        if(elem.id === removeModel[0].attributes.id){
                            removeIndex = index;
                        }
                    });

                    gallery.splice(removeIndex, 1);
                }


            },

            editPicture:function(event, item){
                new ModalView({
                    template:"editPicture",
                    controller:EditPictureController,
                    size:"small",
                    data:{
                        item:item
                    }
                });
            },

            removePicture:function(event){
                var gallery = ins.get("gallery");
                var currentFolder = ins.get("currentFolder");
                var removeModel = currentFolder.where({id:event.context.id});
                var removeIndex;

                currentFolder.remove(removeModel);
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
                API.user.users().then(function(data){
                    var users = new UsersCollection(data.users);
                    ins.set("friends", users);
                });
            })();
                break;
            case "gallery":(function(){

                API.user.gallery().then(function(data){
                    var gallery = data.gallery;
                    var folders = new PicturesCollection(foldersModule.currentFolder(data.gallery, null));

                    ins.set("currentFolder", folders);
                    ins.set("gallery", gallery);
                });
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
        _parseAction(view.params.action);
        _render();
    };

    _initialize();
};