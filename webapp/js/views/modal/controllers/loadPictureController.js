/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 *
 * © 2016 All Rights Reserved
 */

var LoadPictureController = function(ins){
    var _handlers = function(){
        ins.on({
            createPicture:function(event){
                var model = ins.get("data.picture");
                foldersModule.loadFile(event.node.files[0]).then(function(url){
                    model.set("url", url);
                })
            },

            addPicture:function(event){
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
                currentFolder.add(model);
                console.log(currentFolder.length);
                ins.fire("closeModal");
            }
        })
    };
    var _initialize = function(){
        _handlers();
        console.log("start controller");
    };

    _initialize();
};