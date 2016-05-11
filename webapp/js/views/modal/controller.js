/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 05/10/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var ModalController = function(ins, modal){
    var _handlers = function(){
        switch(modal){
            case "loadPicture":(function(){
                ins.on({
                    create:function(event){
                        var model = ins.get("data.picture");
                        foldersModule.loadFile(event.node.files[0]).then(function(url){
                            model.set("url", url);
                        })
                    },
                    add:function(){
                        var currentFolder = ins.get("data.currentFolder");
                        var model = ins.get("data.picture");
                        var parent = ins.get("data.parent");
                        var gallery = ins.get("data.gallery");
                        var parentFolder = parent || null;

                        model.set("id", "photo_" + foldersModule.maxPictureId(gallery));
                        model.set("parent", parentFolder);
                        model.set("author", config.models.currentUser.get("id"));
                        model.set("showType", "picture");
                        model.set("datePublication", Date.now());

                        gallery.push(model.attributes);
                        if(currentFolder){
                            currentFolder.add(model);
                        }
                        ins.fire("closeModal");
                    }
                })
            })();
                break;
            case "load":(function(){
                ins.on({
                    drag:function(event){
                        event.original.preventDefault();
                        console.log(event);
                        if(event.type === "enter"){
                            console.log(event);
                        }

                        if(event.type === "over"){
                            console.log(event);
                        }

                        if(event.type === "drop"){
                            var files = event.original.dataTransfer.files;
                            var model = ins.get("data.picture");
                            foldersModule.loadFile(files[0]).then(function(url){
                                model.set("url", url);
                            })
                        }

                        if(event.type === "leave"){
                            console.log(event);
                        }
                    },
                    load:function(event){
                        var model = ins.get("data.picture");
                        foldersModule.loadFile(event.node.files[0]).then(function(url){
                            model.set("url", url);
                        })
                    },
                    removePicture:function(event){
                        var model = ins.get("data.picture");
                        model.set("url", null);
                    },
                    createTag:function(event){
                        if(event.original.keyCode === 13){
                            var tags = ins.get("data.picture.tags");
                            tags.push(event.node.value);
                            event.node.value = "";
                        }
                    },
                    closeTag:function(event){
                        var tags = ins.get("data.picture.tags");
                        _.each(tags, function(elem, index){
                            if(elem === event.context){
                                tags.splice(index, 1);
                            }
                        });
                    },
                    add:function(event){
                        console.log(event);
                    },
                    cancel:function(event){
                        console.log(event);
                    }
                });
            })();
                break;
            case "showPicture":(function(){
                ins.on({
                    addBasket:function(event, item){
                        var itemBasket = new BasketModel();
                        itemBasket.set("photo", item);
                        config.modal.fire("closeModal");
                        config.basket.add(itemBasket);
                        new NotificationView({
                            template:"addedItemBasket",
                            data:item
                        });
                    }
                });
            })();
                break;
            case "editAccount":(function(){

            })();
                break;
            case "newFolder":(function(){
                ins.on({
                    create:function(){
                        var currentFolder = ins.get("data.currentFolder");
                        var model = ins.get("data.folder");
                        var parent = ins.get("data.parent");
                        var gallery = ins.get("data.gallery");
                        var parentFolder = parent || null;

                        model.set("id", "folder_" + foldersModule.maxFolderId(gallery));
                        model.set("parent", parentFolder);
                        model.set("author", config.models.currentUser.get("id"));
                        model.set("showType", "folder");
                        model.set("datePublication", Date.now());
                        gallery.push(model.attributes);
                        currentFolder.add(model);
                        console.log(currentFolder.length);
                        ins.fire("closeModal");
                    }
                })
            })();
                break;
            case "editFolder":(function(){
                ins.on({
                    edit:function(){
                        var data = ins.get("data.item");
                        ins.fire("closeModal");
                    }
                });
            })();
                break;
            case "editPicture":(function(){
                ins.on({
                    savePicture:function(){
                        var data = ins.get("data.item");
                        ins.fire("closeModal");
                    }
                });
            })();
                break;
            case "confirmRemove":(function(){
                ins.on({
                    confirmRemove:function(){
                        var currentFolder = ins.get("data.currentFolder");
                        var gallery = ins.get("data.gallery");
                        var id = ins.get("data.id");
                        var removeModel = currentFolder.where({id:id});
                        var removeIndex;

                        currentFolder.remove(removeModel);
                        _.each(gallery, function(elem, index){
                            if(elem.id === removeModel[0].attributes.id){
                                removeIndex = index;
                            }
                        });

                        gallery.splice(removeIndex, 1);
                        ins.fire("closeModal");

                    },
                    cancelRemove:function(){
                        ins.fire("closeModal");
                    }
                })
            })();
                break;
        }
    };

    var _initialize = function(){
        _handlers();
    };

    _initialize();
};