<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div v-if="!image">
            <form action="POST">
                <input type="file" @change="fileChanged" id="file" class="inputfile" accept="image/*">
                <label for="file">Choose a file</label>
            </form>
        </div>
        <div v-else>
            <img :src="image" />
            <div class="row">

                <button id="remove_btn" @click="removeImage" class="btn img_btn btn-outline-danger">Remove image
                </button>


                <button id="process_btn" @click="handler" class="btn img_btn btn-outline-success">Process image
                </button>


            </div>
        </div>
        <div v-if="loading == true">
            <img alt="loading..." src="@/assets/loading.gif">
        </div>
        <div v-else>
            <p></p>
        </div>
        <div v-if="colorString !=''">
            <!--<h3>Scheme Name: {{ scheme_name }}</h3>-->

            <div class="row no-gutters" id="pallet">
                <div v-for="color in color_arr" v-bind:style="{ backgroundColor: color, color: setTextColor(color) }" class="col color_col">{{color}}
                </div>
            </div>
            <button id="scheme_btn" @click="getScheme" class="btn img_btn btn-outline-primary">Analyze</button>
            <div v-if="isProcessClicked == true">
                <h3>Scheme Name: <span v-if="scheme_name!=''"> {{ scheme_name }} </span> <span v-else> Analyzing ... </span> </h3>

            </div>
        </div>


    </div>
</template>

<script>
    import 'util'
    import 'util.promisify'
    import ColorsService from '@/services/ColorsService'
    import ModelService from '@/services/ModelService'
    import SchemeService from '@/services/SchemeService'

    export default {
        name: 'ImageUpload',
        data() {
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
                loading: false,
                isProcessClicked:false
            }
        },
        mounted() {
            this.processImage();
            //this.getSchemeName();
        },
        methods: {
            reset: function () {
                this.uploadImage= false;
                this.image =  false;
                this.testData = '';
                this.colors= false;
                this.colorString= '';
                this.color_arr= [];
                this.colorSelect= true;
                this.process= 'Process';
                this.scheme_name= "";
                this.model= [];
                this.loading= false;
                this.isProcessClicked=false;
            },
            getScheme: function () {
                this.getSchemeName();
            },
            setColorSelect: function () {
                this.colorSelect = !this.colorSelect
                if (this.colorSelect) {
                    this.process = 'Process'
                } else {
                    this.process = 'Return'
                }
            },
            fileChanged: function (e) {
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
                this.reset();
            },
            rgbToHex: function (R, G, B) {
                return this.toHex(R) + this.toHex(G) + this.toHex(B);
            },
            toHex: function (n) {
                n = Math.floor(n * 256)
                if (isNaN(n)) return 0xFFFFFF;
                n = Math.max(0, Math.min(n, 255));
                return "0123456789ABCDEF".charAt((n - n % 16) / 16)
                    + "0123456789ABCDEF".charAt(n % 16);
            },
            handler: function () {
                var scrollingElement = (document.scrollingElement || document.body);
                scrollingElement.scrollTop = scrollingElement.scrollHeight;

                this.loading = true;
                //this.isProcessClicked = true;
                this.processImage();
            },
            setTextColor: function(color) {
                // RGB Code snipped from StackOverflow
                var c = color.substring(1);  // strip #
                var rgb = parseInt(c, 16);   // convert rrggbb to decimal
                var r = (rgb >> 16) & 0xff;  // extract red
                var g = (rgb >>  8) & 0xff;  // extract green
                var b = (rgb >>  0) & 0xff;  // extract blue

                var lum = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

                if (lum < 96) {
                    // pick a different colour
                    return "#d3c1af";
                } else {
                    return "#2c3e50";
                }
            },
            async processImage() {
                //this.loading = true;

                //this.isProcessClicked = true;
                await ColorsService.addImage({
                    image: this.image
                });

                // This line isn't
                //this.$router.push({ path: '/colors' });

                const response = await ColorsService.fetchColors();
                const color_data = response.data;

                const raw_arr = color_data.color_query.colors;
                //this.color_arr = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];

                for (var i = 0; i < raw_arr.length; i++) {
                    var red = raw_arr[i][0];
                    var green = raw_arr[i][1];
                    var blue = raw_arr[i][2];

                    this.color_arr[i] = '#' + this.rgbToHex(red, green, blue).toString(16);
                }

                this.colorString = raw_arr;

                this.loading = false;
            },
            async getSchemeName() {

                this.isProcessClicked = true;
                const response = await SchemeService.fetchScheme(this.color_arr);

                this.scheme_name = response.data["predicted-name"];
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

    #pallet .color_col {
        height: 200px;
        text-align: center;
        vertical-align: middle;
        line-height: 200px;
        font-weight: bold;
        font-size: 22px;
    }

    .row {
        width: auto;
        margin: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .img_btn {
        width: 200px;
        margin: 30px;

    }

    #remove_btn {
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

    img{
        min-width: 300px ;
        max-width: 40vw;
        min-height: 300px;
    }

</style>
