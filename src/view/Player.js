var Player = Marionette.ItemView.extend({
    template:'js/templates/player.twig',

    song:{},

    player:null,
    duration:0,

    events:{
        'click #bPlay':'play',
        'click #bStop':'stop',
        'click #bForward':'forvard',
        'click #pBack':'backward'
    },

    test:function (){
        if (this.player) {
            this.player.pause();
            this.player.stop();
            this.player = null;
        }
        app.curentId--;
        this.play();
    },

    initialize:function (options){
        if (options!=undefined && options.length>0) {
            var keys = Object.keys(options);
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                this[keys[i]] = options[keys[i]];
            }
        }

        var that = this;
        $(app).on('playlist:select', function(){
            that.test();
        });
    },

    _setplayer:function(url){
        var that = this;
        if (this.player){
            this.player.pause();
            this.player.stop();
            this.player = null;
            this._setProgres(0);
        }
        this.player = new AV.Player.fromURL(url);
        this.player.on('progress',function (e){
            var player = that.player;
            if (player.duration>0 ){
                var pr = Math.round(player.currentTime/player.duration*100);
                that._setProgres(pr);
            }
        });

        this.player.on('duration',function (e){
           this.duration = e;
        });

        this.player.on('end',function(){
            that.forvard();
        });
    },

    _setPlayIco: function (){
        var pl =  $('#bPlay i');
        pl.removeClass('glyphicon-pause');
        pl.addClass('glyphicon-play');
    },

    _setPauseIco: function (){
        var pl =  $('#bPlay i');
        pl.removeClass('glyphicon-play');
        pl.addClass('glyphicon-pause');

    },

    _setProgres:function (val){
        $('.progress-bar').css('width',val+'%');
    },

    _setName:function(title,artist){
        $('#sTitle').text(title);
        $('#sArtist').text(artist);
    },

    _initSong:function(){
        app.curentId++;
        if (app.curentId > app.playlist.length){
            app.curentId = 0;
        }
        this.song = app.playlist.at(app.curentId);
        this._setName(this.song.get('title'),this.song.get('artist'));

    },

    _setMarck:function(){
        $('tr.bg-primary').removeClass('bg-primary');

        $('table tr:nth-child('+(app.curentId+1)+')').addClass('bg-primary');
    },


    play:function(){
        if(this.player == null){
            this._initSong();
            this._setplayer(this.song.get('url'));
            this._setMarck();
        }
        if (this.player.playing){
            this.player.pause();
            this._setPlayIco();
        } else {
            this.player.play();
            this._setPauseIco();
        }

    },

    stop: function(){
        if(this.player != null){
            this.player.pause();
            this.player.stop();
            this.player = null;
            this._setProgres(0);
            this._setName('','');
            this._setPlayIco();
            app.curentId--;
        }
    },

    forvard:function(){
        this.stop();
        app.curentId++;
        if (app.curentId >= app.playlist.length-1){
            app.curentId = -1;
        }
        this.play();
    },

    backward:function(){
        this.stop();
        app.curentId--;
        if (app.curentId<-1){
            app.curentId = app.playlist.length -2;
        }
        this.play()
    }

});

module.exports = Player;