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

    let Sections = ["introduce", "journey", "ceremony", "dictation", "sakumap", "ending"];
    let Trigger = $(".trigger");
    Trigger.handler = () => {
        let section = $("#section-" + Sections[CurrentPart]);

        if (section.hasClass("hide")) {
            section.removeClass("hide");
            section.find(".sec-1").removeClass(AnimateIn).addClass(AnimateOut);
            section.find(".sec-2").removeClass(AnimateOut).addClass(AnimateIn);
        } else {
            section.addClass("hide");
            section.find(".sec-1").removeClass(AnimateOut).addClass(AnimateIn);
            section.find(".sec-2").removeClass(AnimateIn).addClass(AnimateOut);
        }

        Navigation.logo.removeClass("active");

    }
    Trigger.click(Trigger.handler);


    $.fn.indicator = function (cmd) {
        switch (cmd) {
            case "show":
                this.find("[data-toggle='indicator']").addClass("show").one("click", function (e) { $(this).removeClass("show"); });
                break;
            case "hide":
                this.find("[data-toggle='indicator'").removeClass("show");
                break

            default:
                break;
        }
        return this;
    }


    /** 导航栏
    ------------------------------------------------------------*/

    let Navigation = {
        current: -1,
        logo: $(".logo"),
        navBar: $(".nav"),
        navBtn: $('nav [data-toggle]'),
        addition: $(".addition"),
        closeBtn: $(".close-btn"),
        navMask: $(".nav-mask"),
        clickAudio: document.getElementById("click-audio"),
        bars: [".menu", ".earth", ".album", ".share", ".about"],

        Earth: {
            player: videojs("earth-video", { controls: true, controlBar: { pictureInPictureToggle: false, volumePanel: false } }),

            init() {
                console.log("Earth init.");
                this.init = null;

                this.player.play();
            }
        },

        Album: {
            albumPage: $(".album"),
            imageSource: null,
            albumDisplay: $(".album-display"),
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

                    this.albumPage.on("mousewheel", (e) => { e.stopPropagation(); });
                }

                $(".album img").click((e) => {
                    this.albumDisplayImg.attr("src", e.target.src);
                    this.albumDisplay.fadeIn(500);
                });

                this.albumDisplayImg.click((e) => {
                    this.albumDisplay.fadeOut(500);
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

            $(".click-btn").click((e) => {
                this.clickAudio.play();
            });

            this.logo.click((e) => {
                this.logo.toggleClass("active");

                if (this.current === "0") {
                    this.menuBtn.removeClass("active");
                    this.menuBar.removeClass("show");
                    this.closeBtn.fadeOut(200);
                    this.navBtn.popover("enable");
                    this.navMask.removeClass("show");
                }
            });

            this.navBtn.popover({ boundary: 'window', placement: "right", trigger: "hover" });

            this.navBtn.click((e) => {
                let target = this.navBtn.filter(e.target);
                let index = e.target.getAttribute("data-index");
                let page = this.bars[index];
                this.Earth.player.pause();

                if (target.hasClass("active")) {
                    target.removeClass("active");// 隐藏bar
                    this.addition.filter(page).removeClass("show");
                    this.closeBtn.fadeOut(200);// 隐藏x按钮
                    this.navBtn.popover("enable");// 显示popover
                    this.navMask.removeClass("show");// 隐藏mask
                    this.current = -1;
                } else {
                    this.navBtn.removeClass("active").filter(e.target).addClass("active").popover('disable').popover("hide");
                    this.addition.removeClass("show").filter(page).toggleClass("show");
                    this.closeBtn.fadeIn(200);
                    this.navMask.addClass("show");
                    this.current = index;
                }

                switch (page) {
                    case ".earth":
                        if (this.Earth.init) {
                            this.Earth.init();
                        }
                        break;
                    case ".album":
                        if (this.Album.init) {
                            this.Album.init();
                        }
                        break;
                    case ".share":
                        if (this.Share.init) {
                            this.Share.init();
                        }
                        break;
                    case ".about":
                        if (this.About.init) {
                            this.About.init();
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
        scroll: $(".scroll"),
        letterWrap: $(".letter-wrap"),
        letterIcon: $(".letter-icon img"),
        starter: $(".starter"),
        loadingAudio: document.getElementById("loading-audio"),
        letterAudio: document.getElementById("letter-audio"),

        init() {
            this.init = null;
            console.log("Guidance init.");

            this.scroll.click((e) => {
                $(".animate").addClass("animate__animated");
                $(".prologue").show();
                this.loadingAudio.play();
                this.scroll.fadeOut(500).find("img").css("animation-play-state", "paused");
            });

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
                this.loadingAudio.pause();
            });
            this.starter.one("click", (e) => {
                $(".logo").indicator("show");
            });
        }
    }

    // 引导
    let Introduce = {
        counter: 0,
        minimap: $(".introduce-container .introduce-item"),

        init() {
            console.log("Introduce init.")
            this.init = null;

            this.minimap.one("mouseover", (e) => {
                if (++this.counter === 4) {
                    setTimeout(() => {
                        $(".introduce-container footer").indicator("show");
                    }, 1000);
                }
            });

            this.minimap.on("mouseenter", (e) => {
                Navigation.clickAudio.play();
            });
        }
    };

    /** 探索旅途
    -----------------------------------------------------------------*/

    let Journey = {
        current: -1,
        preview: $(".intro-list"),
        data: {},
        player: videojs("journey-video", { controls: true, controlBar: { pictureInPictureToggle: false } }),
        backTrigger: $(".journey-trigger.back-trigger"),

        init() {
            console.log("Journey init.")
            this.init = null;

            this.preview.click((e) => {
                this.reset(e.target.getAttribute("data-index"));
                this.player.play();
                Trigger.handler();
            });
            this.preview.one("click", (e) => {
                $("#section-journey .sec-2").indicator("show");
            });

            this.backTrigger.click((e) => {
                Trigger.handler();
                Navigation.logo.addClass("active");
                this.player.pause();
            });

            $("#section-journey .sec-1 header").indicator("show");
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
        introduced: false,

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
        cubeIntro: $(".cube-intro"),

        // left-list
        leftList: $(".ceremony-segment .left-list"),
        leftHandlebar: $(".ceremony-segment .handle-bar"),

        // right-slide
        rightPart: $(".ceremony-element"),
        rightSlider: $(".ceremony-element .right-slider"),
        rightHandlebar: $(".ceremony-element .handle-bar"),
        rightHandlebarDiv: $(".ceremony-element .handle-bar div"),
        backTrigger: $(".ceremony-trigger.back-trigger"),

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
            window.onmousemove = (e) => this.cubeWrap.css("perspective-origin", `${e.clientX - winWidth / 2}px ${e.clientY - winHeight / 2}px`);
            if (winWidth > 992) {
                this.cube.find("div").popover({ boundary: 'window', placement: "right", trigger: "hover" });
            }

            // card
            this.cardFlip.click((e) => { Ceremony.cardWrap.toggleClass("reverse"); Navigation.clickAudio.play(); });
            this.backToVideo.click((e) => { Fullpage.moveSlideLeft(); });

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
            });


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
                    this.append(`<li data-index="${i}"><img src="${Ceremony.elementData[i].origin}" alt="" ></li>`);
                }

                Ceremony.elementTimePoints = Ceremony.elementData.map((value) => value.time);

                Ceremony.rightSliderItem = $(".right-slider img");
                Ceremony.rightSliderItem.click((e) => {
                    let dist = $(".right-slider img").index(e.target) - 4;

                    if (dist === 0) {
                        fullpage_api.moveSlideRight();
                        if (!this.introduced) {
                            $("#section-ceremony .element-detail").indicator("show");
                            this.introduced = true;
                        }
                    } else {
                        Ceremony.rightSlider.slide(dist);
                    }

                    Ceremony.setCardImage($(this).find(":nth-child(5)").attr("data-index"));
                });

                Ceremony.rightSlider.slide(-4);

            }

            this.rightHandlebar.click((e) => {
                this.rightPart.toggleClass("show");
                Navigation.clickAudio.play();
            });

            this.rightHandlebar.one("click", (e) => {
                $(".element-indicator").indicator("show");
                this.rightHandlebar.one("click", (e) => {
                    $(".element-indicator").indicator("hide");
                })
            });


            // center-video
            this.centerVideo = videojs("center-video", { controls: true, controlBar: { pictureInPictureToggle: false } });
            this.backTrigger.click((e) => {
                Trigger.handler();
                Navigation.logo.addClass("active");
                this.centerVideo.pause();
            });

            this.centerVideo.one("play", (e) => {
                this.centerVideo.on("timeupdate", debounce(timeUpdateHandler, 950));
            });

            function timeUpdateHandler(e) {
                let currentTime = Math.floor(this.currentTime());
                let segIndex = Ceremony.segmentTimePoints.indexOf(currentTime);
                let eleIndex = Ceremony.elementTimePoints.indexOf(currentTime);

                if (segIndex !== -1) {
                    Ceremony.leftListItem.removeClass("active").eq(segIndex).addClass("active");
                }

                if (eleIndex !== -1) {
                    Ceremony.rightSlider.slide(eleIndex - $(".right-slider :nth-child(5)").attr("data-index"));
                    if (!Ceremony.rightPart.hasClass("show")) {
                        Ceremony.rightHandlebarDiv.addClass("animate__headShake");
                        setTimeout(() => {
                            Ceremony.rightHandlebarDiv.removeClass("animate__headShake");
                        }, 3000);
                    }
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
            this.cube.one("click", (e) => {
                $("#section-ceremony .ceremony-wrap").indicator("show");
            })

            this.cube.on("mouseover", (e) => {
                let index = e.target.getAttribute("data-index");
                this.cubeIntro.addClass("show");
                this.cubeIntro.find("h3").text(this.data.name[index]);
                this.cubeIntro.find("p").text(this.data.cubeIntro[index]);
            });
            this.cube.on("mouseout", (e) => {
                this.cubeIntro.removeClass("show");
            });

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
            });
            this.DictationTrigger.one("click", (e) => {
                $("#section-dictation .sec-2").indicator("show");
            });
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
                let item = $(`<div class="modal-launcher" data-toggle="tooltip" data-index="${index}" data-area="${value.area}" data-title="${value.title}" ></div>`).css({ top: value.top * winHeight + "px", left: value.left * winWidth + "px" });
                this.modalLauncherHolder.append(item);

                if (winWidth > 992) {
                    item.tooltip({ boundary: 'window', placement: "top", trigger: "hover" });
                }

            })

            $(".modal-launcher").click((e) => {
                this.modalContainer.fadeIn(200);
                this.modalShelter.fadeIn(200);

                let i = e.target.getAttribute("data-index");
                let item = this.data[i];

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

                    this.modalContainer.css(options);
                }

                this.modalContainer.html(`<video src="${item.source}" autoplay></video>`);
            })

            this.modalShelter.click(() => {
                this.modalContainer.fadeOut(200).find("video").get(0).pause();
                this.modalShelter.fadeOut(200);
            });

            this.modalContainer.click((e) => {
                this.modalContainer.toggleClass("full");
            });

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
    Chapters.push(Introduce, Journey, Ceremony, Dictation, Sakumap, Ending);

    $.get("/data/data.json", function (data) {
        Navigation.Album.imageSource = data.album;

        Journey.data = data.journey;

        Ceremony.data = data.ceremony;

        Sakumap.data = data.sakumap.point;

        console.log("Data is ready!");

        Chapters.forEach((sec) => {
            if (sec.init) {
                sec.init();
            }
        })
    });


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
        anchors: ["introduce", "journey", "ceremony", "dictation", "sakumap", "ending"],
        menu: '.menu-container',
        animateAnchor: false,

        afterLoad: function (origin, destination) {
            CurrentPart = destination.index;
            //     if (Chapters[CurrentPart].init) {
            //         Chapters[CurrentPart].init();
            //     }
        },
        afterRender: (e) => {
            Navigation.init();
            Guidance.init();
        },
        onSlideLeave: function (section, origin, destination, direction) {
            Ceremony.cardWrap.removeClass("reverse");
        },
        onLeave: function (origin, destination, direction) {
            let originElement = $(origin.item);
            if (originElement.hasClass("hide") === false) {
                originElement.addClass("hide");
                originElement.find(".sec-1").removeClass(AnimateOut).addClass(AnimateIn);
                originElement.find(".sec-2").removeClass(AnimateIn).addClass(AnimateOut);
            }
        }
    });

    Fullpage.setAllowScrolling(false);

    window.onresize = () => {
        Fullpage.reBuild();
        winWidth = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        winHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
    };
})