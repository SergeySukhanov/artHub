/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/21/2016
 *
 * © 2016 All Rights Reserved
 */

var SettingsController = function(ins){
    var _render = function(){
        _handlers()
    };
    var _handlers = function(){
        ins.on({
            tabs:function(event){
                console.log(event);
                var tab = event.node.dataset.headerId;
                localStorage.setItem("ahActiveTab", tab);
                _tabsInit("ah_header-tabs", "ah_body-tabs");
            }
        });
    };

    var _tabsInit = function(header, body){
        var headerTabs = $("." + header).find("a");
        var bodyTabs = $("." + body).find(".ah_body-tab");

        var activeTab = localStorage.getItem("ahActiveTab") || "tab-1";

        var activeHeaderTab = headerTabs.filter("[data-header-id='" + activeTab + "']");
        var activeBodyTab = bodyTabs.filter("[data-body-id='" + activeTab + "']");

        headerTabs.not(activeHeaderTab).removeClass("ah_active");
        bodyTabs.not(activeBodyTab).hide();

        activeHeaderTab.addClass("ah_active");
        activeBodyTab.show();
    };

    var _initialize = function(){
        _tabsInit("ah_header-tabs", "ah_body-tabs");
        _render();
    };

    _initialize();
};