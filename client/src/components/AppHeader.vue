<template>
  <nav class="navbar navbar-default">
     <div class="container-fluid">
        <div class="navbar-header">
           <a class="navbar-brand" href="/">KolorSkemo</a>
        </div>
        <ul class="nav navbar-nav">
           <li class="active"><a href="/">Home</a></li>
        </ul>
     </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
