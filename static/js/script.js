$(function () {
    'use scrict';

    /** 变量定义 --------------------------------------- */

    new fullpage('main', {
        // scrollHorizontally: true,
        // continuousVertical: true,
        // showActiveTooltip: true,
        // sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'lightseagreen', "lightblue"],
        // navigationTooltips: ['guidance', 'journey', 'ceremony', 'dictation', 'sakumap'],
        css3: false,
        navigation: true,
        autoScrolling: true,
        verticalCentered: true,
        slidesNavigation: true,
        controlArrows: false,
        anchors: ["guidance", "journey", "ceremony", "dictation", "sakumap"],

        onLeave: function (origin, destination, direction) {
            changeMenuItem(destination.index);
        }
    });

    // 动画
    let animateIn = 'pt-scaleUpDown',
        animateOut = 'pt-scaleDown';

    let currentPart = 0;
    let trigger = $(".trigger");


    /** 导航栏 --------------------------------------- */
    let Mask = $(".mask"), // 阴影面板
        Menu = $("#menu"), // 菜单按钮
        menuBar = $(".menu-bar"), // 目录栏
        menuItem = $(".menu-bar [href]"), // 章节项
        Volume = $("#volume"); // 声音控制

    Mask.open = false;
    Menu.open = false;
    Volume.mute = true;

    /** 引导页 --------------------------------------- */
    // 封面
    let headerTitle = $("#header-title"),
        headerBody = $("#header-body"),
        header = $("#header"),
        letter = $("#letter"),
        typer = null;

    /** 探索旅途 --------------------------------------- */

    let rawData1 = [[260, 260], [255, 270], [248, 285], [244, 289], [242, 296], [240, 305], [238, 310], [234, 315], [230, 320], [229, 323], [228, 329], [225, 336], [224, 338], [223, 340], [222, 342], [221, 345], [220, 348], [220, 350], [219, 352], [217, 356], [216, 358], [215, 360], [214, 362], [213, 364], [211, 369], [210, 371], [208, 373], [205, 377], [202, 381], [201, 384], [197, 389], [195, 390], [190, 397], [188, 402], [187, 403], [185, 406], [183, 409], [180, 411], [178, 416], [176, 421], [174, 422], [173, 425], [170, 429], [168, 432], [165, 434], [164, 436], [163, 438], [162, 439], [161, 442], [158, 446], [157, 448], [156, 449], [153, 451], [151, 456], [150, 457], [149, 460], [147, 462], [146, 465], [144, 467], [143, 469], [142, 470], [141, 470], [140, 471], [139, 474], [138, 475], [137, 476], [137, 478], [135, 479], [135, 480], [133, 483], [132, 485], [131, 486], [128, 489], [127, 491], [126, 493], [125, 495], [123, 497], [122, 499], [120, 501], [118, 504], [117, 506], [116, 508], [114, 510], [112, 511], [110, 516], [108, 518], [107, 520], [106, 522], [105, 524], [104, 526], [103, 528], [102, 531], [101, 532], [100, 533], [99, 534], [98, 535], [98, 536], [98, 537], [97, 538]];
    let treatedData1 = [];
    for (let i = 1; i < rawData1.length; i++) {
        treatedData1.push(...lerp(rawData1[i], rawData1[i - 1], 3));
    }

    let painter = new Painter("train-map", treatedData1, $(".trip-intro-video.train"));
    let painter2 = new Painter("bus-map", treatedData1, $(".trip-intro-video.bus"));
    let painter3 = new Painter("car-map", treatedData1, $(".trip-intro-video.car"));
    // painter.start();

    let trainDiv = $(".trip-intro-video.train");
    let trainVideo = trainDiv.find("video").get(0);

    trainDiv.click(() => {

        if (trainVideo.paused) {
            trainVideo.play();
            painter.start();
        } else {
            trainVideo.pause();
            painter.stop();
        }
    });

    trainVideo.onpause = () => painter.stop();

    /** 毕摩仪式 --------------------------------------- */
    // 立方体
    let cubeWrap = $(".cube-wrap");



    /** 事件监听 --------------------------------------- */

    window.onmousemove = (e) => cubeWrap.css("perspective-origin", `${e.clientX - window.innerWidth / 2}px ${e.clientY - window.innerHeight / 2}px`);

    /**
     * 导航栏
     */
    $(".logo").click(() => {
        $(".nav").toggleClass("nav-show");
    })

    Menu.click(toggleMenuBar);
    Mask.click(toggleMenuBar);
    Volume.click(toggleVolume);

    trigger.click(function () {
        let section = $("#section-" + currentPart);

        if (section.hasClass("hide")) {
            section.removeClass("hide");
            section.find(".sec-1").removeClass(animateIn).addClass(animateOut);
            section.find(".sec-2").removeClass(animateOut).addClass(animateIn);
        } else {
            section.addClass("hide");
            section.find(".sec-1").removeClass(animateOut).addClass(animateIn);
            section.find(".sec-2").removeClass(animateIn).addClass(animateOut);
        }
    });

    $('nav [data-toggle="popover"]').popover({ boundary: 'window', placement: "right", trigger: "hover" });


    /**
     * 引导页
     */
    headerTitle.click(function () {
        letter.show();
        // header.addClass("pt-moveToLeft-50");
        headerBody.addClass(["animate__animated", "animate__fadeOut", "animate__slow"]);
        createTyper(1200);
    })

    $(".card-page").click(function () {
        $(this).toggleClass("reverse");
    })

    /**
     * 探索旅途
     */

    // $("#section-1 .sec-1").click(() => {
    //     setTimeout(() => {
    //         painter.restart();
    //     }, 400);
    // })

    let changer = $(".trip-item .changer");
    changer.click(function () {
        let parent = changer.parents(".trip-item");
        if (parent.hasClass("hide")) {
            changer.parents(".trip-item").removeClass("hide");
            changer.siblings(".sec-a").removeClass("pt-flipInTop").addClass("pt-rotateRightSideFirst");
            changer.siblings(".sec-b").removeClass("pt-rotateRightSideFirst").addClass("pt-flipInTop");
        } else {
            changer.parents(".trip-item").addClass("hide");
            changer.siblings(".sec-a").removeClass("pt-rotateRightSideFirst").addClass("pt-flipInTop");
            changer.siblings(".sec-b").removeClass("pt-flipInTop").addClass("pt-rotateRightSideFirst");
        }

        // transition("pt-rotateOutNewspaper", "pt-rotateInNewspaper");
        // changer.siblings(".sec-b").children()[1].play();
    })

    let tripItem = $(".trip-item");
    let next = $(".trip-item .next");
    let tripWays = ["train", "bus", "car"];
    next.click(function (e) {
        let cur = tripWays[e.target.getAttribute("data-current") % 3];
        tripItem.removeClass("current").removeClass("pt-rotateInNewspaper").addClass("pt-rotateOutNewspaper");
        tripItem.filter("." + cur).addClass("current").removeClass("pt-rotateOutNewspaper").addClass("pt-rotateInNewspaper");
        // switch (e.target.getAttribute("data-current")) {
        //     case "train":
        //         tripItem.removeClass("current").filter(".bus").addClass("current");
        //         break;
        //     case "bus":
        //         tripItem.removeClass("current").filter(".car").addClass("current");
        //         break;
        //     case "car":
        //         tripItem.removeClass("current").filter(".train").addClass("current");
        //         break;
        //     default:
        //         break;
        // }
    })


    /**
     * 毕摩口述
     */
    let frontPlayer = videojs("dictate-front", { controls: true });
    let sidesPlayer = videojs("dictate-sides", { controls: false });
    let globalVolume = 1;

    sidesPlayer.on(frontPlayer, ["pause", "play", "seeking", "volumechange"], synchPlay)
    frontPlayer.on(sidesPlayer, "click", togglePlay);

    // 切换播放
    function togglePlay(e) {
        let target = videojs(e.target);
        this.addClass("upward");
        target.removeClass("upward");
        target.off(this, ["pause", "play", "seeking", "volumechange"], synchPlay);
        target.on(this, "click", togglePlay);
        target.controls(true);
        this.on(target, ["pause", "play", "seeking", "volumechange"], synchPlay);
        this.off(target, "click", togglePlay);
        this.controls(false);
    }

    // 同步播放
    function synchPlay(e) {
        switch (e.type) {
            case "pause":
                this.pause();
                break;

            case "play":
                this.play();
                break;

            case "seeking":
                this.currentTime(videojs(e.target).currentTime());
                break;

            case "volumechange":
                globalVolume = videojs(e.target).volume();
                this.volume(globalVolume);
                break;

            default:
                break;
        }
    }


    /** 函数定义 --------------------------------------- */

    // 板块切换效果
    function changeMenuItem(i) {
        currentPart = i;

        menuItem.filter(".active").removeClass("active");
        $(menuItem.get(i)).addClass("active");

    }


    //  目录按钮切换
    function toggleMenuBar() {
        toggleMask();
        $('.nav-center a').popover('toggleEnabled').popover("hide");
        if (Menu.open) {
            menuBar.animate({ "left": "-12rem" }, 200);
            Menu.removeClass("active").open = false;
        } else {
            menuBar.animate({ "left": "60px" }, 200);
            Menu.addClass("active").open = true;
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
        if (typer != null) {
            typer.destroy();
        }
        typer = new Typed('.typed', {
            strings: [`远方的贵客：\n   ^50你好。我名叫立里达哈，出身于毕摩世家。毕摩文化在我家传承了500余年，我的父亲——立里机门已经是第17代传承人。\n   在彝族，毕摩是彝族传统文化的传承者，是也被视为神灵的使者。所以我的父亲在乡亲的心中也拥有很高的地位。\n   彝族是我国民族大家庭中的一分子，有着悠久的历史和多彩的文化。漆器、服饰、彝族年、火把节等都是为全国人民熟知的彝族文化符号。而毕摩作为彝族文化的核心，至今还笼罩着一层神秘的面纱。\n   也许你听说过大型的毕摩仪式——尼木措毕（送灵归祖仪式），这是彝族民间最为重要，也是最隆重的仪式，一个家庭一代人才能举行一次。但毕摩仪式其实也跟彝族人民的日常生活息息相关。\n   今天，我代表我的父亲，诚挚地邀请你来到彝族文化核心地区之一，我的家乡——凉山州美姑县洒库乡。我和我父亲将一起带你走近三个彝族家庭，参与最常见的几种毕摩仪式。\n   你能在接下来的几天里，了解到你身边朋友所不知的彝族文化，体验到你从未感受过的彝族风情。\n   期待同你见面，并欢迎你的到来。`],
            loop: false,
            startDelay: delay || 50,
            typeSpeed: 50,
            backSpeed: 30,
        });
    }

})