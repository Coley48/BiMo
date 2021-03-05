<template>
  <ul class="contextmenu">
    <li class="edit" @click="Edit"><span>编辑</span></li>
    <li class="bold" @click="Bold"><span>背景</span><kbd>ctrl + B</kbd></li>
    <li class="undo" @click="Undo"><span>撤销</span><kbd>ctrl + Z</kbd></li>
    <li class="redo" @click="Redo"><span>重做</span><kbd>ctrl + Y</kbd></li>
    <li class="save" @click="Save"><span>保存</span><kbd>ctrl + S</kbd></li>
  </ul>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    Edit() {
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
      //   console.log(document.activeElement);
    },
    Bold() {
      console.log("bold.");
      $("body").toggleClass("bold");
    },
    Undo() {
      document.execCommand("undo", false, null);
    },
    Redo() {
      document.execCommand("redo", false, null);
    },
    Save() {
      console.log("save.");
    },
  },
  mounted() {
    let contextmenu = $(".contextmenu");
    let winHeight = $(window).height();
    let winWidth = $(window).width();
    let bodyEl = $("body");
    let _this = this;

    // 右键菜单
    window.oncontextmenu = (e) => {
      let event = e || window.event;
      event.preventDefault();

      switch (event.target.getAttribute("data-editable")) {
        case "text":
          window.editTarget = event.target;
          event.target.focus();
          let left = event.clientX + 1;
          let top = event.clientY + 1;

          // bodyEl.addClass("freeze");
          contextmenu.show(); // 隐藏的元素offsetWidth、offsetHeight为 0

          if (left >= winWidth - contextmenu[0].offsetWidth) {
            left -= contextmenu[0].offsetWidth;
          }
          if (top >= winHeight - contextmenu[0].offsetHeight) {
            top -= contextmenu[0].offsetHeight;
          }

          contextmenu.css({ left: left + "px", top: top + "px" });
          break;
        case "action":
          break;

        default:
          contextmenu.hide();
          // bodyEl.removeClass("freeze");
          window.editTarget = null;
      }

      return false;
    };

    // 隐藏菜单
    window.onclick = () => {
      contextmenu.hide();
      window.editTarget = null;
      // bodyEl.removeClass("freeze");
    };

    // 监听按键
    document.onkeydown = (event) => {
      let oEvent = event || window.oEvent;

      let KeyCode =
        oEvent.detail || oEvent.keyCode || oEvent.which || oEvent.charCode;

      let CtrlKeyCode = oEvent.ctrlKey || oEvent.metaKey;

      if (KeyCode == 66 && CtrlKeyCode) {
        oEvent.preventDefault();
        this.Bold();
      } else if (KeyCode == 83 && CtrlKeyCode) {
        oEvent.preventDefault();
        this.Save();
      }
    };

    // 监视器
    let observer = new MutationObserver(function (mutations) {
      for (let index in mutations) {
        let target = mutations[index].target;
        if (target.parentElement.hasAttribute("data-editable") == false) {
          return;
        }
        let key = target.parentElement.getAttribute("data-source");
        _this.$store.commit("addMutation", {
          key,
          value: target.data.trim(),
        });
      }
    });
    observer.observe(document.body, { characterData: true, subtree: true });
  },
};
</script>

<style lang="less" scoped>
.contextmenu {
  display: none;
  position: fixed;
  z-index: 9998;
  left: 10%;
  top: 10%;
  width: 160px;
  padding: 3px 0;
  border: 1px solid #ccc;
  font-size: small;
  font-weight: lighter;
  transition: display 0.1s ease;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  li {
    list-style: none;
    width: 100%;
    color: #555;
    padding: 5px 8%;
    display: flex;
    justify-content: space-between;
    /* text-align: center; */

    &:hover {
      background: #eee;
      color: #0aaf88;
      // color: #ebd8d1;
    }
  }
}
</style>