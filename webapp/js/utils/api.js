/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var errorApi = function(e){
    console.log(e);
};

var setConfig = function(){
    var args = arguments;

    if(args.length === 2){
        if(_.isString(args[0]) && config.api.hasOwnProperty(args[0])){
            config.api[args[0]] = args[1];
        }
    }else if(args.length === 1){
        if(_.isObject(args[0])){
            var obj = args[0];

            for(var key in obj){
                if(config.api.hasOwnProperty(key)){
                    config.api[key] = obj[key];
                }
            }
        }
    }
};

var loader = {
    request:function(url, type, opt, act){
        var options = opt || {};
        var actions = act || {};

        return $.ajax({
            beforeSend:options.beforeSend || function(){},
            url:config.api.rootPath + url,
            contentType:options.contentType || "application/json;encoding=utf-8",
            data:options.data || {},
            dataType:options.dataType || "json",
            headers:options.headers || {},
            type:type || "GET",
            success:actions.success || function(){},
            error:actions.error || errorApi
        }).done(actions.done || function(){});
    },

    get:function(options, actions){
        return this.request(options.url, "GET", options, actions);
    },

    post:function(options, actions){
        return this.request(options.url, "POST", options, actions);
    },

    put:function(options, actions){
        return this.request(options.url, "PUT", options, actions);
    },

    delete:function(options, actions){
        return this.request(options.url, "DELETE", options, actions);
    }
};

var API = {
    user:{
        checkExists:function(){
            return loader.get({
                url:"usersLogin.json"
            })
        },
        auth:function(){
            return loader.get({
                url:"usersLogin.json"
            })
        },
        currentUser:function(){
            return loader.get({
                url:"currentUser.json"
            })
        },
        gallery:function(){
            return loader.get({
                url:"gallery.json"
            })
        },
        users:function(){
            return loader.get({
                url:"users.json"
            })
        },
        userInfo:function(id){
            return loader.get({
                url:"user_" + id + ".json"
            });
        },
        search:function(){
            return loader.get({
                url:"../api"
            })
        }
    }
};