'use strict';

Router.configure({
    layout: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
    renderTempates: {
        footer: {
            to: 'footer'
        },
        header: {
            to: 'header'
        }
    }
});

Router.map(function () {
    this.route('index', { path: '/' });
    this.route('home', { path: '/' });
    this.route('howitworks');
    this.route('pricing');
    this.route('contactus');
    this.route('dashboard');
    this.route('about');
    this.route('faqs');
    this.route('termsofuse');
    this.route('privacypolicy');
});
