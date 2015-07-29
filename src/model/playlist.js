
var Song = Backbone.Model.extend({
    defaults:{
        title:'',
        artist:'',
        albom:'',
        year:1960,
        url:''
    }
});

var Playlist = Backbone.Collection.extend({
    model: Song,

    fetch: function(){
        var that = this;
        $.getJSON('./playlist.json',function (data){
            _.each(data,function(item){
                that.add(new Song(item));
            })
        })
    }

});

module.exports = new Playlist();