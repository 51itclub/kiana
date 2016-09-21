$.fn.KianaInit = function () {
    //资源配置
    //图片
    var kianaImg1 = "img/kiana-1.png";
    var kianaImg2 = "img/kiana-2.png";
    var kianaImg3 = "img/kiana-3.gif";
    var kianaImg4 = "img/kiana-4.png";
    //MP3
    var dragMp3 = "mp3/kiana_drag.mp3"

    //存语言和MP3的json对象,每个语言对应一个mp3
    var LanMp3 = { "呀~~": dragMp3 };


    //拖动效果
    $(this).dragging({
        move: 'both',
        randomPosition: false
    });

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
    var $kianaAudio=$("#kianaAudio");
    
    //创建语言气泡div
    $(".kiana").append("<div class='kianaLanguage'></div>");



    //鼠标
    //进入kianaImgDiv时,显示第3张图片，
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
        isDown = false;
    }).mousedown(function () {
        $("#kianaImg").prop("src", kianaImg4);
        isDown = true;
    }).mouseup(function () {
        isDown = false;
        $("#kianaImg").prop("src", kianaImg3);
    }).mousemove(function () {
        if (isDown) {
            $("#kianaImg").prop("src", kianaImg2);
            var isPaused = document.getElementById("kianaAudio").paused;
            if (isPaused) {
                $kianaAudio.prop("src", dragMp3);
                $kianaAudio[0].play();
                //to do 这里应该有个通用的方法
                $(".kianaLanguage").css("display", "block");
                $(".kianaLanguage").text("呀~~");
            }
        }
        isDown = false;
    });

    //MP3播放完成
    $kianaAudio[0].onended = function () {
        $(".kianaLanguage").css("display", "none");
        $(".kianaLanguage").text("");
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
        father.children().css({ "zIndex": "0" });
        $this.css({ "zIndex": "1" });
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