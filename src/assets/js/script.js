let contextmenu = $(".contextmenu");
let winHeight = $(window).height();
let winWidth = $(window).width();


// 右键菜单
window.oncontextmenu = function (e) {
    let event = e || window.event;
    event.preventDefault();

    if (event.target.hasAttribute("data-editable")) {
        window.editTarget = event.target;
        event.target.focus();
        let left = event.clientX + 1;
        let top = event.clientY + 1;

        contextmenu.show(); // 隐藏的元素offsetWidth、offsetHeight为 0

        if (left >= winWidth - contextmenu[0].offsetWidth) {
            left -= contextmenu[0].offsetWidth;
        }
        if (top >= winHeight - contextmenu[0].offsetHeight) {
            top -= contextmenu[0].offsetHeight;
        }

        contextmenu.css({ left: left + "px", top: top + "px" });
    } else {
        contextmenu.hide();
        window.editTarget = null;
    }

    return false;
};

// 隐藏菜单
window.onclick = function () {
    contextmenu.hide();
};

// let observer = new MutationObserver(function (mutations) {
//   console.log(mutations);
// });
// observer.observe(contextmenu[0], { characterData: true, subtree: true });

function Edit() {
    console.log("edit.");
    if (window.editTarget) {
        window.editTarget.focus();
        switch (window.editTarget.getAttribute("data-editable")) {
            case "text":
                window.editTarget.setAttribute("contenteditable", "true");
                break;
            default:
                break;
        }
    }
    console.log(document.activeElement);
}
function Bold() {
    console.log("bold.");
    $("body").toggleClass("bold");
}
function Undo() {
    document.execCommand("undo", false, null);
}
function Redo() {
    document.execCommand("redo", false, null);
}
function Save() {
    console.log("save.");
}

$(".edit").on("click", Edit);
$(".bold").on("click", Bold);
$(".undo").on("click", Undo);
$(".redo").on("click", Redo);
$(".save").on("click", Save);

document.onkeydown = function (event) {
    let oEvent = event || window.oEvent;

    let KeyCode =
        oEvent.detail || oEvent.keyCode || oEvent.which || oEvent.charCode;

    let CtrlKeyCode = oEvent.ctrlKey || oEvent.metaKey;

    if (KeyCode == 66 && CtrlKeyCode) {
        oEvent.preventDefault();
        Bold();
    } else if (KeyCode == 83 && CtrlKeyCode) {
        oEvent.preventDefault();
        Save();
    }
};