/**
 * Created by developer on 07.05.16.
 */

var ConfirmRemoveFolderController = function(ins){

    var _handlers = function(){
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
    };
    var _initialize = function(){
        _handlers();
        console.log("start controller");
    };

    _initialize();
};