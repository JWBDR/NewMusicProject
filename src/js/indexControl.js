//索引值控制对象的模块
//调用此函数需要更新下index

(function (root) {
    function Index(len) {
        this.index = 0;//当前索引
        this.len = len;//传进来的数据长度，为了判断
    }

    Index.prototype = {

        prev: function () {
            //上一首
            return this.get(-1);
        },
        next: function () {
            //下一首
            return this.get(1);
        },
        get: function (val) {
            //获取索引，参数 +/-1(控制边界问题)
            this.index = (this.index + val + this.len) % this.len;
            return this.index;
        }
    }
    root.controlIndex = Index;//构造函数暴露出去；实例需要传参，不能暴露实例；
})(window.player || (window.player = {}))

























