/**
 * Created by developer on 30.04.16.
 */

var NewFolderController = function(ins){

    var _handlers = function(){
        ins.on({
            createFolder:function(){
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
    };
    var _initialize = function(){
        _handlers();
        console.log("start controller");
    };

    _initialize();
};