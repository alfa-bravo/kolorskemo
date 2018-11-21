<template>

    <div class="container">
      <div class="row no-gutters">
        <div class="col color_col" style="background-color: blue">

        </div>
        <div class="col color_col" style="background-color: aqua">

        </div>
      </div>
      <div class="row no-gutters">
        <div class="col img_btn">
          <button id="remove_color_btn"  class="btn btn-outline-danger">Remove Color</button>

          <button id="add_color_btn"  class="btn btn-outline-success">Add Color</button>

        </div>
    </div>

    </div>


</template>

<script>
import 'util'
import 'util.promisify'
import ColorsService from '@/services/ColorsService'

export default {
  name: 'ColorSelection',
  data () {
    return {
      uploadImage: false,
      image: false,
      testData: '',
      colors: false,
      colorString: '',
      color_arr: []
    }
  },
  mounted () {
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
    rgbToHex: function (R,G,B) {
      return this.toHex(R) + this.toHex(G) + this.toHex(B);
    },
    toHex: function (n) {
      n = Math.floor(n * 256)
      if (isNaN(n)) return 0xFFFFFF;
      n = Math.max(0,Math.min(n,255));
      return "0123456789ABCDEF".charAt((n-n%16)/16)
          + "0123456789ABCDEF".charAt(n%16);
    },
    async processImage () {
      await ColorsService.addImage({
        image: this.image
      });

      // This line isn't 
      //this.$router.push({ path: '/colors' }); 

      const response = await ColorsService.fetchColors();
      const color_data = response.data;

      const raw_arr = color_data.color_query.colors;
      this.color_arr = [];

      for(var i = 0; i < raw_arr.length; i++) {
        var red = raw_arr[i][0];
        var green = raw_arr[i][1];
        var blue = raw_arr[i][2];

        this.color_arr[i] = '#' + this.rgbToHex(red, green, blue).toString(16);
      }

      this.colorString = raw_arr;
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
.color_col{
  height: 200px;
  text-align: center;
  vertical-align: middle;
  line-height: 200px;
  font-weight: bold;
  font-size: 22px;
}
  .row{
    width: 1200px;
    margin-bottom: 20px;
  }
</style>
