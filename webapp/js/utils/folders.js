/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/28/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var foldersModule = {
    rootId:function(data){
        return data.split("_")[0];
    },

    countId:function(data){
        return parseInt(data.split("_")[1]);
    },



    createTreeStruture:function(data){
        var result = {};

        var folders = foldersModule.onlyFolder(data);
        var photo = foldersModule.onlyPhoto(data);

        var parentFolder = function(elem){
            return _.find(folders, function(innerElem){
                if(innerElem.id === elem.parent){
                    if(!innerElem.children){
                        innerElem.children = [];
                        innerElem.children.push(elem);
                        if(!innerElem.parent){
                            return innerElem;
                        }else{
                            _.find(folders, function(elem){
                                if((elem.id === innerElem.parent) && elem.children){
                                    var elemFind = _.filter(elem.children, function(child){
                                        if(child.id === innerElem.id){
                                            return child;
                                        }
                                    });
                                    if(!elemFind.length){
                                        parentFolder(innerElem);
                                    }
                                }
                            });
                        }
                    }else{
                        innerElem.children.push(elem);
                        if(innerElem.parent){
                            _.find(folders, function(elem){
                                if((elem.id === innerElem.parent) && elem.children){
                                    var elemFind = _.filter(elem.children, function(child){
                                        if(child.id === innerElem.id){
                                            return child;
                                        }
                                    });
                                    if(!elemFind.length){
                                        parentFolder(innerElem);
                                    }
                                }
                            });
                        }
                    }
                }
            });
        };

        result = _.map(photo, function(elem){
            if(!elem.parent){
                return elem;
            }else{
                return parentFolder(elem);
            }
        });

        return _.compact(result);
    },

    currentFolder:function(data, parent){
        return _.compact(_.map(data, function(elem){
            if(elem.parent === parent){
                return elem;
            }
        }));
    },

    loadFile:function(file){
        var reader = new FileReader();
        var deferred = $.Deferred();

        reader.onload = function(event) {
            deferred.resolve(event.target.result);
        };

        reader.onerror = function() {
            deferred.reject(this);
        };

        if (/^image/.test(file.type)) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file);
        }

        return deferred.promise();
    },

    maxPictureId:function(data){
        var max = 0;
        var photos = foldersModule.onlyPhoto(data);

        _.each(photos, function(elem){
            if(foldersModule.countId(elem.id) > max){
                max = foldersModule.countId(elem.id);
            }
        });

        return (max+1);
    },

    maxFolderId:function(data){
        var max = 0;
        var folders = foldersModule.onlyFolder(data);

        _.each(folders, function(elem){
            if(foldersModule.countId(elem.id) > max){
                max = foldersModule.countId(elem.id);
            }
        });

        return (max+1);
    },

    parentId:function(data, id){
        return _.find(data, function(elem){
            if(elem.id === id){
                return elem;
            }
        });
    },

    onlyPhoto:function(data){
        return _.filter(data, function(elem){
            if(foldersModule.rootId(elem.id) === "photo"){
                return elem;
            }
        });
    },

    onlyFolder:function(data){
        return _.filter(data, function(elem){
            if(foldersModule.rootId(elem.id) === "folder"){
                return elem;
            }
        });
    },

    prevFolder:function(data, id){
        return _.find(_.map(data, function(elem){
            if(elem.id === id){
                return foldersModule.currentFolder(data, elem.parent);
            }
        }));
    }
};