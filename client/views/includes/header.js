'use strict';

Template.header.helpers({
    activeRouteClass: function () {
        var args = Array.prototype.slice.call(arguments, 0),
            active;

        args.pop();
        active = _.any(args, function (name) {
            return location.pathname === Router.path(name);
        });

        return active && 'active';
    }
});

