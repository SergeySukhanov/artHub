/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/19/2016
 *
 * © 2016 All Rights Reserved
 */

var _loader = function(template){
    return $.ajax({
        url: config.templateManager.rootPath + template + config.templateManager.fileType,
        dataType: config.templateManager.dataType,
        success:function(tmpl){
            config.templates[template] = tmpl;
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
        return _loader(data).then(function(d){
            return d;
        });
    }
};



var _loadIsArray = function(data){
    return _.map(data, _loadIsString);
};



var templateManager = {
    load:function(data){
        if(_.isString(data)){
            return _loadIsString(data)
        }

        if(_.isArray(data)){
            return $.when.apply($, _loadIsArray(data));
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
    }
};