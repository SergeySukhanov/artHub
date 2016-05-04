/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/28/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var foldersModule = {
    tree:function(ins){
        var _initialize = function(){
            _handlers();
        };

        var _handlers = function(){
            ins.on({
                toggleTree:function(event){
                    var body = $(event.node).siblings(".ah_body-folder");
                    var toggleSimbol = $(event.node).children();
                    if(toggleSimbol.hasClass("minus")){
                        toggleSimbol.text("+");
                        toggleSimbol.removeClass("minus");
                    }else{
                        toggleSimbol.text("-");
                        toggleSimbol.addClass("minus");
                    }
                    body.slideToggle(100);
                },

                changeNameTreeItem:function(event){
                    var id = $(event.node).data("id");
                    var input = $("[data-edit-id=" + id + "]")
                    $(event.node).hide();
                    input.show();
                },

                selectTreeItem:function(event){
                    $(this.el).find(".selected").removeClass("selected");
                    $(event.node).addClass("selected")
                },

                saveChangedName:function(event){
                    var id = $(event.node).data("edit-id");
                    var node = $("[data-id=" + id + "]")
                    $(event.node).hide();
                    node.show();
                }
            });
        };

        _initialize();
    },
    folders:function(ins){
        var _intialize = function(){
            _handlers();
        };

        var _handlers = function(){
            ins.on({

            });
        };

        _intialize();
    }
};