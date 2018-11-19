<template>
  <div id="app">
  <AppHeader msg="Testing"/>
  <div class="card">
    <div class="card-body">
        <h1>Welcome to Kolorskemo</h1>
        <img alt="Kolorskemo logo" src="./assets/Kolorskemo-Logo-1.png" width="200" height="200">
        <div v-show="!colorSelect">
          <ColorResult msg="Results" scheme="Scheme Name Test"/>
        </div>
        <div v-show="colorSelect">
          <ColorSelection msg="Select your Colors"/>
        </div>
        <p><button class="btn btn-md btn-primary" @click="setColorSelect()">{{ process }}</button></p>
      </div>
    </div>
    <!--
      Not Used, this was the example from the tutorial
      <posts/>
    -->
  </div>
</template>

<script>
import posts from './components/Posts.vue'
import ColorResult from './components/ColorResult.vue'
import ColorSelection from './components/ColorSelection.vue'
import AppHeader from './components/AppHeader.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'app',
  data () {
    return {
      colorSelect: true,
      process: 'Process'
    }
  },
  methods: {
    setColorSelect: function() {
      this.colorSelect = !this.colorSelect
      if(this.colorSelect) {
        this.process = 'Process'
      } else {
        this.process = 'Return'
      }
    }
  },
  components: {
    ColorResult,
    ColorSelection,
    AppHeader,
    posts
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
