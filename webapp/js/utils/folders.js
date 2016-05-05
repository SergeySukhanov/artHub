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
    createTreeStruture:function(data){
        var result = {};

        var folders = _.filter(data, function(elem){
            if(foldersModule.rootId(elem.id) === "folder"){
                return elem;
            }
        });
        var photo = _.filter(data, function(elem){
            if(foldersModule.rootId(elem.id) === "photo"){
                return elem;
            }
        });

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
    onlyPhoto:function(data){
        return _.filter(data, function(elem){
            if(foldersModule.rootId(elem.id) === "photo"){
                return elem;
            }
        });
    }
};