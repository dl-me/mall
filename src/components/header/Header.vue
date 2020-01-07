<template>
  <div id="app-header">
    <div :class="{ headerfix: showAbs }">
      <div class="header-fix" :class="theme">
        <div @click="goBack">
          <div class="iconfont back-icon">
            <img v-if="!hideBack" src="../../assets/back.png" alt />
          </div>
        </div>
        <div>
          <slot name="mid"></slot>
        </div>
        <div>
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["theme", "hideBack"],
  data() {
    return {
      showAbs: false,
      starty: null
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    goBack() {
      if (this.hideBack) {
        return;
      }

      this.$router.go(-1);
    },
    handleScroll() {
      const top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var windowHeight = window.screen.height; //当前屏幕高
      var textheight = document.body.scrollHeight; //文本

      if (textheight > windowHeight && top > 0) {
        this.showAbs = true;
      } else {
        this.showAbs = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
#app-header {
  height: 50px;
  flex: 0;
}
.header-fix {
  display: flex;
  height: 50px;
  text-align: center;
  font-size: 16px;
  align-items: center;
  padding: 0 15px;
  > div {
    display: flex;
    height: 100%;
    align-items: center;
    font-size: 0.32rem;
  }
  > div:first-child,
  > div:last-child {
    width: 80px;
    cursor: pointer;
  }
  > div:first-child {
    justify-content: flex-start;
    .back-icon {
      display: flex;
      align-items: center;
      img {
        height: 18px;
        width: 18px;
      }
    }
  }
  > div:nth-child(2) {
    flex: 1;
    justify-content: center;
  }
  > div:last-child {
    justify-content: flex-end;
  }
  &.white {
    background-color: #000;
    color: #fff;
  }
  &.blue {
    color: #fff;
    background: #333;
    box-shadow: 0 -1px 1px 1px #333;
  }
}
.headerfix {
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 50px;
  height: 50px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.5s linear;
}
</style>
