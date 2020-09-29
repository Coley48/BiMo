$(function () {
    'use scrict';

    /**
     * 全局配置
     */

    let winWidth = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    let winHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;

    let FP = new fullpage('main', {
        // scrollHorizontally: true,
        // continuousVertical: true,
        css3: false,
        navigation: true,
        autoScrolling: true,
        verticalCentered: true,
        slidesNavigation: false,
        controlArrows: false,
        anchors: ["guidance", "journey", "ceremony", "dictation", "sakumap"],

        onLeave: function (origin, destination, direction) {
            currentPart = destination.index;

            chapter.filter(".active").removeClass("active");
            chapter.eq(destination.index).addClass("active");

        }
    });

    // FP.setAllowScrolling(false);


    let animateIn = 'pt-scaleUpDown',
        animateOut = 'pt-scaleDown';

    let currentPart = 0;
    let trigger = $(".trigger");

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


    /**
     * 导航栏
     */

    let Mask = $(".mask"), // 阴影面板
        Menu = $("#menu"), // 菜单按钮
        Volume = $("#volume"), // 声音控制
        navBar = $(".nav"),
        menuBar = $(".menu-bar"), // 目录栏
        chapter = $(".menu-bar [href]"); // 章节项

    $(".logo").click(() => {
        navBar.toggleClass("nav-show");
        menuBar.removeClass("show");
        Mask.removeClass("show");
        Menu.removeClass("active");
    })

    Menu.click(toggleMenuBar);
    Mask.click(toggleMenuBar);
    Volume.click(() => Volume.toggleClass(["volume-mute", "volume-fill"]));

    let navPopover = $('nav [data-toggle="popover"]').popover({ boundary: 'window', placement: "right", trigger: "hover" });

    //  目录按钮切换
    function toggleMenuBar() {
        navPopover.popover('toggleEnabled').popover("hide");

        menuBar.toggleClass("show");
        Mask.toggleClass("show");
        Menu.toggleClass("active");
    }

    /**
     * 引导页
     */

    // 封面
    let headerTitle = $("#header-title"),
        headerBody = $("#header-body"),
        header = $("#header"),
        letter = $("#letter"),
        typer = null;

    headerTitle.click(function () {
        letter.show();
        headerBody.addClass(["animate__animated", "animate__fadeOut", "animate__slow"]);
        createTyper(1200);
    })

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

    /**
     * 探索旅途
     */

    let introVideos = $(".intro-video-item");
    introVideos.on("mouseover", (e) => {
        // $(e.target).css("width", "60%").siblings().css("width", "20%");
    })

    // "pt-flipInTop"
    // "pt-rotateRightSideFirst"
    // "pt-rotateOutNewspaper"
    // "pt-rotateInNewspaper"

    /**
     * 毕摩仪式
     */
    let cubeWrap = $(".cube-wrap");
    window.onmousemove = (e) => cubeWrap.css("perspective-origin", `${e.clientX - window.innerWidth / 2}px ${e.clientY - window.innerHeight / 2}px`);

    let ceremony = "purify",
        Segment = {
            purify: {
                names: ["鸡蛋占卜", "生烟", "读经文", "烧圆石", "浇石头", "跨圣枝"],
                times: [5, 20, 40, 60, 80, 100,],
            },
            bename: {
                names: ["生烟", "头顶转猪", "宰杀", "割猪肉", "制护灵符", "鸡蛋占卜", "物品绕头", "圣枝", "起名", "剪头发", "喂酒", "穿衣",],
                times: [1, 20, 40, 50, 55, 70, 80, 90, 100, 120, 140, 160]
            },
            pray: {
                names: ["生烟", "绕头", "淋鸡血", "吹鸡", "摆祭品", "挽魂", "转草偶", "传木板", "割草绳", "送次切",],
                times: [5, 40, 60, 80, 100, 110, 120, 130, 140, 150,]
            },

            getCurrentNames: function () {
                return this[ceremony].names;
            },

            getCurrentTimes: function () {
                return this[ceremony].times;
            }
        },
        Element = {
            path: "./static/img/",
            purify: {
                sources: ["t (1).png", "t (2).png", "t (3).png", "t (4).png", "t (5).png", "t (6).png", "t (7).png", "t (8).png", "t (9).png", "t (10).png"],
                times: [5, 10, 20, 30, 50, 60, 80, 100, 130, 150],
            },
            bename: {
                sources: ["生烟", "头顶转猪", "宰杀", "割猪肉", "制护灵符", "鸡蛋占卜", "物品绕头", "圣枝", "起名", "剪头发", "喂酒", "穿衣",],
                times: [1, 20, 40, 50, 55, 70, 80, 90, 100, 120, 140, 160]
            },
            pray: {
                sources: ["生烟", "绕头", "淋鸡血", "吹鸡", "摆祭品", "挽魂", "转草偶", "传木板", "割草绳", "送次切",],
                times: [5, 40, 60, 80, 100, 110, 120, 130, 140, 150,]
            },

            getCurrentSources: function () {
                return this[ceremony].sources.map((value) => this.path + value);
            },

            getCurrentTimes: function () {
                return this[ceremony].times;
            }
        };

    // left-list

    let segmentList = $(".ceremony-segment");
    segmentList.reset = function () {
        this.html(`<div class="handle-bar"></div>
        <div class="list-group-item bg-dark disabled title">环节</div>`);
    }

    segmentList.init = function () {
        this.reset();
        let times = Segment.getCurrentTimes();
        let names = Segment.getCurrentNames();
        for (let i = 0; i < times.length; i++) {
            this.append(`<a class="list-group-item bg-dark" data-time="${times[i]}">${names[i]}</a>`);
        }

        return times;
    }
    segmentList.on("mousewheel", (e) => e.stopPropagation());
    let timePoints = segmentList.init();


    let segmentHandlebar = $(".ceremony-segment .handle-bar");
    segmentHandlebar.click((e) => {
        segmentList.toggleClass("show");
    })

    let segmentItem = segmentList.find("a");
    segmentItem.click((e) => {
        segmentItem.removeClass("active");
        let target = $(e.target).addClass("active");
        ceremonyVideo.currentTime(target.attr("data-time"));
    })

    let ceremonyVideo = videojs("ceremony-video", { controls: true });
    ceremonyVideo.on("timeupdate", debounce(handler, 950))

    function handler(e) {
        let currentTime = Math.floor(this.currentTime());
        let index = timePoints.indexOf(currentTime);

        if (index != -1) {
            segmentItem.removeClass("active").eq(index).addClass("active");
        }
    }

    function debounce(func, delay) {
        let timer;
        return function () {
            let context = this;
            let args = arguments;
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    func.apply(context, args)
                }, delay)
            }
        }
    }

    // right-slider

    let rightSlider = $(".right-slider");
    rightSlider.init = function () {
        let sources = Element.getCurrentSources();
        for (let i = 0; i < sources.length; i++) {
            this.append(`<img src="${sources[i]}" alt="">`);
        }

        return Element.getCurrentTimes();;
    }

    rightSlider.init();
    let rightSliderItem = $(".right-slider img");

    rightSlider.slide = function (n) {
        if (n < 0) {
            while (n++ < 0)
                this.prepend(this.children(":last"));
        } else {
            while (n-- > 0)
                this.append(this.children(":first"));
        }
    }
    rightSliderItem.click(clickHandler)

    let cardPage = $(".card-page");
    cardPage.click(function () {
        $(this).toggleClass("reverse");
    })

    function clickHandler(e) {
        let jump = $(".right-slider img").index(e.target) - 4;
        if (jump === 0) {
            fullpage_api.moveSlideRight();
            console.log(e.target.src);
            cardPage.find(".card-front").html(`<img src="${e.target.src}" alt="" >`);
        } else {
            rightSlider.slide(jump);
        }
    }

    /**
     * 毕摩口述
     */
    let mainPlayer = videojs("dictate-front", { controls: true });
    let subPlayer = videojs("dictate-sides", { controls: false });
    let globalVolume = 1;

    subPlayer.on(mainPlayer, ["pause", "play", "seeking", "volumechange"], synchPlay)
    mainPlayer.on(subPlayer, "click", togglePlay);

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

    /**
     * 洒库地图
     */

    let modalContainer = $(".modal-container");
    let modalLauncher = $(".modal-launcher");
    let modalShelter = $(".modal-shelter");
    let mediaInfo = [
        {
            type: "image",
            source: "./static/img/成都-西昌.png",
            title: "Hello, Boy.",
            area: 'A',
            left: 214,
            top: 146,
        }, {
            type: "image",
            source: "./static/img/成都-西昌.png",
            title: "Hello, Coley.",
            area: 'B',
            left: 702,
            top: 105,
        }, {
            type: "video",
            source: "./static/video/flowers.mp4",
            title: "Hey, guys.",
            area: 'C',
            left: 240,
            top: 388,
        }, {
            type: "video",
            source: "./static/video/flowers.mp4",
            title: "Hi, Bro.",
            area: 'D',
            left: 822,
            top: 391,
        },
    ];

    modalLauncher.each((i, el) => {
        $(el).css({ top: mediaInfo[i].top, left: mediaInfo[i].left }).attr("data-title", mediaInfo[i].title);
    })

    modalLauncher.click((e) => {
        modalContainer.fadeIn(200);
        modalShelter.fadeIn(200);

        let i = e.target.getAttribute("data-index");
        let item = mediaInfo[i];
        let options = { left: item.left, top: item.top }
        switch (item.area) {
            case 'A':
                options.transform = "translate(0,0)";
                break;

            case 'B':
                options.transform = "translate(-100%,0)";
                break;

            case 'C':
                options.transform = "translate(0,-100%)";
                break;

            case 'D':
                options.transform = "translate(-100%,-100%)";
                break;

            default:
                break;
        }
        modalContainer.css(options);

        if (item.type === "image") {
            modalContainer.html(`<img src="${item.source}" alt=''>`);
        } else {
            modalContainer.html(`<video src="${item.source}" autoplay></video>`);
        }
    })

    modalShelter.click(() => {
        modalContainer.fadeOut(200);
        modalShelter.fadeOut(200);
    })

    $(".map-wrapper [data-toggle='tooltip']").tooltip({ boundary: 'window', placement: "top", trigger: "hover" });

})