/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */


var UserModel = Backbone.Model.extend({
    defaults:{
        login:null,
        password:null,
        newAccount:true,
        exists:true,
        types:{
            buyer:false,
            artist:false
        },
        basket:{},
        fillAccount:false
    },
    registration:function(){
        console.log("reg");
    },

    authentification:function(){
        var model = this;
        return API.user.auth().then(function(data){
            for(var i=0; i<data.users.length; i++){
                if((data.users[i].login === model.get("login")) && (data.users[i].password === model.get("password"))){
                    token.setItem("blablabla-123456");
                }
            }
        })
    },

    fullName:function(){
        return this.get("firstName") + " " + this.get("lastName");
    },
    checkExists:function(){
        var model = this;
        var exists = false;
        return API.user.checkExists().then(function(data){
            for(var i=0; i<data.users.length; i++){
                if(data.users[i].login === model.get("login")){
                    exists = true;
                }
            }
            if(exists){
                model.set("exists", true);
            }else{
                model.set("exists", false);
            }
        });
    },

    initialize:function(){

    }
});