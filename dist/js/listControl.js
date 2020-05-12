//列表切歌
(function (root) {

    function listControl(data, wrap) {
        var list = document.createElement('div'),
            dl = document.createElement('dl'),
            dt = document.createElement('dt'),
            close = document.createElement('div'),
            musicList = [];//对外接口；存储歌曲对应的dom <dd>

        list.className = 'list';
        dt.innerHTML = '播放列表';
        close.className = 'close';
        close.innerHTML = '关闭';

        dl.appendChild(dt);
        data.forEach(function (item, index) {
            // console.log(item.song)
            var dd = document.createElement('dd');
            dd.innerHTML = item.song;
            dd.addEventListener('touchend', function () {
                changeSelect(index);
            })


            dl.appendChild(dd);
            musicList.push(dd)
        });
        list.appendChild(dl);
        list.appendChild(close);
        wrap.appendChild(list);

        changeSelect(0);//默认第一首歌选中

        var disY = list.offsetHeight;
        list.style.transform = 'translateY(' + disY + 'px)';//隐藏dist

        close.addEventListener('touchend', slideDown);//隐藏


        function slideUp() {//上滑
            list.style.transition = '.2s';
            list.style.transform = 'translateY(0)';
        }

        function slideDown() {
            list.style.transition = '.2s';
            list.style.transform = 'translateY(' + disY + 'px)'
        }

        function changeSelect(index) {
            for (let i = 0; i < musicList.length; i++) {
                musicList[i].className = '';
            }
            musicList[index].className = 'active';
        }

        return {
            //暴露
            dom: list,
            musicList: musicList,//dd
            slideDown: slideDown,
            slideUp: slideUp,
            changeSelect: changeSelect//选中状态
        }
    }

    root.listControl = listControl;
})(window.player || (window.player = {}))




















