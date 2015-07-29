var MyApp = Marionette.Application.extend({
    el:'body',
    curentId:-1
});

var AppLayoutView = Backbone.Marionette.LayoutView.extend({
    template: 'js/templates/main.twig',

    regions:{
        player : '#player',
        playlist: '#playlist'
    },

    events:{

    },

    onShow: function() {
        console.log('App show');
        var PlaylistController = require('./view/Playlist');
        app.playlist = require('./model/playlist');
        app.playlist.fetch()
        this.getRegion('playlist').show(new PlaylistController({collection:app.playlist}));

        var player = require('./view/Player');
        this.getRegion('player').show(new player());
    }
});


app = new MyApp();
app.addRegions({
    app: ".container"
});
app.on('start',function(){
    this.MainView = new AppLayoutView();
    this.getRegion('app').show(this.MainView);
});
app.start();