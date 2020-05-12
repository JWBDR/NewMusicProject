(function (root) {
    function AudioManage() {
        this.audio = new Audio();
        this.status = 'pause';
    }
    AudioManage.prototype = {
        load:function(src) {
            //加载音乐
            this.audio.src = src;//设置音乐路径
            this.audio.load();//内部需要调用，而外部直接加载音乐
        },
        play:function() {
            //播放
            this.audio.play();
            this.status = 'play';
            console.log('play')
        },
        pause:function() {
            //暂停
            this.audio.pause();
            this.status = 'pause';
        },
        end:function(fn) {
            //音乐播放完成--下一首
            this.audio.onended = fn;//回调
        },
        playTo:function(time) {
            //跳到音乐的某个时间点；配合touchend操作
            this.audio.currentTime = time;//单位s非ms
        }
    }

    root.music = new AudioManage();//暴露实例对象

})(window.player || (window.player = {}))
