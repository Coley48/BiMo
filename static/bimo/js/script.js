$(function () {
    'use scrict';

    /**
     * 全局配置
     */

    let winWidth = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth,
        winHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;

    let Chapters = [],
        CurrentPart = 0,
        AnimateIn = 'pt-scaleUpDown',
        AnimateOut = 'pt-scaleDown';
    // "pt-flipInTop", "pt-rotateRightSideFirst", "pt-rotateOutNewspaper", "pt-rotateInNewspaper"

    let Trigger = $(".trigger");
    Trigger.handler = () => {
        let section = $("#section-" + CurrentPart);

        if (section.hasClass("hide")) {
            section.removeClass("hide");
            section.find(".sec-1").removeClass(AnimateIn).addClass(AnimateOut);
            section.find(".sec-2").removeClass(AnimateOut).addClass(AnimateIn);
        } else {
            section.addClass("hide");
            section.find(".sec-1").removeClass(AnimateOut).addClass(AnimateIn);
            section.find(".sec-2").removeClass(AnimateIn).addClass(AnimateOut);
        }

        Navigation.navBar.removeClass("nav-show");

    }
    Trigger.click(Trigger.handler);



    /** 导航栏
    ------------------------------------------------------------*/

    let Navigation = {
        current: -1,
        navBar: $(".nav"),
        navBtn: $('nav [data-toggle]'),
        addition: $(".addition"),
        closeBtn: $(".close-btn"),
        navMask: $(".nav-mask"),
        bars: [".menu", ".earth", ".album", ".share", ".about"],

        Earth: {
            player: videojs("earth-video", { controls: true, controlBar: { pictureInPictureToggle: false } }),

            init() {
                console.log("Earth init.");
                this.init = null;

                this.player.play();
            }
        },

        Album: {
            albumPage: $(".album"),
            imageSource: null,
            albumDisplayImg: $(".album-display img"),
            distance: 0,

            init() {
                console.log("Album init.");
                this.init = null;

                this.albumPage.find(".album-text").text(`滚动以浏览图片`);
                this.firstContainer = this.albumPage.find(".album-first-set");

                if (winWidth > 992) {
                    this.secondContainer = this.albumPage.find(".album-second-set");

                    if (this.imageSource) {
                        this.imageSource.firstSet.forEach((value, index) => {
                            this.firstContainer.append(`<img src="${value}" alt="" />`);
                        })
                        this.imageSource.secondSet.forEach((value, index) => {
                            this.secondContainer.append(`<img src="${value}" alt="" />`);
                        })
                    }


                    this.albumPage.on("mousewheel", (e) => {
                        e.stopPropagation();
                        Navigation.Album.distance += e.deltaY * e.deltaFactor;
                        // secondContainer.css({ transform: `translate(-50%,${578 - firstContainer.offset().top - secondContainer.height()}px` })
                        // secondContainer.offset({ top: -secondContainer.height() + (578 - firstContainer.offset().top) })
                        Navigation.Album.firstContainer.offset({ top: winHeight + Navigation.Album.distance });
                        Navigation.Album.secondContainer.offset({ top: -Navigation.Album.secondContainer.height() - Navigation.Album.distance });

                    });
                } else {
                    if (this.imageSource) {
                        this.imageSource.firstSet.forEach((value, index) => {
                            this.firstContainer.append(`<img src="${value}" alt="" />`);
                        })
                        this.imageSource.secondSet.forEach((value, index) => {
                            this.firstContainer.append(`<img src="${value}" alt="" />`);
                        })
                    }

                    this.albumPage.on("mousewheel", (e) => {
                        e.stopPropagation();
                    });
                }

                $(".album img").click((e) => {
                    this.albumDisplayImg.attr("src", e.target.src).show();
                });

                this.albumDisplayImg.click((e) => {
                    Navigation.Album.albumDisplayImg.hide();
                })


            }
        },

        Share: {
            copyBtn: $("#copy-link"),
            init() {
                console.log("Share init.");
                this.init = null;
                $(".share-cancel").click(Navigation.closeBar);
                new ClipboardJS("#copy-link");
                this.copyBtn.tooltip({ boundary: 'window', placement: "right", trigger: "click" });
            }

        },

        About: {
            init() {
                console.log("About init.");
                this.init = null;
                $(".about").on("mousewheel", (e) => e.stopPropagation());
            }
        },


        init() {
            console.log("Navigation init.")
            this.init = null;

            this.menuBtn = this.navBtn.filter("#menu-btn");
            this.menuBar = $(Navigation.bars[Navigation.menuBtn.attr("data-index")]);

            $(".logo").click((e) => {
                Navigation.navBar.toggleClass("nav-show");

                if (this.current === "0") {
                    Navigation.menuBtn.removeClass("active");
                    Navigation.menuBar.removeClass("show");
                    Navigation.closeBtn.fadeOut(200);
                    Navigation.navBtn.popover("enable");
                    Navigation.navMask.removeClass("show");
                }
            })


            this.navBtn.popover({ boundary: 'window', placement: "right", trigger: "hover" });

            this.navBtn.click((e) => {
                let target = Navigation.navBtn.filter(e.target);
                let index = e.target.getAttribute("data-index");
                let page = Navigation.bars[index];
                Navigation.Earth.player.pause();

                if (target.hasClass("active")) {
                    target.removeClass("active");// 隐藏bar
                    Navigation.addition.filter(page).removeClass("show");
                    Navigation.closeBtn.fadeOut(200);// 隐藏x按钮
                    Navigation.navBtn.popover("enable");// 显示popover
                    Navigation.navMask.removeClass("show");// 隐藏mask
                    Navigation.current = -1;
                } else {
                    Navigation.navBtn.removeClass("active").filter(e.target).addClass("active").popover('disable').popover("hide");
                    Navigation.addition.removeClass("show").filter(page).toggleClass("show");
                    Navigation.closeBtn.fadeIn(200);
                    Navigation.navMask.addClass("show");
                    Navigation.current = index;
                }

                switch (page) {
                    case ".earth":
                        if (Navigation.Earth.init) {
                            Navigation.Earth.init();
                        }
                        break;
                    case ".album":
                        if (Navigation.Album.init) {
                            Navigation.Album.init();
                        }
                        break;
                    case ".share":
                        if (Navigation.Share.init) {
                            Navigation.Share.init();
                        }
                        break;
                    case ".about":
                        if (Navigation.About.init) {
                            Navigation.About.init();
                        }
                        break;

                    default:
                        break;
                }
            })


            this.navMask.click(this.closeBar);
            this.closeBtn.click(this.closeBar);

        },

        closeBar(e) {
            Navigation.addition.removeClass("show");
            Navigation.navBtn.removeClass("active");
            Navigation.navMask.removeClass("show");
            Navigation.closeBtn.fadeOut(200);
            Navigation.Share.copyBtn.tooltip("hide");
        }
    }


    /** 引导页
    ----------------------------------------------------------------*/

    let Guidance = {
        // 封面
        letterWrap: $(".letter-wrap"),
        letterIcon: $(".letter-icon img"),
        starter: $(".starter"),
        letterAudio: document.getElementById("letter-audio"),

        init() {
            this.init = null;
            console.log("Guidance init.");

            this.letterIcon.click((e) => {
                this.letterWrap.addClass("show");
                this.letterAudio.play();
                $(".prologue").fadeOut(2000);
            });
            this.letterWrap.on("mousewheel", (e) => { e.stopPropagation() });
            this.letterIcon.popover({ boundary: 'window', placement: "top", trigger: "hover" });

            this.starter.click((e) => {
                $("#guidance").fadeOut(1500);
                Fullpage.setAllowScrolling(true);
                this.letterAudio.pause();
            })

        }
    }

    /** 探索旅途
    -----------------------------------------------------------------*/

    let Journey = {
        current: -1,
        preview: $(".intro-list"),
        data: {},
        player: videojs("journey-video", { controls: true, controlBar: { pictureInPictureToggle: false } }),
        backTrigger: $(".journey.back-trigger"),

        init() {
            console.log("Journey init.")
            this.init = null;

            this.preview.click((e) => {
                this.reset(e.target.getAttribute("data-index"));
                this.player.play();
                Trigger.handler();
            });

            this.backTrigger.click((e) => {
                Trigger.handler();
                this.player.pause();
            })
        },

        reset(index) {

            if (index == this.current) {
                return;
            }
            this.player.src(this.data.videoSource[index]);
            this.current = index;
        }
    }

    /** 毕摩仪式
    -------------------------------------------------------- */

    let Ceremony = {
        current: -1,
        data: null,

        // variable
        segmentData: null,
        segmentTimePoints: null,
        leftListItem: null,

        elementData: null,
        elementTimePoints: null,
        rightSliderItem: null,

        // cube
        cube: $(".cube"),
        cubeWrap: $(".cube-wrap"),

        // left-list
        leftList: $(".ceremony-segment .left-list"),
        leftHandlebar: $(".ceremony-segment .handle-bar"),

        // right-slide
        rightSlider: $(".ceremony-element .right-slider"),
        rightHandlebar: $(".ceremony-element .handle-bar"),
        backTrigger: $(".ceremony.back-trigger"),

        // card
        cardWrap: $(".card-wrap"),
        cardFlip: $(".card-wrap .flip"),
        backToVideo: $(".slide .back-to-video"),

        origin: $(".card-wrap .origin"),
        factor: $(".card-wrap .factor"),
        paint: $(".card-wrap .paint"),
        name: $(".card-wrap .name"),
        info: $(".card-wrap .info"),


        setCardImage(index) {
            this.origin.attr("src", Ceremony.elementData[index].origin);
            this.factor.attr("src", Ceremony.elementData[index].factor).css({ top: Ceremony.elementData[index].place.top, left: Ceremony.elementData[index].place.left, height: Ceremony.elementData[index].ratio.height, width: Ceremony.elementData[index].ratio.width });
            this.paint.attr("src", Ceremony.elementData[index].paint);
            this.name.text(Ceremony.elementData[index].name);
            this.info.text(Ceremony.elementData[index].info);
        },

        init() {
            console.log("Ceremony init.")
            this.init = null;

            // cube
            // window.onmousemove = (e) => this.cubeWrap.css("perspective-origin", `${e.clientX - winWidth / 2}px ${e.clientY - winHeight / 2}px`);
            this.cube.find("div").popover({ boundary: 'window', placement: "right", trigger: "hover" });

            // card
            this.cardFlip.click((e) => { Ceremony.cardWrap.toggleClass("reverse"); });
            this.backToVideo.click((e) => { Fullpage.moveSlideLeft(); this.cardWrap.removeClass("reverse"); });


            // left-list
            this.leftList.init = function () {
                this.empty();

                Ceremony.segmentData = Ceremony.getSegments();
                Ceremony.segmentTimePoints = Ceremony.segmentData.map((value) => value.time);

                for (let i = 0; i < Ceremony.segmentData.length; i++) {
                    this.append(`<a class="list-group-item bg-dark" data-time="${Ceremony.segmentData[i].time}">${Ceremony.segmentData[i].name}</a>`);
                }

                Ceremony.leftListItem = Ceremony.leftList.find("a");
                Ceremony.leftListItem.click((e) => {
                    Ceremony.leftListItem.removeClass("active");
                    Ceremony.centerVideo.currentTime($(e.target).addClass("active").attr("data-time"));
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
            }


            this.rightSlider.init = function () {
                this.empty();

                Ceremony.elementData = Ceremony.getElements();

                for (let i = 0; i < Ceremony.elementData.length; i++) {
                    this.append(`<img src="${Ceremony.elementData[i].origin}" alt=""  data-index="${i}" >`);
                }

                Ceremony.elementTimePoints = Ceremony.elementData.map((value) => value.time);

                Ceremony.rightSliderItem = $(".right-slider img");
                Ceremony.rightSliderItem.click((e) => {
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
                Ceremony.rightHandlebar.parent().toggleClass("show");
            })


            // center-video
            this.centerVideo = videojs("center-video", { controls: true, controlBar: { pictureInPictureToggle: false } });
            this.backTrigger.click((e) => {
                Trigger.handler();
                this.centerVideo.pause();
            })

            this.centerVideo.one("play", (e) => {
                Ceremony.centerVideo.on("timeupdate", debounce(timeUpdateHandler, 950));
                // Ceremony.rightSlider.slide(-4);
            })

            function timeUpdateHandler(e) {
                let currentTime = Math.floor(this.currentTime());
                let segIndex = Ceremony.segmentTimePoints.indexOf(currentTime);
                let eleIndex = Ceremony.elementTimePoints.indexOf(currentTime);

                if (segIndex !== -1) {
                    Ceremony.leftListItem.removeClass("active").eq(segIndex).addClass("active");
                }

                if (eleIndex !== -1) {
                    Ceremony.rightSlider.slide(eleIndex - $(".right-slider img:nth-child(5)").attr("data-index"));
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

            this.cube.click((e) => {
                Ceremony.reset(e.target.getAttribute("data-index"));
                this.centerVideo.play();
            });

            // this.leftList.init();
            // this.rightSlider.init();

        },

        reset(n) {
            if (n === this.current) {
                return;
            }
            this.current = n;
            this.centerVideo.src(Ceremony.getVideoSrc());

            this.leftList.init();
            this.rightSlider.init();
        },

        getSegments() {
            return this.data.segment[this.current];
        },

        getElements() {
            return this.data.element[this.current];
        },

        getVideoSrc() {
            return this.data.videoSource[this.current];
        }

    };


    /** 毕摩口述
     ---------------------------------------------------------------*/

    let Dictation = {
        primary: videojs("primary-player", { controls: true, controlBar: { pictureInPictureToggle: false } }),
        secondary: videojs("secondary-player", { controls: false, muted: true, controlBar: { pictureInPictureToggle: false, volumePanel: false } }),
        DictationTrigger: $(".dictation-trigger"),


        init() {
            console.log("Dictation init.")
            this.init = null;
            this.primary.on(this.secondary, "click", this.togglePlay);
            this.secondary.on(this.primary, ["pause", "play", "seeking", "volumechange"], this.syncPlay)

            this.DictationTrigger.click((e) => {
                Trigger.handler();
                this.primary.play();
            })
        },

        // 切换播放
        togglePlay(e) {
            let target = videojs(e.target);
            target.removeClass("upward");
            this.addClass("upward");

            target.controls(true);
            target.on(this, "click", Dictation.togglePlay);
            target.off(this, ["pause", "play", "seeking"], Dictation.syncPlay);
            this.controls(false);
            this.off(target, "click", Dictation.togglePlay);
            this.on(target, ["pause", "play", "seeking"], Dictation.syncPlay);
        },

        // 同步播放
        syncPlay(e) {
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
    }


    /** 洒库全景
    ----------------------------------------------------------------------*/

    let Sakumap = {
        mapWrapper: $(".map-wrapper"),

        init() {
            console.log("Sakumap init.")
            this.init = null;

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


                // if (item.type === "image") {
                //     Sakumap.modalContainer.html(`<img src="${item.source}" alt=''>`);
                // } else {
                // }
                Sakumap.modalContainer.html(`<video src="${item.source}" autoplay muted></video>`);
            })

            this.modalShelter.click(() => {
                this.modalContainer.fadeOut(200);
                this.modalShelter.fadeOut(200);
            })

        }
    }


    /** 终章
     ----------------------------------------------------------------------*/

    let Ending = {
        EndingTrigger: $(".ending-trigger"),

        init() {
            console.log("Ending init.")
            this.init = null;

            this.player = videojs("ending-video", { controls: true, controlBar: { pictureInPictureToggle: false } });
            this.EndingTrigger.click((e) => {
                Trigger.handler();
                this.player.play();
            })
        }
    }


    /** 初始化
    ------------------------------------------------------------------------*/
    $.get("/data/data.json", function (data) {
        Navigation.Album.imageSource = data.album;

        Journey.data = data.journey;

        Ceremony.data = data.ceremony;

        Sakumap.data = data.sakumap.point;

        console.log("Data is ready!");
    });

    Chapters.push(Journey, Ceremony, Dictation, Sakumap, Ending);

    let Fullpage = new fullpage('main', {
        // scrollHorizontally: true,
        // continuousVertical: true,
        touchSensitivity: 10,
        css3: false,
        // navigation: true,
        autoScrolling: true,
        verticalCentered: true,
        slidesNavigation: false,
        controlArrows: false,
        recordHistory: false,
        anchors: ["journey", "ceremony", "dictation", "sakumap", "ending"],
        menu: '.menu-container',
        animateAnchor: false,

        afterLoad: function (origin, destination) {
            //使用 index
            CurrentPart = destination.index;
            if (Chapters[CurrentPart].init) {
                Chapters[CurrentPart].init();
            }

        },
        afterRender: (e) => {
            Navigation.init();
            Guidance.init();
        },
    });

    Fullpage.setAllowScrolling(false);

    window.onresize = () => {
        Fullpage.reBuild();
        winWidth = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        winHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
    };
})