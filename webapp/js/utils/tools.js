/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var tools = {
    toggleToken:function(prop){
        var statement;

        if(token.getItem()){
            statement = prop.token = true;
        }else{
            statement = prop.token = false;
        }

        return statement;
    },

    toggleButtons:function(elem, val){
        $(elem).val(val);
    },

    loadLayout:function(prop){
        var statement = false;

        if(prop.header || prop.footer || prop.workspace){
            statement = true;
        }

        return statement
    },
    logout:function(){
        token.removeItem();
        config.routers.mainRouter.navigate("auth", {trigger:true});
    },
    toggleLoadLayout:function(prop, flag){
        prop.header = flag;
        prop.footer = flag;
        prop.workspace = flag;
    },

    layoutComponents:function(){
        return templateManager.load(["layout/header", "layout/workspace", "layout/footer"]).then(function(header, workspace, footer){
            new BaseView({
                id:"header",
                el:"#header-container",
                template:header,
                params:{
                    controller:HeaderViewController
                },
                data:function(){
                    return {
                        currentUser:config.models.currentUser
                    }
                }
            });
            new BaseView({
                id:"footer",
                el:"#footer-container",
                template:footer,
                params:{
                    controller:FooterViewController
                }
            });
            new BaseView({
                id:"workspace",
                el:"#workspace-container",
                template:workspace,
                params:{
                    controller:WorkspaceViewController
                }
            });
        })
    },

    rootId:function(data){
        return data.split("_")[0];
    },

    createTreeStruture:function(data){
        var result = {};

        var folders = _.filter(data, function(elem){
            if(tools.rootId(elem.id) === "folder"){
                return elem;
            }
        });
        var photo = _.filter(data, function(elem){
            if(tools.rootId(elem.id) === "photo"){
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

    restrictions:function(id, callback){
        var data = null;
        callback(data);
    }
};