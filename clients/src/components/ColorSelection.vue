<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h4>Upload an Image</h4>
    <div v-if="!image">
      <form action="POST">
        <input type="file" @change="fileChanged">
      </form>
    </div>
    <div v-else>
      <img :src="image" height="300px"/>
      <p><button @click="removeImage">Remove image</button></p>
      <p><button @click="processImage">Process image</button></p>
      <p>{{ testData }}</p>
    </div>
    <h4>...or set the Colors Directly: </h4 >
    <ul>
      <li><input type="color" value="#ffffff"></li>
      <li><input type="color" value="#ffffff"></li>
      <li><input type="color" value="#ffffff"></li>
      <li><input type="color" value="#ffffff"></li>
      <li><input type="color" value="#ffffff"></li>
    </ul>
    <!-- Needs to be moved to Color Results -->
    <!--<div v-for="name_color in model">
      <div v-for="name in name_color">
        <p>{{ name }}</p>
      </div>
    </div>-->
    <p>{{ colorString }}</p>
  </div>
</template>

<script>
import 'util'
import 'util.promisify'
import ModelService from '@/services/ModelService'
import ColorsService from '@/services/ColorsService'

export default {
  name: 'ColorSelection',
  data () {
    return {
      uploadImage: false,
      image: false,
      testData: '',
      model: false,
      colors: false,
      colorString: ''
    }
  },
  mounted () {
    this.getModel(),
    this.processImage()
  },
  methods: {
    fileChanged: function(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      // this.image = "./img/demo.193495c6.png";
      this.image = new Image();

      // const util = require('util');
      // require('util.promisify').shim();
      // const process = require('child_process');
      // const exec = util.promisify(process.exec());

      // (async () => {
      //   const {stdout, stderr} = await exec('ek --number-of-colors 5 ./img/demo.193495c6.png');
      //   this.testData = JSON.parse(stdout);
      // })()

      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;

      };
      reader.readAsDataURL(file);
    },
    removeImage: function () {
      this.image = false;
    },
    async getModel () {
      const response = await ModelService.fetchModel();
      this.model = response.data;
    },
    async processImage () {
      await ColorsService.addImage({
        image: this.image
      });

      // This line isn't 
      //this.$router.push({ path: '/colors' }); 

      const response = await ColorsService.fetchColors();

      this.colorString = response.data;
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
