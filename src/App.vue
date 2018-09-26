<template>
  <div id="app">
    <h1>Welcome to Kolorskemo</h1>
    <img alt="Kolorskemo logo" src="./assets/Kolorskemo-Logo-1.png" width="200" height="200">
    <p><button class="btn btn-lg btn-primary" v-on:click="fileSelect = !fileSelect">Switch Modes</button></p>
    <div v-show="!fileSelect">
      <HelloWorld msg="Choose your colors..."/>
    </div>
    <div v-show="fileSelect">
      <FileSelection msg="...or upload an image."/>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import FileSelection from './components/FileSelection.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'app',
  methods: {
    setFileSelect: function(bool) {
      fileSelect = bool
    }
  },
  data () {
    return {
      fileSelect: false
    }
  },
  components: {
    HelloWorld,
    FileSelection
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
