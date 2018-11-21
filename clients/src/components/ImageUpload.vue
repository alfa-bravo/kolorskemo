<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div v-if="!image">
            <form action="POST">
                <input type="file" @change="fileChanged" id="file" class="inputfile">
                <label for="file">Choose a file</label>
            </form>
        </div>
        <div v-else>
            <img :src="image" height="300px"/>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-3">
                    <button id="remove_btn" @click="removeImage" class="btn img_btn btn-outline-danger">Remove image</button>
                </div>
                <div class="col-md-3">
                    <button id="process_btn" @click="handler" class="btn img_btn btn-outline-success">Process image</button>
                </div>
                <div class="col-md-3"></div>
            </div>
        </div>
        <div v-if="loading == true">
            <img alt="loading..." src="@/assets/loading.gif">
        </div>
        <div v-else>
            <p></p>
        </div>
        <div v-if="colorString!=''">
            <h3>Scheme Name: {{ scheme_name }}</h3>

            <div class="row no-gutters" id="pallet">
                <div v-for="color in color_arr" :style="'background-color:'+ color"  class="col color_col">{{color}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'util'
    import 'util.promisify'
    import ColorsService from '@/services/ColorsService'
    import ModelService from '@/services/ModelService'

    export default {
        name: 'ImageUpload',
        data () {
            return {
                uploadImage: false,
                image: false,
                testData: '',
                colors: false,
                colorString: '',
                color_arr: [],
                colorSelect: true,
                process: 'Process',
                scheme_name: "",
                model: [],
                loading: false
            }
        },
        mounted () {
            this.processImage();
            this.getModel();
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
            handler: function() {
                var scrollingElement = (document.scrollingElement || document.body);
                scrollingElement.scrollTop = scrollingElement.scrollHeight;

                this.loading = true;
                this.processImage();
            },
            async processImage () {
                //this.loading = true;

                this.isProcessClicked = true;
                await ColorsService.addImage({
                    image: this.image
                });

                // This line isn't
                //this.$router.push({ path: '/colors' });

                const response = await ColorsService.fetchColors();
                const color_data = response.data;

                const raw_arr = color_data.color_query.colors;
                //this.color_arr = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];

                for(var i = 0; i < raw_arr.length; i++) {
                    var red = raw_arr[i][0];
                    var green = raw_arr[i][1];
                    var blue = raw_arr[i][2];

                    this.color_arr[i] = '#' + this.rgbToHex(red, green, blue).toString(16);
                }

                this.colorString = raw_arr;

                this.loading = false;
            },
            async getModel () {
                const response = await ModelService.fetchModel();
                this.model = response.data;

                var name_arr = this.model.name_color;
                for(var i = 0; i < name_arr.length; i++) {
                    this.scheme_name = this.scheme_name + " " + name_arr[i];
                }
            }
        },
        props: {
            msg: String,
            scheme: String
        },


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

    #pallet .color_col{
        height: 200px;
        text-align: center;
        vertical-align: middle;
        line-height: 200px;
        font-weight: bold;
        font-size: 22px;
    }

    .row{
        width: 1200px;
        margin:auto;

    }
    .img_btn{
        width: 200px;
        margin: 30px;


    }
    #remove_btn{
        margin-right: 20px;
    }

    .inputfile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    .inputfile + label {
        font-size: 22px;
        font-weight: bold;
        color: #42c5f4;
        background-color: white;
        display: inline-block;
        border: 2px solid #42c5f4;
        width: 300px;
        height: 40px;
        border-radius: 20px;
    }

    .inputfile:focus + label,
    .inputfile + label:hover {
        background-color: #42c5f4;
        color: white;
    }


</style>
