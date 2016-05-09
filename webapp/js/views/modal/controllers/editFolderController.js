/**
 * Created by developer on 09.05.16.
 */

var EditFolderController = function(ins){

    var _handlers = function(){
        ins.on({
            saveFolder:function(){
                var data = ins.get("data.item");

                ins.fire("closeModal");
            }
        });
    };
    var _initialize = function(){
        _handlers();
    };

    _initialize();
};