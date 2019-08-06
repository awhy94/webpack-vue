<template>
  <div class="demo01-app">
    demo02
    <p
      class="demo01-app_title"
      @click="onClickTest"
    >
      title
    </p>
    <test />
  </div>
</template>
<script>
import Test from './Test';

export default {
  components: {
    Test,
  },
  methods: {
    onClickTest() {
    },
  },
};
</script>
<style lang="scss" scoped>
.demo01-app {
  width: 100%;
  &_title {
    display: flex;
    flex: 1;

    height: 40px;
    line-height: 40px;

    background: linear-gradient(lightblue, lightpink);
  }
}
</style>
