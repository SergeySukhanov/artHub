/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var _loader = function(template){
    return $.ajax({
        url: config.templateManager.rootPath + template + config.templateManager.fileType,
        dataType: config.templateManager.dataType,
        success:function(tmpl){
            config.templates[template] = tmpl;
            console.log("success");
        }
    });
};

var _loadIsObject = function(data){
    return _loader(data.template);
};

var _loadIsString = function(data){
    if(config.templates[data]){
        return  $.when().then(function(){
            return  config.templates[data];
        })
    }else{
        return _loader(data);
    }
};



var _loadIsArray = function(data){
    return _loadIsString(data[0]).then(function(tmpl){
        config.templates[data[0]] = tmpl;
        data.shift();
        if(data.length > 0){
           return  _loadIsArray(data);
        }
    });
};


var templateManager = {
    load:function(data){
        if(_.isString(data)){
            return _loadIsString(data)
        }

        if(_.isArray(data)){
            return _loadIsArray(data);
        }

        if(_.isObject(data)){
            return _loadIsObject(data).then(function(tmpl){
                return templateManager.create(data, tmpl);
            });
        }
    },

    create:function(view, tmpl){
        var ins = new Ractive({
            el: '#' + view.el,
            template: tmpl,
            data:view.data,
            magic:true,
            adaptors:["Backbone"]
        });

        return view.render(ins);
    },

    setConfig:function(newConfig){

    }
};