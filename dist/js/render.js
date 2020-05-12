//渲染模块：渲染图片、音乐信息、是否喜欢；
(function (root) {
    //渲染图片
    function renderImg(src) {
        // root.blurImg(src);//第二个参数默认是body
        var img = document.querySelector(".songImg img");
        img.src = src;
    }
    //渲染音乐信息
    function renderInfo(data) {
        var songInfoChildren = document.querySelector(".songInfo").children;
        songInfoChildren[0].innerHTML = data.song;
        songInfoChildren[1].innerHTML = data.singer;
        songInfoChildren[2].innerHTML = data.album;
    }
    //渲染是否喜欢
    function renderIsLike(isLike) {
        var lis = document.querySelectorAll(".control li");
        lis[0].className = isLike ? 'liking' : '';
        
    }


    root.render = function (data) {
        //同时渲染
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
})(window.player || (window.player = {}))











