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
            case "showPicture":(function(){

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