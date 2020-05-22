(function ($, player) {
    function MusicPlayer(dom) {
        this.wrap = dom;//加载listControl列表切歌模块
        this.dataList = [];//存储请求数据,共用
        // this.now = 0;//歌曲索引c
        this.indexObj = null;//索引值对象，用于切歌
        this.rotateTimer = null;//旋转唱片的定时器
        this.curIndex = 0;//当前播放歌曲的index
        this.list = null;//列表切歌对象在listPlay()列表切歌中赋的值
        // this.indexObj.index = new player.controlIndex(this.dataList.length);//给index对象赋值
    }
    MusicPlayer.prototype = {
        init: function () {
            this.getDom();
            this.getData('../mock/data.json');
        },
        getDom: function () {//获取页面元素
            this.record = document.querySelector(".songImg img");//旋转图片

            this.controlBtns = document.querySelectorAll(".control li");//底部导航按钮
        },
        getData: function (url) {
            var _this = this;
            $.ajax({
                url: url,
                method: 'get',
                success: function (data) {
                    _this.dataList = data;//存数据
                    _this.listPlay();//列表切歌,this.list在里面；loadMusic需要用；
                    _this.indexObj = new player.controlIndex(data.length);//给index对象赋值

                    _this.loadMusic(_this.indexObj.index);//加载音乐;参数默认索引值
                    _this.musicControl();//添加音乐操作功能

                    _this.bindTouch();
                },
                error: function () {
                    console.log("数据请求失败");
                }
            })
        },
        loadMusic: function (index) {//加载音乐、渲染;
            //变更音乐地址、上/下一首、列表中点击播放都需要调用
            player.render(this.dataList[index]);//渲染图片，歌曲信息..
            player.music.load(this.dataList[index].audioSrc);

            //播放音乐条件判断
            if (player.music.status == 'play') {
                player.music.play();//播放
                this.controlBtns[2].className = 'playing';//播放
                //暂停&&切歌时也播放
                var deg = this.record.dataset.rotate || 0;//第一次没有data-rotate,兼容为0；
                this.imgRotate(deg);//播放时候旋转图片
            } else {

            }

            // this.list
            this.curIndex = index;//存储当前歌曲对应的index(列表变色)
            this.list.changeSelect(index);//改变列表歌曲的选中状态

            player.pro.renderAllTime(this.dataList[index].duration);//渲染时长
        },
        musicControl: function () {//控制音乐上/下一首
            var self = this;
            this.controlBtns[1].addEventListener('touchend', function () {
                //上一首
                player.music.status = 'play';//切歌时修改状态，立刻播放

                player.pro.start(0);//切歌时 时间清零
                // self.now--;
                self.loadMusic(self.indexObj.prev());
                ///////////////////
                if (player.music.status == 'pause') {
                    player.pro.stop();//暂停停止定时器(原点)

                }
            });


            this.controlBtns[2].addEventListener('touchend', function () {
                //播放/暂停
                if (player.music.status == 'play') {
                    player.music.pause();

                    player.pro.stop();//暂停停止定时器(原点)
                    this.className = '';
                    self.imgStop();
                } else {
                    player.music.play();
                    player.pro.start();//定时器
                    clearInterval(self.rotateTimer)
                    this.className = 'playing';
                    var deg = self.record.dataset.rotate || 0;//第一次没有data-rotate,兼容为0；
                    self.imgRotate(deg);//播放时候旋转图片
                }

            })

            this.controlBtns[3].addEventListener('touchend', function () {
                //下一首
                player.music.status = 'play';//切歌时修改状态，立刻播放

                player.pro.start(0);//切歌时 时间清零
                // self.now++;
                self.loadMusic(self.indexObj.next());
                // self.loadMusic(1);
                if (player.music.status == 'pause') {
                    player.pro.stop();//暂停停止定时器(原点)
                }
            })
        },
        imgRotate: function (deg) {//旋转唱片
            var self = this;
            clearInterval(this.rotateTimer);//防止点击多次累加
            this.rotateTimer = setInterval(function () {
                deg = +deg + 0.2;//字符串转数字；
                self.record.style.transform = 'rotate(' + deg + 'deg)';
                self.record.dataset.rotate = deg;//旋转的角度存在标签身上，为了暂停后继续播放能取到imgRotate;
                // console.log(self.record.dataset.rotate)
            }, 1000 / 60)//PC刷新频率是1秒60次，保持刷新频率一致
        },
        imgStop: function () {//停止旋转
            clearInterval(this.rotateTimer);
        },
        listPlay: function () {//列表切歌
            var self = this;
            // console.log(player.listControl)
            this.list = player.listControl(this.dataList, this.wrap);//给this.list赋值return的(dd)

            //列表按钮
            this.controlBtns[4].addEventListener('touchend', function () {
                self.list.slideUp();//显示列表
            });

            //列表按钮点击切歌
            this.list.musicList.forEach(function (item, index) {
                item.addEventListener('touchend', function () {//列表点击事件
                    //点击的当前的某首歌，不管播放暂停都无效
                    if (self.curIndex == index) {//dd的index，对应当前歌曲
                        return;
                    } else {
                        //切歌

                        player.music.status = 'play';//切歌时修改状态，立刻播放
                        self.indexObj.index = index;//更新索引值对象的index 为dd的index
                        self.loadMusic(self.indexObj.index);//加载点击对应索引值的那首歌曲
                        
                        player.pro.start(0);//计时器归零(手动赋值0)

                        self.list.slideDown();//选中隐藏菜单
                    }
                })
            });


        },
        bindTouch() {//拖拽
            var self = this;
            var $spot = $(".circle");
            var offset = $('.backBg').offset();//圆点活动范围
            var left = offset.left;
            var width = offset.width;

            $spot.on('touchstart', function () {
                player.pro.stop();//暂停圆点停止
            }).on('touchmove', function (e) {
                var x = e.changedTouches[0].clientX;//第0个手指；点的左边的距离
                var per = (x - left) / width;//点距离所占百分比
                // console.log(per)

                if (0 < per && per < 1) {
                    player.pro.upDate(per);
                }
            }).on('touchend', function (e) {
                var x = e.changedTouches[0].clientX;
                var per = (x - left) / width;
                if (0 < per && per < 1) {
                    //从抬起的地方播放  百分比*总时长

                    var curTime = per * self.dataList[self.indexObj.index].duration;
                    player.music.playTo(curTime);//更新时间
                    player.music.status = 'play';//更新状态
                    //直接拉动进度条时播放
                    player.music.play();
                    player.pro.start(per);

                    // console.log($('li:nth-child(3)'))
                    $('.play').addClass('playing');
                    player.pro.start(per);




                };

            })

        }

    }
    var musicPlayer = new MusicPlayer(document.getElementById("wrap"));

    musicPlayer.init();

})(window.Zepto, window.player)









