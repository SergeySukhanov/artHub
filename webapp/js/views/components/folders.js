/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/28/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var FoldersController = function(ins){
    var _render = function(){
        foldersModule.tree(ins);
        foldersModule.folders(ins);
        _handlers()
    };
    var _handlers = function(){
        ins.on({

        });
    };

    var _initialize = function(){
        _render();
    };

    _initialize();
};