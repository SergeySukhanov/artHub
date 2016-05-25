/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/20/2016
 *
 * © 2016 All Rights Reserved
 */

var AccountController = function(ins, view){

    var access = null;
    var type = null;
    var template = null;
    var id = null;

    var _render = function(){
        var actions = roles[type].account[access].pages;
        if(!view.params.action){
            template = "account/" + access + "/" + "info";
        }
        _.each(actions, function(elem, index){
            if(elem === view.params.action){
                template = "account/" + access + "/" + elem;
            }
        });
        if(!template){
            config.routers.mainRouter.navigate(id, {trigger:true});
        }else{
            _component();
            _handlers();
        }

    };

    var _component = function(){
        templateManager.load(template).then(function(tmpl){
            new BaseView({
                id:"accountComponent",
                el:".ah_bottom-account",
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
            id = user.get("id");
            type = user.get("type");
        var currentUser = view.ins.get("currentUser");
        return user.get("id") === currentUser.get("id");
    };

    var _initialize = function(){
        if(_isCurrentUser(view)){
            access = "private";
        }else{
            access = "public";
        }

        _render();
    };

    _initialize();
};