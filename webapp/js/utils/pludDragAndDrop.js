/**
 * Created by developer on 11.05.16.
 */
;(function () {
    'use strict';

    if (Ractive.events.dragndrop){
        return;
    }

    Ractive.events.dragndrop = function ( node, fire ) {
        var foreach = function (n, next) {
            if (n.length) Array.prototype.forEach.call(n, next);
        };

        var Drag = {
            event: function (name) {
                return function (event) {
                    fire({
                        node: node,
                        name: name,
                        type: name.split('_')[1],
                        target: this,
                        original: event
                    });
                };
            }
        };

        foreach(node.children, function (el) {
            el.draggable = true;
            el.addEventListener('dragstart', Drag.event('drag_start'));
            el.addEventListener('dragenter', Drag.event('drag_enter'));
            el.addEventListener('dragover', Drag.event('drag_over'));
            el.addEventListener('dragleave', Drag.event('drag_leave'));
            el.addEventListener('drop', Drag.event('drag_drop'));
            el.addEventListener('dragend', Drag.event('drag_end'));
        });

        return {
            teardown: function () {
                foreach(node.children, function (el) {
                    el.draggable = true;
                    el.removeEventListener('dragstart', Drag.event('drag_start'));
                    el.removeEventListener('dragenter', Drag.event('drag_enter'));
                    el.removeEventListener('dragover', Drag.event('drag_over'));
                    el.removeEventListener('dragleave', Drag.event('drag_leave'));
                    el.removeEventListener('drop', Drag.event('drag_drop'));
                    el.removeEventListener('dragend', Drag.event('drag_end'));
                });
            }
        };
    };

})();