$.fn.KianaInit = function (data) {
    //设置index
    $(this).css("z-index", "999999");
    //拖动效果
    $(this).dragging({
        move: 'both',
        randomPosition: data.randomPosition //位置是否随机
    });

    //资源配置
    //图片
    var kianaImg1 = "img/kiana-1.png";
    var kianaImg2 = "img/kiana-2.png";
    var kianaImg3 = "img/kiana-3.gif";
    var kianaImg4 = "img/kiana-4.png";
    //MP3
    var dragMp3 = "mp3/kiana_drag.mp3";
    var kiana_1Mp3 = "mp3/kiana_1.mp3";
    var kiana_2Mp3 = "mp3/kiana_2.mp3";
    var kiana_3Mp3 = "mp3/kiana_3.mp3";
    var kiana_4Mp3 = "mp3/kiana_4.mp3";
    var kiana_5Mp3 = "mp3/kiana_5.mp3";
    var kiana_6Mp3 = "mp3/kiana_6.mp3";
    var kiana_7Mp3 = "mp3/kiana_7.mp3";
    var kiana_8Mp3 = "mp3/kiana_8.mp3";
    var kiana_9Mp3 = "mp3/kiana_9.mp3";
    var kiana_10Mp3 = "mp3/kiana_10.mp3";
    var kiana_11Mp3 = "mp3/kiana_11.mp3";
    //语言
    var lan =
        [
            "呀~~",
            "快看快看我抽到了什么",
            "去死去死去死去死！！",
            "主人,人家钱包都空了~",
            "变态！",
            "kiana,变身",
            "哼,mihoyou什么的最讨厌了！！！",
            "千万别小看我哟",
            "要加油哦",
            "我就知道主人最疼人家了",
            "锵锵~",
            "烦死啦走开走开啦！！！",
        ];

    //存语言和MP3的json对象,每个语言对应一个mp3
    var LanMp3 = {
        "呀~~": dragMp3,
        "快看快看我抽到了什么": kiana_1Mp3,
        "去死去死去死去死！！": kiana_2Mp3,
        "主人,人家钱包都空了~": kiana_3Mp3,
        "变态！": kiana_4Mp3,
        "kiana,变身": kiana_5Mp3,
        "哼,mihoyou什么的最讨厌了！！！": kiana_6Mp3,
        "千万别小看我哟": kiana_7Mp3,
        "要加油哦": kiana_8Mp3,
        "我就知道主人最疼人家了": kiana_9Mp3,
        "锵锵~": kiana_10Mp3,
        "烦死啦走开走开啦！！！": kiana_11Mp3,
    };



    //创建一个div包括所有内容
    $(this).append("<div class='kiana'></div>");

    //创建图片div  class="kianaImgDiv"
    $(".kiana").append("<div class='kianaImgDiv'></div>");
    //向图片div里创建图片，用于显示kiana
    $(".kianaImgDiv").append("<img id='kianaImg' />");
    //kianaImg 默认src=第一张
    $("#kianaImg").prop("src", kianaImg1);

    //创建mp3 div class="kianaMP3Div"
    $(".kiana").append("<div class='kianaMP3Div'></div>");
    //向MP3div里创建audio    
    $(".kianaMP3Div").append("<audio id='kianaAudio'></audio>");


    //创建语言气泡div
    $(".kiana").append("<div class='kianaLanguage'></div>");

    //关闭按钮
    $(".kiana").append("<div class='kianaCloseBtn'>×</div>");
    //关闭kiana
    $(".kianaCloseBtn").mousedown(function () {
        $(".kiana").css("display", "none");
    });


    //鼠标
    //进入kianaImgDiv时,显示第3张图片，显示关闭按钮
    //离开时，显示第1张，
    //按下时:显示第4张,并随机播放MP3和一句话
    //弹起时：显示第3张
    //移动时:判断isDown的状态，如果为true,说明按下且拖动，则显示第二张，并播放dargmp3
    // isDown表示鼠标是否按下
    var isDown = false;
    $(".kianaImgDiv").mouseenter(function () {
        $("#kianaImg").prop("src", kianaImg3);
    }).mouseleave(function () {
        $("#kianaImg").prop("src", kianaImg1);
        $(".kianaCloseBtn").css("display", "none");
        isDown = false;
    }).mousedown(function () {
        $("#kianaImg").prop("src", kianaImg4);
        var o = GetLanMp3(LanMp3, lan);
        Mp3PlayAndShowMsg(o.mp3Src, o.lan);
        isDown = true;
    }).mouseup(function () {
        isDown = false;
        if ($("#kianaAudio")[0].paused) {
            $("#kianaImg").prop("src", kianaImg3);
        }
    }).mousemove(function () {
        if (isDown) {
            $("#kianaImg").prop("src", kianaImg2);
            $("#kianaAudio").prop("src", dragMp3);
            $("#kianaAudio")[0].play();
            $(".kianaLanguage").css("display", "block");
            $(".kianaLanguage").text(lan[0]);
        }
        isDown = false;
    }).hover(function () {
        if ($(".kianaCloseBtn").css("display") != "blcok") {
            $(".kianaCloseBtn").css("display", "block");
        }
    },function(){
         if ($(".kianaCloseBtn").css("display") != "none") {
            $(".kianaCloseBtn").css("display", "none");
        }
    });

    //MP3播放完成
    $("#kianaAudio")[0].onended = function () {
        //隐藏语言气泡
        $(".kianaLanguage").css("display", "none");
        $(".kianaLanguage").text("");
        //还原默认图片
        $("#kianaImg").prop("src", kianaImg3);
    };


};


//拖动
$.fn.dragging = function (data) {
    var $this = $(this);
    var xPage;
    var yPage;
    var X;//
    var Y;//
    var xRand = 0;//
    var yRand = 0;//
    var father = $this.parent();
    var defaults = {
        move: 'both',
        randomPosition: true,
        hander: 1
    }
    var opt = $.extend({}, defaults, data);
    var movePosition = opt.move;
    var random = opt.randomPosition;

    var hander = opt.hander;

    if (hander == 1) {
        hander = $this;
    } else {
        hander = $this.find(opt.hander);
    }



    father.css({ "position": "relative", "overflow": "hidden" });
    $this.css({ "position": "absolute" });
    hander.css({ "cursor": "move" });

    var faWidth = father.width();
    var faHeight = father.height();
    var thisWidth = $this.width() + parseInt($this.css('padding-left')) + parseInt($this.css('padding-right'));
    var thisHeight = $this.height() + parseInt($this.css('padding-top')) + parseInt($this.css('padding-bottom'));

    var mDown = false;
    var positionX;
    var positionY;
    var moveX;
    var moveY;

    if (random) {
        $thisRandom();
    }
    function $thisRandom() {
        $this.each(function (index) {
            var randY = parseInt(Math.random() * (faHeight - thisHeight));///
            var randX = parseInt(Math.random() * (faWidth - thisWidth));///
            if (movePosition.toLowerCase() == 'x') {
                $(this).css({
                    left: randX
                });
            } else if (movePosition.toLowerCase() == 'y') {
                $(this).css({
                    top: randY
                });
            } else if (movePosition.toLowerCase() == 'both') {
                $(this).css({
                    top: randY,
                    left: randX
                });
            }
        });
    }

    hander.mousedown(function (e) {
        //father.children().css({ "zIndex": "0" });
        $this.css({ "zIndex": "999999" });
        mDown = true;
        X = e.pageX;
        Y = e.pageY;
        positionX = $this.position().left;
        positionY = $this.position().top;
        return false;
    });

    $(document).mouseup(function (e) {
        mDown = false;
    });

    $(document).mousemove(function (e) {
        xPage = e.pageX;//--
        moveX = positionX + xPage - X;

        yPage = e.pageY;//--
        moveY = positionY + yPage - Y;

        function thisXMove() {
            if (mDown == true) {
                $this.css({ "left": moveX });
            } else {
                return;
            }
            if (moveX < 0) {
                $this.css({ "left": "0" });
            }
            if (moveX > (faWidth - thisWidth)) {
                $this.css({ "left": faWidth - thisWidth });
            }
            return moveX;
        }

        function thisYMove() {
            if (mDown == true) {
                $this.css({ "top": moveY });
            } else {
                return;
            }
            if (moveY < 0) {
                $this.css({ "top": "0" });
            }
            if (moveY > (faHeight - thisHeight)) {
                $this.css({ "top": faHeight - thisHeight });
            }
            return moveY;
        }

        function thisAllMove() {
            if (mDown == true) {
                $this.css({ "left": moveX, "top": moveY });
            } else {
                return;
            }
            if (moveX < 0) {
                $this.css({ "left": "0" });
            }
            if (moveX > (faWidth - thisWidth)) {
                $this.css({ "left": faWidth - thisWidth });
            }

            if (moveY < 0) {
                $this.css({ "top": "0" });
            }
            if (moveY > (faHeight - thisHeight)) {
                $this.css({ "top": faHeight - thisHeight });
            }
        }
        if (movePosition.toLowerCase() == "x") {
            thisXMove();
        } else if (movePosition.toLowerCase() == "y") {
            thisYMove();
        } else if (movePosition.toLowerCase() == 'both') {
            thisAllMove();
        }
    });
};

//播放MP3并显示语言
Mp3PlayAndShowMsg = function (mp3Src, kianaLanguage) {
    var isPaused = $("#kianaAudio")[0].paused;
    if (isPaused) {
        $("#kianaAudio").prop("src", mp3Src);
        $("#kianaAudio")[0].play();
        $(".kianaLanguage").css("display", "block");
        $(".kianaLanguage").text(kianaLanguage);
    }
};

var oldNum;//用来保存上一次的num，用来和生成的num做比较，保证不重复
//随机从LanMp3抽取,返回一个包含mp3路径以及对应的话的对象
GetLanMp3 = function (LanMp3, lan) {
    //产生一个随机数0-11
    while (true) {
        var num = Math.floor(Math.random() * (11 + 1));
        if (num < 0) {
            num = 0;
        }
        if (num > 12) {
            num = 12;
        }
        //如果和上一次的num不一样则退出
        if (num != oldNum) {
            break;
        }
    }
    oldNum = num;
    var obj = {
        "mp3Src": LanMp3[lan[num]],
        "lan": lan[num]
    };
    return obj;
};