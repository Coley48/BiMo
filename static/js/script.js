$(function () {
    'use scrict';

    /**
     * 变量定义
     */

    // 动画
    let animateOut = [
        'pt-moveToRightFade',
        'pt-scaleDown',
        'pt-moveToLeftFade',
        'pt-rotatePushLeft',
        'pt-rotateFoldRight',
        'pt-rotateCubeLeftOut',
        'pt-rotateSidesOut',
    ], animateIn = [
        'pt-moveFromLeftFade',
        'pt-scaleUpDown',
        'pt-moveFromRightFade',
        'pt-rotatePullRight',
        'pt-moveFromLeftFade',
        'pt-rotateCubeLeftIn',
        'pt-rotateSidesIn'
    ], nextAn = 0;


    // 菜单按钮
    let Menu = $("#menu");
    // 阴影面板
    let Mask = $(".mask");
    Mask.open = false;

    // 目录栏
    let menuBar = $(".menu-bar");
    menuBar.open = false;

    // 目录列表
    let menuItem = $(".menu-bar [href]");
    // console.log(menuItem.get(0))

    // 声音控制
    let Volume = $("#volume");
    Volume.mute = true;

    // 封面
    let coverHead = $("#cover-head");
    let coverBody = $("#cover-body");
    let cover = $("#cover");
    let letter = $(".letter");


    // 初始化
    !function init() {
        window.currentPart = 0;
        window.onmousemove = function (e) {
            $(".wrap").css("perspective-origin", `${e.clientX - window.innerWidth / 2}px ${e.clientY * 2 - window.innerHeight / 2}px`);
        }
    }();

    /**
     * 监听事件
     */
    // 导航栏
    Menu.click(toggleMenuBar);
    Mask.click(toggleMenuBar);

    menuItem.click(function (e) {
        // e.preventDefault();

        // if (e.target.hash === currentPart) {
        //     return;

        // } else {
        //     menuItem.filter(".active").removeClass("active");
        //     $(e.target).addClass("active");

        //     switchPart(e.target.hash);
        // }

    })

    new fullpage('main', {
        autoScrolling: true,
        // scrollHorizontally: true,
        // sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'lightseagreen', "lightblue"],
        css3: false,
        verticalCentered: false,
        navigation: true,
        // continuousVertical: true,
        // showActiveTooltip: true,
        // navigationTooltips: ['guidance', 'journey', 'ceremony', 'dictation', 'sakumap'],

        anchors: ["guidance", "journey", "ceremony", "dictation", "sakumap"],
        onLeave: function (origin, destination, direction) {
            changeMenuItem(destination.index);
        }
    });

    // fullpage_api.moveSectionUp();
    // fullpage_api.moveTo(3, 0);

    Volume.click(function () {
        toggleVolume();
    })

    // 板块
    coverHead.click(function () {
        letter.show();
        cover.addClass("pt-moveToLeft-50");
        coverHead.addClass(["pt-moveToBottom", "pt-delay2000", "animate__slower"]).find(".animate__animated").removeClass("animate__animated");
        coverBody.addClass(["animate__animated", "animate__fadeOut", "animate__slow"]);
        createTyper(1200);
    })

    /**
     * 函数
     */

    // 板块切换效果
    function changeMenuItem(i) {
        currentPart = i;

        menuItem.filter(".active").removeClass("active");
        $(menuItem.get(i)).addClass("active");

        // toggleMenuBar();

        // let curt = $(currentPart).addClass(animateOut[nextAn]);
        // let next = $(nextPart).addClass([animateIn[nextAn], "pt-current"]);

        // setTimeout(() => {
        //     curt.removeClass();
        //     next.attr("class", "pt-current");

        //     currentPart = nextPart;
        //     nextAn = (nextAn + 1) % 7;
        // }, 1000);

    }


    //  目录按钮切换
    function toggleMenuBar() {
        toggleMask();

        if (menuBar.open) {
            menuBar.animate({ "left": "-12rem" }, 200).open = false;
            Menu.removeClass("active");
        } else {
            menuBar.animate({ "left": "60px" }, 200).open = true;
            Menu.addClass("active");
        }

    }

    // 全局阴影切换
    function toggleMask() {

        if (Mask.open) {
            Mask.css("z-index", "-1").animate({ "opacity": "0" }, 200).open = false;
        } else {
            Mask.css("z-index", "10").animate({ "opacity": "1" }, 200).open = true;
        }

        return Mask.open;
    }

    // 音量切换
    function toggleVolume() {
        if (Volume.mute) {
            Volume.removeClass("volume-fill").addClass("volume-mute").mute = false;
        } else {
            Volume.removeClass("volume-mute").addClass("volume-fill").mute = true
        }
        return Volume.mute;
    }

    // 打字效果
    function createTyper(delay) {
        return new Typed('.typed', {
            strings: [`远方的贵客：\n   ^50你好。我名叫立里达哈，出身于毕摩世家。毕摩文化在我家传承了500余年，我的父亲——立里机门已经是第17代传承人。\n   在彝族，毕摩是彝族传统文化的传承者，是也被视为神灵的使者。所以我的父亲在乡亲的心中也拥有很高的地位。\n   彝族是我国民族大家庭中的一分子，有着悠久的历史和多彩的文化。漆器、服饰、彝族年、火把节等都是为全国人民熟知的彝族文化符号。而毕摩作为彝族文化的核心，至今还笼罩着一层神秘的面纱。\n   也许你听说过大型的毕摩仪式——尼木措毕（送灵归祖仪式），这是彝族民间最为重要，也是最隆重的仪式，一个家庭一代人才能举行一次。但毕摩仪式其实也跟彝族人民的日常生活息息相关。\n   今天，我代表我的父亲，诚挚地邀请你来到彝族文化核心地区之一，也是我的家乡——凉山州美姑县洒库乡。我和我父亲将一起带你走近三个彝族家庭，参与最常见的几种毕摩仪式。\n   你能在接下来的几天里，了解到你身边朋友所不知的彝族文化，体验到你从未感受过的彝族风情。\n   期待同你见面，并欢迎你的到来。`],
            loop: false,
            startDelay: delay || 50,
            typeSpeed: 50,
            backSpeed: 30,
        });
    }

})