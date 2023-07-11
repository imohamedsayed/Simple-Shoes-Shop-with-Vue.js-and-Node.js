<template>
  <Header />
  <div class="main-view">
    <Aside />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
export default {
  components: { Header, Aside },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #222;
}
* {
  box-sizing: border-box;
}
.main-view {
  height: calc(100vh - 66px);
  display: flex;

  main {
    overflow: auto;
    height: 100%;
    flex: 1;
  }
}
</style>
