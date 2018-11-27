<template>
    <div class="container-fluid intro">
        <h1>What is Kolorskemo ?</h1>
        <h2>Kolorskemo is a online web application that intergrate machine learning technique to help artists name their color palettes.</h2>
        <div id="menu">
            <ul>
                <li><a href="/">Get started</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Introduction',
        props: {
            msg: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .intro{
        width: 100%;
        height:65vh;
        background-image: url("../assets/color_bg.jpg");
        background-position: center; /* Center the image */
        background-repeat: no-repeat; /* Do not repeat the image */
        background-size: cover; /* Resize the background image to cover the entire container */

    }
    .intro h1{
        font-size: 4vw;
        font-weight: bold;
        color: #0e5782;
        padding-top: 10%;
        text-align: center;
    }
    .intro p{
        font-size: 0.5vw;
        font-weight: bold;
        color: #0e5782;
        text-align: center;
    }

    ul li{
        display: inline;
        padding-right: 25px;

    }
    ul li a:hover{
        color: #ffffff;
        text-decoration: underline;
    }

    ul li a:visited{
        color: #ffffff;
        text-decoration: none;
    }

    ul li a{
        font-size: 30px;
        color: #ffffff;
        font-weight: bold;
    }
    #menu li a{
        border: 2px solid white;
        padding: 10px;
        border-radius: 10px;

    }
    #menu li a:hover{
        background-color: white;
        color: #0e5782;
        text-decoration: none;

    }

    #menu{
        margin-top: 25px;
    }
</style>
