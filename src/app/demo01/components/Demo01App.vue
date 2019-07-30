<template>
  <div class="demo01-app">
    demo01
    <p class="demo01-app_title">title</p>
  </div>
</template>
<script>
export default {

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
