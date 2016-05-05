/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 *
 * © 2016 All Rights Reserved
 */

var AccountController = function(ins){
    var _render = function(){
        _galleryComponent();
        _handlers()
    };

    var _galleryComponent = function(){
        templateManager.load(["components/galleryComponent", "components/treeGallery", "components/foldersGallery", "components/itemTree"]).then(function(gallery, tree, folders, item){
            API.user.gallery().then(function(data){
                var defaultCollectionOfPictures = new PicturesCollection(data.gallery);
                var treeCollection = new PicturesCollection(foldersModule.createTreeStruture(data.gallery));
                var foldersCollection = new PicturesCollection(foldersModule.currentFolder(data.gallery, null));
                new BaseView({
                    id:"galleryComponent",
                    el:".ah_gallery-component",
                    data:{
                        tree:treeCollection,
                        currentFolder:foldersCollection,
                        defaultGallery:defaultCollectionOfPictures
                    },
                    template:gallery,
                    partials:{
                        itemTree:item,
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