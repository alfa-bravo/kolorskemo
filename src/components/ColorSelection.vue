<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p><button class="btn btn-md btn-default" v-on:click="setUploadImage()">Upload an Image</button></p>
    <div v-show="uploadImage">
      <ul>
        <li><input type="file"></li>
      </ul>
    </div>
    <h4>...or set the Colors Directly: </h4 >
    <ul>
      <li><input type="color" value="#ffffff"></li>
      <li><input type="color" value="#ffffff"></li>
      <li><input type="color" value="#ffffff"></li>
      <li><input type="color" value="#ffffff"></li>
      <li><input type="color" value="#ffffff"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ColorSelection',
  data () {
    return {
      uploadImage: false
    }
  },
  methods: {
    setUploadImage: function() {
      this.uploadImage = !this.uploadImage
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
