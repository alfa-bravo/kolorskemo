<template>

    <div class="container">
        <h1>Manually Choose Colors</h1>
        <!--<div v-if="color_count<=0 || color_count>5" class="row no-gutters">
            <div class="col">
                <label>
                    Number of color:
                    <input id="color_number_input" type="text" placeholder="1 to 5">
                </label>
            </div>

            <div class="row no-gutters">
                <div class="col">

                    <button id="add_color_btn" @click="addColor" class="btn btn-outline-success">Add Color</button>

                </div>

            </div>
        </div>-->

        <!--<div v-else>-->

                <div class="row no-gutters">
                    <div class="col-md-1"></div>
                    <div v-for="(color, index) in color_arr" class="col col-md-2 color_col">

                        <!-- Removed Chromoselector -->
                        <!--<input class="color_picker" v-model="color_arr[index]" :id="'color_picker'+index" type="color" value="{color}">-->

                        <input class="color_picker" v-model="color_arr[index]" :id="index" type="color" value="{color}">


                    </div>
                    <div class="col-md-1"></div>

                </div>
                <div class="row no-gutters">
                    <div class="col-md-1"></div>
                    <div v-for="(color, index) in color_arr" class="col col-md-2 color_hex">

                        <p>{{color}}</p>

                    </div>
                    <div class="col-md-1"></div>
                </div>
                <div class="row no-gutters">
                    <div class="col">
                        <button id="process_color" @click="processColor" class="btn btn-outline-primary">Analyze
                        </button>
                    </div>
                </div>

                <div v-if="processing">

                    <h3>Scheme Name: <span v-if="scheme_name!=''"> {{ scheme_name }} </span> <span v-else> Analyzing ... </span></h3>
                </div>



        <!--</div>-->


    </div>


</template>

<script>

    import ModelService from '@/services/ModelService'
    import SchemeService from '@/services/SchemeService'
    //import chromoselector from "chromoselector";
    //import colorpicker from "bootstrap-colorpicker";
    //import $ from 'jquery';

    // Chromoselector isn't working right now.
    //import "chromoselector/src/chromoselector.css";
    //import "chromoselector/src/chromoselector.js";

    //import $ from 'jquery';

    //import 'bootstrap-colorpicker/dist/css/bootstrap-colorpicker.css';
    //import 'bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js';


    export default {
        name: 'ColorSelection',
        data() {
            return {
                processing: false,
                color_arr: ['#000000','#000000','#000000','#000000','#000000'],
                //color_count: 0,
                scheme_name: "",
                model: []
            }
        },
        methods: {
            addColor: function () {
                this.color_count = document.getElementById("color_number_input").value
                for (var i = 0; i < this.color_count; i++) {
                    this.color_arr[i] = '#000000'
                }
            },
            processColor: function () {
                this.processing = true;
                this.scheme_name='';
                this.getSchemeName();
            },
            reset: function () {
                this.processing = false;
                this.color_arr = ['#000000','#000000','#000000','#000000','#000000'];
                this.color_count = 0;
                this.scheme_name = "";
                this.model = [];
            },

            async getSchemeName() {
                const response = await SchemeService.fetchScheme(this.color_arr);

                this.scheme_name = response.data["predicted-name"];
            },

            // Currently isn't working
            /*installColorPicker: function(){
                $(".color_picker").chromoselector();
            }*/
        },
        props: {
            msg: String,

        },
        mounted() {
            this.reset();
            //this.getModel();

            // Currently isn't working
            /*this.$nextTick(function () {
                this.installColorPicker();
            })*/
        }
    }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1{
        font-size: 25px;
    }
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

    .color_col {
        height: 200px;
        text-align: center;
        vertical-align: middle;
        line-height: 200px;
        font-weight: bold;
        font-size: 22px;
    }

    .row {
        width: inherit;
        margin-bottom: 20px;
    }

    .img_btn button {
        margin: 10px;
    }

    .color_picker {
        height: inherit;
        width: inherit;
        border: none;
    }

    label {
        font-size: 18px;

    }

    #color_number_input {
        width: 100px;
        height: 40px;
        padding-left: 10px;
        font-size: 22px;
    }


    .color_hex {
        height: 100px;
    }

    chrome-picker {
        height: 100px;
        width: 200px;
    }


    .color_hex p{
        font-size: 16px;
    }
</style>
