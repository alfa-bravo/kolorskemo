<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div v-if="fileSelect == false">
      <HelloWorld msg="Welcome to Kolorskemo"/>
    </div>
    <div v-else>
      <FileSelection msg="Welcome to Kolorskemo"/>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import FileSelection from './components/FileSelection.vue'

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
