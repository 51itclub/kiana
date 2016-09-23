$.fn.KianaInit = function (data) {
    //����index
    $(this).css("z-index", "999999");
    //�϶�Ч��
    $(this).dragging({
        move: 'both',
        randomPosition: data.randomPosition //λ���Ƿ����
    });

    //��Դ����
    //ͼƬ
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
    //����
    var lan =
        [
            "ѽ~~",
            "�쿴�쿴�ҳ鵽��ʲô",
            "ȥ��ȥ��ȥ��ȥ������",
            "����,�˼�Ǯ��������~",
            "��̬��",
            "kiana,����",
            "��,mihoyouʲô���������ˣ�����",
            "ǧ���С����Ӵ",
            "Ҫ����Ŷ",
            "�Ҿ�֪�����������˼���",
            "����~",
            "�������߿��߿���������",
        ];

    //�����Ժ�MP3��json����,ÿ�����Զ�Ӧһ��mp3
    var LanMp3 = {
        "ѽ~~": dragMp3,
        "�쿴�쿴�ҳ鵽��ʲô": kiana_1Mp3,
        "ȥ��ȥ��ȥ��ȥ������": kiana_2Mp3,
        "����,�˼�Ǯ��������~": kiana_3Mp3,
        "��̬��": kiana_4Mp3,
        "kiana,����": kiana_5Mp3,
        "��,mihoyouʲô���������ˣ�����": kiana_6Mp3,
        "ǧ���С����Ӵ": kiana_7Mp3,
        "Ҫ����Ŷ": kiana_8Mp3,
        "�Ҿ�֪�����������˼���": kiana_9Mp3,
        "����~": kiana_10Mp3,
        "�������߿��߿���������": kiana_11Mp3,
    };



    //����һ��div������������
    $(this).append("<div class='kiana'></div>");

    //����ͼƬdiv  class="kianaImgDiv"
    $(".kiana").append("<div class='kianaImgDiv'></div>");
    //��ͼƬdiv�ﴴ��ͼƬ��������ʾkiana
    $(".kianaImgDiv").append("<img id='kianaImg' />");
    //kianaImg Ĭ��src=��һ��
    $("#kianaImg").prop("src", kianaImg1);

    //����mp3 div class="kianaMP3Div"
    $(".kiana").append("<div class='kianaMP3Div'></div>");
    //��MP3div�ﴴ��audio    
    $(".kianaMP3Div").append("<audio id='kianaAudio'></audio>");


    //������������div
    $(".kiana").append("<div class='kianaLanguage'></div>");

    //�رհ�ť
    $(".kiana").append("<div class='kianaCloseBtn'>��</div>");
    //�ر�kiana
    $(".kianaCloseBtn").mousedown(function () {
        $(".kiana").css("display", "none");
    });


    //���
    //����kianaImgDivʱ,��ʾ��3��ͼƬ����ʾ�رհ�ť
    //�뿪ʱ����ʾ��1�ţ�
    //����ʱ:��ʾ��4��,���������MP3��һ�仰
    //����ʱ����ʾ��3��
    //�ƶ�ʱ:�ж�isDown��״̬�����Ϊtrue,˵���������϶�������ʾ�ڶ��ţ�������dargmp3
    // isDown��ʾ����Ƿ���
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

    //MP3�������
    $("#kianaAudio")[0].onended = function () {
        //������������
        $(".kianaLanguage").css("display", "none");
        $(".kianaLanguage").text("");
        //��ԭĬ��ͼƬ
        $("#kianaImg").prop("src", kianaImg3);
    };


};


//�϶�
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

//����MP3����ʾ����
Mp3PlayAndShowMsg = function (mp3Src, kianaLanguage) {
    var isPaused = $("#kianaAudio")[0].paused;
    if (isPaused) {
        $("#kianaAudio").prop("src", mp3Src);
        $("#kianaAudio")[0].play();
        $(".kianaLanguage").css("display", "block");
        $(".kianaLanguage").text(kianaLanguage);
    }
};

var oldNum;//����������һ�ε�num�����������ɵ�num���Ƚϣ���֤���ظ�
//�����LanMp3��ȡ,����һ������mp3·���Լ���Ӧ�Ļ��Ķ���
GetLanMp3 = function (LanMp3, lan) {
    //����һ�������0-11
    while (true) {
        var num = Math.floor(Math.random() * (11 + 1));
        if (num < 0) {
            num = 0;
        }
        if (num > 12) {
            num = 12;
        }
        //�������һ�ε�num��һ�����˳�
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