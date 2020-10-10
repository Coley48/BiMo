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
            // let loaded = [false, false, false, false, false];
            currentPart = destination.index;
        },
    });


    FP.navigator = $("#fp-nav");
    FP.toggleNavigator = () => { FP.navigator.toggleClass("d-none"); };
    FP.hideNavigator = () => { FP.navigator.fadeOut(200); };
    FP.showNavigator = () => { FP.navigator.fadeIn(200); };
    FP.setAllowScrolling(false);

    let animateIn = 'pt-scaleUpDown',
        animateOut = 'pt-scaleDown';

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
    ------------------------------------------------------------*/

    let Navigation = {
        navBar: $(".nav"),
        navBtn: $('nav [data-toggle]'),
        addition: $(".addition"),
        closeBtn: $(".close-btn"),
        navMask: $(".nav-mask"),

        Earth: {
            earthPage: $(""),
            init() {
                this.video = videojs("earth-video", { controls: true, controlBar: { pictureInPictureToggle: false } });

            }
        },

        Album: {
            albumPage: $(".album"),
            imageSource: null,
            albumDisplayImg: $(".album-display img"),
            distance: 0,

            init() {
                this.firstContainer = this.albumPage.find(".album-first-set");
                this.secondContainer = this.albumPage.find(".album-second-set");
                // this.albumText = thsi.albumPage.find(".album-text");

                if (this.imageSource) {
                    this.imageSource.firstSet.forEach((value, index) => {
                        this.firstContainer.append(`<img src="${value}" alt="" />`);
                    })
                    this.imageSource.secondSet.forEach((value, index) => {
                        this.secondContainer.append(`<img src="${value}" alt="" />`);
                    })
                }

                $(".album img").click((e) => {
                    this.albumDisplayImg.attr("src", e.target.src).show();
                });

                this.albumDisplayImg.click((e) => {
                    Navigation.Album.albumDisplayImg.hide();
                })


                this.albumPage.on("mousewheel", (e) => {
                    e.stopPropagation();
                    Navigation.Album.distance += e.deltaY * e.deltaFactor;

                    if (winWidth < 578) {
                        Navigation.Album.firstContainer.offset({ left: winWidth + Navigation.Album.distance });
                        Navigation.Album.secondContainer.offset({ left: -Navigation.Album.secondContainer.width() - Navigation.Album.distance });

                    } else {
                        // secondContainer.css({ transform: `translate(-50%,${578 - firstContainer.offset().top - secondContainer.height()}px` })
                        // secondContainer.offset({ top: -secondContainer.height() + (578 - firstContainer.offset().top) })

                        Navigation.Album.firstContainer.offset({ top: winHeight + Navigation.Album.distance });
                        Navigation.Album.secondContainer.offset({ top: -Navigation.Album.secondContainer.height() - Navigation.Album.distance });
                    }

                });
            }
        },

        Share: {
            copyBtn: $("#copy-link"),
            init() {
                $(".share-cancel").click(Navigation.closeBar);
                new ClipboardJS("#copy-link");
                this.copyBtn.tooltip({ boundary: 'window', placement: "right", trigger: "click" });
            }

        },

        About: {
            init() {
                $(".about").on("mousewheel", (e) => e.stopPropagation());
            }
        },


        init() {
            $(".logo").click(() => {
                Navigation.navBar.toggleClass("nav-show");
                // closeBar();
                // closeMenuBar();
            })


            this.navBtn.popover({ boundary: 'window', placement: "right", trigger: "hover" });

            this.navBtn.click((e) => {
                let target = Navigation.navBtn.filter(e.target);
                if (target.hasClass("active")) {
                    target.removeClass("active");// 隐藏bar
                    Navigation.addition.filter(e.target.getAttribute("data-className")).removeClass("show");
                    Navigation.closeBtn.fadeOut(200);// 隐藏x按钮
                    Navigation.navBtn.popover("enable");// 显示popover
                    Navigation.navMask.removeClass("show");// 隐藏mask
                    FP.showNavigator();// 显示.小圆点
                } else {
                    Navigation.navBtn.removeClass("active").filter(e.target).addClass("active").popover('disable').popover("hide");
                    Navigation.addition.removeClass("show").filter(e.target.getAttribute("data-className")).toggleClass("show");
                    Navigation.closeBtn.fadeIn(200);
                    Navigation.navMask.addClass("show");
                    FP.hideNavigator();
                }
            })


            this.navMask.click(this.closeBar);
            this.closeBtn.click(this.closeBar);

            this.Earth.init();
        },

        closeBar(e) {
            Navigation.addition.removeClass("show");
            Navigation.navBtn.removeClass("active");
            Navigation.navMask.removeClass("show");
            FP.showNavigator();
            Navigation.closeBtn.fadeOut(200);
            Navigation.Share.copyBtn.tooltip("hide");
        }
    }

    Navigation.init();



    /** 引导页
    ----------------------------------------------------------------*/

    // 封面
    let letterWrap = $(".letter-wrap"),
        letterIcon = $(".letter-icon"),
        starter = $(".starter");

    letterIcon.click((e) => letterWrap.addClass("show"))

    letterWrap.on("mousewheel", (e) => { e.stopPropagation() });

    starter.click((e) => {
        $("#guidance").fadeOut(1500);
        FP.setAllowScrolling(true);
    })

    /** 探索旅途
    -----------------------------------------------------------------*/

    let Journey = {
        preview: $(".intro-list"),
        source: ["/video/test-1.mp4", "/video/test-2.mp4", "/video/test-3.mp4"],
        player: videojs("journey-video", { controls: true }),

        init() {
            console.log("Journey init.")
            this.preview.click((e) => {
                trigger.handler();

                this.reset(e.target.getAttribute("data-index"));

            })
        },

        reset(index) {
            this.player.src(this.source[index]);
        }
    }

    Journey.init();


    // "pt-flipInTop"
    // "pt-rotateRightSideFirst"
    // "pt-rotateOutNewspaper"
    // "pt-rotateInNewspaper"

    /** 毕摩仪式
    -------------------------------------------------------- */
    let segmentData, segmentTimePoints = [], leftListItem;
    let elementData, elementTimePoints = [], rightSliderItem;

    let Ceremony = {
        current: 0,

        // cube
        cube: $(".cube"),
        cubeWrap: $(".cube-wrap"),

        // left-list
        leftList: $(".ceremony-segment .left-list"),
        leftHandlebar: $(".ceremony-segment .handle-bar"),

        // right-slide
        rightSlider: $(".ceremony-element .right-slider"),
        rightHandlebar: $(".ceremony-element .handle-bar"),

        // card
        cardWrap: $(".card-wrap"),
        cardFlip: $(".card-wrap .flip"),

        origin: $(".card-wrap .origin"),
        factor: $(".card-wrap .factor"),
        paint: $(".card-wrap .paint"),


        setCardImage(index) {
            this.origin.attr("src", elementData[index].origin);
            this.factor.attr("src", elementData[index].factor).css({ top: elementData[index].place.top, left: elementData[index].place.left, height: elementData[index].ratio.height, width: elementData[index].ratio.width });
            this.paint.attr("src", elementData[index].paint);

        },

        init() {
            console.log("Ceremony init.")
            this.init = null;

            // cube
            window.onmousemove = (e) => this.cubeWrap.css("perspective-origin", `${e.clientX - winWidth / 2}px ${e.clientY - winHeight / 2}px`);


            // card
            this.cardFlip.click((e) => {
                Ceremony.cardWrap.toggleClass("reverse");
                console.log("flip");
            });


            // left-list
            this.leftList.init = function () {
                this.empty();

                segmentData = Ceremony.getSegments();
                segmentTimePoints = segmentData.map((value) => value.time);

                for (let i = 0; i < segmentData.length; i++) {
                    this.append(`<a class="list-group-item bg-dark" data-time="${segmentData[i].time}">${segmentData[i].name}</a>`);
                }

                leftListItem = Ceremony.leftList.find("a");
                leftListItem.click((e) => {
                    leftListItem.removeClass("active");
                    let target = $(e.target).addClass("active");
                    Ceremony.centerVideo.currentTime(target.attr("data-time"));
                })
            }


            this.leftList.on("mousewheel", (e) => e.stopPropagation());
            this.leftHandlebar.click((e) => {
                this.leftList.parent().toggleClass("show");
            })


            // right-slider
            this.rightSlider.slide = function (n) {
                if (n < 0) {
                    while (n++ < 0)
                        this.prepend(this.children(":last"));
                } else {
                    while (n-- > 0)
                        this.append(this.children(":first"));
                }

                Ceremony.cardWrap.removeClass("reverse");
            }


            this.rightSlider.init = function () {
                this.empty();

                elementData = Ceremony.getElements();

                for (let i = 0; i < elementData.length; i++) {
                    this.append(`<img src="${elementData[i].origin}" alt=""  data-index="${i}" >`);
                }

                elementTimePoints = elementData.map((value) => value.time);

                rightSliderItem = $(".right-slider img");
                rightSliderItem.click((e) => {
                    let dist = $(".right-slider img").index(e.target) - 4;

                    if (dist === 0) {
                        fullpage_api.moveSlideRight();
                    } else {
                        Ceremony.rightSlider.slide(dist);
                    }

                    Ceremony.setCardImage($(this).find(":nth-child(5)").attr("data-index"));
                });
            }

            this.rightHandlebar.click((e) => {
                FP.toggleNavigator();
                Ceremony.rightHandlebar.parent().toggleClass("show");
            })


            // center-video
            this.centerVideo = videojs("center-video", { controls: true });
            this.centerVideo.one("play", (e) => {
                Ceremony.centerVideo.on("timeupdate", debounce(timeUpdateHandler, 950));
            })

            function timeUpdateHandler(e) {
                let currentTime = Math.floor(this.currentTime());
                let segIndex = segmentTimePoints.indexOf(currentTime);
                let eleIndex = elementTimePoints.indexOf(currentTime);

                if (segIndex !== -1) {
                    leftListItem.removeClass("active").eq(segIndex).addClass("active");
                }

                if (eleIndex !== -1) {
                    Ceremony.rightSlider.slide(eleIndex - $(".right-slider img:nth-child(5)").attr("data-index"));
                }
            }

            this.cube.click((e) => {
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

                Ceremony.reset(index);
            })
        },

        reset(n) {
            this.current = n;
            this.centerVideo.src(Ceremony.getVideoSrc());

            this.leftList.init();
            this.rightSlider.init();
        }

    };

    getData();

    function getData() {
        $.get("/data/data.json", function (data) {
            Navigation.Album.imageSource = data.album;
            Navigation.Album.init();

            Ceremony.data = data.ceremony;
            Ceremony.getSegments = () => Ceremony.data.segment[Ceremony.current];
            Ceremony.getElements = () => Ceremony.data.element[Ceremony.current];
            Ceremony.getVideoSrc = () => Ceremony.data.videoSource[Ceremony.current];

            Ceremony.init();

            // sakumap
            Sakumap.data = data.sakumap;
            Sakumap.init();
        })
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


    /** 毕摩口述
    ---------------------------------------------------------------*/

    let Dictation = {
        primary: videojs("primary-player", { controls: true }),
        secondary: videojs("secondary-player", { controls: false, muted: true }),

        init() {
            console.log("Dictation init.")
            this.primary.on(this.secondary, "click", togglePlay);
            this.secondary.on(this.primary, ["pause", "play", "seeking", "volumechange"], syncPlay)
        }

    }

    Dictation.init();

    // 切换播放
    function togglePlay(e) {
        let target = videojs(e.target);
        target.removeClass("upward");
        this.addClass("upward");

        target.muted(false);
        target.controls(true);
        target.on(this, "click", togglePlay);
        target.off(this, ["pause", "play", "seeking"], syncPlay);
        this.muted(true);
        this.controls(false);
        this.off(target, "click", togglePlay);
        this.on(target, ["pause", "play", "seeking"], syncPlay);
    }

    // 同步播放
    function syncPlay(e) {
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

            default:
                break;
        }
    }

    /** 洒库全景
    ----------------------------------------------------------------------*/

    let Sakumap = {
        mapWrapper: $(".map-wrapper"),

        init() {
            console.log("Sakumap init.")

            this.modalContainer = this.mapWrapper.find(".modal-container");
            this.modalShelter = this.mapWrapper.find(".modal-shelter");
            this.modalLauncherHolder = this.mapWrapper.find(".modal-launcher-holder");

            this.data.forEach((value, index) => {
                let item = $(`<div class="modal-launcher location-icon" data-toggle="tooltip" data-index="${index}" data-area="${value.area}" data-title="${value.title}" ></div>`).css({ top: value.top * winHeight + "px", left: value.left * winWidth + "px" });
                this.modalLauncherHolder.append(item);

                if (winWidth > 992) {
                    item.tooltip({ boundary: 'window', placement: "top", trigger: "hover" });
                }

            })

            $(".modal-launcher").click((e) => {
                Sakumap.modalContainer.fadeIn(200);
                Sakumap.modalShelter.fadeIn(200);

                let i = e.target.getAttribute("data-index");
                let item = Sakumap.data[i];

                if (winWidth > 992) {
                    let options = { left: item.left * winWidth + "px", top: item.top * winHeight + "px" };

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

                    Sakumap.modalContainer.css(options);
                }


                if (item.type === "image") {
                    Sakumap.modalContainer.html(`<img src="${item.source}" alt=''>`);
                } else {
                    Sakumap.modalContainer.html(`<video src="${item.source}" autoplay muted></video>`);
                }
            })

            Sakumap.modalShelter.click(() => {
                Sakumap.modalContainer.fadeOut(200);
                Sakumap.modalShelter.fadeOut(200);
            })
        }
    }


    /** 终章
    ----------------------------------------------------------------------*/

    let Ending = {
        init() {
            console.log("Ending init.")
            videojs("ending-video", { controls: true });
        }
    }

    Ending.init();

})