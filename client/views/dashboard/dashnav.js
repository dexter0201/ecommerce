'use strict';

Template.dashnav.events({
    'submit form': function (event) {
        event.preventDefault();
        var domain = {
            url: $(event.target).find('[name="url"]').val(),
            title: $(event.target).find('[name="title"]').val()
        };

        Meteor.call('domain', domain, function (error, id) {
            if (error) {
                throwError(error.reason);
                if (error.error === 302) {
                    console.log('error');
                }
            } else {
                console.log('success');
                $('#createProject').modal('hide');
            }
        });
    }
});

Template.dashnav.helpers({
    domains: function () {
        return Domains.find();
    }
});
