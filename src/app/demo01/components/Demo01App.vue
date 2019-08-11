<template>
  <div class="demo01-app">
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题{{ inputPosition }} {{ focusout }}
    </p>
    <div class="demo01-app__input">
      <input
        type="text"
        placeholder="输入1"
        @focusin="onFocusin"
        @focusout="onFocusout"
      >
    </div>
    <div class="demo01-app__input">
      <input
        type="text"
        placeholder="输入2"
        @focusin="onFocusin"
        @focusout="onFocusout"
      >
    </div>
    <div class="demo01-app__btn">
      确定
    </div>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <p class="demo01-app__title">
      input失去焦点问题
    </p>
    <!-- <div class="demo01-app__modal">
      <input
        class="demo01-app__modal__input"
        type="text"
        placeholder="haha"
      >
    </div> -->
  </div>
</template>
<script>

export default {
  data() {
    return {
      inputPosition: 0,
      focusout: 0,
    };
  },
  methods: {
    onFocusin() {
      this.onInputScrollTop();
    },
    onFocusout() {
      this.focusout = 1;
      this.scrollTo(this.inputPosition);
      // window.scrollTo(100, 0);
      // window.scrollTop = this.inputPosition;
      // this.inputPosition = this.getScrollTop();
    },
    onInputScrollTop() {
      const distance = this.getScrollTop();
      this.inputPosition = distance;
      // 解决安卓调起键盘 不自动顶起  ios连续focus 定位错误
      // distance += this.getElementPosition(e).top - this.getClientHeight() / 3;
      // distance += this.getElementPosition(e).top;
      // window.scrollTo(distance, 0);
    },
    getScrollTop() {
      const scrollTop = document.documentElement.scrollTop
        || window.pageYOffset
        || document.body.scrollTop
        || 0;
      return scrollTop;
    },
    getElementPosition(element) {
      const defaultRect = { top: 0, bottom: 0 };
      const rect = element
        ? (element.getBoundingClientRect && element.getBoundingClientRect())
        || defaultRect
        : defaultRect;
      const ret = {
        top: rect.top,
        bottom: rect.bottom,
      };
      return ret;
    },
    getClientHeight() {
      const clientHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight
        || 0;
      return clientHeight;
    },

    isObject(value) {
      const type = typeof value;
      return value != null && (type === 'object' || type === 'function');
    },

    scroll({ element, scrollX = 0, scrollY = 0 }) {
      if (!element) {
        return;
      }
      if (element.scrollTo) {
        element.scrollTo(scrollX, scrollY);
      }
    },
    scrollTo(...args) {
      let scrollX = 0;
      let scrollY = 0;
      let duration = 0;
      let dom = window;
      let callback;
      if (args.length < 1) return;
      if (args.length === 1) {
        if (this.isObject(args[0])) {
          has(args[0], 'scrollX') && (scrollX = args[0].scrollX);
          has(args[0], 'scrollY') && (scrollY = args[0].scrollY);
          has(args[0], 'dom') && (dom = args[0].dom);
          has(args[0], 'duration') && (duration = args[0].duration);
          has(args[0], 'callback') && (callback = args[0].callback);
        } else {
          scrollY = args[0];
        }
      }
      if (args.length === 2) {
        scrollY = args[0];
        duration = args[1];
      }
      const scrollTop = dom === window ? dom.scrollY : dom.scrollTop;
      const offsetY = Math.abs(scrollY - scrollTop);


      if (!duration) {
        this.scroll({ element: dom, scrollY, scrollX });
        return;
      }
      const direction = scrollY < scrollTop ? 'top' : 'bottom';
      const cosParameter = offsetY / 2;
      let oldTimestamp = performance.now();
      let scrollCount = 0;

      function step(newTimestamp) {
        scrollCount += Math.PI / (duration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) {
          this.scroll({ element: dom, scrollY, scrollX });
          callback && callback();
          return;
        }
        let stepY;
        if (direction === 'top') {
          stepY = Math.round(
            scrollTop - (cosParameter - cosParameter * Math.cos(scrollCount)),
          );
        }
        if (direction === 'bottom') {
          stepY = Math.round(
            scrollTop + (cosParameter - cosParameter * Math.cos(scrollCount)),
          );
        }
        this.scroll({ element: dom, scrollY: stepY, scrollX });
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
      }

      if (dom !== window && window.getComputedStyle(dom).webkitOverflowScrolling === 'touch') {
        dom.style.webkitOverflowScrolling = 'auto';
        setTimeout(() => {
          dom.style.webkitOverflowScrolling = 'touch';
        }, duration + 100);
      }

      window.requestAnimationFrame(step);
    },
  },
};
</script>
<style lang="scss" scoped>
.demo01-app {
  width: 100%;
  &__title {
    display: flex;
    flex: 1;

    height: 80px;
    line-height: 80px;
    padding: 0 32px;

    background: linear-gradient(lightblue, lightpink);
  }
  &__input {
    display: flex;
    align-items: center;
    padding: 0 32px;
    height: 100px;
    input {
      width: 100%;
      height: 100%;
      // user-select: text;
    }
  }
  &__btn {
    // position: fixed;
    // bottom: 20px;
    // left: 50%;

    // transform: translateX(-50%);

    width: 200px;
    height: 60px;

    margin: 0 auto;

    line-height: 60px;
    text-align: center;

    color: black;
    background: lightgoldenrodyellow;
  }
  &__modal {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background: rgba(0,0,0,.08);

    &__input {
      width: 500px;
      height: 60px;

      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
