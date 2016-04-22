/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var token = {
    getItem:function(){
        return localStorage.getItem("Access-Token");
    },
    setItem:function(token){
        localStorage.setItem("Access-Token", token);
        return token;
    },
    removeItem:function(){
        localStorage.removeItem("Access-Token");
    }
};