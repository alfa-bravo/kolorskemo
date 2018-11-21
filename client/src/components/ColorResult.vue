<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>{{ scheme_name }}</h3>
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
import ModelService from '@/services/ModelService'

export default {
  name: 'ColorResult',
  props: {
    msg: String,
    scheme: String
  },
  data () {
    return {
      scheme_name: "",
      model: []
    }
  },
  methods: {
    async getModel () {
      const response = await ModelService.fetchModel();
      this.model = response.data;

      var name_arr = this.model.name_color;
      for(var i = 0; i < name_arr.length; i++) {
        this.scheme_name = this.scheme_name + name_arr[i];
      }
    }
  },
  mounted () {
    this.getModel()
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
