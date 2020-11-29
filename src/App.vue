<template>
  <div id="app">
    <BibleViewer/>
  </div>
</template>

<script>
import BibleViewer from './components/BibleViewer.vue'

export default {
  name: 'App',
  components: {
    BibleViewer,
  }
}
</script>

<style>

@font-face {
  font-family: "NanumMyeongjo";
  src: local("NanumMyeongjo"), url(./assets/fonts/NanumMyeongjo.ttf) format("truetype");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif, "NanumMyeongjo";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 20px;
}
</style>