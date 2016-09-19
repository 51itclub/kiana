$.fn.KianaInit = function () {
    var kianaImg1 = "img/kiana-1.png";
    var kianaImg2 = "img/kiana-2.png";
    var kianaImg3 = "img/kiana-3.gif";
    var kianaImg4 = "img/kiana-4.png";
    var dragMp3 = "mp3/kiana_drag.mp3"

    //创建图片div
    $(this).append("<div id='kianaImgDiv'><img /></div>");
    //创建图片列表div
    $(this).append("<div class='kianaImgList'></div>");
    //添加默认图片到图片列表
    AddImgToImgList("kiana-1", kianaImg1);

    //创建mp3列表
    $(this).append("<div class='mp3List'></div>");


    //当前kinana显示的图片的Div
    var $kianaImgDiv = $("#kianaImgDiv");
    //当前kinana显示的图片
    var $kianaImg = $("#kianaImgDiv img");



    //第一次启动时 设置kunana图片src
    $kianaImg.prop("src", GetImgSrc("#kiana-1"));

    //鼠标放到div上时切换图片(1和3)
    $kianaImgDiv.hover(function () {
        //如果图片3不存在，则向图片列表添加
        if (!ImgIsExist("#kiana-3")) {
            AddImgToImgList("kiana-3", kianaImg3);
        }
        
        if ($kianaImg.prop("src") != kianaImg3) {
            $kianaImg.prop("src", GetImgSrc("#kiana-3"));
        }
    }, function () {
        //图片列表中第一个图片肯定有不用判断
        if ($kianaImg.prop("src") != kianaImg1) {
            $kianaImg.prop("src", GetImgSrc("#kiana-1"));
        }
    });

    //点击时
    $kianaImg.click(function () {
         //如果图片4不存在，则向图片列表添加
        if (!ImgIsExist("#kiana-4")) {
            AddImgToImgList("kiana-4", kianaImg4);
        }
        //切换
        $kianaImg.prop("src",GetImgSrc("#kiana-4"));
    });

    //拖动
    $(this).dragging({
        move: 'both',
        randomPosition: false,
        MouseDown: function () {
            //dragMp3不存在，则向MP3列表中加一个
            if (!Mp3IsExist("#kiana_drag")) {
                AddMp3ToMp3List("kiana_drag", dragMp3);
            }
            //播放
            document.getElementById("kiana_drag").play();
             //如果图片2不存在，则向图片列表添加
            if (!ImgIsExist("#kiana-2")) {
                AddImgToImgList("kiana-2", kianaImg2);
            }
            //切换
            $kianaImg.prop("src", GetImgSrc("#kiana-2"));
        },
        MouseUp: function () {
            //切换
            $kianaImg.prop("src", GetImgSrc("#kiana-1"));
        }
    });

};
//拖动
$.fn.dragging = function (data) {
    
    $(this).mousedown(function () {
        data.MouseDown();
    });
    $(this).mouseup(function () {
        data.MouseUp();
    });
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

    var mDown = false;//
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

//图片是否存在
ImgIsExist = function (imgId) {
    if ($(".kianaImgList " + imgId).length > 0) {
        return true;
    } else {
        return false;
    }
};
//向图片列表添加图片
AddImgToImgList = function (imgId, src) {
    $(".kianaImgList").append("<img id='" + imgId + "' src='" + src + "' />");
};
//根据id获取图片列表下图片的src属性
GetImgSrc = function (imgId) {
    return $(".kianaImgList " + imgId).prop("src");
}

//添加mp3到MP3列表
AddMp3ToMp3List = function (mp3Id, src) {
    $(".mp3List").append("<audio id='" + mp3Id + "' src='" + src + "'></audio>");
};

//mp3 是否存在
Mp3IsExist = function (mp3Id) {
    if ($(".mp3List " + mp3Id).length > 0) {
        return true;
    } else {
        return false;
    }
};