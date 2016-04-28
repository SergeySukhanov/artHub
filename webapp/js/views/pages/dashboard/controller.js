/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 *
 * © 2016 All Rights Reserved
 */


var DashboardController = function(ins){
    var _render = function(){
        _galleryComponent();
        _handlers()
    };

    var _galleryComponent = function(){
        templateManager.load(["components/galleryComponent", "components/treeGallery", "components/foldersGallery"]).then(function(gallery, tree, folders){
            API.user.gallery().then(function(data){
                var treeCollection = new PicturesCollection(tools.createTreeStruture(data.gallery));
                var foldersCollection = new PicturesCollection(tools.currentFolder(data.gallery, null));
                new BaseView({
                    id:"galleryComponent",
                    el:".ah_gallery-component",
                    data:{
                        tree:treeCollection,
                        currentFolder:foldersCollection
                    },
                    template:gallery,
                    partials:{
                        treeGallery:tree,
                        foldersGallery:folders
                    },
                    params:{
                        controller:FoldersController
                    }
                });
            });
        });
    };

    var _handlers = function(){
        ins.on({
            editAccount:function(){
                new ModalView({
                    template:"editAccount",
                    controller:EditAccountController
                });
            }
        });
    };

    var _initialize = function(){
        _render();
    };

    _initialize();
};