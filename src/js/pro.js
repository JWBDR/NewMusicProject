(function ($, root) {
    var dur;//总时长；
    var frameId;//定时器标识；
    var startTime = 0;//开始播放的时间；
    var lastPer = 0;//上一次走的百分比;暂停之后播放，不影响进度条

    function renderAllTime(time) {
        //处理歌曲总时长
        dur = time;//闭包 保留
        time = formatTime(time);
        $('.totalTime').html(time);
    }
    function formatTime(time) {
        //换算
        time = Math.round(time);

        var m = Math.floor(time / 60);
        var s = time % 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        return m + ':' + s;
    }

    //进度条
    function start(point) {//status:准备走;拿到比例；播放、切歌时 开定时器
        cancelAnimationFrame(frameId);//清理定时器
        
        //切歌时，时间清零，干掉上一次的累计,没有传参or手动传参(0)
        lastPer = point === undefined ? lastPer : point;

        startTime = new Date().getTime();//开始时间；闭包 保留
        function frame() {
            var curTime = new Date().getTime();//当前时间

            var per = lastPer + (curTime - startTime) / (dur * 1000);//当前时间的百分比；加上上一次的百分比(存储)
            if (per <= 1) {//区间
                upDate(per);
            } else {
                cancelAnimationFrame(frameId);//清理定时器
            }
            frameId = requestAnimationFrame(frame);//递归
        }
        frame();
    }
    function upDate(per) {//status:正在走;更新时间;小圆点
        var time = formatTime(per * dur);//百分比*总时间 = 当前走了多少;
        $('.curTime').html(time);
        //进度条
        // var perX = per * 100 + '%';
        var perX = (per - 1) * 100 + '%';
        //给圆点加了个父级pro-top
        $('.pro-top').css({
            transform: 'translateX(' + perX + ')',
        })
        // $('.fontBg').css({
        //     width : perX
        // })
    }
    function stop() {//status:停止;处理暂停(圆点、旋转、时间)
        var stopTime = new Date().getTime();//记录暂停时间
        cancelAnimationFrame(frameId);//清理定时器
        lastPer = lastPer + (stopTime - startTime) / (dur * 1000);//startTime，闭包；记录百分比

    }

    function next (){
        cancelAnimationFrame(frameId);//清理定时器
    }




    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        upDate: upDate,
        stop: stop,
        next : next
    }

})(window.Zepto, window.player || (window.player = {}))









