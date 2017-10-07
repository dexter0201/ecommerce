'use strict';

Template.errors.helpers({
    errors: function () {
        return Errors.find();
    }
});

Tempate.errors.rendered = function () {
    var error = this.data;
    Meteor.defer(function () {
        Errors.update(error._id, {
            $set: {
                seen: true
            }
        });
    });
};
