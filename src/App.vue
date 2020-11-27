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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 20px;
}
</style>
