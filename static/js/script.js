$(function () {
    'use scrict';

    /**
     * 变量定义
     */

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

    // fullpage_api.moveSectionUp();
    // fullpage_api.moveTo(3, 0);

    /**
     * 全局变量
     */
    // 动画
    let animateIn = 'pt-scaleUpDown',
        animateOut = 'pt-scaleDown';

    window.currentPart = 0;
    let typer = null;

    /**
     * 导航栏------------------------------------------
     */
    let Mask = $(".mask"), // 阴影面板
        Menu = $("#menu"), // 菜单按钮
        menuBar = $(".menu-bar"), // 目录栏
        menuItem = $(".menu-bar [href]"), // 章节项
        Volume = $("#volume"); // 声音控制

    Mask.open = false;
    Menu.open = false;
    Volume.mute = true;

    /**
    * 引导页------------------------------------------
    */
    // 封面
    let headerTitle = $("#header-title"),
        headerBody = $("#header-body"),
        header = $("#header"),
        letter = $("#letter");

    /**
     * 毕摩仪式----------------------------------------
     */
    let wrap = $(".wrap");



    /**
     * 事件监听
     */
    window.onmousemove = function (e) {
        wrap.css("perspective-origin", `${e.clientX - window.innerWidth / 2}px ${e.clientY - window.innerHeight / 2}px`);
    }

    // 导航栏
    Menu.click(toggleMenuBar);
    Mask.click(toggleMenuBar);
    Volume.click(toggleVolume);

    let triger = $(".triger");
    triger.click(function () {
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

    // 板块
    headerTitle.click(function () {
        letter.show();
        header.addClass("pt-moveToLeft-50");
        // headerTitle.addClass(["pt-moveToBottom", "pt-delay2000", "animate__slower"]).find(".animate__animated").removeClass("animate__animated");
        headerBody.addClass(["animate__animated", "animate__fadeOut", "animate__slow"]);
        createTyper(1200);
    })

    $(".card-page").click(function () {
        $(this).toggleClass("reverse");
    })

    /**
     * 函数
     */

    // 板块切换效果
    function changeMenuItem(i) {
        currentPart = i;

        menuItem.filter(".active").removeClass("active");
        $(menuItem.get(i)).addClass("active");

    }


    //  目录按钮切换
    function toggleMenuBar() {
        toggleMask();

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