'use strict';

if (Meteor.isClient) {
    Template.hello.greeting = function () {
        return "Welcome to ecommerce.";
    };

    Template.hello.events({
        'click input': function () {

            if (typeof console !== 'undefined') {
                console.log('You pressed the button');
            }
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
    });
}
