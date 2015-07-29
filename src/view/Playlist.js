var SongItemView = Marionette.ItemView.extend({
    tagName:'tr',
    template:'js/templates/song.twig',

    events:{
        'click': 'itemClick'
    },

    itemClick: function(e){
        app.curentId = this._index;
        $(app).trigger('playlist:select');
        console.log(this._index);
    }

});

var Playlist  = Marionette.CollectionView.extend({
    tagName:'table',
    childView: SongItemView,
    className:'table',

    onShow: function(){
        console.log('Playlist show');
    }
});

module.exports =  Playlist;