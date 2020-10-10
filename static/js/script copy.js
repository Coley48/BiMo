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
        // touchSensitivity: 1,
        css3: false,
        navigation: true,
        autoScrolling: true,
        verticalCentered: true,
        slidesNavigation: false,
        controlArrows: false,
        recordHistory: false,
        anchors: ["journey", "ceremony", "dictation", "sakumap", "ending"],
        menu: '.menu-container',

        onLeave: function (origin, destination, direction) {
            currentPart = destination.index;
        }
    });


    FP.navigator = $("#fp-nav");
    FP.toggleNavigator = () => { FP.navigator.toggleClass("d-none"); };
    FP.hideNavigator = () => { FP.navigator.fadeOut(200); };
    FP.showNavigator = () => { FP.navigator.fadeIn(200); };
    FP.setAllowScrolling(false);

    let animateIn = 'pt-scaleUpDown',
        animateOut = 'pt-scaleDown';

    let loaded = [false, false, false, false, false];
    let currentPart = 0;
    let trigger = $(".trigger");
    trigger.handler = function () {
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
    }
    trigger.click(trigger.handler);



    /** 导航栏
     *------------------------------------------------------------*/
    function initNavigation() {
        $(".logo").click(() => {
            navBar.toggleClass("nav-show");
            // closeBar();
            // closeMenuBar();
        })

        let navBar = $(".nav");
        let navBtn = $('nav [data-toggle]');
        let addition = $(".addition");
        let closeBtn = $(".close-btn");
        let navMask = $(".nav-mask");

        navBtn.popover({ boundary: 'window', placement: "right", trigger: "hover" });
        navBtn.click((e) => {
            let target = navBtn.filter(e.target);
            if (target.hasClass("active")) {
                target.removeClass("active");// 隐藏bar
                addition.filter(e.target.getAttribute("data-className")).removeClass("show");
                FP.showNavigator();// 显示.小圆点
                closeBtn.fadeOut(200);// 隐藏x按钮
                navBtn.popover("enable");// 显示popover
                navMask.removeClass("show");// 隐藏mask
            } else {
                navBtn.removeClass("active").filter(e.target).addClass("active").popover('disable').popover("hide");
                addition.removeClass("show").filter(e.target.getAttribute("data-className")).toggleClass("show");
                FP.hideNavigator();
                closeBtn.fadeIn(200);
                navMask.addClass("show");
            }
        })


        navMask.click(closeBar);
        closeBtn.click(closeBar);
        $(".share-cancel").click(closeBar);
        $(".about").on("mousewheel", (e) => e.stopPropagation());

        function closeBar(e) {
            addition.removeClass("show");
            navBtn.removeClass("active");
            navMask.removeClass("show");
            FP.showNavigator();
            closeBtn.fadeOut(200);
            copyLink.tooltip("hide");
        }

    }

    initNavigation();




    let albumImagesA = ["./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg"]
    let albumImagesB = ["./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg", "./image/album/album (1).jpg"]
    let albumPage = $(".album");
    let albumContainerA = albumPage.find(".album-container-a");
    let albumContainerB = albumPage.find(".album-container-b");
    let albumText = albumPage.find(".album-text");

    albumImagesA.forEach((value, index) => {
        albumContainerA.append(`<img src="${value}" alt="" />`);
    })
    albumImagesB.forEach((value, index) => {
        albumContainerB.append(`<img src="${value}" alt="" />`);
    })

    let albumImages = $(".album img");
    let albumDisplayImg = $(".album-display img");
    albumImages.click((e) => {
        albumDisplayImg.attr("src", e.target.src).show();
    });

    albumDisplayImg.click((e) => {
        albumDisplayImg.hide();
    })


    let count = 0;
    let fontSize = 40;
    albumPage.on("mousewheel", (e) => {
        e.stopPropagation();
        count += e.deltaY * e.deltaFactor;

        if (winWidth < 578) {
            albumContainerA.offset({ left: winWidth + count });
            albumContainerB.offset({ left: -albumContainerB.width() - count });

        } else {
            // albumContainerB.css({ transform: `translate(-50%,${578 - albumContainerA.offset().top - albumContainerB.height()}px` })
            // albumContainerB.offset({ top: -albumContainerB.height() + (578 - albumContainerA.offset().top) })

            albumContainerA.offset({ top: winHeight + count });
            albumContainerB.offset({ top: -albumContainerB.height() - count });
        }

    });

    new ClipboardJS("#copy-link");
    copyLink = $("#copy-link");
    copyLink.tooltip({ boundary: 'window', placement: "right", trigger: "click" });

    /** 引导页
     *------------------------------------------------------------*/

    // 封面
    let letterWrap = $(".letter-wrap"),
        letterIcon = $(".letter-icon"),
        starter = $(".starter");

    letterIcon.click(function () {
        letterWrap.css({ transform: "translate(-50%,0)" });
    })

    letterWrap.on("mousewheel", (e) => { e.stopPropagation() });

    starter.click((e) => {
        $("#guidance").fadeOut(1500);
        FP.setAllowScrolling(true);
    })

    /**
     * 探索旅途
     */

    let introList = $(".intro-list");
    let journeyVideoList = ["./video/test-1.mp4", "./video/test-2.mp4", "./video/test-3.mp4"];
    let journeyVideoPlayer = videojs("journey-video", { controls: true });

    introList.click((e) => {
        trigger.handler();

        let index = e.target.getAttribute("data-index");
        // console.log(journeyVideoList[index], journeyVideoPlayer.currentSource())
        if (journeyVideoList[index] !== journeyVideoPlayer.currentSource().src) {
            journeyVideoPlayer.src(journeyVideoList[index]);
        }
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

    // element-detail

    let cardWrap = $(".card-wrap");
    let cardChanger = $(".card-wrap .changer");
    cardChanger.click(function () {
        console.log("changer");
        cardWrap.toggleClass("reverse");
    });

    cardWrap.setImage = function (i) {
        this.find(".card-front img:first-child").attr("src", elementData[i].file);
        this.find(".card-front img.last-child").attr("src", elementData[i].factor);
        this.find(".card-back img").attr("src", elementData[i].paint);
    };

    let Ceremony = {
        current: 0,
        path: ["./image/test/", "./image/test/", "./image/test/"],// 三个仪式图片地址
        video: ["./video/test-1.mp4", "./video/test-2.mp4", "./video/test-3.mp4",],
        poster: null,
        segment:
            [
                [{ name: "鸡蛋占卜", time: 5 }, { name: "生烟", time: 15 }, { name: "读经文", time: 25 }, { name: "烧圆石", time: 35 }, { name: "浇石头", time: 45 }, { name: "跨圣枝", time: 5 },],
                [{ name: "鸡蛋占卜", time: 5 }, { name: "生烟", time: 15 }, { name: "读经文", time: 25 }, { name: "烧圆石", time: 35 }, { name: "浇石头", time: 45 }, { name: "跨圣枝", time: 55 },],
                [{ name: "鸡蛋占卜", time: 5 }, { name: "生烟", time: 15 }, { name: "读经文", time: 25 }, { name: "烧圆石", time: 35 }, { name: "浇石头", time: 45 }, { name: "跨圣枝", time: 55 },],
            ],
        element: [
            [{
                file: "t (1).png",// 图片名
                time: 0, // 出现时间
                factor: "t (1)-1.png",// 重点要素 
                paint: "t (1)-2.png",// 版画
                info: "",// 文字
            },
            {
                file: "t (2).png",
                time: 15,
                factor: "t (2)-1.png",
                paint: "t (2)-2.png",
                info: "",
            },
            {
                file: "t (3).png",
                time: 30,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (4).png",
                time: 40,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (5).png",
                time: 50,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (6).png",
                time: 60,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (7).png",
                time: 70,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (8).png",
                time: 80,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (9).png",
                time: 90,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (10).png",
                time: 100,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },],
            [{
                file: "t (1).png",// 图片名
                time: 0, // 出现时间
                factor: "t (1)-1.png",// 重点要素 
                paint: "t (1)-2.png",// 版画
                info: "",// 文字
            },
            {
                file: "t (2).png",
                time: 15,
                factor: "t (2)-1.png",
                paint: "t (2)-2.png",
                info: "",
            },
            {
                file: "t (3).png",
                time: 30,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (4).png",
                time: 40,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (5).png",
                time: 50,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (6).png",
                time: 60,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (7).png",
                time: 70,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (8).png",
                time: 80,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (9).png",
                time: 90,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (10).png",
                time: 100,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },],
            [{
                file: "t (1).png",// 图片名
                time: 0, // 出现时间
                factor: "t (1)-1.png",// 重点要素 
                paint: "t (1)-2.png",// 版画
                info: "",// 文字
            },
            {
                file: "t (2).png",
                time: 15,
                factor: "t (2)-1.png",
                paint: "t (2)-2.png",
                info: "",
            },
            {
                file: "t (3).png",
                time: 30,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (4).png",
                time: 40,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (5).png",
                time: 50,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (6).png",
                time: 60,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (7).png",
                time: 70,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (8).png",
                time: 80,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (9).png",
                time: 90,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },
            {
                file: "t (10).png",
                time: 100,
                factor: "t (1)-1.png",
                paint: "t (1)-2.png",
                info: "",
            },],
        ],
        getSegment() {
            return this.segment[this.current];
        },

        getElement() {
            return this.element[this.current];
        },

        getVideoSrc() {
            return this.video[this.current];
        }
    };// 当前仪式
    Ceremony.element.forEach((array) => {
        array.forEach((value) => {
            value.factor = Ceremony.path[Ceremony.current] + value.factor;
            value.file = Ceremony.path[Ceremony.current] + value.file;
            value.paint = Ceremony.path[Ceremony.current] + value.paint;
        });
    });

    // left-list

    let leftList = $(".ceremony-segment .left-list");
    let segmentData, segmentTimePoints, leftListItem;
    leftList.init = function () {
        this.empty();

        segmentData = Ceremony.getSegment();
        segmentTimePoints = segmentData.map((value) => value.time);

        for (let i = 0; i < segmentData.length; i++) {
            this.append(`<a class="list-group-item bg-dark" data-time="${segmentData[i].time}">${segmentData[i].name}</a>`);
        }

        $(".left-list span:last-child").click((e) => {
            leftList.parent().toggleClass("show");
        })

        leftListItem = leftList.find("a");
        leftListItem.click((e) => {
            leftListItem.removeClass("active");
            let target = $(e.target).addClass("active");
            centerVideo.currentTime(target.attr("data-time"));
        })

    }

    leftList.on("mousewheel", (e) => e.stopPropagation());

    let leftHandlebar = $(".ceremony-segment .handle-bar");
    leftHandlebar.click((e) => {
        leftList.parent().toggleClass("show");
    })


    // right-slider

    let rightSlider = $(".ceremony-element .right-slider");
    let elementData, elementTimePoints, rightSliderItem;


    rightSlider.slide = function (n) {
        if (n < 0) {
            while (n++ < 0)
                this.prepend(this.children(":last"));
        } else {
            while (n-- > 0)
                this.append(this.children(":first"));
        }

        cardWrap.setImage($(this).find(":nth-child(5)").attr("data-index"));
    }

    rightSlider.init = function () {
        elementData = Ceremony.getElement();
        this.empty();

        for (let i = 0; i < elementData.length; i++) {
            this.append(`<img src="${elementData[i].file}" alt=""  data-index="${i}" >`);
        }

        elementTimePoints = elementData.map((value) => value.time);

        rightSliderItem = $(".right-slider img");
        rightSliderItem.click((e) => {
            let jump = $(".right-slider img").index(e.target) - 4;
            console.log(jump);
            if (jump === 0) {
                fullpage_api.moveSlideRight();
            } else {
                rightSlider.slide(jump);
            }
        });
    }


    let rightHandlebar = $(".ceremony-element .handle-bar");
    rightHandlebar.click((e) => {
        FP.toggleNavigator();
        rightHandlebar.parent().toggleClass("show");
    })


    // center-video

    let centerVideo = videojs("center-video", { controls: true });
    centerVideo.on("timeupdate", debounce(timeUpdateHandler, 950));

    function timeUpdateHandler(e) {
        let currentTime = Math.floor(this.currentTime());
        let segIndex = segmentTimePoints.indexOf(currentTime);
        let eleIndex = elementTimePoints.indexOf(currentTime);

        if (segIndex !== -1) {
            leftListItem.removeClass("active").eq(segIndex).addClass("active");
        }
        if (eleIndex !== -1) {
            rightSlider.slide(eleIndex - $(".right-slider img:nth-child(5)").attr("data-index"));

            cardWrap.setImage(eleIndex);
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

    $(".cube").click((e) => {
        let index;
        switch (e.target.className) {
            case "left":
            case "top":
                index = 0;
                break;
            case "right":
            case "bottom":
                index = 1
                break;
            case "front":
            case "back":
                index = 2
                break;

            default:
                break;
        }

        if (index !== Ceremony.current) {
            Ceremony.current = index;
            centerVideo.src(Ceremony.getVideoSrc());

            // 初始化
            leftList.init();
            rightSlider.init();
        }
    })

    // 初始化
    leftList.init();
    rightSlider.init();


    /**
     * 毕摩口述
     */
    let mainPlayer = videojs("dictate-front", { controls: true });
    let subPlayer = videojs("dictate-sides", { controls: false, muted: true });
    let globalVolume = 1;

    subPlayer.on(mainPlayer, ["pause", "play", "seeking", "volumechange"], synchPlay)
    mainPlayer.on(subPlayer, "click", togglePlay);

    // 切换播放
    function togglePlay(e) {
        let target = videojs(e.target);
        this.addClass("upward");
        target.removeClass("upward");
        target.muted(false);
        target.off(this, ["pause", "play", "seeking", "volumechange"], synchPlay);
        target.on(this, "click", togglePlay);
        target.controls(true);
        this.on(target, ["pause", "play", "seeking", "volumechange"], synchPlay);
        this.off(target, "click", togglePlay);
        this.controls(false);
        this.muted(true);
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

    let mapWrapper = $(".map-wrapper");
    let modalContainer = mapWrapper.find(".modal-container");
    let modalShelter = mapWrapper.find(".modal-shelter");
    let modalLauncherHolder = mapWrapper.find(".modal-launcher-holder");
    let mediaInfo = [
        {
            type: "image",
            source: "./image/test/t (1).png",
            title: "Hello, Boy.",
            area: 'A',
            left: .18,
            top: .2,
        }, {
            type: "image",
            source: "./image/test/t (2).png",
            title: "Hello, Coley.",
            area: 'B',
            left: .6,
            top: .3,
        }, {
            type: "video",
            source: "./video/flowers.mp4",
            title: "Hey, guys.",
            area: 'C',
            left: .25,
            top: .7,
        }, {
            type: "video",
            source: "./video/flowers.mp4",
            title: "Hi, Bro.",
            area: 'D',
            left: .8,
            top: .68,
        },
    ];

    mediaInfo.forEach((value, index) => {
        let item = $(`<div class="modal-launcher location-icon" data-toggle="tooltip" data-index="${index}" data-area="${value.area}" data-title="${value.title}" ></div>`).css({ top: value.top * winHeight, left: value.left * winWidth });

        if (winWidth > 992) {
            item.tooltip({ boundary: 'window', placement: "top", trigger: "hover" });
        }

        modalLauncherHolder.append(item);
    })


    let modalLauncher = $(".modal-launcher");
    modalLauncher.click((e) => {
        modalContainer.fadeIn(200);
        modalShelter.fadeIn(200);

        let i = e.target.getAttribute("data-index");
        let item = mediaInfo[i];

        if (winWidth > 992) {
            let options = { left: item.left * winWidth, top: item.top * winHeight };

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

        }


        if (item.type === "image") {
            modalContainer.html(`<img src="${item.source}" alt=''>`);
        } else {
            modalContainer.html(`<video src="${item.source}" autoplay muted></video>`);
        }
    })

    modalShelter.click(() => {
        modalContainer.fadeOut(200);
        modalShelter.fadeOut(200);
    })

})