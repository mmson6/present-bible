<template>
  <div id="app">
      <div id="nav" class="content">
        <router-link to="/">Show</router-link>
        <span style="padding: 0px 10px;"> | </span>
        <router-link to="/search">Search</router-link>  
      </div>
      <keep-alive include="Show,Search">
        <router-view> </router-view>
      </keep-alive>
      
  </div>
</template>

<script>

import { ipcRenderer } from 'electron'

export default {
  name: 'App',
  created() {
    ipcRenderer.on('shortkey-message', (event, arg) => {
      if (arg == "go-to-show-screen") {
        if (this.$route.name != "Show") {
          this.$router.push('/')
        }
      } else if (arg == "go-to-search-screen") {
        if (this.$route.name != "Search") {
          this.$router.push('/search')
        }
      }
    })
  }
}
</script>
<style lang="scss">


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

#nav {
  // padding: 30px;
  font-size: 20px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#content {
  position: absolute; 
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  width: 100px; /* Need a specific value to work */
}
</style>
