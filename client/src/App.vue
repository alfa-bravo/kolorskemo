<template>
  <div id="app">
  <AppHeader msg="Testing"/>
  <div class="card">
    <div class="card-body">
        <h1>Welcome to Kolorskemo</h1>
        <img alt="Kolorskemo logo" src="./assets/Kolorskemo-Logo-1.png" width="200" height="200">
        <div v-if="!select" msg="Choice selection">
            <p>Choice selection</p>
            <div class="row">
                <div class="col-6">
                    <p>Upload Image</p>
                    <button id = "upload_btn" type="button" class="btn btn-outline-primary" @click="uploadImg">Upload Image</button>
                </div>
                <div class="col-6">
                    <p>Build your colors pallets</p>
                    <button id = "colors_btn" type="button" class="btn btn-outline-primary" @click="colorchoosing">Choose colors</button>
                </div>
            </div>
        </div>
        <div v-else>
            <!--<div v-show="!colorSelect">
                <ColorResult msg="Results" scheme="Scheme Name Test"/>
            </div>
            <div v-show="colorSelect">-->
                <ImageUpload v-if="upload" msg="Upload Image"/>

                <ColorSelection v-else-if="colorchooser" msg="Select your Colors"/>

            <!--</div>
            <p><button class="btn btn-md btn-primary" @click="setColorSelect()">{{ process }}</button></p>-->
        </div>
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
import ImageUpload from './components/ImageUpload.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'app',
  data () {
    return {
      select:false,
      colorSelect: true,
      process: 'Process',
      upload:false,
      colorchooser:false
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
    },
     uploadImg: function(){
        this.select = true;
        this.upload = true,
        this.colorchooser=false
    },
      colorchoosing: function(){
          this.select = true;
          this.upload = false,
          this.colorchooser = true
      },



  },
  components: {
    ColorResult,
    ColorSelection,
    ImageUpload,
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
