/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 *
 * © 2016 All Rights Reserved
 */

var AccountController = function(ins, view){


    var _render = function(){
//        _component();
//        _handlers();

    };

    var _component = function(){
        var templates = [];
        var action = view.params.action;
        if(action){
            templates.push("account/" + action);
        }else{
            templates.push("account/home");
        }
        templateManager.load(templates).then(function(tmpl){
            new BaseView({
                id:"accountComponent",
                el:".ah_account-action",
                template:tmpl,
                partials:{},
                data:{
                    action:view.params.action,
                    gallery:[],
                    currentFolder:[],
                    tree:[],
                    feedback:{},
                    friends:[],
                    params:{
                        parent:null,
                        show:false
                    }
                },
                params:{
                    action:view.params.action,
                    controller:AccountActionsController
                }
            });
        });
    };

    var _handlers = function(){
        ins.on({
            editAccount:function(){
                new ModalView({
                    template:"editAccount"
                });
            }
        });
    };

    var _isCurrentUser = function(view){
        var user = view.ins.get("user");
        var currentUser = view.ins.get("currentUser");
        return user.get("id") === currentUser.get("id");
    };

    var _initialize = function(){
        if(_isCurrentUser(view)){
            console.log("private");
        }else{
            console.log("public");
        }
    };

    _initialize();
};