'use strict';

Domains = new Meteor.Collection('Domains');
Domains.allow({
    update: ownsDocument,
    remove: ownsDocument
});
Domains.deny({
    update: function (userId, domain, fieldNames) {
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Meteor.methods({
    domain: function (domainAttributes) {
        var user = Meteor.user(),
            domainWithSameLink = Domains.findOne({
                url: domainAttributes.url
            }),
            domain,
            domainId;

        if (!user) {
            throw new Meteor.Error(401, 'You need to login to add domains');
        }

        if (!domainAttributes.title) {
            throw new Meteor.Error(422, 'Please fill in a title');
        }

        if (domainAttributes.url && domainWithSameLink) {
            throw new Meteor.Error(302, 'This domain has already been created', domainWithSameLink);
        }

        domain = _.extend(_.pick(domainAttributes, 'url', 'title'), {
            userId: user._id,
            creator: user.username,
            submitted: new Date().getTime(),
            commentsCount: 0,
            upvoters: [],
            votes: 0
        });
        domainId = Domains.insert(domain);

        return domainId;
    },
    upvote: function (domainId) {
        var user = Meteor.user();

        if (!user) {
            throw new Meteor.Error(401, 'You need to login to upvote');
        }

        Domains.update({
            _id: domainId,
            upvoters: { $ne: user._id }
        }, {
            $addToSet: {
                upvoters: user._id
            },
            $inc: {
                votes: 1
            }
        });
    }
});
