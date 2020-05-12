(function ($, root) {
    var dur;//总时长
    var frameId;//定时器标识
    var startTime = 0;//开始播放的时间
    var lastPer = 0;//上一次走的百分比
    console.log(1);


    function renderAllTime(time) {
        //处理歌曲总时长
        time = formatTime(time);
        $('.totalTime').html(time);
    }
    function formatTime(time) {
        //换算
        var m = Math.floor(time / 60)
        var s = time % 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        return m + ':' + s;
    }
    
    root.pro = {
        renderAllTime : renderAllTime,
        
    }

})(window.Zepto, window.player || (window.player = {}))









