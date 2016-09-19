$.fn.KianaInit = function () {
    var kianaImg1 = "img/kiana-1.png";
    var kianaImg2 = "img/kiana-2.png";
    var kianaImg3 = "img/kiana-3.gif";
    var kianaImg4 = "img/kiana-4.png";
    var dragMp3 = "mp3/kiana_drag.mp3"

    //����ͼƬdiv
    $(this).append("<div id='kianaImgDiv'><img /></div>");
    //����ͼƬ�б�div
    $(this).append("<div class='kianaImgList'></div>");
    //���Ĭ��ͼƬ��ͼƬ�б�
    AddImgToImgList("kiana-1", kianaImg1);

    //����mp3�б�
    $(this).append("<div class='mp3List'></div>");


    //��ǰkinana��ʾ��ͼƬ��Div
    var $kianaImgDiv = $("#kianaImgDiv");
    //��ǰkinana��ʾ��ͼƬ
    var $kianaImg = $("#kianaImgDiv img");



    //��һ������ʱ ����kunanaͼƬsrc
    $kianaImg.prop("src", GetImgSrc("#kiana-1"));

    //���ŵ�div��ʱ�л�ͼƬ(1��3)
    $kianaImgDiv.hover(function () {
        //���ͼƬ3�����ڣ�����ͼƬ�б����
        if (!ImgIsExist("#kiana-3")) {
            AddImgToImgList("kiana-3", kianaImg3);
        }
        
        if ($kianaImg.prop("src") != kianaImg3) {
            $kianaImg.prop("src", GetImgSrc("#kiana-3"));
        }
    }, function () {
        //ͼƬ�б��е�һ��ͼƬ�϶��в����ж�
        if ($kianaImg.prop("src") != kianaImg1) {
            $kianaImg.prop("src", GetImgSrc("#kiana-1"));
        }
    });

    //���ʱ
    $kianaImg.click(function () {
         //���ͼƬ4�����ڣ�����ͼƬ�б����
        if (!ImgIsExist("#kiana-4")) {
            AddImgToImgList("kiana-4", kianaImg4);
        }
        //�л�
        $kianaImg.prop("src",GetImgSrc("#kiana-4"));
    });

    //�϶�
    $(this).dragging({
        move: 'both',
        randomPosition: false,
        MouseDown: function () {
            //dragMp3�����ڣ�����MP3�б��м�һ��
            if (!Mp3IsExist("#kiana_drag")) {
                AddMp3ToMp3List("kiana_drag", dragMp3);
            }
            //����
            document.getElementById("kiana_drag").play();
             //���ͼƬ2�����ڣ�����ͼƬ�б����
            if (!ImgIsExist("#kiana-2")) {
                AddImgToImgList("kiana-2", kianaImg2);
            }
            //�л�
            $kianaImg.prop("src", GetImgSrc("#kiana-2"));
        },
        MouseUp: function () {
            //�л�
            $kianaImg.prop("src", GetImgSrc("#kiana-1"));
        }
    });

};
//�϶�
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

//ͼƬ�Ƿ����
ImgIsExist = function (imgId) {
    if ($(".kianaImgList " + imgId).length > 0) {
        return true;
    } else {
        return false;
    }
};
//��ͼƬ�б����ͼƬ
AddImgToImgList = function (imgId, src) {
    $(".kianaImgList").append("<img id='" + imgId + "' src='" + src + "' />");
};
//����id��ȡͼƬ�б���ͼƬ��src����
GetImgSrc = function (imgId) {
    return $(".kianaImgList " + imgId).prop("src");
}

//���mp3��MP3�б�
AddMp3ToMp3List = function (mp3Id, src) {
    $(".mp3List").append("<audio id='" + mp3Id + "' src='" + src + "'></audio>");
};

//mp3 �Ƿ����
Mp3IsExist = function (mp3Id) {
    if ($(".mp3List " + mp3Id).length > 0) {
        return true;
    } else {
        return false;
    }
};